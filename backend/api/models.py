from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class PizzaModel(models.Model):
    category_choices = [
        (1, 'Мясная'),
        (2, 'Вегетарианская'),
        (3, 'Гриль'),
        (4, 'Острая'),
        (5, 'Грибная'),
    ]

    id = models.IntegerField(verbose_name='ID', primary_key=True, unique=True)
    title = models.CharField(max_length=124, verbose_name='Название')
    image = models.URLField(max_length=512, verbose_name='Ссылка на фотографию')
    types = models.ManyToManyField('PizzaType', verbose_name='Типы')
    sizes = models.ManyToManyField('PizzaSize', verbose_name='Размеры')
    price = models.IntegerField(null=False, verbose_name='Цена')
    category = models.IntegerField(choices=category_choices, verbose_name='Категория')
    rating = models.IntegerField(
        default=1,
        validators=[
            MaxValueValidator(10),
            MinValueValidator(1)
        ],
        verbose_name='Рейтинг')

    def __str__(self):
        return f'{self.id} - {self.title}'

    class Meta:
        verbose_name = 'Пицца'
        verbose_name_plural = 'Пиццы'


class PizzaType(models.Model):
    type_id = models.PositiveSmallIntegerField(choices=[(0, "0"), (1, "1")], default=0, unique=True,
                                               verbose_name='ID типа')
    name = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.type_id} - {self.name}'

    class Meta:
        verbose_name = 'Тип пиццы'
        verbose_name_plural = 'Типы пицц'


class PizzaSize(models.Model):
    size = models.IntegerField(default=26, verbose_name='Размер')

    def __str__(self):
        return f'{self.size} см.'

    class Meta:
        verbose_name = 'Размер'
        verbose_name_plural = 'Размер пицц'
