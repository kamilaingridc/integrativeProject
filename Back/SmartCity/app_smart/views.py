from django.shortcuts import render

# Create your views here.
def abre_index(request):
    return render(request, 'index.html')

def cad_user(request):
    return render(request, 'cadastrarUsuario.html')
