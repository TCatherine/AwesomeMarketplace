from django.urls import path
from . import views

urlpatterns = [
    path('imageobject/add/', views.SetImageObjectView.as_view(), name='Product addition'),
    path('images-catalog/', views.ShowPublicImageCatalogView.as_view()),
    path('own-catalog/', views.ShowPrivateImageCatalogView.as_view()),
    path('imageobject/<int:pk>/deal/', views.DealView.as_view()),
    path('imageobject/<int:pk>/change_status/', views.ChangeStatusView.as_view()),
    path('imageobject/<int:pk>/', views.GetPublicImageUrl.as_view()),
    # transactions
    path('user-transactions/<int:pk>/', views.UserTransactionsView.as_view()),
]