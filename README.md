# React Pizza

This is a pizza site. Developed with React and Django

## How to start

#### Running React

In the project directory, you can run:

```
cd frontend

npm i
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### Running Django

In the project directory, you can run:

```
cd backend

pip install -r requirements.txt

python manage.py migrate
python manage.py loaddata pizzaData.json
python manage.py runserver
```

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

#### Or use Docker

In the project directory, you can run:

```
docker-compose up --build
```

Open [http://localhost](http://localhost) to view it in your browser.
