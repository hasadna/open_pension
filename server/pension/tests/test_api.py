from rest_framework.test import APITestCase
from pension.models import Fund, ManagingBody, FundManagingBody, Quarter


class PensionAPITestCase(APITestCase):

    def setUp(self):
        # create quarters
        self.first_quarter = Quarter.objects.create(year=2015, quarter=1)
        self.second_quarter = Quarter.objects.create(year=2015, quarter=2)
        # create funds
        self.fund_one = Fund.objects.create(label='harel', label_he='הראל')
        self.fund_two = Fund.objects.create(label='clal', label_he='כלל')
        # create managing bodies
        self.managing_body_one = ManagingBody.objects.create(label='clal',
                                                             label_he='כלל')
        self.managing_body_two = ManagingBody.objects.create(label='harel',
                                                             label_he='הראל')
        # create fund managing body
        self.fund_managing_body_one = FundManagingBody.objects.create(
                                    start=self.first_quarter,
                                    fund=self.fund_one,
                                    managing_body=self.managing_body_one
        )

    def test_list_objects(self):
        # testing a request of object list
        response = self.client.get('/api/managing_bodies/')

        # it should return status_code of 200
        self.assertEqual(response.status_code, 200)
        # first object should be labeled clal
        self.assertEqual(response.data['results'][0]['label'], 'כלל')
        # second object should be labeled harel
        self.assertEqual(response.data['results'][1]['label'], 'הראל')

    def test_first_object(self):
        # tests a request of the second object alone
        response = self.client.get('/api/managing_bodies/1/')

        # it should return status_code of 200
        self.assertEqual(response.status_code, 200)
        # Object should be labeled clal
        self.assertEqual(response.data['label'], 'כלל')

    def test_second_object(self):
        # tests a request of the second object alone
        response = self.client.get('/api/managing_bodies/2/')
        # it should return status_code of 200
        self.assertEqual(response.status_code, 200)
        # Object should be labeled harel
        self.assertEqual(response.data['label'], 'הראל')
