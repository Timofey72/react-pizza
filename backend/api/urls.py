from django.urls import path

from . import views

urlpatterns = [
    path('api/v1/pizzas', views.PizzaAPIView.as_view(), name='pizzas'),
    path('api/v1/pizzas/<int:pk>', views.PizzaAPIView.as_view(), name='single-pizza')
]
