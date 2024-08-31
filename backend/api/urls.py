from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import *
urlpatterns = [
    path('user/register/', register, name='register'),
    path('user/profile/', user_profile, name='profile'),
    path('events/', event_list_create, name='event-list-create'),
    path('events/<int:pk>/', event_detail, name='event-detail'),
    path('events/<int:event_id>/participate/', participate_event, name='participate-event'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
