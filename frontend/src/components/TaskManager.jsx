import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, deleteTask } from '../redux/taskSlice';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

const TaskManager = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector(state => state.tasks);
    const darkMode = useSelector(state => state.tasks.darkMode);
    const [taskData, setTaskData] = useState({ title: '', description: '' });

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = (e) => {
        e.preventDefault();
        dispatch(addTask(taskData));
        setTaskData({ title: '', description: '' });
    };

    return (
        <Container className={`task-manager-container ${darkMode ? "dark-mode" : ""}`}>
            <h2>Task Manager</h2>
            <Form onSubmit={handleAddTask} className="task-input">
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={taskData.title} 
                        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={2} 
                        value={taskData.description} 
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Button type="submit" className="mt-3 custom-button">Add Task</Button>
            </Form>
            {loading && <p>Loading tasks...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && tasks.length === 0 && <p>No tasks available.</p>}
            <ListGroup>
                {tasks.map(task => (
                    <ListGroup.Item 
                        key={task._id} 
                        className={`d-flex justify-content-between align-items-center ${darkMode ? "bg-dark text-white" : ""}`}
                    >
                        <div>
                            <strong>{task.title}</strong>
                            <p className="mb-0 text-muted">{task.description}</p>
                        </div>
                        <Button variant="danger" size="sm" onClick={() => dispatch(deleteTask(task._id))}>
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default TaskManager;
