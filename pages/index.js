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

                <Modal isOpen={ isAddTaskModalOpen } toggleModal={ toggleAddTaskModal }>
                    <AddTask toggleModal={ toggleAddTaskModal } />
                </Modal>
            </div>
        </div>
    );
}
