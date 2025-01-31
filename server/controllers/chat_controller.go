package controllers

import (
	"encoding/json"

	"net/http"
	"strings"

	"github.com/m0nt34/ChatGPT_clone.git/middleware"
	"github.com/m0nt34/ChatGPT_clone.git/models"
	"github.com/m0nt34/ChatGPT_clone.git/services"
)

type ChatController struct {
	ChatServices services.ChatServices
}

func(t *ChatController) RouterGroups(router *http.ServeMux){
	router.Handle("DELETE /delete/{id}",middleware.GlobalMiddleware.JsonMiddleware(http.HandlerFunc(t.DeleteContent)))
	router.Handle("GET /get/{id}",middleware.GlobalMiddleware.JsonMiddleware(http.HandlerFunc(t.GetChat)))
	router.Handle("POST /upload/{id}" ,middleware.GlobalMiddleware.JsonMiddleware(http.HandlerFunc(t.UploadContent)) )	
	
}


func(t *ChatController) GetChat(w http.ResponseWriter, r *http.Request){
	id:=r.PathValue("id")
	if strings.ContainsAny(id, " \t\n\r") { 
		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Invalid ID",
			"error":   true,
		})
		return
	}
	
	data,err:=t.ChatServices.GetContent(id)
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"error fetching chat",
			"error":true,
		})
		return
	}

	if data == nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Chat not found",
			"error":   true,
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "success",
		"error":   false,
		"data":		 data,
	})
}


func(t *ChatController) UploadContent(w http.ResponseWriter, r *http.Request){
	var content *models.HistoryObj
	id := r.PathValue("id")
	if err:= json.NewDecoder(r.Body).Decode(&content);err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Invalid data type",
			"error":   true,
		})
		return
	}

	if strings.ContainsAny(id, " \t\n\r") { 
		w.WriteHeader(http.StatusBadRequest)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Invalid ID",
			"error":   true,
		})
		return
	}
	
	if err:= t.ChatServices.UploadContent(id,content);err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Internal server error",
			"error": true,
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":"Content uploaded successfully",
		"error":false,
	})
}

func(t *ChatController) DeleteContent(w http.ResponseWriter, r *http.Request){
	chatID:=r.PathValue("id")

	if strings.ContainsAny(chatID, " \t\n\r"){
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Invalid id",
			"error":true,
		})
		return
	}

	if err:=t.ChatServices.DeleteContent(chatID);err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":"Internal server error",
			"error":true,
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":"Content deleted successfully",
		"error":false,
	})
}
