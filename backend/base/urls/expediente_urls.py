from django.urls import path, include
from base.views import expediente_views as views
from rest_framework import routers
from base.views.expediente_views import uploadFile

router = routers.DefaultRouter()
router.register('documents', uploadFile)

urlpatterns = [

    path('', views.getExpedientes, name="expedientes"),
    path('create/', views.createExpediente, name="expediente-create"),
    path('', include(router.urls)),
    path('<str:pk>/', views.getExpediente, name="expediente"),

    path('<str:pk>/entradas/', views.createExpedienteEntrada, name="create-entrada"),
    path('<str:pk>/documents/', views.createExpedienteDocument,
         name="create-document"),

    path('update/<str:pk>/', views.updateExpediente, name="expediente-update"),
    path('delete/<str:pk>/', views.deleteExpediente, name="expediente-delete"),

]
