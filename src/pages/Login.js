import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 
import images from '../images.json'; // Background and Google images

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate('/feed'); // Redirect after successful login
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-page">
      {/* Background Image Grid */}
       <div className="background-images">
        <img src={images.greenleaves} alt="Background 1" className="bg-img" />
        <img src={images.nature} alt="Background 2" className="bg-img" />
        <img src={images.beauty} alt="Background 3" className="bg-img" />
        <img src={images.nature1} alt="Background 4" className="bg-img" />
        <img src={images.nature1} alt="Background 5" className="bg-img" />
        <img src={images.greenleaves} alt="Background 1" className="bg-img" />
        <img src={images.nature1} alt="Background 2" className="bg-img" />
        <img src={images.beauty} alt="Background 3" className="bg-img" />
        <img src={images.nature1} alt="Background 4" className="bg-img" />
        <img src={images.nature1} alt="Background 5" className="bg-img" />
        <img src={images.greenleaves} alt="Background 1" className="bg-img" />
        <img src={images.nature1} alt="Background 2" className="bg-img" />
        <img src={images.beauty} alt="Background 3" className="bg-img" />
        <img src={images.nature1} alt="Background 4" className="bg-img" />
        <img src={images.nature1} alt="Background 5" className="bg-img" />
      </div> 
      
      {/* Hover Card */}
      <div className="login-card">
        <h1 className="title">Vibesnap</h1>
        <p className="subheading">Moments That Matter, Shared Forever.</p>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <img src={images.google} alt="Google Icon" className="google-icon" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
