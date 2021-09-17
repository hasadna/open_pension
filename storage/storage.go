package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"storage/api"
	"storage/graphql"
	"storage/log"
)

func main() {
	log.Info("Starting server")

	db := api.GetDbConnection()
	defer db.Close()

	// Firing up the server.
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	h, err := graphql.NewHandler(db)

	if err != nil {
		log.Error(err)
		return
	}

	e.POST("/graphql", echo.WrapHandler(h))
	e.GET("/file/:id", api.ServeFile)
	e.POST("/file", api.StoreFile)

	if err := e.Start(":7001"); err != nil {
		log.Error(err)
	}

	defer db.Close()
}
