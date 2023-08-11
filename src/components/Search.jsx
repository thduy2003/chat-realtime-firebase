import React from 'react'

const Search = () => {
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type="text" placeholder='Find a user' />
            </div>
            <div className='userChat'>
                <img src="https://images.pexels.com/photos/17772401/pexels-photo-17772401/free-photo-of-light-fashion-people-woman.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />
                <div className='userChatInfo'>
                    <span>Jane</span>
                    <p>Hello</p>
                </div>

            </div>
        </div>
    )
}

export default Search
