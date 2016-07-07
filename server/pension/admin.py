from django.contrib import admin
from .models import Quarter, Fund, Holding, Instrument, Issuer, FundManagingBody

admin.site.register(Fund)
admin.site.register(FundManagingBody)
admin.site.register(Holding)
admin.site.register(Issuer)
admin.site.register(Instrument)
admin.site.register(Quarter)
