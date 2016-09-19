from django.shortcuts import render

# Create your views here.

#Daniel 10.9.16
from django.shortcuts import get_object_or_404, render
from .models import InvestmentHome
# 
def detail(request, investment_home_id):
    investment_home = get_object_or_404(InvestmentHome, pk=investment_home_id)
    return render(request, 'polls/detail.html', {'investment home': investment_home})
