package main

import (
	"os"

	"github.com/imagekit-developer/imagekit-go"
)

var IK = imagekit.NewFromParams(imagekit.NewParams{
	PrivateKey:  os.Getenv("IMAGE_KIT_PRIVATE_KEY"),
	PublicKey:   os.Getenv("IMAGE_KIT_PUBLIC_KEY"),
	UrlEndpoint: os.Getenv("IMAGE_KIT_ENDPOINT"),
})