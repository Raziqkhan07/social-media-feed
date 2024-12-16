import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
} from "firebase/firestore";
import PostForm from "../components/PostForm";
import FloatingButton from '../components/FloatingButton';
import '../styles/Feed.css'; // Import the CSS for the post form styling

function Feeds() {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true); // Show the popup when the button is clicked
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  const fetchPosts = async (loadMore = false) => {
    setLoading(true);

    const postsRef = collection(db, "posts");
    let q;

    if (loadMore && lastVisible) {
      q = query(postsRef, orderBy("timestamp", "desc"), startAfter(lastVisible), limit(10));
    } else {
      q = query(postsRef, orderBy("timestamp", "desc"), limit(10));
    }

    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts((prevPosts) => (loadMore ? [...prevPosts, ...newPosts] : newPosts));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      !loading
    ) {
      fetchPosts(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastVisible, loading]);

  return (
<div className="feeds-container">
      {/* Post Display */}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <p className="post-content">{post.content}</p>
            {post.images && (
              <div className="image-gallery">
                {post.images.map((img, index) => (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${img}`}
                    alt="Post"
                    className="post-image"
                  />
                ))}
              </div>
            )}
            <span className="post-time">
              {new Date(post.timestamp?.seconds * 1000).toLocaleString()}
            </span>
            <div className="post-actions">
              <button className="like-btn">👍 Like</button>
              <button className="comment-btn">💬 Comment</button>
              <button className="share-btn">🔗 Share</button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Create Post Popup (Full-Screen) */}
      {showPopup && (
        <div
          className="popup-overlay"
          onClick={closePopup}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing popup when clicking inside
          >
            <button
              onClick={closePopup}
              className="close-popup-btn"
            >
              ×
            </button>
            <PostForm closePopup={closePopup} />
          </div>
        </div>
      )}
      
      {/* Floating Button */}
      <FloatingButton onClick={handleButtonClick} />
      
      {/* Loading Indicator */}
      {loading && <p className="loading-text">Loading more posts...</p>}
    </div>
  );
}

export default Feeds;
