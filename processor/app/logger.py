import logging


class Logger:

    def __init__(self, logger_name):
        self.errored = False
        self._logger = logging.getLogger(logger_name)
        self._logger.setLevel(logging.DEBUG)

        # Create file handler which logs even debug messages.
        fh = logging.FileHandler(f'{logger_name}.log')
        fh.setLevel(logging.DEBUG)

        # Create console handler with a higher log level.
        ch = logging.StreamHandler()
        ch.setLevel(logging.NOTSET)

        # Create formatter and add it to the handlers.
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(more_info)s -  %(message)s')
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)

        # Add the handlers to the logger.
        self._logger.addHandler(fh)
        self._logger.addHandler(ch)

        self.extra_info = ""

    def error(self, msg):
        """

        :param msg:
        :return:
        """
        self.errored = True
        self._logger.error(msg=msg, extra={'more_info': self.extra_info})

    def warn(self, msg):
        """

        :param msg:
        """
        self.errored = True
        self._logger.warning(msg=msg, extra={'more_info': self.extra_info})
