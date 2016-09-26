from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'example', views.ExampleViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
