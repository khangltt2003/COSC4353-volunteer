from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import *
urlpatterns = [
    path('user/register/', register, name='register'),
    path('user/profile/', user_profile, name='profile'),
    path('user/', view_all_user, name='profile'),
    path('skill/', view_all_skill, name='skill'),
    path('user/<int:user_id>', user_detail, name='view_profile'),
    path('event/create/', create_event, name='create_event'),
    path('event/', get_events, name='view_events'),
    path('event/<int:event_id>/', event_detail, name='event_detail'),
    path('event/<int:event_id>/join/', join_event, name='join_event'),
    path('event/<int:event_id>/apply/', apply_event, name='apply_event'),
    path('event/<int:event_id>/leave/', leave_event, name='leave_event'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
