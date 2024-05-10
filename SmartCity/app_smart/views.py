from django.shortcuts import render

# Create your views here.
def abre_index(request):
    return render(request, 'index.html')