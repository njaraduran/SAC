# Generated by Django 4.0.6 on 2022-10-13 04:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_alter_entrada_dateupload'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entrada',
            name='dateUpload',
            field=models.DateField(blank=True, default='2022-10-13 01:25', null=True),
        ),
    ]