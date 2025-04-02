import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [products, setProducts] = useState([{ product: '', quantity: '' }]);
    const [message, setMessage] = useState('');
    const [enquiries, setEnquiries] = useState([]);
    const [view, setView] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Start with sidebar open

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/enquiry/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_name: userName, products })
            });
            const data = await response.json();
            setMessage(data.message);
            setUserName('');
            setProducts([{ product: '', quantity: '' }]);
            setView('home');
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const fetchEnquiries = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/enquiry-list/');
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
        setProducts([...products, { product: '', quantity: '' }]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex">
            {/* Sidebar */}
            <div className={`w-64 bg-blue-900 text-white shadow-lg p-6 rounded-lg ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
                <button
                    className="text-white text-3xl lg:hidden mb-4"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
                >
                    &#9776; {/* Hamburger Icon */}
                </button>

                <h2 className="text-3xl font-semibold mb-8">Dashboard</h2>
                <div className="text-lg font-medium mb-6 cursor-pointer hover:text-blue-300" onClick={() => setView('home')}>Home</div>
                <div className="text-blue-300 cursor-pointer mb-4 hover:text-blue-500" onClick={() => setView('create')}>Create Enquiry</div>
                <div className="text-blue-300 cursor-pointer hover:text-blue-500" onClick={() => setView('list')}>Enquiry List</div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-6">
                {view === 'home' && (
                    <div>
                        <h1 className="text-2xl mb-4">Welcome to Home Page</h1>
                    </div>
                )}

                {view === 'create' && (
                    <div>
                        <div className="mb-4">
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="User Name" className="border p-2 w-full rounded" />
                        </div>
                        <table className="w-full bg-white rounded shadow">
                            <thead>
                                <tr>
                                    <th className="p-2 border">Product</th>
                                    <th className="p-2 border">Quantity</th>
                                    <th className="p-2 border">Add Row</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border">
                                            <input type="text" value={product.product} onChange={(e) => handleProductChange(index, 'product', e.target.value)} className="w-full p-1" />
                                        </td>
                                        <td className="p-2 border">
                                            <input type="number" value={product.quantity} onChange={(e) => handleProductChange(index, 'quantity', e.target.value)} className="w-full p-1" />
                                        </td>
                                        <td className="p-2 border text-center">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={addProductRow}>+</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setView('home')}>Back to Home</button>
                        </div>
                    </div>
                )}

                {view === 'list' && (
                    <div>
                        <h2 className="text-xl mb-4">Enquiry List</h2>
                        <table className="w-full bg-white rounded shadow">
                            <thead>
                                <tr>
                                    <th className="p-2 border">User Name</th>
                                    <th className="p-2 border">Products</th>
                                    <th className="p-2 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enquiries.map(enquiry => (
                                    <tr key={enquiry.id}>
                                        <td className="p-2 border">{enquiry.user_name}</td>
                                        <td className="p-2 border">{enquiry.products.map((p, index) => (
                                            <span key={index}>{p.product} ({p.quantity}) </span>
                                        ))}</td>
                                        <td className="p-2 border">{enquiry.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setView('home')}>Back to Home</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
