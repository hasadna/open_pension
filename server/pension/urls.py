__author__ = 'user'

# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
]

urlpatterns += i18n_patterns(
    url(r'^admin/', include(admin.site.urls)),
)