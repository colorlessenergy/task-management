import Image from 'next/image';


import logo from '../../public/logo.png';

const Nav = () => {
    return (
        <nav className="flex justify-content-between mt-1 mx-1">
            <Image
                src={ logo }
                alt="logo" />

            <button className="square flex justify-content-center align-items-center">
                +
            </button>
        </nav>
    );
}

export default Nav;