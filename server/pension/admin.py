from django.contrib import admin
from .models import Quarter, ManagingBody, Fund, Holding, Instrument, Issuer

admin.site.register(Fund)
admin.site.register(Holding)
admin.site.register(Issuer)
admin.site.register(Instrument)
admin.site.register(ManagingBody)
admin.site.register(Quarter)
