from rest_framework import serializers
from .models import Sprint, Task


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task model"""
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'story_points', 
                  'assignee', 'sprint', 'created_at']
        read_only_fields = ['id', 'created_at']


class SprintSerializer(serializers.ModelSerializer):
    """Serializer for Sprint model with task statistics"""
    tasks = TaskSerializer(many=True, read_only=True)
    task_count = serializers.SerializerMethodField()
    completed_tasks = serializers.SerializerMethodField()
    completion_percentage = serializers.SerializerMethodField()
    
    class Meta:
        model = Sprint
        fields = ['id', 'name', 'goal', 'start_date', 'end_date', 'status', 
                  'created_at', 'tasks', 'task_count', 'completed_tasks', 
                  'completion_percentage']
        read_only_fields = ['id', 'created_at']
    
    def get_task_count(self, obj):
        """Get total number of tasks in sprint"""
        return obj.tasks.count()
    
    def get_completed_tasks(self, obj):
        """Get number of completed tasks"""
        return obj.tasks.filter(status='done').count()
    
    def get_completion_percentage(self, obj):
        """Calculate sprint completion percentage"""
        total = obj.tasks.count()
        if total == 0:
            return 0
        completed = obj.tasks.filter(status='done').count()
        return round((completed / total) * 100, 2)