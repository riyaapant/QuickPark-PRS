# Generated by Django 5.0.6 on 2024-07-03 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0005_remove_owner_home_paper_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='vehicle_id',
            field=models.CharField(max_length=7, null=True, unique=True),
        ),
    ]