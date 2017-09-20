from rest_framework import viewsets
from .models import ContactRequest
from .serializers import ContactRequestSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
