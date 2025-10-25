from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SprintViewSet, TaskViewSet

router = DefaultRouter()
router.register(r'sprints', SprintViewSet, basename='sprint')
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
]