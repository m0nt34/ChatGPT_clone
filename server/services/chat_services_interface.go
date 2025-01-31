package services

import "github.com/m0nt34/ChatGPT_clone.git/models"

type ChatServices interface {
	GetContent(id string) ( *models.ChatSchema,error)
	UploadContent(id string,obj *models.HistoryObj) error
	DeleteContent(id string) error
}