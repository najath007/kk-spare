import React, { useState, useEffect } from 'react';
import { BASE } from '../api';
import './ProfilePage.css';

export default function ProfilePage({ user, onProfileUpdate }) {
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(true);
      const token = localStorage.getItem('token');
      fetch(`${BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        setProfileForm({ name: data.name || '', phone: data.phone || '', password: '' });
        setLoading(false);
      })
      .catch(err => setLoading(false));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      setMessage('Profile updated successfully!');
      
      // Notify parent app if necessary (e.g. to update the header's user.name state)
      if (onProfileUpdate) {
        onProfileUpdate({ ...user, name: profileForm.name });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setProfileForm(f => ({ ...f, password: '' })); // clear password field
    }
  };

  if (!user) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}><h2>Please log in to view your profile.</h2></div>;
  }

  return (
    <div className="profile-page container">
      <div className="profile-wrapper">
        <h2>My Account Settings</h2>
        <p className="profile-subtitle">Update your personal details and change your password.</p>
        
        {message && <div className="profile-success-msg">{message}</div>}
        {error && <div className="profile-error-msg">{error}</div>}

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required value={profileForm.name} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phone" value={profileForm.phone} onChange={handleChange} placeholder="e.g. +1 234 567 890" />
          </div>

          <div className="form-group">
            <label>New Password (Optional)</label>
            <input type="password" name="password" value={profileForm.password} onChange={handleChange} placeholder="Leave blank to keep current password" />
          </div>

          <button type="submit" className="btn btn-primary profile-submit-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
