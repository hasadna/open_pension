from . import views
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'managing_bodies', views.ManagingBodyViewSet)
router.register(r'investment_home[0-9]', views.InvestmentHomeViewSet)
router.register(r'investment_home_random', views.InvestmentHomeViewRandomSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
