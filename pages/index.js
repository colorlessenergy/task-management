import { useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal/Modal';

export default function Home () {
    const [ isAddTaskOpen, setIsAddTaskOpen ] = useState(true);

    const toggleAddTaskModal = () => {
        setIsAddTaskOpen(previousIsAddTaskOpen => !previousIsAddTaskOpen);
    }

    return (
        <div>
            <Head>
                <title>task management</title>
                <meta name="description" content="task management" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Nav toggleAddTaskModal={ toggleAddTaskModal } />

                <Modal isOpen={ isAddTaskOpen } toggleModal={ toggleAddTaskModal }>
                    <h2 className="text-3 mb-1">
                        create task
                    </h2>

                    <form className="flex flex-direction-column">
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
                            id="title" />
                        <label
                            htmlFor="description"
                            className="text-2 mb-1">
                            description
                        </label>                        
                        <textarea
                            className="mb-1"
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
                                className="button background-color-pink">cancel</button>
                            <button className="button background-color-green">create</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
