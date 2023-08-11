import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar'>
            <span className='logo'>Lama Chat</span>
            <div className='user'>
                <img src="https://images.pexels.com/photos/17772401/pexels-photo-17772401/free-photo-of-light-fashion-people-woman.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />
                <span>John</span>
                <button>logout</button>
            </div>
        </div>
    )
}

export default Navbar
