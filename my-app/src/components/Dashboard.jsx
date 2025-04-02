import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [userId, setUserId] = useState('');
    const [products, setProducts] = useState([{ name: '', quantity: '' }]);
    const [message, setMessage] = useState('');
    const [enquiries, setEnquiries] = useState([]);
    const [view, setView] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId.trim() || products.some(p => !p.name || !p.quantity)) {
            alert('Please fill all fields.');
            return;
        }
        try {
            const token = localStorage.getItem('access_token'); // Get token from localStorage

            const response = await fetch('http://127.0.0.1:8000/api/enquiry/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // MUST include 'Token' prefix
                },
                body: JSON.stringify({
                    // Your request data
                })
            });
            const data = await response.json();
            setMessage(data.message);
            setUserId('');
            setProducts([{ name: '', quantity: '' }]);
            setView('home');
        } catch (error) {
            console.error('Error submitting enquiry!', error);
        }
    };
    

    const fetchEnquiries = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://127.0.0.1:8000/api/enquiry-list/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                console.error('Unauthorized access! Check your token.');
            }
            const data = await response.json();
            setEnquiries(data);
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleProductChange = (index, key, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][key] = value;
        setProducts(updatedProducts);
    };

    const addProductRow = () => {
        setProducts([...products, { name: '', quantity: '' }]);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className={`w-64 bg-blue-900 text-white shadow-lg p-6 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
                <button className="lg:hidden mb-4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                </button>
                <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
                <div className="mb-4 cursor-pointer hover:text-blue-300" onClick={() => setView('home')}>Home</div>
                <div className="mb-4 cursor-pointer hover:text-blue-300" onClick={() => setView('create')}>Create Enquiry</div>
                <div className="cursor-pointer hover:text-blue-300" onClick={() => setView('list')}>Enquiry List</div>
            </div>

            <div className="flex-1 p-6">
                {view === 'create' && (
                    <div>
                        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" className="border p-2 w-full rounded mb-4" />
                        <table className="w-full bg-white rounded shadow mb-4">
                            <thead>
                                <tr>
                                    <th className="p-2 border">products</th>
                                    <th className="p-2 border">Quantity</th>
                                    <th className="p-2 border">Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((products, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border">
                                            <input type="text" value={products.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} className="w-full p-1" />
                                        </td>
                                        <td className="p-2 border">
                                            <input type="number" value={products.quantity} onChange={(e) => handleProductChange(index, 'quantity', e.target.value)} className="w-full p-1" />
                                        </td>
                                        <td className="p-2 border text-center">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={addProductRow}>+</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
                    </div>
                )}

                {view === 'list' && (
                    <div>
                        <h2 className="text-xl mb-4">Enquiry List</h2>
                        <table className="w-full bg-white rounded shadow">
                            <thead>
                                <tr>
                                    <th className="p-2 border">User ID</th>
                                    <th className="p-2 border">Products</th>
                                    <th className="p-2 border">Quantity</th>
                                    <th className="p-2 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enquiries.map((enquiry) => (
                                    enquiry.products.map((products, index) => (
                                        <tr key={`${enquiry.id}-${index}`}>
                                            <td className="p-2 border">{index === 0 ? enquiry.user_id : ''}</td>
                                            <td className="p-2 border">{products.name}</td>
                                            <td className="p-2 border">{products.quantity}</td>
                                            <td className="p-2 border">{index === 0 ? enquiry.status || 'Pending' : ''}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
