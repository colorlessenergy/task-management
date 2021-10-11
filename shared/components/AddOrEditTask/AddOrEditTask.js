import React, { useEffect, useState } from 'react';

import { createTask, setTask as setTaskInLocalStorage } from '../../localStorage/task';

const AddOrEditTask = ({ title, submitButtonText, toggleModal, selectedTask = null }) => {
    useEffect(() => {
        if (selectedTask) {
            setTask(selectedTask)
        }
    }, []);

    const [ task, setTask ] = useState({
        title: '',
        description: '',
        tag: '',
        isDone: false
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

    const [ formValidation, setFormValidation ] = useState({
        title: '',
        description: '',
        tag: ''
    });
    const handleSubmit = (event) => {
        event.preventDefault();

        let formValidation = {};
        let isDataMissing = false;
        if (task.title === '') {
            formValidation.title = 'title is required';
            isDataMissing = true;
        } 
        if (task.description === '') {
            formValidation.description = 'description is required';
            isDataMissing = true;
        } 
        if (task.tag === '') {
            formValidation.tag = 'tag is required';
            isDataMissing = true;
        }

        if (isDataMissing) {
            return setFormValidation(formValidation);
        }

        if (submitButtonText === 'create') {
            createTask(task);
        } else if (submitButtonText === 'edit') {
            setTaskInLocalStorage(task);
        }
        setTask({
            title: '',
            description: '',
            tag: '',
            isDone: false
        });
        setFormValidation({
            title: '',
            description: '',
            tag: ''
        });
        if (submitButtonText === 'edit') {
            toggleModal(task);
        }
    }

    return (
        <React.Fragment>
            <h2 className="text-3 mb-1">
                { title } 
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
                { formValidation.title ? (
                    <div className="text-red">
                        { formValidation.title }
                    </div>
                ) : (null) }

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
                { formValidation.description ? (
                    <div className="text-red">
                        { formValidation.description }
                    </div>
                ) :(null) }

                <div className="mb-5">
                    <div className="text-2 mb-1">
                        tags
                    </div>
                    <div className="flex flex-wrap">
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

                    { formValidation.tag ? (
                        <div className="text-red">
                            { formValidation.tag }
                        </div>
                    ) :(null) }
                </div>

                <div className="flex justify-content-between">
                    <button
                        type="button"
                        onClick={ toggleModal }
                        className="button background-color-pink">cancel</button>
                    <button className="button background-color-green">{ submitButtonText }</button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default AddOrEditTask;