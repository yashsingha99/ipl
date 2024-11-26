import React, { useState } from "react";
import { User, Mail, Lock, Star, Edit } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "User Name",
    email: "user@example.com",
    password: "",
    favTeam: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement profile update logic
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          <User className="mr-3 text-blue-500" /> Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label 
              htmlFor="name" 
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <User className="mr-2 text-blue-500" /> Name
            </label>
            <input 
              id="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md transition-all duration-300 
                ${isEditing 
                  ? 'focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-100 cursor-not-allowed'}`}
            />
          </div>

          <div className="relative">
            <label 
              htmlFor="email" 
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <Mail className="mr-2 text-blue-500" /> Email
            </label>
            <input 
              id="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md transition-all duration-300 
                ${isEditing 
                  ? 'focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-100 cursor-not-allowed'}`}
            />
          </div>

          <div className="relative">
            <label 
              htmlFor="password" 
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <Lock className="mr-2 text-blue-500" /> Password
            </label>
            <input 
              id="password"
              type="password" 
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md transition-all duration-300 
                ${isEditing 
                  ? 'focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-100 cursor-not-allowed'}`}
              placeholder="********"
            />
          </div>

          <div className="relative">
            <label 
              htmlFor="favTeam" 
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <Star className="mr-2 text-blue-500" /> Favourite Team
            </label>
            <input 
              id="favTeam"
              type="text"
              value={formData.favTeam}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md transition-all duration-300 
                ${isEditing 
                  ? 'focus:ring-2 focus:ring-blue-500' 
                  : 'bg-gray-100 cursor-not-allowed'}`}
            />
          </div>

          <button 
            type={isEditing ? "submit" : "button"}
            onClick={isEditing ? undefined :     setIsEditing( (p) => !p )}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            <Edit className="mr-2" /> {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;