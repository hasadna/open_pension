from django.contrib import admin

from pension.models import Quarter, Instrument


class InstrumentAdmin(admin.ModelAdmin):
    model = Instrument
    list_display = ('instrument_id', 'issuer_id',)
    search_fields = ['instrument_id']


class QuarterAdmin(admin.ModelAdmin):
    model = Quarter
    list_display = ('year', 'month',)


admin.site.register(Instrument, InstrumentAdmin)
admin.site.register(Quarter, QuarterAdmin)
