from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework import filters

from api.models import PizzaModel
from api.serializers import PizzaSerializer


class PizzaAPIView(ListAPIView):
    queryset = PizzaModel.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', 'title', 'price', 'category', 'rating']
    ordering_fields = ['id', 'title', 'price', 'category', 'rating']
    serializer_class = PizzaSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if not pk:
            search_query = self.request.query_params.get('search')
            queryset = PizzaModel.objects.all()
            if search_query:
                queryset = queryset.filter(title__iregex=search_query)

            return queryset
        return PizzaModel.objects.filter(id=pk)
