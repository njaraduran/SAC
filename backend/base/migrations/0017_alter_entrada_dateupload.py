# Generated by Django 4.0.6 on 2022-10-13 04:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_alter_entrada_dateupload'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entrada',
            name='dateUpload',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 10, 13, 1, 2, 35, 232399), null=True),
        ),
    ]