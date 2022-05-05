
# AwesomeWebMarketplace

## Getting started with Docker

### Install docker (Windows/Linux)

https://www.docker.com/products/docker-desktop/

On Windows docker works under wsl (recommended) or hyper-v (both built-in Windows 10). You can change it in the settings of Docker desktop.

\*Install docker-compose additionally if not installed automatically  (for Linux, for windows installed automatically with Docker desktop application)

### Run containers

***
**NOTE**
Please, use now latest docker-compose files with nginx. To do that you should pass option to docker-compose command to specify filename of .yml file.

- docker-compose-nossl.yml - latest nginx-integrated docker without HTTPS
- docker-compose-ssl.yml - latest nginx-integrated docker with HTTPS ONLY

To specify filename pass `-f docker-compose-filename.yml` flag to docker-compose command.
For example: 

```commandline
docker-compose -f docker-compose-filename.yml up -d
docker-compose -f docker-compose-filename.yml logs -f
docker-compose -f docker-compose-filename.yml down
```

You also should prepare your machine to use this dockers (admin/root required):
- Windows: To C:\Windows\System32\drivers\etc\hosts add string
    `192.168.30.136 awesomewebmarketplace.ru`, where replace 192.168.30.136 to your server address, for example to `localhost`
- Linux: To /etc/hosts add equivalent string.

You should not connect to http/https nginx docker over ip.
I guess that android emulator will resolve domain names over windows host and I don't think there will be any problem. But if any problem occures old docker file is works, but deprecated.
In future you can change IP in hosts file to our YA Cloud server IP and use all as before.
If you server deployed on different machine from host, then you should add on your server machine string `127.0.0.1 awesomewebmarketplace.ru` in hosts file.
***

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

Or together:

```commandline
docker-compose up -d && docker-compose logs -f
```

Then you need to shutdown containers:

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