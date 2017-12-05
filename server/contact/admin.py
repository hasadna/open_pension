from django.contrib import admin

from contact.models import ContactRequest


class ContactAdmin(admin.ModelAdmin):
    model = ContactRequest
    list_display = ('name', 'email', 'timestamp',)
    search_fields = ['name', 'email']


admin.site.register(ContactRequest, ContactAdmin)
