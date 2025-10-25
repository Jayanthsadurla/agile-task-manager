import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import TaskCard from './TaskCard';
import CreateTask from './CreateTask';

function SprintBoard() {
    const [board, setBoard] = useState({
        todo: [],
        inprogress: [],
        review: [],
        done: []
    });
    const [sprintInfo, setSprintInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadBoard();
    }, []);

    const loadBoard = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.getSprintBoard(1);
            setBoard(response.data.board);
            setSprintInfo(response.data.sprint_info);
            setLoading(false);
        } catch (error) {
            console.error('Error loading board:', error);
            setError('Failed to load board. Make sure backend is running on port 8000.');
            setLoading(false);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.updateTaskStatus(taskId, newStatus);
            loadBoard();
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task status');
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            await api.createTask(taskData);
            setShowCreateTask(false);
            loadBoard();
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task');
        }
    };

    const columns = [
        { key: 'todo', title: '📋 To Do', color: '#f0f0f0' },
        { key: 'inprogress', title: '🔄 In Progress', color: '#fff4e6' },
        { key: 'review', title: '👀 In Review', color: '#e6f7ff' },
        { key: 'done', title: '✅ Done', color: '#f6ffed' }
    ];

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '20px',
                color: '#666'
            }}>
                Loading sprint board...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                padding: '20px'
            }}>
                <h2 style={{ color: '#f44336' }}>⚠️ Error</h2>
                <p style={{ color: '#666' }}>{error}</p>
                <button 
                    onClick={loadBoard}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#fafafa', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div>
                    <h1 style={{ margin: '0 0 8px 0', color: '#333' }}>
                        🎯 {sprintInfo?.name || 'Sprint Board'}
                    </h1>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                        {sprintInfo?.goal || 'Agile Task Management'}
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateTask(true)}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    + New Task
                </button>
            </div>

            {/* Kanban Board */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px'
            }}>
                {columns.map(column => (
                    <div key={column.key} style={{
                        backgroundColor: column.color,
                        padding: '15px',
                        borderRadius: '8px',
                        minHeight: '500px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '15px'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                                {column.title}
                            </h3>
                            <span style={{
                                backgroundColor: 'white',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: '#666'
                            }}>
                                {board[column.key]?.length || 0}
                            </span>
                        </div>
                        
                        <div>
                            {board[column.key]?.length > 0 ? (
                                board[column.key].map(task => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '20px',
                                    color: '#999',
                                    fontSize: '14px'
                                }}>
                                    No tasks
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Task Modal */}
            {showCreateTask && (
                <CreateTask
                    sprintId={1}
                    onTaskCreated={handleCreateTask}
                    onClose={() => setShowCreateTask(false)}
                />
            )}
        </div>
    );
}

export default SprintBoard;