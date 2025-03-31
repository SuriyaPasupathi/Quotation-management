import React, { useState } from 'react';
import axios from 'axios';

const BulkUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
    
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/upload-products/', formData, {
                headers: {  // DO NOT set 'Content-Type' header manually here
                    'Accept': 'application/json',
                },
            });
    
            if (response.status === 200) {
                setMessage('Products uploaded successfully!');
            } else {
                setMessage('Failed to upload products.');
            }
        } catch (error) {
            setMessage('An error occurred during upload.');
        }

    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
            <input 
                type="file" 
                accept=".csv, .xlsx"
                onChange={handleFileChange} 
                style={{ marginBottom: '1rem' }}
            />
            <button 
                onClick={handleUpload} 
                style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Upload File
            </button>
            {message && <div style={{ marginTop: '1rem', color: 'blue' }}>{message}</div>}
        </div>
    );
};

export default BulkUpload;
