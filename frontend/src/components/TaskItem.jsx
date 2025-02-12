import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/taskSlice';

const TaskItem = ({ task }) => {
    const darkMode = useSelector(state => state.tasks.darkMode);
    const dispatch = useDispatch(); 

    const handleDelete = () => {
        dispatch(deleteTask(task._id)); 
    };

    const sendReminder = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/tasks/${task._id}/remind`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert('Reminder email sent!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Card className={`mb-2 ${darkMode ? 'bg-dark text-white' : ''}`}>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Button variant="primary" onClick={sendReminder}>Remind Me</Button>
                <Button variant="danger" className="ms-2" onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
};

export default TaskItem;
