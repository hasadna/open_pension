from django.conf.urls.i18n import i18n_patterns
from django.conf.urls import url, include
from django.contrib import admin

# URLs that shouldn't be translated.
urlpatterns = [
    url(r'^api/', include('api.urls')),
]

# URLs that should be translated.
urlpatterns += i18n_patterns(
    url(r'^admin/', admin.site.urls),
)
