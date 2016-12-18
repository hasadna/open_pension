from yapsy.IPlugin import IPlugin
import csv


class PluginOne(IPlugin):

    """
    Reformatting the options tab.
    """

    global_context = ''

    local_context = ''

    body = []

    text_skip = 'סה""כ'

    def parseBody(self, command, value):
        """
        Main method to parse xsl files.
        :param command:
            The CLI command object.
        :param value:
             The CSV content beside the global fields.
        :return:
        """
        row_context = command.is_context(value)

        reader = csv.reader(value, ',')
        for row in reader:
            print('\t'.join(row))

        if self.text_skip in value:
            return

        if row_context:
            # Get the current context.
            self.local_context = command.english_text(row_context)

            # Check if the current context is a global context or.
            if command.is_global_context(self.local_context):
                self.global_context = self.local_context
        else:
            # Remove the extra comma from the end.
            value = value[:-2]
            value += self.global_context + "," + self.local_context

            # Remove the comma at the beginning.
            self.body.append(value)
