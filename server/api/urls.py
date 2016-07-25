from api import views
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'issuers', views.IssuerViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
