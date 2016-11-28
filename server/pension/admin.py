from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

from pension.models import Post, Tags
from pension.forms import PostForm


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


class PostAdmin(TranslationAdmin):
    form = PostForm
    model = Post
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
admin.site.register(Post, PostAdmin)
