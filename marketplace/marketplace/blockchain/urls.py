from django.urls import path

# TEST URLS
from . import views

urlpatterns = [
    # for manual testing of working blockchain via test view and test post request
    path('test/', views.Test.as_view(), name='test view'),
    path('get-chain/', views.GetChainView.as_view(), name='get block chain view'),
]