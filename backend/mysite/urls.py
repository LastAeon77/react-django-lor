"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from users import views as user_views
from django.contrib.auth import views as auth_views

# Includes the basic url patterns not closely related to our database
urlpatterns = [
    path("", views.HomePage, name="HomePage"),
    path("lor/", include("LoR.urls"), name="LibraryOfRuina"),
    path("admin/", admin.site.urls),
    path("users/", views.UserList.as_view()),
    path("users/<int:pk>/", views.UserDetail.as_view()),
    # path("register/", user_views.register, name="register"),
    # path("test", views.TestBase, name="BaseTestPage"),
    # path("About", views.AboutAndCredits, name="About"),
    # path(
    #     "login/",
    #     auth_views.LoginView.as_view(template_name="users/login.html"),
    #     name="login",
    # ),
    # path(
    #     "logout/",
    #     auth_views.LogoutView.as_view(template_name="users/logout.html"),
    #     name="logout",
    # ),
    # path("profile/", user_views.profile, name="profile"),
]
