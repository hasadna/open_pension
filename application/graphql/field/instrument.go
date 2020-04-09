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
			"id":                &graphql.Field{Type: graphql.ID},
			"industry":          &graphql.Field{Type: graphql.String},
			"instrument_name":   &graphql.Field{Type: graphql.String},
			"instrument_type":   &graphql.Field{Type: graphql.String},
			"instrument_number": &graphql.Field{Type: graphql.String},
			"issuer_number": &graphql.Field{
				Type: company,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return p.Source.(Models.Instrument).IssuerNumber, nil
				},
			},
			"market": &graphql.Field{
				Type: market,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					return p.Source.(Models.Instrument).Market, nil
				},
			},
			"created_at": &graphql.Field{Type: graphql.DateTime},
			"updated_at": &graphql.Field{Type: graphql.DateTime},
			"deleted_at": &graphql.Field{Type: graphql.DateTime},
		},
		Description: "Instrument fields",
	},
)

func Instruments(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(instrument),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var instruments []Models.Instrument

			if err := db.
				Preload("IssuerNumber").
				Preload("Market").
				Find(&instruments).
				Error; err != nil {
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
				Type:         graphql.Int,
				Description:  "Filter instrument by a given ID",
				DefaultValue: 0,
			},
		},
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			instrument := Models.Instrument{}

			if err := db.
				Preload("IssuerNumber").
				Preload("Market").
				First(&instrument, p.Args["id"]).
				Error; err != nil {
				panic(err)
			}

			return instrument, nil
		},
		Description: "Getting data of a single instrument entry",
	}
}
