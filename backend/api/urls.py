from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import *
urlpatterns = [
    path('user/register/', register, name='register'),
    path('user/profile/', user_profile, name='profile'),
    path('user/', view_all_user, name='profile'),
    path('user/<int:pk>', user_detail, name='profile'),
    path('event/', get_events, name='event-list-create'),
    path('event/<int:pk>/', event_detail, name='event-detail'),
    path('event/<int:event_id>/participate/', participate_event, name='participate-event'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
