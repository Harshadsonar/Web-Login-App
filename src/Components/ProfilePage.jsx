import React, { useEffect, useState } from 'react';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const GEOCODING_API_KEY = 'AIzaSyA9UQj_kQQR4q4QvX_Mw0IthgpKzltCVtk';
const GEOCODING_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${GEOCODING_API_KEY}`;

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoURL, setPhotoURL] = useState(null);
  const [location, setLocation] = useState(null);
  const [nativeLanguage, setNativeLanguage] = useState(null);

  const countryLanguageMap = {
    US: 'en', // United States - English
    FR: 'Fr', // France - French
    ES: 'Eng', // Spain - Spanish
    IN: 'Hindi', // India - Hindi 
  };

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
    } finally {
      setLoading(false);
    }
  };


  const detectNativeLanguage = () => {
    return navigator.languages ? navigator.languages[0] : navigator.language;
  };

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(`${GEOCODING_API_URL}&latlng=${latitude},${longitude}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const countryComponent = addressComponents.find(component => component.types.includes('country'));
        if (countryComponent) {
          const country = countryComponent.short_name;
          const detectedLanguage = countryLanguageMap[country];
          setNativeLanguage(detectedLanguage);
        }
        setLocation(data.results[0].formatted_address);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.log("Error fetching address:", error);
    }
  };
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.log("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
        setNativeLanguage(detectNativeLanguage());
        fetchLocation();
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
    } catch (error) {
      console.log("Error logging out:", error);
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
          <p>Name:{userDetails.firstName} {userDetails.lastName}</p>
          <p>Email id: {userDetails.email}</p>
          <p>Native Language: {nativeLanguage}</p>
          {location && <p>Address: {location}</p>}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
