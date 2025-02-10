import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from './components/TaskList';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, toggleDarkMode } from './redux/taskSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const dispatch = useDispatch();
    const { tasks, darkMode } = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <DndProvider backend={HTML5Backend}>
            <Container className={darkMode ? 'bg-dark text-white p-4' : 'bg-light p-4'}>
                <Button variant={darkMode ? 'light' : 'dark'} onClick={() => dispatch(toggleDarkMode())} className="mb-3">
                    Toggle Dark Mode
                </Button>
                <TaskList tasks={tasks} />
            </Container>
        </DndProvider>
    );
};

export default App;
