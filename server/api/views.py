from rest_framework import viewsets, serializers
from pension.models import ManagingBody
from api.serializers import ManagingBodySerializerVersion1
from rest_framework.versioning import URLPathVersioning

class PensionVersioning(URLPathVersioning):
    default_version = 'v1'
    allowed_versions = ['v1']

class ManagingBodyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ManagingBody.objects.all()
    versioning_class = PensionVersioning

    def get_serializer_class(self):
        if self.request.version:
            raise serializers.ValidationError("Versioning is not supported yet.")
        return ManagingBodySerializerVersion1

