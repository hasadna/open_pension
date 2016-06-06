from django.test import TestCase

from pension.models import Quarter, InstrumentType, ManagingBody, Fund,
FundManagingBody, Issuer, Instrument, Holding


class QuarterCase(TestCase):
    def setUp(self):
        self.quarter = Quarter.objects.create(
            year=2015,
            quarter=1
        )

    def test_quarter_basic(self):
        """
        Test the basic functionality of Quarter
        """
        self.assertEqual(self.quarter.year, 2014)
        self.assertEqual(self.quarter.quarter, 1)
