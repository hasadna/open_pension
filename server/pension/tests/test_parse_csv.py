#!/usr/bin/python
# -*- coding: utf-8 -*-
import unittest
from server.pension.management.commands.parse_csv import Command


class TestParseCSV(unittest.TestCase):

    def __init__(self, methodName='runTest'):
        super().__init__(methodName)
        self.Command = Command()

    def test_should_skip_line(self):
        self.assertFalse(self.Command.should_skip_line('foo'))
        self.assertTrue(self.Command.should_skip_line('בעל ענין/צד קשור *'))
        self.assertTrue(
            self.Command.should_skip_line('dasdasd בעל ענין/צד קשור *')
        )
        self.assertTrue(self.Command.should_skip_line(''))
        self.assertFalse(self.Command.should_skip_line('Testing'))

    def test_is_global_context(self):
        self.assertTrue(self.Command.is_global_context('in_israel'))
        self.assertFalse(self.Command.is_global_context('foo'))

    def test_is_context(self):
        row = "foo,bar,,foobar,barfoo"
        self.assertTrue(self.Command.is_context(row=row, empty_column=2))
        self.assertFalse(self.Command.is_context(row=row, empty_column=1))

    def test_english_text(self):
        buddy = self.Command.english_text(field="שם המנפיק/שם נייר ערך")
        self.assertEquals(buddy, 'managing_body')
        not_buddy = self.Command.english_text(field='Drupal')
        self.assertEquals(not_buddy, '')

    def test_get_fields(self):
        row = "שם המנפיק/שם נייר ערך, מחמ"
        new_row = self.Command.get_fields(row)
        self.assertEquals(new_row, ['managing_body', 'average_life_spend'])

        bad_row = "Drupal, Wordpress"
        new_row = self.Command.get_fields(bad_row)
        self.assertEquals(new_row, ['', ''])

if __name__ == '__main__':
    unittest.main()
