from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from pension.models import ManagingBody
from api.serializers import ManagingBodySerializer


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@csrf_exempt
def managing_bodies_list(request):
    """
    List all managing bodies, or create a new managing body.
    """
    if request.method == 'GET':
        managing_bodies = ManagingBody.objects.all()
        serializer = ManagingBodySerializer(managing_bodies, many=True)

        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ManagingBodySerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return JSONResponse(serializer.data, status=201)

        return JSONResponse(serializer.errors, status=400)


@csrf_exempt
def managing_bodies_detail(request, pk):
    """
    Retrieve, update or delete a managing body.
    """
    try:
        managing_body = ManagingBody.objects.get(pk=pk)
    except ManagingBody.DoesNotExist:

        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = ManagingBodySerializer(managing_body)

        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ManagingBodySerializer(managing_body, data=data)
        if serializer.is_valid():
            serializer.save()

            return JSONResponse(serializer.data)

        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        managing_body.delete()

        return HttpResponse(status=204)
