from logger import Logger
from unittest import TestCase
from os import unlink, path, getcwd


class TestLogger(TestCase):

    def setUp(self):
        """
        Remove any file leftover from previous tests.
        """
        self.logger_file_path = path.join(getcwd(), 'test.log')
        unlink(self.logger_file_path)

    def log_file_content(self):
        """
        Getting the file content.

        :return: The logger content.
        """
        return open(file=self.logger_file_path).read()

    def test_testing_warning(self):
        """
        Testing the warning of the logger and the error flag.
        """
        logger = Logger('test')
        logger.warn('Testing the warning')
        log_results = self.log_file_content()

        assert 'test - WARNING -  -  Testing the warning' in log_results, \
            "The string 'Testing the warning' should appear in the log but it's not"

        assert logger.error is True, "The error flag should been turned on but it's not."

