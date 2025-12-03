import React from 'react';
import { ListGroup, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h6 className="mb-0">{task.title}</h6>
            <Badge bg={getStatusVariant(task.status)}>
              {task.status.replace('_', ' ')}
            </Badge>
            <Badge bg={getPriorityVariant(task.priority)}>
              {task.priority}
            </Badge>
          </div>
          
          {task.description && (
            <p className="text-muted mb-2 small">{task.description}</p>
          )}
          
          {task.due_date && (
            <div className="text-muted small">
              <FiCalendar className="me-1" />
              Due: {formatDate(task.due_date)}
            </div>
          )}
        </div>
        
        <ButtonGroup size="sm">
          <Button
            variant="outline-primary"
            onClick={() => onEdit(task)}
          >
            <FiEdit2 />
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => onDelete(task.id)}
          >
            <FiTrash2 />
          </Button>
        </ButtonGroup>
      </div>
    </ListGroup.Item>
  );
};

export default TaskItem;