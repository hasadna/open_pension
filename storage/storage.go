package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"storage/api"
	"storage/graphql"
)

func main() {
	// Flow:
	// 1. Create function which receive a URL and download it. - 👍
	// 2. Write the path of the file to the DB.  - 👍
	// 	a. ID
	//	b. Filename
	//	c. Path
	//	d. Downloaded
	// 3. Write an endpoint to download the file.  - 👍
	// Step two:
	// 4. Listen to kafka event and trigger the flow.
	// 5. Set up a queue to download files smart way  - 👍

	db := api.GetDbConnection()

	// Firing up the server.
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	h, err := graphql.NewHandler(db)

	logFatal(err)

	e.POST("/graphql", echo.WrapHandler(h))
	e.GET("/file/:id", api.ServeFile)

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
