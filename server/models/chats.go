package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)


type PartsObj struct{
	Text string `bson:"text"`
}
type HistoryObj struct{
	Role string `bson:"role"`
	Parts	[]PartsObj `bson:"parts"`
	Image string `bson:"image"`
}

type ChatSchema struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	History []HistoryObj  `bson:"history"`
}