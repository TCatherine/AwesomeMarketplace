# AwesomeWebMarketplace



## Getting started

First you need install python requirements for server-side project:

```commandline
pip install -r requirements.txt
```


Next you need migrate all models into current database before run server.

```commandline
python .\marketplace\manage.py makemigrations
python .\marketplace\manage.py migrate
```


Create superuser (admin) to log into admin pannel and create users and objects. Enter username and password and after running server you can log into admin pannel with this credentials.

```commandline
python .\marketplace\manage.py createsuperuser
```


To run test server write following:

```commandline
python .\marketplace\manage.py runserver
```

Next you can log into admin pannel and create objects, open [admin page](http://127.0.0.1:8000/admin/) in your browser and work on your own.


HOWTO: run celery

```commandline
celery --app blockchain worker --pool=solo
```


## Documentation

In doc folder you can find swagger api reference and postman collection file for testing existing api.