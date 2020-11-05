package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"storage/api"
	"storage/graphql"
)

func main() {
	db := api.GetDbConnection()
	defer db.Close()

	// Firing up the server.
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	h, err := graphql.NewHandler(db)

	logFatal(err)

	e.POST("/graphql", echo.WrapHandler(h))
	e.GET("/file/:id", api.ServeFile)
	e.POST("/file", api.StoreFile)

	if err := e.Start(":3000"); err != nil {
		log.Fatalln(err)
	}

	defer db.Close()

}

func logFatal(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}
