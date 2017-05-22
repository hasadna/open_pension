from pension.management.commands.plugins.PluginBase import PluginBase


class Agach(PluginBase):

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
        row_context = command.is_context(value, self.context_column_index)

        # todo: Check if we in YL and remove the sum from the context.

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
            # Remove the extra comma from the end.
            value = value[:-1]
            value += self.global_context + "," + self.local_context

            # Remove the comma at the beginning.
            self.body.append(value)
