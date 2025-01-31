package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)



type ChatObj struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Title     string             `bson:"title"`
	CreatedAt time.Time          `bson:"createdAt,omitempty"`
}

type UserChatsSchema struct {
	UserID string `bson:"_id"`
	Chats []ChatObj  `bson:"chats"`
}