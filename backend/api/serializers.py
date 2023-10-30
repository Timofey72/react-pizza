from rest_framework.serializers import ModelSerializer

from api.models import PizzaModel


class PizzaSerializer(ModelSerializer):
    class Meta:
        model = PizzaModel
        fields = '__all__'
