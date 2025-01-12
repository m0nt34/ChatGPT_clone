package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/imagekit-developer/imagekit-go"
	"github.com/joho/godotenv"
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
		log.Fatal(err)
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

	err := godotenv.Load()
	if err != nil {
			log.Fatal("Error loading .env file")
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/upload", uploadIMG)
	mux.HandleFunc("DELETE /api/delete/img/{id}", deleteIMG)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, 
		AllowedMethods:   []string{"GET", "POST", "OPTIONS","DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(mux)
	fmt.Println(os.Getenv("PORT"))
	err = http.ListenAndServe(":"+os.Getenv("PORT"), handler)
	if err != nil {
		log.Fatal(err)
	}
}
