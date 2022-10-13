# Generated by Django 4.0.6 on 2022-10-12 01:16

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0009_alter_expediente_dateend_alter_expediente_datestart'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Comment',
            new_name='Entrada',
        ),
        migrations.AlterField(
            model_name='expediente',
            name='dateEnd',
            field=models.DateField(default='11-10-2022'),
        ),
        migrations.AlterField(
            model_name='expediente',
            name='dateStart',
            field=models.DateField(default='11-10-2022'),
        ),
    ]