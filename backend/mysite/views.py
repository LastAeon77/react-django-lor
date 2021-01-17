from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from mysite.serializers import UserSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def HomePage(request):
    return render(request, "home/homePage.html")


def TestBase(request):
    return render(request, "home/NavBarBase.html")


def AboutAndCredits(request):
    return render(request, "home/AboutAndCredits.html")
