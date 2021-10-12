import Image from 'next/image';


import logo from '../../public/logo.png';

const Nav = ({ toggleAddTaskModal }) => {
    return (
        <nav className="flex justify-content-between">
            <Image
                src={ logo }
                alt="logo" />

            <button
                onClick={ toggleAddTaskModal }
                className="square background-color-green flex justify-content-center align-items-center">
                +
            </button>
        </nav>
    );
}

export default Nav;