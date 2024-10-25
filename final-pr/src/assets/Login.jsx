import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                console.log("User logged in:", userCredential);
                navigate('/dash'); 
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="login-container">
        <div className="login-box">
            <h1>Login</h1>
            {error && <div className="login-error">{error}</div>}
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setPass(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <Link to='/dash' className="link">Dashboard</Link>
        </div>
    </div>
    );
}
