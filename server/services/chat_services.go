package services

import (
	"context"
	"errors"
	"log"

	"github.com/m0nt34/ChatGPT_clone.git/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ChatServicesImpl struct {
	ChatCollection *mongo.Collection
	Ctx						 context.Context
}

func(t *ChatServicesImpl) GetContent(id string)( *models.ChatSchema,error){
	var content *models.ChatSchema

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errors.New("invalid id format")
	}
	
	cursor,err := t.ChatCollection.Find(t.Ctx, bson.M{"_id": objectID})
	if err!=nil{
		return nil,err
	}
	if !cursor.Next(t.Ctx){
		return nil,err
	}
	if err = cursor.Decode(&content);err!=nil{
		return nil,err
	}
	return content,nil
}

func(t *ChatServicesImpl) UploadContent(id string,obj *models.HistoryObj)error{
	objectID,err:=primitive.ObjectIDFromHex(id)
	if err!=nil{
		return err
	}

	cursor, err := t.ChatCollection.Find(t.Ctx,bson.M{"_id":objectID})
	if err != nil {
    log.Fatal(err)
	}
	defer cursor.Close(t.Ctx)
	if !cursor.Next(t.Ctx) {
		newChat := &models.ChatSchema{
			ID:      objectID,                 
			History: []models.HistoryObj{},    
		}
		t.ChatCollection.InsertOne(t.Ctx,newChat)
	}
	filter := bson.M{"_id": objectID}
	update := bson.M{
		"$push": bson.M{
			"history": obj,
		},
	}
	
	_, err = t.ChatCollection.UpdateOne(t.Ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}

func(t *ChatServicesImpl) DeleteContent(id string)error{
	ObjectID,err:=primitive.ObjectIDFromHex(id)
	if err!=nil{
		return err
	}
	result, err:=t.ChatCollection.DeleteOne(t.Ctx,bson.M{"_id":ObjectID})
	if err!=nil{
		return err
	}
	if result.DeletedCount !=1{
		return errors.New("no matched document found for deletion") 
	}
	return nil
}
