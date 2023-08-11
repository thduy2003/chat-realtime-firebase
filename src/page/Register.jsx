import React, { useState } from 'react';
import Add from '../img/addAvatar.jpg'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)



            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on(
                (error) => {
                    setErr(true)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        //cập nhật vô user đăng kí
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })
                        //lưu vô database
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "userChats", res.user.uid), {})
                        navigate('/')
                    });
                }
            );
        } catch (error) {
            setErr(true)
        }

    }
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Luma Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='display name' />
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />
                    <input type='file' id='file' style={{ display: 'none' }} />
                    <label for="file">
                        <img src={Add} alt='' />
                        <span>Add an avatar</span>
                    </label>
                    <button >Sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    );
};

export default Register;