from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

from pension.models import Security

class SecurityAdmin(TranslationAdmin):
    model = Security
    list_display = ('security_name',)

    class Media:
        js = (
            'modeltranslation/js/force_jquery.js',
            'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js',
            'modeltranslation/js/tabbed_translation_fields.js',
        )
        css = {
            "all": ("css/admin.css",),
            'screen': ('modeltranslation/css/tabbed_translation_fields.css',),
        }

admin.site.register(Security, SecurityAdmin)
