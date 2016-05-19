from django.test import TestCase

class TestPension(TestCase):

    def test_index_view(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)
