package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/imagekit-developer/imagekit-go"
	"github.com/joho/godotenv"
	"github.com/m0nt34/ChatGPT_clone.git/controllers"
	"github.com/m0nt34/ChatGPT_clone.git/database"
	"github.com/m0nt34/ChatGPT_clone.git/services"
	"github.com/rs/cors"
)

func uploadIMG(w http.ResponseWriter, r *http.Request) {
	ik := imagekit.NewFromParams(imagekit.NewParams{
		PrivateKey:  os.Getenv("IMAGE_KIT_PRIVATE_KEY"),
		PublicKey:   os.Getenv("IMAGE_KIT_PUBLIC_KEY"),
		UrlEndpoint: os.Getenv("IMAGE_KIT_ENDPOINT"),
	})
	signTokenParams := imagekit.SignTokenParam{}
	resp:= ik.SignToken(signTokenParams)



	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Print(err)
	}
}


func deleteIMG(w http.ResponseWriter, r *http.Request){
	ik := imagekit.NewFromParams(imagekit.NewParams{
		PrivateKey:  os.Getenv("IMAGE_KIT_PRIVATE_KEY"),
		PublicKey:   os.Getenv("IMAGE_KIT_PUBLIC_KEY"),
		UrlEndpoint: os.Getenv("IMAGE_KIT_ENDPOINT"),
	})
	fileID := r.PathValue("id")
	if fileID == "" {
		http.Error(w, "file_id is required", http.StatusBadRequest)
		return
	}
	ctx := context.Background()
	resp, err := ik.Media.DeleteFile(ctx, fileID)
	if err != nil {
		http.Error(w, "Failed to delete image: "+err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}



func main() {
	mongoServices := &database.MongoService{}
	err := godotenv.Load()
	if err != nil {
		log.Print("Error loading .env file")
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/upload", uploadIMG)
	mux.HandleFunc("DELETE /api/delete/img/{id}", deleteIMG)
	mongoServices.Connect()
	
	db:=mongoServices.Client.Database("gpt_clone")
	chatsCollection:=db.Collection("chats")
	chatServices:=&services.ChatServicesImpl{
		ChatCollection: chatsCollection,
		Ctx:						context.Background(),
	}
	chatControllers:=&controllers.ChatController{
		ChatServices:chatServices,
	}

	userCollection:=db.Collection("users")
	userServices:=&services.UserChatServicesImpl{
		UserChatCollection: userCollection,
		ChatCollection:chatsCollection,
		Ctx: context.Background(),
	}

	userControllers:=&controllers.UserChatController{
		UserChatServices:userServices,
	}
	chatMux := http.NewServeMux() 

	chatControllers.RouterGroups(chatMux) 
	mux.Handle("/chats/",  http.StripPrefix("/chats", chatMux))

	userMux:=http.NewServeMux()

	userControllers.UserRouterGroups(userMux)
	mux.Handle("/user/",http.StripPrefix("/user",userMux))
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, 
		AllowedMethods:   []string{"GET", "POST", "PATCH", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" 
	}
	log.Print(http.ListenAndServe(":"+port, c.Handler(mux)))
	defer mongoServices.Disconnect()
}
