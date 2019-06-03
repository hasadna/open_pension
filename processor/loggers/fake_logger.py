class FakeLogger:
    """

    """
    def error(self, msg):
        """
        :param msg:
        :return:
        """
        print("ERROR {0}".format(msg))

    def info(self, msg):
        """

        :param msg:
        :return:
        """
        print("INFO {0}".format(msg))

    def warn(self, msg):
        """

        :param msg:
        :return:
        """
        print("WARNING {0}".format(msg))
