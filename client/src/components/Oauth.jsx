import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


const Oauth = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result);
            
            const { displayName, email, photoURL } = result.user;

            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }),
            });

            const data = await res.json();
            console.log(data)
            dispatch(signInSuccess(data));
       navigate('/')
        } catch (error) {
            console.error('Error during Google sign-in:', error);
            alert('Could not login with Google: ' + error.message);
        }
    };

    return (
        <div>
            <button
                type="button" onClick={handleGoogleClick}
                className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
                style={{ width: '490px' }}
            >
                Continue with Google
            </button>
        </div>
    );
};

export default Oauth;
