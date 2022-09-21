from pyexpat import model
from unicodedata import name
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

    def __str__(self):
        return self.name


class Comment(models.Model):
    Expediente = models.ForeignKey(
        Expediente, on_delete=models.SET_NULL, null=True)
    User = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self._id)


class Document(models.Model):
    Expediente = models.ForeignKey(
        Expediente, on_delete=models.SET_NULL, null=True)
    User = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    upload_file = models.FileField()
    name = models.CharField(max_length=200, null=True, blank=True)
    dateUpload = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
