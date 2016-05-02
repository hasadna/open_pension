from django.contrib import admin
from .models import Quarter, ManagingBody, Fund, Holding, Instrument

admin.site.register(Quarter)
admin.site.register(ManagingBody)
admin.site.register(Fund)
admin.site.register(Instrument)
admin.site.register(Holding)
