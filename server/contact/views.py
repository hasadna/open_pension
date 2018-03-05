from rest_framework import status, viewsets
from django.core.mail import send_mail
from rest_framework.response import Response

from contact.models import ContactRequest
from contact.serializers import ContactRequestSerializer

mail_templete = '''
Name: {name}
Email: {email}
Time: {time}

Content: {content}
'''


class ContactViewSet(viewsets.ModelViewSet):
    """
    An endpoint for POST A new Contact email.
    """
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer

    def create(self, request):
        serializer = ContactRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer.save()

        send_mail(
            serializer.data['name'],
            mail_templete.format(
                name=serializer.data['name'],
                email=serializer.data['email'],
                content=serializer.data['content'],
                time=serializer.data['timestamp'],
            ),
            serializer.data['email'],
            [
                'hasadna.openpension@gmail.com',
                'nir@galon.io',
            ],
            fail_silently=False,
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
