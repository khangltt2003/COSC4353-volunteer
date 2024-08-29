from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("users/", get_users, name="get_users"),
    path("users/create/", create_user, name="create_user"),
    path("users/<int:pk>", user_detail, name="user_detail"),
    path("user/register/", register, name="register"),
    
    #path to get access token and refresh token, require username and password
    path("token/", TokenObtainPairView.as_view(), name= "get_token"),
    
    #paht to get access token, require refresh token
    path("token/refresh", TokenRefreshView.as_view(), name = "refresh"),
    path("api-auth/", include("rest_framework.urls"))
]

    #path to register
    