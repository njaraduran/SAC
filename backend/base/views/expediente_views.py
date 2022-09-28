from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from django.contrib.auth.models import User

from ..expedientes import expedientes
from ..models import Document, Expediente
from ..serializer import ExpedienteSerializer


from rest_framework import status


@api_view(['GET'])
def getExpedientes(request):
    expedientes = Expediente.objects.all()
    serializer = ExpedienteSerializer(expedientes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getExpediente(request, pk):
    expediente = Expediente.objects.get(_id=pk)
    serializer = ExpedienteSerializer(expediente, many=False)
    return Response(serializer.data)
