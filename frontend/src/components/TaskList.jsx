import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
    return (
        <div>
            {tasks.length === 0 ? <p>No tasks available.</p> : tasks.map(task => <TaskItem key={task._id} task={task} />)}
        </div>
    );
};

export default TaskList;
