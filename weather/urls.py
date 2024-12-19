from django.urls import path
from .views import index, get_weather, get_weather_weekly

urlpatterns = [
    path('', index, name='index'),  
    path('get_weather/', get_weather, name='get_weather'),  
    path('get_weather_weekly/', get_weather_weekly, name='get_weather_weekly'),  
]
