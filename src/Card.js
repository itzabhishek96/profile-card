import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

const Card = () => {
  const [user, setUser] = useState(null);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?page=1&results=1&seed=abc');
        setUser(response.data.results[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="max-w-md mx-auto">
        <div className="front bg-cyan-700 rounded-lg py-6 px-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="w-28 h-32 overflow-hidden ml-4 mb-2">
              <img src={user ? user.picture.large : ''} alt="User avatar" className="w-full h-full object-cover" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl text-white font-bold">{`${user ? user.name.title : ''}. ${user ? user.name.first : ''} ${user ? user.name.last : ''}`}</h2>
              <p className="text-gray-200">Gender: {user ? user.gender : ''}</p>
              <p className="text-gray-200">Mail: {user ? user.email : ''}</p>
              <p className="text-gray-200">Phone: {user ? user.phone : ''}</p>
              <div>
                <p className="text-gray-200">DOB: {user ? formatDate(user.dob.date) : ''}</p>
                <p className="text-gray-200">Age: {user ? user.dob.age : ''}</p>
              </div>
            </div>
          </div>
       
          <h2 className="text-lg text-white font-bold mb-2">Address</h2>
          <p className="text-gray-200">{`${user ? user.location.street.number : ''}, ${user ? user.location.street.name : ''}, ${user ? user.location.city : ''}
            ${user ? user.location.state : ''},
            ${user ? user.location.country : ''},
            ${user ? user.location.postcode : ''}`}</p>
        </div>
    </div>
  );
};

export default Card;
