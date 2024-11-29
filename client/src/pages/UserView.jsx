import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const UserView = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState(undefined);
  const fileRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchUser();
  }, [userId]);

  async function fetchUser() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/viewmore/${userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch user details");
      const data = await res.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
    }
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateUsername(username) {
    return username.length > 0;
  }

  async function handleUpdate(event) {
    event.preventDefault();
    if (!validateUsername(user.username)) {
      setError("Username is required");
      return;
    }
    if (!validateEmail(user.email)) {
      setError("Invalid email address");
      return;
    }
    try {
      let profilePicture = user.profilePicture;
      if (image) {
        profilePicture = await uploadImage(image);
      }

      const res = await fetch(
        `http://localhost:3000/api/admin/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            email: user.email,
            profilePicture,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update user details");
      const data = await res.json();
      setSuccess("User details updated successfully");
      setError("");
      setUser(data);
      navigate("/admin-dashboard"); // Navigate to dashboard
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  }

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const storageRef = ref(storage, `profilePictures/${userId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">User</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={user.profilePicture}
          alt={user.username}
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          value={user.email}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 text-white rounded-lg p-3">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">
          {/* Delete Account */}
        </span>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
      {success && <p className="text-green-700 mt-5">{success}</p>}
    </div>
  );
};

export default UserView;
