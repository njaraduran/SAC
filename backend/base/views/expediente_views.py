from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from django.contrib.auth.models import User

from ..expedientes import expedientes
from ..models import Document, Expediente, Entrada
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


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateExpediente(request, pk):
    data = request.data
    expediente = Expediente.objects.get(_id=pk)
    expediente.name = data['name']
    expediente.asignTo = data['asignTo']
    expediente.contratist = data['contratist']
    expediente.stage = data['stage']
    expediente.state = data['state']
    expediente.dateStart = data['dateStart']
    expediente.dateEnd = data['dateEnd']
    expediente.description = data['description']

    expediente.save()

    serializer = ExpedienteSerializer(expediente, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createExpediente(request):
    user = request.user
    expediente = Expediente.objects.create(
        user=user,
        name='Sample Name',
        asignTo='',
        contratist='',
        stage='',
        state='',
        dateStart='2022-10-10',
        dateEnd='2022-10-10',
        description=''
        # _id=''
    )
    serializer = ExpedienteSerializer(expediente, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteExpediente(request, pk):
    expediente = Expediente.objects.get(_id=pk)
    expediente.delete()
    return Response('Expediente eliminado')


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createExpedienteEntrada(request, pk):
    user = request.user
    expediente = Expediente.objects.get(_id=pk)
    data = request.data

    entrada = Entrada.objects.create(
        user=user,
        Expediente=expediente,
        name=user.first_name,
        comment=data['comment']
    )

    expediente.save()

    return Response('Entrada agregada')
