import React, { useState } from 'react';
import axios from 'axios';

const EnquiryForm = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/enquiry/', {
                product_name: productName,
                quantity: quantity,
            });

            setStatus(response.data.status);
        } catch (error) {
            alert('Error submitting enquiry. Please try again.');
        }
    };

    return (
        <div className="container mx-auto mt-10 p-5 border rounded">
            <h1 className="text-2xl mb-4">Product Enquiry</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="w-full p-2 border"
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="w-full p-2 border"
                    />
                </div>
                <button type="submit" className="p-2 bg-blue-500 text-white">
                    Submit Enquiry
                </button>
            </form>

            {status && (
                <div className="mt-4 p-2 border">
                    Enquiry Status: <strong>{status}</strong>
                </div>
            )}
        </div>
    );
};

export default EnquiryForm;
