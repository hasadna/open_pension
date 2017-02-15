from blog import views
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'posts', views.PostViewSet, base_name='posts')

urlpatterns = [
    url(r'^', include(router.urls)),
]
