import React, { useState } from 'react';

import { createTask } from '../../localStorage/task';

const AddTask = ({ toggleModal }) => {
    const [ task, setTask ] = useState({
        title: '',
        description: '',
        tag: ''
    });

    const handleChange = (event) => {
        setTask(previousTask => ({
            ...previousTask,
            [ event.target.id ]: event.target.value
        }));
    }

    const selectTag = (event) => {
        setTask(previousTask => ({
            ...previousTask,
            tag: event.target.id
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        createTask(task);
        setTask({
            title: '',
            description: '',
            tag: ''
        });
        toggleModal();
    }

    return (
        <React.Fragment>
            <h2 className="text-3 mb-1">
                create task
            </h2>

            <form
                onSubmit={ handleSubmit }
                className="flex flex-direction-column">
                <label
                    htmlFor="title"
                    className="text-2 mb-1">
                    title
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="title"
                    className="mb-1"
                    onChange={ handleChange }
                    value={ task.title }
                    id="title" />
                <label
                    htmlFor="description"
                    className="text-2 mb-1">
                    description
                </label>                        
                <textarea
                    className="mb-1"
                    onChange={ handleChange }
                    value={ task.description }
                    id="description"
                    rows="5"></textarea>

                <div className="text-2 mb-1">
                    tags
                </div>
                <div className="flex flex-wrap mb-5">
                    <input
                        type="radio"
                        name="tags"
                        className="d-none"
                        checked={ task.tag === "chill" }
                        onChange={ selectTag }
                        id="chill" />
                    <label
                        htmlFor="chill"
                        className="flex justify-content-center align-items-center mr-1 tag background-color-blue rounded cursor-pointer">
                        chill
                    </label>

                    <input
                        type="radio"
                        name="tags"
                        className="d-none"
                        checked={ task.tag === "urgent" }
                        onChange={ selectTag }
                        id="urgent" />
                    <label
                        htmlFor="urgent"
                        className="flex justify-content-center align-items-center tag background-color-red rounded cursor-pointer">
                        urgent
                    </label>
                </div>

                <div className="flex justify-content-between">
                    <button
                        type="button"
                        onClick={ toggleModal }
                        className="button background-color-pink">cancel</button>
                    <button className="button background-color-green">create</button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default AddTask;