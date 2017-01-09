from yapsy.IPlugin import IPlugin
import re


class PluginBase(IPlugin):
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

        if self.text_skip in value:
            return

        if row_context:
            # Get the current context.
            self.local_context = command.english_text(row_context)

            # Check if the current context is a global context or.
            if command.is_global_context(self.local_context):
                self.global_context = self.local_context
        else:
            value = value[:-self.calculateExtraCommasDelete(value)]
            value += "," + self.global_context + "," + self.local_context

            # Remove the comma at the beginning.
            self.body.append(value)

    def calculateExtraCommasDelete(self, value):
        """
        Calculate the extra amount of commas which we need to remove.

        :param value:
            The current line.

        :return:
            The number of commas to delete.
        """
        return len(
            re.sub(r'\"(.*)\"', '""', value).split(',')) - self.fieldsLength

    def contextAlter(self, contexts):
        """
        Altering the contexts of the plugins.

        :param contexts:
        The list of context.
        """
        pass
