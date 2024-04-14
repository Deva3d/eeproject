from django.shortcuts import render
from django.http import JsonResponse
from .models import Room, Person
import random
# Create your views here.
def index(request):
        return render(request,'index.html')
def create(request):
        return render(request,'create.html')
def join(request):
        return render(request,'join.html')
def vote(request):
        return render(request,'vote.html')
def create_room(request):
    room_code = random.randint(100000, 999999)
    room = Room.objects.create(room_code=room_code)
    return JsonResponse({'room_code': room_code})

def check_room(request):
    room_code = request.POST.get('room_code')
    room_exists = Room.objects.filter(room_code=room_code).exists()
    return JsonResponse({'exists': room_exists})