from pension.management.commands.plugins.PluginBase import PluginBase


class InvestInHeldCompanies(PluginBase):

    def contextAlter(self, contexts):
        """
        Altering the contexts of the plugins.

        :param contexts:
        The list of context.
        """
        contexts.append('(.+),,,,')
