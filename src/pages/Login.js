import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 
const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate('/feed'); // Redirect to feed after login
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="background-images">
        <img src="image1.jpg" alt="Background 1" className="bg-img" />
        <img src="image2.jpg" alt="Background 2" className="bg-img" />
        <img src="image3.jpg" alt="Background 3" className="bg-img" />
        <img src="image4.jpg" alt="Background 4" className="bg-img" />
      </div>
      <div className="login-card">
        <h1 className="title">Vibesnap</h1>
        <p className="subheading">Moments That Matter, Shared Forever.</p>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <img src="google-icon.png" alt="Google Icon" className="google-icon" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
