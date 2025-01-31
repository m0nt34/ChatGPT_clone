package database

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoService struct {
	Client *mongo.Client
}

func(m *MongoService) Connect(){
	client,err:=mongo.Connect(context.Background(),options.Client().ApplyURI(os.Getenv("MONGO_URL")))
	if err!=nil{
		log.Fatal("Error connecting to MongoDB: ", err)
	}
	m.Client = client
}

func(m *MongoService) Disconnect(){
	if err:=m.Client.Disconnect(context.Background());err!=nil{
		log.Fatal("Error disconnecting from MongoDB: ", err)
	}
}