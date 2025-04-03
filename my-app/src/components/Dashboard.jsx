import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [products, setProducts] = useState([{ name: '', quantity: '' }]);
    const [message, setMessage] = useState('');
    const [enquiries, setEnquiries] = useState([]);
    const [view, setView] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);  
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);  

    const token = localStorage.getItem('access_token');  // Fetching the token from local storage

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/enquiry/', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ products: JSON.stringify(products) })  // Convert products to JSON string
            });
    
            const data = await response.json();
            if (response.ok) {
                const newEnquiry = { id: data.id, status: data.status, products: products };
                setEnquiries([...enquiries, newEnquiry]);
                setMessage(data.message);
                setProducts([{ name: '', quantity: '' }]);
                setView('list');
            } else {
                console.error('Error creating enquiry:', data);
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    
    
    
    const fetchEnquiries = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/enquiry-list/', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            
            setEnquiries(data.map(enquiry => ({
                ...enquiry,
                products: enquiry.products || []  // No need for JSON.parse()
            })));
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

    const handleEnquiryClick = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setView('enquiry-detail');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex">
            <div className={`w-64 bg-blue-900 text-white shadow-lg p-6 rounded-lg ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
                <h2 className="text-3xl font-semibold mb-8">Dashboard</h2>
                <div className="cursor-pointer mb-4 hover:text-blue-300" onClick={() => setView('home')}>Home</div>
                <div className="cursor-pointer mb-4 hover:text-blue-300" onClick={() => setView('create')}>Create Enquiry</div>
                <div className="cursor-pointer hover:text-blue-300" onClick={() => setView('list')}>Enquiry List</div>
            </div>

            <div className="flex-1 ml-6">
                {view === 'create' && (
                    <div>
                        <table className="w-full bg-white rounded shadow">
                            <thead>
                                <tr>
                                    <th className="p-2 border">Serial No</th>
                                    <th className="p-2 border">Product</th>
                                    <th className="p-2 border">Quantity</th>
                                    <th className="p-2 border">Add Row</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border text-center">{index + 1}</td>
                                        <td className="p-2 border">
                                            <input type="text" value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} className="w-full p-1" />
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
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleSubmit}>Submit</button>
                    </div>
                )}

                {view === 'list' && (
                    <div>
                        <h2 className="text-xl mb-4">Enquiry List</h2>
                        <table className="w-full bg-white rounded shadow">
                            <thead>
                                <tr>
                                    <th className="p-2 border">Serial No</th>
                                    <th className="p-2 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enquiries.map((enquiry, index) => (
                                    <tr key={enquiry.id} onClick={() => handleEnquiryClick(enquiry)} className="cursor-pointer hover:bg-gray-100">
                                        <td className="p-2 border text-center">{index + 1}</td>
                                        <td className="p-2 border">{enquiry.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

{view === 'enquiry-detail' && selectedEnquiry && (
    <div>
        <h2 className="text-xl mb-4">Enquiry Details</h2>
        <table className="w-full bg-white rounded shadow">
            <thead>
                <tr>
                    <th className="p-2 border">Product</th>
                    <th className="p-2 border">Quantity</th>
                </tr>
            </thead>
            <tbody>
                {selectedEnquiry.products.map((product, index) => (
                    <tr key={index}>
                        <td className="p-2 border">{product.name}</td>
                        <td className="p-2 border">{product.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className="bg-gray-500 text-white px-4 py-2 rounded mt-4" onClick={() => setView('list')}>Back</button>
    </div>
)}

            </div>
        </div>
    );
};

export default Dashboard;
