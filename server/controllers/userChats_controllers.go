package controllers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/m0nt34/ChatGPT_clone.git/middleware"
	"github.com/m0nt34/ChatGPT_clone.git/models"
	"github.com/m0nt34/ChatGPT_clone.git/services"
)

type UserChatController struct {
	UserChatServices services.UserChatServices
}

func(u *UserChatController) UserRouterGroups(router *http.ServeMux){
	router.Handle("GET /get/{id}",middleware.GlobalMiddleware.JsonMiddleware(http.HandlerFunc(u.GetUserChats)))
	router.Handle("POST /create/{id}",middleware.GlobalMiddleware.JsonMiddleware(http.HandlerFunc(u.CreateUserChat)))
	router.Handle("PATCH /edit/{id}",middleware.GlobalMiddleware.JsonMiddleware(http.HandlerFunc(u.UpdateChatTitle)))
	router.Handle("DELETE /delete/{id}",middleware.GlobalMiddleware.JsonMiddleware(http.HandlerFunc(u.DeleteChat)))
}


func(u *UserChatController) GetUserChats(w http.ResponseWriter, r *http.Request){
	id:=r.PathValue("id")
	
	if strings.ContainsAny(id," \t\n\r"){
		w.WriteHeader(http.StatusBadRequest)
		
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Invalid id",
			"error":true,
		})
		return
	}
	
	userChats,err:=u.UserChatServices.GetUserChats(id)
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Internal server error",
			"error":true,
		})
		return
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":"User chats fetched successfully",
		"error":false,
		"data":userChats,
	})
}

func (u *UserChatController) CreateUserChat(w http.ResponseWriter, r *http.Request){
	var	reqObj *models.ChatObj
	id:=r.PathValue("id")

	if strings.ContainsAny(id," \t\n\r"){
		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Invalid id",
			"error":true,
		})
		return
	}
	
	if err:=json.NewDecoder(r.Body).Decode(&reqObj);err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Invalid data",
			"error":true,
		})
		return
	}
	resObj,err:=u.UserChatServices.CreateUserChat(reqObj,id)
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Internal server error",
			"error":true,
		})
		return 
	}

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":"Chat created successfully",
		"error":false,
		"data":resObj,
	})
}

func(u *UserChatController) UpdateChatTitle(w http.ResponseWriter,r *http.Request){

	userID := r.PathValue("id")

	var editReqObj *models.EditReq
	if strings.ContainsAny(userID," \t\n\r"){
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Invalid user id",
			"error":true,
		})
		return
	}
	
	if err:=json.NewDecoder(r.Body).Decode(&editReqObj);err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Invalid request data",
			"error":true,
		})
		return
	}

	if err:=u.UserChatServices.UpdateChatTitle(userID,editReqObj);err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Internal server error",
			"error":true,
		})
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":"Title updated successfully",
		"error":false,
	})
}

func(u *UserChatController) DeleteChat(w http.ResponseWriter,r *http.Request){
	searchID:= r.PathValue("id")
	if strings.ContainsAny(searchID," \t\n\r"){
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Invalid user id",
			"error":true,
		})
		return
	}
	if err:=u.UserChatServices.DeleteChat(searchID);err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Internal server error",
			"error":true,
		})
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":"chat was deleted successfully",
		"error":false,
	})
}