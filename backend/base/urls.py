from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('expedientes/', views.getExpedientes, name="expedientes"),
    path('expedientes/<str:pk>', views.getExpediente, name="expediente"),

]
