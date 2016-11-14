from dal import autocomplete

from django.utils.translation import ugettext_lazy as _
from django import forms

from pension.models import Blog


class BlogForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = ('title', 'author', 'body', 'publish', 'tags', )
        widgets = {
            'tags': autocomplete.ModelSelect2Multiple(url='tags-autocomplete', attrs={
                'data-placeholder': _('Select Tags'),
                'data-multiple': 'multiple',
                'style': 'width: 625px',
            })
        }
