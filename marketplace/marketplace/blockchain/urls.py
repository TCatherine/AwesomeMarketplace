from django.urls import path

# TEST URLS
from . import views

urlpatterns = [
    # for manual testing of working blockchain via test view and test post request
    path('deal/<int:pk>/', views.DealView.as_view(), name='do deal'),
    path('get-chain/', views.GetChainView.as_view(), name='get blockchain'),
    path('get-user-transactions/<int:pk>/', views.GetUserTransactions.as_view(), name='get user transactions'),
]