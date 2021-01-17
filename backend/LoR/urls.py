from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# app_name allows for easier calling of url in html
app_name = "lor"
# these are the url patterns for each page of the website
urlpatterns = [
    path("", views.HomePage, name="Home"),
    path("api/deck/", views.DeckList.as_view(), name="DeckListAPIView"),
    path("api/deck/<int:pk>", views.DeckSingle.as_view(), name="DeckAPIView"),
    path("api/card/", views.CardList.as_view(), name="CardListAPIView"),
    path("api/card/<int:pk>", views.CardSingle.as_view(), name="CardAPIView"),
    path("api/abno/", views.AbnoList.as_view(), name="AbnoAPIView"),
    path("api/office/", views.OfficeList.as_view(), name="OfficeListAPIView"),
    # path("users/", views.UserList.as_view()),
    # path("users/<int:pk>/", views.UserDetail.as_view()),
] + staticfiles_urlpatterns()
