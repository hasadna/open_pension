from django.conf.urls import url
from api.views import managing_bodies_list, managing_bodies_detail

urlpatterns = [
    url(r'^managing_bodies/$', managing_bodies_list),
    url(r'^managing_bodies/(?P<pk>[0-9]+)/$', managing_bodies_detail),
]
