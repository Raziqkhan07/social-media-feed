import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import '../styles/PostForm.css'; // Import the CSS for the post form styling

function PostForm({ closePopup }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64Images) => setImages(base64Images))
      .catch((err) => setError("Error encoding images"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = {
        content,
        images,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "posts"), post);
      setContent("");
      setImages([]);
      setError("");
      alert("Post added successfully!");
      closePopup(); // Close the popup after posting
    } catch (err) {
      setError("Error adding post");
      console.error(err);
    }
  };

  return (
    <div className="post-form-overlay" onClick={closePopup}>
      <div className="post-form-card" onClick={(e) => e.stopPropagation()}>
        <div className="post-form-header">
          <button onClick={closePopup} className="close-btn">❌</button>
          <h3>New postt</h3>
        </div>
        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="post-input"
            required
            rows="6"
          />

          <div className="file-options">
            <label className="file-option">
              <span>📁 Choose the file</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
            </label>
            <label className="file-option">
              <span>📷 Camera</span>
              <input type="file" accept="image/*" capture="camera" className="file-input" />
            </label>
          </div>

          {images.length > 0 && (
            <div className="image-preview">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${img}`}
                  alt="Preview"
                  className="preview-img"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
          >
            Post
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default PostForm;
