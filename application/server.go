package main

import (
	"github.com/hasadna/open_pension/application/api"
	"github.com/hasadna/open_pension/application/graphql"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"log"
)


func main() {
	db := api.GetDbConnection()
	defer db.Close()
	e := echo.New()

	h, err := graphql.HandlerGraphQlRequest(db)
	logFatal(err)

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.POST("/graphql", echo.WrapHandler(h))

	if err := e.Start(":3000"); err != nil {
		log.Fatalln(err)
	}

}

func logFatal(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}