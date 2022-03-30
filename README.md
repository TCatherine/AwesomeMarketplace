
# AwesomeWebMarketplace

## Getting started with Docker

### Install docker (Windows/Linux)

https://www.docker.com/products/docker-desktop/

On Windows docker works under wsl (recommended) or hyper-v (both built-in Windows 10). You can change it in the settings of Docker desktop.

\*Install docker-compose additionally if not installed automatically  (for Linux, for windows installed automatically with Docker desktop application)

### Run containers

To build containers execute next commands from root project folder (where docker-compose.yml places):

```commandline
docker-compose build
```

To run after building (-d (detached) option let you run without output - not recommended, cause you migth see some outputs and errors if occures).

```commandline
docker-compose up [-d]
```

Image takes about 10-30 seconds to run and then you can interact with server functionality. \\

You also can run in detached mode and check outputs if errors occures with below:

```commandline
docker-compose logs [-f]
```

To shutdown containers:

```commandline
docker-compose down
```


## Getting started manually (DEPRECATED)

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