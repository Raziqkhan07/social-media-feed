import React from 'react';

function CreatePostPopup({ closePopup }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closePopup}
    >
      <div
        className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing popup when clicking inside
      >
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-xl text-gray-600"
        >
          ×
        </button>
        {/* Add your Create Post form here */}
        <h2 className="text-2xl mb-4">Create Post</h2>
        <form>
          {/* Post Form Content */}
          <textarea
            placeholder="What's on your mind?"
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          <input
            type="file"
            multiple
            accept="image/*"
            className="mb-4"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPopup;
