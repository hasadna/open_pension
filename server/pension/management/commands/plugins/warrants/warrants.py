from pension.management.commands.plugins.PluginBase import PluginBase


class Warrants(PluginBase):

    def contextAlter(self, contexts):
        """
        Altering the contexts of the plugins.

        :param contexts:
        The list of context.
        """
        contexts.append('([\u0591-\u05F4\"\"])')
