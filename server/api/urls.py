from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'blog', views.BlogViewSet, base_name='blog')

urlpatterns = [
    url(r'^', include(router.urls)),
]
