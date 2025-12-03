import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import TaskItem from './TaskItem.jsx';
import Loader from '../common/Loader.jsx';
import { truncateText, formatDate } from "../utils/helpers.js";


const TaskList = ({ tasks, onEdit, onDelete, loading }) => {
  if (loading) {
    return <Loader message="Loading tasks..." />;
  }

  if (tasks.length === 0) {
    return (
      <Card className="shadow-sm text-center py-5">
        <Card.Body>
          <h5 className="text-muted">No tasks found</h5>
          <p className="text-muted mb-0">Create your first task to get started!</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white">
        <h5 className="mb-0">Your Tasks</h5>
      </Card.Header>
      <ListGroup variant="flush">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ListGroup>
    </Card>
  );
};

export default TaskList;