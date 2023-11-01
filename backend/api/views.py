from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from api.models import PizzaModel
from api.serializers import PizzaSerializer
from api.services import filtering_queryset_by_search, get_queryset_by_page, get_count_of_pages


class PizzaAPIView(ListAPIView):
    queryset = PizzaModel.objects.all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', 'title', 'price', 'category', 'rating']
    ordering_fields = ['id', 'title', 'price', 'category', 'rating']
    page_size = 8

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if not pk:
            search_query = self.request.query_params.get('search')
            return filtering_queryset_by_search(search_query)

        return PizzaModel.objects.filter(id=pk)

    def list(self, request, *args, **kwargs):
        page = request.query_params.get('page')
        queryset = self.filter_queryset(self.get_queryset())

        paginated_queryset = get_queryset_by_page(current_page=page, page_size=self.page_size, queryset=queryset)

        serializer = PizzaSerializer(paginated_queryset, many=True)
        data = {'pizzas': serializer.data}
        if not self.kwargs.get('pk'):
            data['count_page'] = get_count_of_pages(queryset, self.page_size)

        return Response(data)
