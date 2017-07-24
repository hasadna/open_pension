#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import re
import json
from django.core.management import BaseCommand
from yapsy.PluginManager import PluginManager
from pathlib import Path


class Command(BaseCommand):
    fields = {}

    global_contexts = {
        "in_israel",
        "not_in_israel"
    }

    pluginManager = PluginManager()

    plugins = {}

    metadata = {}

    def __init__(self, stdout=None, stderr=None, no_color=False):
        super().__init__(stdout, stderr, no_color)

        folder_path = os.path.dirname(os.path.abspath(__file__))
        self.fields = json.loads(open(folder_path + "/fields.json", 'r').read())
        self.plugins = json.loads(
            open(folder_path + "/plugins.json", 'r').read())

    def add_arguments(self, parser):
        parser.add_argument('--source', type=str)
        parser.add_argument('--destination', type=str)
        parser.add_argument('--plugin_id', type=str)

    def handle(self, *args, **options):
        path = options['source']
        destination = options['destination']
        specific_plugin = options['plugin_id']

        self.pluginManager.setPluginPlaces(
            ["pension/management/commands/plugins"])
        self.pluginManager.collectPlugins()

        for file in os.listdir(path):
            split_file = file.split('-')
            del split_file[-1]
            plugin_id = "-".join(split_file).strip().replace(' ', '-')
            if plugin_id not in self.plugins:
                # No matching plugin. Skipping.
                continue

            plugin_id = self.plugins[plugin_id]

            if specific_plugin is not None and plugin_id != specific_plugin:
                continue

            plugin = self.pluginManager.getPluginByName(plugin_id).plugin_object
            # Init the body value to prevent any extra values we don't need in
            # other plugins.
            plugin.body = []
            plugin.report = os.path.normpath(path).split('/')[-1]
            content = self.normalize(path + "/" + file, plugin)

            if not destination:
                print(content)
            else:
                lib_path = destination + "/" + plugin.report
                Path(lib_path).mkdir(parents=True, exist_ok=True)

                # Write the file.
                f = open(lib_path + "/" + plugin_id + ".csv", 'w+')
                f.write(content)
                f.close()

                # Write the metadata file.
                if not Path(lib_path + "/metadata.json").is_file():
                    with open(lib_path + "/metadata.json", 'w') as outfile:
                        json.dump(self.metadata, outfile)

    def normalize(self, path, plugin):
        """
        Normalize the file content.

        :param path:
            The path of the file.

        :param plugin:
            The plugin object which handle the body.

        :return:
            The human readable, relatively, CSV file.
        """
        metadata = {'number': '', 'date': ''}
        csv_file = open(path, 'r').read()
        rows = csv_file.split("\n")
        fields = []
        self.metadata = {}

        for i, value in enumerate(rows):
            if i == 0:
                metadata['date'] = self.get_kupa_date(value)
            elif i == 3:
                metadata['number'] = self.get_kupa_number(value)
            elif i == 7:
                fields = self.get_fields(value)
                plugin.fieldsLength = len(fields)
            elif i >= 11:
                if self.should_skip_line(value):
                    continue

                plugin.parseBody(self, value[1:])

        self.metadata = metadata
        fields.append('global_context')
        fields.append('local_context')
        return ','.join(fields) + "\n" + "\n".join(plugin.body)

    def get_kupa_date(self, row):
        """
        Get the kupa number from the first row.

        :param row:
            The first row.

        :return:
            The kupa date.
        """
        for element in row.split(','):
            if re.compile("[0-9]*/[0-9]*/[0-9]*").match(element):
                # Found the date. No need to extra iteration.
                return element

    def get_kupa_number(self, row):
        """
        Get the date of the kupa.

        :param row:
            The content of the file.

        :return:
            The kupa number.
        """
        for element in row.split(','):
            if element.isdigit():
                # Found the kupa number. No need for extra iteration.
                return element

    def get_fields(self, row):
        """
        Get the fields from the csv file.

        :param row:
            The row

        :return:
            Array of fields
        """
        fields = row.split(",")

        new_fields = []
        for i, field in enumerate(fields):

            if field.strip() == '':
                # An empty fields cannot be added as a field in the CSV header.
                continue

            new_fields.append(self.english_text(field))

        return new_fields

    def english_text(self, field):
        """
        Get the english field representation of the hebrew.

        :param field:
            The hebrew field.

        :return:
            The english field for the hebrew term.
        """
        clear_field_name = field.strip().replace('"', '')

        if clear_field_name not in self.fields:
            # print("The field " + clear_field_name + " does not exists in the "
            #                                         "field name")
            return ''

        return self.fields[clear_field_name]

    def is_context(self, row, empty_column):
        """
        Check if the current line is a line context.

        :param row:
            The row to check if it a context row or not.
        :param empty_column:
            Define which column should be empty inorder to decide if this is a
            context row or not.
        :return:
            The text context of boolean when not found.
        """

        # Might not be good for numbers with comma. Let's hold hand and pray for
        # the best.
        columns = row.split(',')
        if columns[empty_column] == "":
            return columns[0].replace('"', '').replace("'", '')
        return False

    def is_global_context(self, context):
        """
        Check if the given context is a global context

        : param context:
            The name of the context

        :return:
            The text context of boolean when not found.
        """
        return context in self.global_contexts

    def should_skip_line(self, value):
        """
        Check if the line should be skipped or not.

        :param value:
            The current line.
        :return:
            True or false.
        """
        skipping_text = 'בעל ענין/צד קשור *'
        if skipping_text in value:
            return True

        if value.replace(',', '') == "":
            return True

        return False
