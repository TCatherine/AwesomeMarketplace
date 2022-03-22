from django.http import HttpResponse


# Create your views here.

# TODO: implement page views

# Example index page
def index(request):
    return HttpResponse("Market index page!")
