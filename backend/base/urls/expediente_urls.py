from django.urls import path
from base.views import expediente_views as views

urlpatterns = [

    path('', views.getExpedientes, name="expedientes"),
    path('<str:pk>/', views.getExpediente, name="expediente"),

]
