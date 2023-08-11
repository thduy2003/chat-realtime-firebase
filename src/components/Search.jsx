import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Search = () => {
    const [username, setUsername] = useState()
    const [user, setUser] = useState()
    const [err, setErr] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const handleChange = async () => {
        const citiesRef = collection(db, "users");

        // Create a query against the collection.
        const q = query(citiesRef, where("displayName", "==", username));
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (error) {
            setErr(true)
        }
    }
    const handleKey = (e) => {
        e.code === 'Enter' && handleChange()
    }
    const handleSelect = async () => {
        //check whether the group (chats in firestore) exists, if not create

        const combinbedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, "chats", combinbedId))
            if (!res.exists()) {
                //create a chat in chats collection 
                await setDoc(doc(db, "chats", combinbedId), { messages: [] })
                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinbedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinbedId + '.date']: serverTimestamp()
                })
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinbedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinbedId + '.date']: serverTimestamp()
                })
            }

        } catch (error) {

        }
        setUser(null)
        setUsername("")

    }
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type="text" placeholder='Find a user' value={username} onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} />
            </div>
            {err && <span> User not found</span>}
            {user && <div className='userChat' onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className='userChatInfo'>
                    <span>{user.displayName}</span>
                    <p>Hello</p>
                </div>

            </div>}
        </div>
    )
}

export default Search
