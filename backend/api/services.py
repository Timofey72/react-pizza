from django.db.models import QuerySet
from api.models import PizzaModel


def filtering_queryset_by_search(search: str) -> QuerySet:
    queryset = PizzaModel.objects.all()
    if search:
        queryset = queryset.filter(title__iregex=search)

    return queryset


def get_queryset_by_page(current_page: int | None, page_size: int,
                         queryset: QuerySet) -> QuerySet:
    if current_page is not None:
        try:
            page = int(current_page)
        except ValueError:
            page = 1

        start_index = (page - 1) * page_size
        end_index = page * page_size

        return queryset[start_index:end_index]
    return queryset[0:page_size]


def get_count_of_pages(queryset: QuerySet, page_size: int) -> int:
    count_items = queryset.count()
    if count_items == 0 or page_size == 0:
        return 0
    return (count_items + page_size - 1) // page_size
