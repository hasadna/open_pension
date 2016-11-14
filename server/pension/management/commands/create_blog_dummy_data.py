from django.core.files import File
from django.utils import timezone
from django.core.management import BaseCommand
from pension.models import Blog, Tags


class Command(BaseCommand):
    def handle(self, *args, **options):

        print("Started creating Blog Posts dummy data.")
        create_blog_dummy_data()
        print("Finish creating Blog Posts dummy data.")


def create_blog_dummy_data():
    # Create tags.
    tag1 = Tags.objects.get_or_create(
        name='פננסים',
        name_en='Financial',
    )

    tag2 = Tags.objects.get_or_create(
        name='אנליטיקה',
        name_en='Analytics',
    )

    tag3 = Tags.objects.get_or_create(
        name='אגח',
        name_en='Debentures Series',
    )

    # First Trend post.
    Blog.objects.get_or_create(
        title='השקעות מוסדיים ואגח אפריקה ישראל',
        author='ניר גלאון',
        body='יש המון גרסאות זמינות לפסקאות של Lorem Ipsum. אבל רובם עברו שינויים בצורה זו או אחרת, על ידי השתלת הומור או מילים אקראיות שלא נראות אפילו מעט אמינות. אם אתה הולך להשתמש במקטעים של של Lorem Ipsum אתה צריך להיות בטוח שאין משהו מביך חבוי בתוך הטקסט. כל מחוללי הטקסט של Lorem Ipsum שנמצאים ברשת האינטרנט מכוונים לחזור על טקסטים מוגדרים מראש לפי הנדרש. וזה הופך אותנו למחוללי טקסט אמיתיים ראשונים באינטרנט. אנו משתמשים במילון עם מעל 200 ערכים בלטינית משולבים במבני משפטים על מנת לשוות לטקט מראה הגיוני. ולכן הטקסט של Lorem Ipsum לעולם לא יכיל טקסטים חוזרים, הומור, או מילים לא מאופייניות וכדומה',
        title_en='Institutional investments and debentures Series Africa Israel',
        author_en='Nir Galon',
        body_en='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        publish=timezone.now()
    )[0].tags.add(tag1[0])

    # Second Trend post.
    Blog.objects.get_or_create(
        title='ניהול פאסיבי מול ניהול אקטיבי בתיק נכסי הפנסיה',
        author='מערכת פנסיה פתוחה',
        body='Lorem Ipsum הוא פשוט טקסט גולמי של תעשיית ההדפסה וההקלדה. Lorem Ipsum היה טקסט סטנדרטי עוד במאה ה-16, כאשר הדפסה לא ידועה לקחה מגש של דפוס ועירבלה אותו כדי ליצור סוג של ספר דגימה. ספר זה שרד לא רק חמש מאות שנים אלא גם את הקפיצה לתוך ההדפסה האלקטרונית, ונותר כמו שהוא ביסודו. ספר זה הפך פופולרי יותר בשנות ה-60 עם ההוצאה לאור של גליון פונטי המכיל פסקאות של Lorem Ipsum. ועוד יותר לאחרונה עם פרסום תוכנות המחשב האישי כגון Aldus page maker שמכיל גרסאות של Lorem Ipsum.',
        title_en='Passive management versus active management of the pension assets portfolio',
        author_en='Open Pension Stuff',
        body_en='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        publish=timezone.now(),
    )[0].tags.add(tag1[0], tag2[0])

    # Third Trend post.
    Blog.objects.get_or_create(
        title='חוסר השקיפות בתיק נכסי הציבור',
        author='מערכת פנסיה פתוחה',
        body='זוהי עובדה מבוססת שדעתו של הקורא תהיה מוסחת על ידי טקטס קריא כאשר הוא יביט בפריסתו. המטרה בשימוש ב-Lorem Ipsum הוא שיש לו פחות או יותר תפוצה של אותיות, בניגוד למלל יסוי יסוי יסוי, ונותן חזות קריאה יותר.הרבה הוצאות מחשבים ועורכי דפי אינטרנט משתמשים כיום ב-Lorem Ipsum כטקסט ברירת המחדל שלהם, וחיפוש של lorem ipsum יחשוף אתרים רבים בראשית דרכם.גרסאות רבות נוצרו במהלך השנים, לעתים בשגגה לעיתים במכוון (זריקת בדיחות וכדומה).',
        title_en='Lack of transparency in the publics assets portfolio',
        author_en='Open Pension Stuff',
        body_en='There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
        publish=timezone.now(),
    )[0].tags.add(tag3[0], tag2[0])
