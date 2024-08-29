from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("api/user/register/", userRegistration, name="register"),
    
    #path to get access token and refresh token, require username and password
    path("api/token/", TokenObtainPairView.as_view(), name= "get_token"),
    
    #paht to get access token, require refresh token
    path("api/token/refresh", TokenRefreshView.as_view(), name = "refresh"),
    path("api-auth/", include("rest_framework.urls"))
]

    #path to register
    