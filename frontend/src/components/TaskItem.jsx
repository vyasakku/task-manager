import React from 'react';
import { Card, Button } from 'react-bootstrap';

const TaskItem = ({ task }) => {
    return (
        <Card className="mb-2">
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