import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase-config"; // Ensure Firebase is configured correctly
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../styles/Profile.css"; // CSS file for styling
import images from '../images.json'; // Background and Google images

const EditableProfile = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePic: "",
  });
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);
          console.log(userDoc)
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setFormData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileRef = ref(storage, `profilePics/${userId}`);
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        setFormData((prev) => ({
          ...prev,
          profilePic: photoURL,
        }));
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  // Save data to Firestore
  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, formData);
      setUserData(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* <img
          src={formData?.profilePic || images.google}
          alt="Profile Avatar"
          className="profile-avatar"
        /> */}
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="file-input"
          />
        )}
        <div className="profile-details">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData?.name || ""}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="input-field"
              />
              <textarea
                name="bio"
                value={formData?.bio || ""}
                onChange={handleInputChange}
                placeholder="Write something about yourself"
                className="textarea-field"
              />
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
            </>
          ) : (
            <>
              <h2>{userData?.name || "Your Name"}</h2>
              <p>{userData?.bio || "Your bio will appear here."}</p>
              <button onClick={() => setEditMode(true)} className="edit-btn">
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableProfile;
