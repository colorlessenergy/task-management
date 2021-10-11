import { useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal/Modal';
import AddTask from '../shared/components/AddTask/AddTask';

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
                    <AddTask toggleModal={ toggleAddTaskModal } />
                </Modal>
            </div>
        </div>
    );
}
