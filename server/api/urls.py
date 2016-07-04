from api import views
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

# registers urls in api root
router = DefaultRouter()
router.register(r'managing_bodies', views.ManagingBodyViewSet)
router.register(r'funds', views.FundViewSet)
router.register(r'funds_managing_body', views.FundManagingBodyViewSet)
router.register(r'instruments', views.InstrumentViewSet)
router.register(r'holdings', views.HoldingViewSet)
router.register(r'quarter', views.QuarterViewSet)
router.register(r'managing_body_data', views.ManagingBodyDataViewSet, base_name='managing_body_data')

urlpatterns = [
    url(r'^', include(router.urls)),
]
