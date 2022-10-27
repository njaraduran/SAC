from enum import unique
from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)
    cargo = models.CharField(max_length=200, null=False, blank=False)

    USERNAME_FIELD: 'email'
    # REQUIRED_FIELDS: []
