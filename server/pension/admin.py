from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

from pension.models import Blog, Tags, Security
from pension.forms import BlogForm

class SecurityAdmin(TranslationAdmin):
    model = Security
    list_display = ('name',)

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


class TagsAdmin(TranslationAdmin):
    model = Tags
    list_display = ('name',)

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


class BlogAdmin(TranslationAdmin):
    form = BlogForm
    model = Blog
    list_display = ('title', 'author', 'body', 'publish')

    class Media:
        js = (
            'modeltranslation/js/force_jquery.js',
            'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.24/jquery-ui.min.js',
            'modeltranslation/js/tabbed_translation_fields.js',
            'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js',
        )
        css = {
            "all": ("css/admin.css",),
            'screen': ('modeltranslation/css/tabbed_translation_fields.css',),
        }


admin.site.register(Tags, TagsAdmin)
admin.site.register(Blog, BlogAdmin)
admin.site.register(Security, SecurityAdmin)
