import React, { useEffect, useState } from 'react';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState(null);

  const fetchUserData = async (user) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setPhotoURL(user.photoURL);
    } catch (error) {
      console.log("Error fetching user data:", error);
      toast.error("Error fetching user data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
      } else {
        console.log("User is not logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
      // toast.success("Logged out successfully!");
    } catch (error) {
      // toast.error("Error logging out: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id='profile-page'>
      {userDetails ? (
        <>
          <h1>Welcome to Profile Page</h1>
          <img src={photoURL || 'default-profile.img'} alt="Profile" />
          <p>Username: {userDetails.firstName + " " + userDetails.lastName}</p>
          <p>Email id: {userDetails.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
