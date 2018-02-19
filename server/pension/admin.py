from django.contrib import admin

from pension.models import Quarter, Fund, FilterFields


class FundAdmin(admin.ModelAdmin):
    model = Fund
    list_display = ('fund', 'fund_name',)
    search_fields = ['fund', 'fund_name', 'issuer']


class QuarterAdmin(admin.ModelAdmin):
    model = Quarter
    list_display = ('year', 'month',)


class FilterFieldsAdmin(admin.ModelAdmin):
    model = FilterFields
    list_display = ('fields_to_show', 'color')


admin.site.register(Fund, FundAdmin)
admin.site.register(Quarter, QuarterAdmin)
admin.site.register(FilterFields, FilterFieldsAdmin)
