from pyexpat import model
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.


class Expediente(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    asignTo = models.CharField(max_length=200, null=True, blank=True)
    contratist = models.CharField(max_length=200, null=True, blank=True)
    stage = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=200, null=True, blank=True)
    dateStart = models.DateField(default=datetime.today().strftime('%d-%m-%Y'))
    dateEnd = models.DateField(default=datetime.today().strftime('%d-%m-%Y'))
    description = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
