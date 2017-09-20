from dal import autocomplete
from django import forms
from django.utils.translation import ugettext_lazy as _

from blog.models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title', 'author', 'body', 'publish', 'tags', )
        widgets = {
            'tags': autocomplete.ModelSelect2Multiple(url='tags-autocomplete', attrs={
                'data-placeholder': _('Select Tags'),
                'data-multiple': 'multiple',
                'style': 'width: 625px',
            })
        }
