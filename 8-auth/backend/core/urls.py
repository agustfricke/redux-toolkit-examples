# url.py
from .views import CookieTokenRefreshView, CookieTokenObtainPairView, users # Import the above views
from django.urls import path

urlpatterns = [
    path('auth/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('users/', users, name='users')
]

