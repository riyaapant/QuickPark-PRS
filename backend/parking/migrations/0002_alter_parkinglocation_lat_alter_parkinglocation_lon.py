# Generated by Django 5.0.6 on 2024-05-29 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parkinglocation',
            name='lat',
            field=models.DecimalField(decimal_places=7, max_digits=9),
        ),
        migrations.AlterField(
            model_name='parkinglocation',
            name='lon',
            field=models.DecimalField(decimal_places=7, max_digits=9),
        ),
    ]