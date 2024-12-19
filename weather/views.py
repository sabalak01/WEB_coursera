import requests
from django.http import JsonResponse
from django.shortcuts import render

def index(request):
    return render(request, 'weather/index.html')

def get_weather(request):
    if request.method == 'GET':
        city = request.GET.get('city', '')
        api_key = '45f9547cb056a7c417f899ed3b97de30'
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'

        try:
            response = requests.get(url)
            data = response.json()

            if response.status_code == 200:
                weather_data = {
                    'city': data['name'],
                    'temperature': data['main']['temp'],
                    'description': data['weather'][0]['description'],
                    'icon': data['weather'][0]['icon'],
                    'wind_speed': data['wind']['speed'],
                    'cloudiness': data['clouds']['all'],
                }
                return JsonResponse({'success': True, 'data': weather_data})
            else:
                return JsonResponse({'success': False, 'error': data.get('message', 'Error occurred')})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})

import requests
from django.http import JsonResponse

def get_weather_weekly(request):
    if request.method == 'GET':
        city = request.GET.get('city', '')
        api_key = '45f9547cb056a7c417f899ed3b97de30'
        url = f'http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric'

        try:
            response = requests.get(url)
            data = response.json()

            if response.status_code == 200:
                weekly_data = []
                for i in range(0, len(data['list']), 8):
                    forecast = data['list'][i]
                    weekly_data.append({
                        'date': forecast['dt_txt'].split(' ')[0],
                        'temperature': forecast['main']['temp'],
                        'description': forecast['weather'][0]['description'],
                        'icon': forecast['weather'][0]['icon'],
                        'wind_speed': forecast['wind']['speed'],
                        'cloudiness': forecast['clouds']['all'],
                    })

                return JsonResponse({'success': True, 'data': weekly_data})
            else:
                return JsonResponse({'success': False, 'error': data.get('message', 'Error occurred')})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
