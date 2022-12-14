from telnetlib import DO
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from django.contrib.auth.models import User

from ..expedientes import expedientes
from ..models import Document, Expediente, Entrada
from ..serializer import ExpedienteSerializer, DocumentSerializer

from django.http import HttpResponse
from rest_framework import status, viewsets


@api_view(['GET'])
def getExpedientes(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    expedientes = Expediente.objects.filter(name__icontains=query)
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
    expediente.direccionContratista = data['direccionContratista']
    expediente.direccion = data['direccion']
    # expediente.fechaAdjudicacion = data['fechaAdjudicacion']
    # expediente.fechaContratacion = data['fechaContratacion']
    expediente.montoInicial = data['montoInicial']
    expediente.montoActualizado = data['montoActualizado']
    expediente.pAvanceFisico = data['pAvanceFisico']
    expediente.pAvanceFinanciero = data['pAvanceFinanciero']
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
        description='Sin descripcion',
        direccionContratista='',
        direccion='',
        montoInicial='',
        montoActualizado='',
        pAvanceFisico='',
        pAvanceFinanciero=''
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


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createExpedienteDocument(request, pk):
    user = request.user
    expediente = Expediente.objects.get(_id=pk)

    document = Document.objects.create(
        user=user,
        Expediente=expediente,
        name=user.first_name,
        file=request.FILES["file"]
    )

    expediente.save()

    return Response('Entrada agregada')


# @api_view(['POST'])
# def uploadFile(request):

#     # doc = Document.objects.all()
#     # serializer = DocumentSerializer(doc, many=False)
#     # return Response(serializer.data)

#     data = request.data
#     expediente = data['expediente_id']
#     document = Document.objects.create(
#         # User=user,
#         Expediente=expediente,
#         file=request.FILES.get('file'),
#         # name=user.first_name
#     )

#     serializer = DocumentSerializer(Document, many=False)
#     return Response(serializer.data)


class uploadFile(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def post(self, request, *args, **kwargs):
        Expediente = request.data['Expediente']
        file = request.data['file']
        User = request.data['User']
        name = request.data['name']
        # dateUpload = request.data['dateUpload']
        Document.objects.create(Expediente=Expediente,
                                file=file, name=name)
        return HttpResponse({'message': 'Expediente created'}, status=200)
