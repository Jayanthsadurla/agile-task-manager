import React from 'react';

function TaskCard({ task, onStatusChange }) {
    const statusColors = {
        'todo': '#f0f0f0',
        'inprogress': '#fff4e6',
        'review': '#e6f7ff',
        'done': '#f6ffed'
    };

    const handleMoveTask = (newStatus) => {
        if (window.confirm(`Move task to ${newStatus}?`)) {
            onStatusChange(task.id, newStatus);
        }
    };

    return (
        <div style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '8px'
            }}>
                <h4 style={{ 
                    margin: 0, 
                    fontSize: '16px',
                    color: '#333',
                    flex: 1
                }}>
                    {task.title}
                </h4>
                <span style={{
                    backgroundColor: statusColors[task.status],
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#666',
                    marginLeft: '8px'
                }}>
                    {task.status.toUpperCase()}
                </span>
            </div>
            
            <p style={{ 
                margin: '8px 0',
                fontSize: '14px',
                color: '#666',
                lineHeight: '1.4'
            }}>
                {task.description}
            </p>
            
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
                paddingTop: '8px',
                borderTop: '1px solid #eee'
            }}>
                <div style={{ fontSize: '12px', color: '#888' }}>
                    <span style={{ marginRight: '12px' }}>
                        📊 {task.story_points} pts
                    </span>
                    <span>
                        👤 {task.assignee || 'Unassigned'}
                    </span>
                </div>
                
                {/* Quick status change buttons */}
                <div style={{ display: 'flex', gap: '4px' }}>
                    {task.status !== 'todo' && (
                        <button 
                            onClick={() => handleMoveTask('todo')}
                            style={{
                                padding: '4px 8px',
                                fontSize: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                backgroundColor: '#f0f0f0',
                                cursor: 'pointer'
                            }}
                        >
                            ← To Do
                        </button>
                    )}
                    {task.status !== 'done' && (
                        <button 
                            onClick={() => handleMoveTask(
                                task.status === 'todo' ? 'inprogress' : 
                                task.status === 'inprogress' ? 'review' : 'done'
                            )}
                            style={{
                                padding: '4px 8px',
                                fontSize: '10px',
                                border: '1px solid #4CAF50',
                                borderRadius: '4px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskCard;