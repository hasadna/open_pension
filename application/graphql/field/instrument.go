package field

import (
	"github.com/graphql-go/graphql"
	"github.com/hasadna/open_pension/application/Models"
	"github.com/jinzhu/gorm"
)

var instrument = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Instrument",
		Fields: graphql.Fields{
			"id":                   &graphql.Field{Type: graphql.ID},
		},
		Description: "Instrument fields",
	},
)

func Instruments(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(instrument),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var instruments []*Models.Instrument

			if err := db.Find(&instruments).Error; err != nil {
				panic(err)
			}

			return instruments, nil
		},
		Description: "A list of Instrument description",
	}
}

func Instrument(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: instrument,
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.Int,
				Description: "Filter instrument by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			instrument := Models.Instrument{}

			if err := db.First(&instrument, p.Args["id"]).Error; err != nil {
				panic(err)
			}

			return instrument, nil
		},
		Description: "Getting data of a single instrument entry",
	}
}
