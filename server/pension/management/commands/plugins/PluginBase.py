from yapsy.IPlugin import IPlugin
import re


class PluginBase(IPlugin):
    """
    Reformatting the options tab.

    context_column_index -- Define which empty column determine if this is a
    context row.
    """

    global_context = ''

    local_context = ''

    body = []

    text_skip = 'סה""כ'

    context_column_index = 1

    report = ''

    def parseBody(self, command, value):
        """
        Main method to parse xsl files.
        :param command:
            The CLI command object.
        :param value:
             The CSV content beside the global fields.
        :return:
        """
        row_context = command.is_context(value, self.context_column_index)

        # In YL and remove the sum from the context.
        if not (self.report.find('yl') == 0):
            if self.text_skip in value:
                return
        else:
            if row_context:
                # Yalin Lapidot store the context and the sum in the same row.
                # We need to remove the sum from the context.
                row_context = row_context.replace('סהכ', '').strip()

        if row_context:
            # Get the current context.
            self.local_context = command.english_text(row_context)

            # Check if the current context is a global context or.
            if command.is_global_context(self.local_context):
                self.global_context = self.local_context
        else:
            # Get the amount of extra fields and see if we need to trim them.
            extra = self.calculateExtraCommasDelete(value)
            if extra > 0:
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
