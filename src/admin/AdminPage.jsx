import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';

function AdminPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); // State to store user submissions

    useEffect(() => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login'); // Redirect to login page if not authenticated
        } else {
            fetchUsers(); // Fetch users after checking login
        }
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/submission');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Clear the login state
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="admin-page">
            <h2>Welcome to the Admin Dashboard</h2>
            <div className="user-list">
                {users.length > 0 ? (
                    users.map(user => (
                        <div className="user-card" key={user._id}>
                            <div className="details">
                                <h3>{user.name}</h3>
                                <p>Social Media Handle: <strong> {user.socialMediaHandle}</strong></p>
                            </div>
                            <div className="image-gallery">
                                {user.image.map((img, index) => (
                                    <img
                                        src={`http://localhost:5000/${img}`}
                                        alt={`User submission ${index}`}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default AdminPage;
