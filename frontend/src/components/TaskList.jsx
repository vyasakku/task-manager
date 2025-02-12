import React from 'react';
import TaskItem from './TaskItem';
import { useSelector } from 'react-redux';

const TaskList = ({ tasks }) => {
    const darkMode = useSelector(state => state.tasks.darkMode);
    
    return (
        <div className={darkMode ? "dark-mode" : ""}>
            {tasks.length === 0 ? <p>No tasks available.</p> : tasks.map(task => <TaskItem key={task._id} task={task} />)}
        </div>
    );
};

export default TaskList;
