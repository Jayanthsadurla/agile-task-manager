from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Sprint, Task
from .serializers import SprintSerializer, TaskSerializer


class SprintViewSet(viewsets.ModelViewSet):
    """API endpoint for Sprint management"""
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer
    
    @action(detail=True, methods=['get'])
    def board(self, request, pk=None):
        """Get sprint board organized by status"""
        sprint = self.get_object()
        tasks = Task.objects.filter(sprint=sprint)
        
        board_data = {
            'sprint_info': {
                'id': sprint.id,
                'name': sprint.name,
                'goal': sprint.goal,
            },
            'board': {
                'todo': TaskSerializer(tasks.filter(status='todo'), many=True).data,
                'inprogress': TaskSerializer(tasks.filter(status='inprogress'), many=True).data,
                'review': TaskSerializer(tasks.filter(status='review'), many=True).data,
                'done': TaskSerializer(tasks.filter(status='done'), many=True).data,
            }
        }
        return Response(board_data)


class TaskViewSet(viewsets.ModelViewSet):
    """API endpoint for Task management"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Update only task status"""
        task = self.get_object()
        new_status = request.data.get('status')
        
        valid_statuses = ['todo', 'inprogress', 'review', 'done']
        if new_status not in valid_statuses:
            return Response(
                {'error': f'Invalid status. Must be one of: {valid_statuses}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        task.status = new_status
        task.save()
        
        return Response(TaskSerializer(task).data)