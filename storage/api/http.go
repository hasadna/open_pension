package api

import (
	"github.com/hasadna/open_pension/application/api"
	"github.com/labstack/echo/v4"
	"strconv"
)

func ServeFile(c echo.Context) error {
	db := api.GetDbConnection()

	var file File

	u, err := strconv.ParseUint(c.Param("id"), 10, 32)

	if err != nil {
		panic(err)
	}

	db.Find(&File{ID: uint(u)}).First(&file)
	return c.File(file.Path)
}