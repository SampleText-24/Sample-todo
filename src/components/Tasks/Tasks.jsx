import React from 'react';
import penSvg from '../../assets/img/pen.svg'
import axios from "axios";
import AddTaskForm from "./AddTaskForm/AddTaskForm";
import {Link} from "react-router-dom";

import './Tasks.scss'
import TasksItem from "./TasksItem/TasksItem";

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onCompleteTask, withoutEmpty }) => {

    const editTitle = () => {
        const newTitle = window.prompt('Enter new title', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)

            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Failed to update list title')
            })

        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className="tasks__title">
                    {list.name}
                    <img onClick={editTitle} src={penSvg} alt="Edit button"/>
                </h2>
            </Link>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>No tasks</h2>}
                { list.tasks &&
                    list.tasks.map(task => (
                        <TasksItem
                            key={ task.id }
                            list={list}
                            onRemove={onRemoveTask}
                            onComplete={onCompleteTask}
                            { ...task }
                        />
                    ))
                }
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
            </div>
        </div>
    );
};

export default Tasks;
