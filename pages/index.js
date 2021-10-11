import { useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal/Modal';
import AddTask from '../shared/components/AddTask/AddTask';

export default function Home () {
    const [ isAddTaskModalOpen, setIsAddTaskModalOpen ] = useState(false);
    const toggleAddTaskModal = () => {
        setIsAddTaskModalOpen(previousIsAddTaskModalOpen => !previousIsAddTaskModalOpen);
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

                <div className="text-center my-1">
                    <input
                        type="text"
                        placeholder="filter..." />
                </div>

                <div className="card flex flex-direction-column p-1 b-1-black">
                    <div className="flex justify-content-between align-items-center">
                        <div className="text-3">
                            get groceries
                        </div>

                        <div className="square background-color-black"></div>
                    </div>

                    <p className="card__text m-0 mb-auto text-2">
                        1 bread 2 bananas 5 can of beans 1 bag of oranges
                    </p>

                    <div className="flex justify-content-between align-items-center">
                        <div className="flex justify-content-center align-items-center tag background-color-red">
                            urgent
                        </div>

                        <div className="square b-1-black"></div>
                    </div>
                </div>

                <Modal isOpen={ isAddTaskModalOpen } toggleModal={ toggleAddTaskModal }>
                    <AddTask toggleModal={ toggleAddTaskModal } />
                </Modal>
            </div>
        </div>
    );
}
