package services

import (
	"context"
	"errors"
	"time"

	"github.com/m0nt34/ChatGPT_clone.git/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserChatServicesImpl struct {
	UserChatCollection *mongo.Collection
	ChatCollection *mongo.Collection
	Ctx context.Context
}

func(u *UserChatServicesImpl) GetUserChats(id string) (*models.UserChatsSchema,error){

	var userChats *models.UserChatsSchema
	cursor,err:=u.UserChatCollection.Find(u.Ctx,bson.M{"_id":id})
	if err != nil {
		return nil, err
	}

	defer cursor.Close(u.Ctx)

	if !cursor.Next(u.Ctx) {
		newUserChats := &models.UserChatsSchema{
			UserID: id,
			Chats:  []models.ChatObj{}, 
		}
		_, insertErr := u.UserChatCollection.InsertOne(u.Ctx, newUserChats)

		if insertErr != nil {
			return nil, insertErr
		}
		return newUserChats, nil
	}

	if err = cursor.Decode(&userChats);err!=nil{
		return nil,err
	}
	return userChats, nil
}

func (u *UserChatServicesImpl) CreateUserChat(obj *models.ChatObj,userID string) (*models.ChatObj, error) {
	obj.CreatedAt = time.Now()
	obj.ID = primitive.NewObjectID()

	update := bson.M{
		"$push": bson.M{
			"chats": obj,
		},
	}

	_, err := u.UserChatCollection.UpdateOne(
		u.Ctx,
		bson.M{"_id": userID}, 
		update,
	)
	if err != nil {
		return nil, err
	}
	return obj, nil
}
func(u *UserChatServicesImpl) UpdateChatTitle(userID string, obj *models.EditReq) error{
	if len(obj.NewTitle) > 50 {
    return errors.New("new title is too long")
	}
	filter := bson.M{"_id": userID, "chats._id": obj.ID}
	update := bson.M{"$set": bson.M{"chats.$.title": obj.NewTitle}}

	result, err := u.UserChatCollection.UpdateOne(u.Ctx, filter, update)
	if err != nil {
		return err
	}
	if result.ModifiedCount == 0 {
		return errors.New("chat not found or title unchanged")
	}

	return nil
}

func(u *UserChatServicesImpl) DeleteChat(id string) error {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
			return errors.New("invalid user ID format")
	}

	userFilter := bson.M{"chats._id": objectId}
	update := bson.M{
			"$pull": bson.M{"chats": bson.M{"_id": objectId}},
	}

	result, err := u.UserChatCollection.UpdateOne(u.Ctx, userFilter, update)
	if err != nil {

			return err
	}

	if result.ModifiedCount == 0 {
			return errors.New("chat not found or already deleted from user")
	}

	chatFilter := bson.M{"_id": objectId}
	_, err = u.ChatCollection.DeleteOne(context.TODO(), chatFilter)
	if err != nil {
			return err
	}

	return nil
}

