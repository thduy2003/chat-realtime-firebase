import React, { useContext, useState } from 'react'
import Attach from '../img/attack.png'
import Img from '../img/image.png'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
const Input = () => {
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());


            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                img: downloadURL,
                                senderId: currentUser.uid,
                                date: Timestamp.now()
                            })
                        })

                    } catch (err) {
                        console.log(err);

                    }
                });
            });

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        setText("")
        setImg(null)
    }
    return (
        <div className='input'>
            <input type='text' value={text} placeholder='Type something...' onChange={e => setText(e.target.value)} />
            <div className='send'>
                <img src={Attach} alt='' />
                <input type='file' style={{ display: 'none' }} id='file' onChange={e => setImg(e.target.files[0])} />
                <label for='file'>
                    <img src={Img} alt='' />
                </label>
                <button onClick={handleSend} >Send</button>
            </div>

        </div>
    )
}

export default Input
