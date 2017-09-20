from rest_framework import serializers

from .models import ContactRequest


class ContactRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContactRequest
        fields = ['name', 'email', 'content', 'timestamp']
