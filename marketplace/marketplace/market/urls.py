from django.urls import path
from . import views

urlpatterns = [
    path('imageobject/add/', views.SetImageObjectView.as_view(), name='Product addition'),
    path('imageobject/<int:pk>/', views.ShowImageObjectView.as_view()),
    path('images-catalog/', views.ShowImageCatalogView.as_view()),
    path('imageobject/<int:pk>/deal/', views.DealView.as_view()),
    # transactions
    path('user-transactions/<int:pk>/', views.UserTransactionsView.as_view()),
]