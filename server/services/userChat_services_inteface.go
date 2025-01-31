package services

import "github.com/m0nt34/ChatGPT_clone.git/models"

type UserChatServices interface {
	GetUserChats(id string) (*models.UserChatsSchema,error)
	CreateUserChat(obj *models.ChatObj,userID string) (*models.ChatObj, error) 
	UpdateChatTitle(userID string, obj *models.EditReq) error
	DeleteChat(id string) error
}