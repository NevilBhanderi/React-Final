import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db, provider } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import "./SignUp.css";

export default function Signup() {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                console.log("Sign Up", userCredential);
                setDoc(doc(db, "users", userCredential.user.uid), {
                    name: name,
                    sub: subject,
                    email: email
                });
                console.log('Data added');
                navigate('/login'); 
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const loginwithgoogle = async ()=> {
        await signInWithPopup (auth , provider)
            .then(user => {
                console.log(user)
            })
    }

    return (
        <div className="signup-container" >
            <div className="signup-form">
                <h1>Signup</h1>
                {error && <div className="error">{error}</div>}
                <button onClick={loginwithgoogle} className='google'> <i className="fa-brands fa-google"></i> SignUp With Google</button>
                    <div className='hr'>
                        <div className='hr1'><hr /></div>
                        <p>or</p>
                        <div className='hr1'><hr /></div>
                    </div>
                <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                {/* <input type="text" placeholder='Subject' onChange={(e) => setSubject(e.target.value)} /> */}
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' onChange={(e) => setPass(e.target.value)} />
                <button onClick={handleSignup} className='sign'>Signup</button>


                <Link to='/login' className="link"> Login</Link>
            </div>
        </div>
    );
}
