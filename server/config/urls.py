"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from rest_framework.documentation import include_docs_urls
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls import url, include
from django.contrib import admin

from dal import autocomplete

from blog.models import Tags

from blog.views import PostViewSet
from pension.views import QuarterViewSet, InstrumentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'posts', PostViewSet, base_name='posts')
router.register(r'quarter', QuarterViewSet, base_name='quarter')
router.register(r'instrument', InstrumentViewSet, base_name='instrument')

# URLs that shouldn't be translated.
urlpatterns = [
    url(r'^api/', include(router.urls)),
]

# URLs that should be translated.
urlpatterns += i18n_patterns(
    url(r'^admin/', admin.site.urls),
    url(r'^tags-autocomplete/$', autocomplete.Select2QuerySetView.as_view(model=Tags), name='tags-autocomplete')
)
