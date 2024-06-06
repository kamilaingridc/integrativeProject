from django.shortcuts import render
from django_filters.views import FilterView
from .api.filters import SensorFilter

# Create your views here.
def abre_index(request):
    return render(request, 'index.html')

def abre_login(request):
    return render(request, 'login.html')

def cad_user(request):
    return render(request, 'cadastrarUsuario.html')

def autenticacao():
    pass
