import axios from 'axios';
import React, { useState } from 'react';
import './UserPage.css';

function UserPage() {
    const [name, setName] = useState('');
    const [socialMediaHandle, setSocialMediaHandle] = useState('');
    const [files, setFiles] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]); 
    const [successMessage, setSuccessMessage] = useState(''); 

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setFiles(selectedFiles);

        const urls = Array.from(selectedFiles).map((file) =>
            URL.createObjectURL(file)
        );
        setPreviewUrls(urls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialMediaHandle', socialMediaHandle);

        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]); 
            }
        }

        try {
            const response = await axios.post('http://localhost:5000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setName('');
                setSocialMediaHandle('');
                setFiles(null);
                setPreviewUrls([]); // Clear the file previews
                setSuccessMessage('Successfully submitted!');

                // Clear the message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }

            console.log('Success:', response.data);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="user-page">
            <h1>Welcome, Upload Your Post On This Website</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your Social Media Handle"
                    value={socialMediaHandle}
                    onChange={(e) => setSocialMediaHandle(e.target.value)}
                />
                <input
                    type="file"
                    name="files"
                    multiple
                    onChange={handleFileChange} 
                />

              
                <div className="file-preview">
                    {previewUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Preview ${index + 1}`} className="preview-image" />
                    ))}
                </div>

                <button type="submit">Upload</button>
            </form>

            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
}

export default UserPage;
