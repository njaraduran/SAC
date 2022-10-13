from django.urls import path
from base.views import expediente_views as views

urlpatterns = [

    path('', views.getExpedientes, name="expedientes"),
    path('create/', views.createExpediente, name="expediente-create"),
    path('<str:pk>/', views.getExpediente, name="expediente"),

    path('<str:pk>/entradas/', views.createExpedienteEntrada, name="create-entrada"),

    path('update/<str:pk>/', views.updateExpediente, name="expediente-update"),
    path('delete/<str:pk>/', views.deleteExpediente, name="expediente-delete"),

]
