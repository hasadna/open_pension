from rest_framework import serializers
from .models import ContactRequest

class ContactRequestSerializer(serializers.ModelSerializer):

    # contact_request = serializers.SlugRelatedField(
    #     slug_field='name',
    #     many=True,
    #     queryset = ContactRequest.objects.all())

    class Meta:
        model = ContactRequest
        fields = [
            'name',
            'email',
            'content',
            'timestamp'
        ]
