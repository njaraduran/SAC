from math import prod
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .expedientes import expedientes

from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from .models import Document


# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/expedientes/',
        'api/users/',
    ]

    return Response(routes)


@api_view(['GET'])
def getExpedientes(request):
    return Response(expedientes)


@api_view(['GET'])
def getExpediente(request, pk):
    expediente = None
    for i in expedientes:
        if i['_id'] == pk:
            expediente = i
            break

    return Response(expediente)


class UploadView(CreateView):
    model = Document
    fields = ['upload_file', ]
    success_url = reverse_lazy('fileupload')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['documents'] = Document.objects.all()
        return context
