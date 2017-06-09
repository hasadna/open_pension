#!/usr/bin/python
# -*- coding: utf-8 -*-
import unittest

from server.pension.management.commands.parse_csv import Command


class TestParseCSV(unittest.TestCase):

    def test_should_skip_line(self):
        self.assertTrue(Command.should_skip_line(self, 'foo'))
        self.assertTrue(Command.should_skip_line(self, 'בעל ענין/צד קשור *'))
        self.assertTrue(Command.should_skip_line(self, 'dasdasd בעל ענין/צד קשור *'))
        self.assertTrue(Command.should_skip_line(self, ''))
        self.assertFalse(Command.should_skip_line(self, 'Testing'))


if __name__ == '__main__':
    unittest.main()
