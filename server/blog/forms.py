from dal import autocomplete

from django.utils.translation import ugettext_lazy as _
from django import forms

from blog.models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title', 'author', 'body', 'publish', )
