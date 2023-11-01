from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from api.models import PizzaModel


class PizzaSerializer(ModelSerializer):
    sizes = serializers.SerializerMethodField()
    types = serializers.SerializerMethodField()

    class Meta:
        model = PizzaModel
        fields = '__all__'

    def get_sizes(self, obj):
        size_ids = obj.sizes.all().values_list('size', flat=True)
        return list(size_ids)

    def get_types(self, obj):
        type_ids = obj.types.all().values_list('type_id', flat=True)
        return list(type_ids)
