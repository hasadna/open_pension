package graphql

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"storage/api"
)

var file = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Files",
		Fields: graphql.Fields{
			"id":         &graphql.Field{Type: graphql.ID},
			"filename":   &graphql.Field{Type: graphql.String},
			"path":       &graphql.Field{Type: graphql.String},
			"downloaded": &graphql.Field{Type: graphql.Boolean},
			"url":        &graphql.Field{Type: graphql.String},
			"created_at": &graphql.Field{Type: graphql.DateTime},
			"updated_at": &graphql.Field{Type: graphql.DateTime},
		},
		Description: "Files field",
	},
)

func Files(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(file),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var file []api.File

			if err := db.Find(&file).Error; err != nil {
				panic(err)
			}

			return file, nil
		},
		Description: "A list of files description",
	}
}

func File(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: file,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type:         graphql.Int,
				Description:  "Filter file by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			file := api.File{}

			if err := db.First(&file, p.Args["id"]).Error; err != nil {
				panic(err)
			}

			return file, nil
		},
		Description: "A list of files description",
	}
}
