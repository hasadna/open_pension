from graphene import ObjectType, String, Schema
import os
from parser_report import ExcelParser
from loggers.logger import Logger


class FileQuery(ObjectType):
    file = String(name=String(default_value="stranger"))

    def resolve_file(self, info, name):
        parser = ExcelParser(logger=Logger)
        return parser.parse_file(file_path=os.path.join(os.getcwd(), "assets", name))


class RootQuery(FileQuery, ObjectType):
    pass


schema = Schema(query=RootQuery)
