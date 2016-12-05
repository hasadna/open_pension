from yapsy.IPlugin import IPlugin


class PluginOne(IPlugin):

    global_context = ''

    local_context = ''

    body = []

    def parseBody(self, command, value, contexts):
        row_context = command.is_context(value, contexts)
        if row_context:
            # Get the current context
            self.local_context = command.english_text(row_context)

            # Check if the current context is a global context or.
            if command.is_global_context(self.local_context):
                self.global_context = self.local_context
        else:
            # Remove the extra comma from the end.
            value = value[:-1]
            value += self.global_context + "," + self.local_context

            # Remove the comma at the beginning.
            self.body.append(value[1:])
