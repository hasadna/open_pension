import graphene

import pension.schema
import blog.schema


class Query(pension.schema.Query, blog.schema.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


schema = graphene.Schema(query=Query)
