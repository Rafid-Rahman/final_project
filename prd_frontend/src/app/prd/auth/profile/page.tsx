"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  gender: string;
  age: number;
  role: string;
  phone: string;
}

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    username: '',
    gender: '',
    age: 0,
    phone: '',
  });

  useEffect(() => {
    const urlParts = window.location.pathname.split('/');
    const userId = urlParts[urlParts.length - 1];

    axios.get<UserProfile>(`http://localhost:3000/prd/auth/profile/:${userId}`)
      .then(response => setUserProfile(response.data))
      .catch(error => console.error('Error fetching user profile:', error));
  }, []); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedInfo({
      ...updatedInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = () => {
    axios.put(`http://localhost:3000/prd/auth/profile/${userProfile?.id}`, updatedInfo)
      .then(response => {
        console.log('Profile updated successfully:', response.data);
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div>
      <h1>View and Update Profile</h1>
      {userProfile && (
        <>
          <p>Username: {userProfile.username}</p>
          <p>Email: {userProfile.email}</p>
          <p>Gender: {userProfile.gender}</p>
          <p>Age: {userProfile.age}</p>
          <p>Role: {userProfile.role}</p>
          <p>Phone: {userProfile.phone}</p>

          <h2>Update Profile</h2>
          <label>Username: <input type="text" name="username" onChange={handleInputChange} /></label>
          <br />
          <label>Gender: <input type="text" name="gender" onChange={handleInputChange} /></label>
          <br />
          <label>Age: <input type="number" name="age" onChange={handleInputChange} /></label>
          <br />
          <label>Phone: <input type="text" name="phone" onChange={handleInputChange} /></label>
          <br />
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
