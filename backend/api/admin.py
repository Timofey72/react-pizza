from django.contrib import admin
from django.contrib.auth.models import User, Group

from .models import PizzaModel, PizzaSize


admin.site.register(PizzaModel)
admin.site.register(PizzaSize)

admin.site.unregister(User)
admin.site.unregister(Group)
