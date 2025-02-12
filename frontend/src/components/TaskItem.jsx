import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TaskItem = ({ task }) => {
    const darkMode = useSelector(state => state.tasks.darkMode);
    return (
        <Card className={`mb-2 ${darkMode ? 'bg-dark text-white' : ''}`}>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Button variant="success">Complete</Button>
                <Button variant="danger" className="ms-2">Delete</Button>
            </Card.Body>
        </Card>
    );
};

export default TaskItem;
