from django.test import Client, TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework import status

from blog.models import Post, Tags
from blog.serializers import PostsSerializer

# initialize the APIClient app
client = Client()


class PostTest(TestCase):
    """ Test module for Post model """

    def setUp(self):
        first_tag = Tags.objects.create(
            name='פננסים',
            name_en='Financial',
        )
        second_tag = Tags.objects.create(
            name='אנליטיקה',
            name_en='Analytics',
        )

        self.first_post = Post.objects.create(
            title='השקעות מוסדיים ואגח אפריקה ישראל',
            author='ניר גלאון',
            body='יש המון גרסאות זמינות לפסקאות של'
                 'Lorem Ipsum. אבל רובם עברו שינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות שלא'
                 'נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של Lorem Ipsum אתה צריך להיות בטוח'
                 'שאין משהו מביך חבוי בתוך הטקסט. כל מחוללי הטקסט של Lorem Ipsum שנמצאים ברשת האינטרנט מכוונים'
                 'לחזור על טקסטים מוגדרים מראש לפי הנדרש. וזה הופך אותנו למחוללי טקסט אמיתיים ראשונים באינטרנט.'
                 'אנו משתמשים במילון עם מעל 200 ערכים בלטינית משולבים במבני משפטים על מנת לשוות לטקט מראה'
                 'הגיוני. ולכן הטקסט של Lorem Ipsum לעולם לא יכיל טקסטים חוזרים, הומור, או מילים לא מאופייניות וכדומה',
            author_en='Nir Galon',
            title_en='Institutional investments and bonds of Africa Israel',
            body_en='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has'
                    'been the industrys standard dummy text ever since the 1500s, when an unknown printer took a'
                    'galley of type and scrambled it to make a type specimen book. It has survived not only five'
                    'centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
                    'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum'
                    'passages, and more recently with desktop publishing software like Aldus PageMaker including'
                    'versions of Lorem Ipsum.',
            publish=timezone.now()
        )
        self.first_post.tags.add(first_tag)

        self.second_post = Post.objects.create(
            title='ניהול פאסיבי מול ניהול אקטיבי בתיק נכסי הפנסיה',
            author='מערכת פנסיה פתוחה',
            body='לורם איפסום הוא פשוט טקסט'
                 'גולמי של תעשיית ההדפסה וההקלדה. לורם איפסום היה טקסט סטנדרטי עוד במאה ה-16, כאשר'
                 'הדפסה לא ידועה לקחה מגש של דפוס ועירבלה אותו כדי ליצור סוג של ספר דגימה. ספר זה שרד'
                 'לא רק חמש מאות שנים אלא גם את הקפיצה לתוך ההדפסה האלקטרונית, ונותר כמו שהוא ביסודו.'
                 'ספר זה הפך פופולרי יותר בשנות ה-60 עם ההוצאה לאור של גליון פונטי המכיל פסקאות של לורם'
                 'איפסום. ועוד יותר לאחרונה עם פרסום תוכנות המחשב האישי כגון שמכיל גרסאות של לורם איפסום.',
            title_en='Passive management versus active management of the pension assets portfolio',
            author_en='Open Pension Stuff',
            body_en='It is a long established fact that a reader will be distracted by the readable content of a'
                    'page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less'
                    'normal distribution of letters, as opposed to using Content here, content here, making it look'
                    'like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum'
                    'as their default model text, and a search for lorem ipsum will uncover many web sites still in'
                    'their infancy. Various versions have evolved over the years, sometimes by accident, sometimes'
                    'on purpose (injected humour and the like).',
            publish=timezone.now(),
        )
        self.second_post.tags.add(second_tag)

    def test_get_all_posts(self):
        response = client.get(reverse('api:posts-list'))
        posts = Post.objects.all()
        serializer = PostsSerializer(posts, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_valid_single_post(self):
        response = client.get(reverse('api:posts-detail', kwargs={'unique_id': self.first_post.unique_id}))
        post = Post.objects.get(pk=self.first_post.pk)
        serializer = PostsSerializer(post)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_post(self):
        response = client.get(reverse('api:posts-detail', kwargs={'unique_id': 123}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
