from django.test import Client, TestCase

class TestPension(TestCase):
    def test_index_view(self):
        response = self.client.get('/index/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.template_name, ['index.html'])

