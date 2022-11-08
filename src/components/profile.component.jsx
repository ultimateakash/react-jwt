import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';

const ProfileComponent = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await authService.profile();
      setUser(result.data)
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <ul className="list-group">
          <li className="list-group-item"><span className="fw-bold">Id</span> - {user?._id}</li>
          <li className="list-group-item"><span className="fw-bold">Name</span> - {user?.name}</li>
          <li className="list-group-item"><span className="fw-bold">Email</span> - {user?.email}</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileComponent