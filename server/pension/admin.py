from django.contrib import admin

from pension.models import Quarter, Instrument, InstrumentFields


class InstrumentAdmin(admin.ModelAdmin):
    model = Instrument
    list_display = ('instrument_id', 'issuer_id',)
    search_fields = ['instrument_id']


class QuarterAdmin(admin.ModelAdmin):
    model = Quarter
    list_display = ('year', 'month',)


class InstrumentFieldsAdmin(admin.ModelAdmin):
    model = InstrumentFields
    list_display = ('fields_to_show', 'color')


admin.site.register(Instrument, InstrumentAdmin)
admin.site.register(Quarter, QuarterAdmin)
admin.site.register(InstrumentFields, InstrumentFieldsAdmin)
