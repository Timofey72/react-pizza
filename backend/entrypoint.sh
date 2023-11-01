#!/bin/sh

python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py loaddata pizzaData.json

gunicorn backend.wsgi:application --bind 0.0.0.0:8000