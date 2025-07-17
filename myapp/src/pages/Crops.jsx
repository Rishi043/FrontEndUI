import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Crops.css';

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const cropsPerPage = 4;

  const API_BASE = 'http://localhost:8080/crops';

  const initializeQuantities = (data) => {
    const initialQuantities = {};
    data.forEach(crop => {
      initialQuantities[crop.id] = 1;
    });
    setQuantities(initialQuantities);
  };

  const fetchAllCrops = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/allCrops`);
      setCrops(res.data);
      initializeQuantities(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load crops.');
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!search.trim()) return fetchAllCrops();
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/by-name/${search}`);
      const cropData = Array.isArray(res.data) ? res.data : [res.data];
      setCrops(cropData);
      initializeQuantities(cropData);
      setError('');
    } catch (err) {
      console.error(err);
      setCrops([]);
      setError('Crop not found.');
    }
    setLoading(false);
  };

  const handleFilter = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/filter`, {
        params: { minPrice, maxPrice },
      });
      setCrops(res.data);
      initializeQuantities(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Price filter failed.');
    }
    setLoading(false);
  };

  const handleSort = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/filterPrice`);
      setCrops(res.data);
      initializeQuantities(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Sort failed.');
    }
    setLoading(false);
  };

  const filterByType = () => {
    if (!typeFilter) return fetchAllCrops();
    const filtered = crops.filter(crop => crop.type.toLowerCase() === typeFilter.toLowerCase());
    setCrops(filtered);
    initializeQuantities(filtered);
  };

  const increaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  const handlePlaceOrder = async (crop) => {
    const quantity = quantities[crop.id];
    const token = localStorage.getItem('token');

    if (!token) {
      localStorage.setItem('pendingOrder', JSON.stringify({ crop }));
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/payment/checkout', {
        orderId: crop.id,
        crop: crop.name,
        quantity,
        currency: 'USD',
        amount: crop.pricePerKg * quantity
      });

      window.location.href = res.data.url; // Assuming your backend returns Stripe URL here
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

useEffect(() => {
  fetchAllCrops();

  const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
  const token = localStorage.getItem('token');

  if (pendingOrder && token) {
    localStorage.removeItem('pendingOrder');
    handlePlaceOrder(pendingOrder.crop);
  }
}, []);


  const indexOfLastCrop = currentPage * cropsPerPage;
  const indexOfFirstCrop = indexOfLastCrop - cropsPerPage;
  const currentCrops = crops.slice(indexOfFirstCrop, indexOfLastCrop);
  const totalPages = Math.ceil(crops.length / cropsPerPage);

  return (
    <div className="crop-dashboard">
      <h1>🌾 Available Crops</h1>

      <div className="crop-controls">
        <input type="text" placeholder="🔍 Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleSearch}>Search</button>

        <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <button onClick={handleFilter}>Filter</button>

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Kharif">Kharif</option>
          <option value="Rabi">Rabi</option>
          <option value="Annual">Annual</option>
        </select>
        <button onClick={filterByType}>Filter by Type</button>

        <button onClick={handleSort}>Sort by Price</button>
      </div>

      {loading && <p className="loader">Loading crops...</p>}
      {error && <p className="error">{error}</p>}

      <div className="crop-grid">
        {currentCrops.length > 0 ? (
          currentCrops.map((crop) => (
            <div key={crop.id} className="crop-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5447/5447063.png"
                alt="Crop"
                className="crop-image"
              />
              <h2>{crop.name}</h2>
              <p><strong>Type:</strong> {crop.type}</p>
              <p><strong>Price/kg:</strong> ₹{crop.pricePerKg}</p>
              <p><strong>Available Quantity:</strong> {crop.totalQuantity} kg</p>
              <p><strong>Farmer:</strong> {crop.farmerMail}</p>

              <div className="qty-counter">
                <button onClick={() => decreaseQty(crop.id)}>-</button>
                <span>{quantities[crop.id]}</span>
                <button onClick={() => increaseQty(crop.id)}>+</button>
              </div>

              <button className="order-btn" onClick={() => handlePlaceOrder(crop)}>
                Place Order
              </button>
            </div>
          ))
        ) : (
          !loading && <p className="no-results">No crops found.</p>
        )}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Crops;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Crops.css';

// const Crops = () => {
//   const [crops, setCrops] = useState([]);
//   const [search, setSearch] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [typeFilter, setTypeFilter] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [quantities, setQuantities] = useState({});

//   const API_BASE = 'http://localhost:8080/crops';

//   const initializeQuantities = (data) => {
//     const initialQuantities = {};
//     data.forEach(crop => {
//       initialQuantities[crop.id] = 1;
//     });
//     setQuantities(initialQuantities);
//   };

//   const fetchAllCrops = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/allCrops`);
//       setCrops(res.data);
//       initializeQuantities(res.data);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load crops.');
//     }
//     setLoading(false);
//   };

//   const handleSearch = async () => {
//     if (!search.trim()) return fetchAllCrops();
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/by-name/${search}`);
//       const cropData = Array.isArray(res.data) ? res.data : [res.data];
//       setCrops(cropData);
//       initializeQuantities(cropData);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setCrops([]);
//       setError('Crop not found.');
//     }
//     setLoading(false);
//   };

//   const handleFilter = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/filter`, {
//         params: { minPrice, maxPrice },
//       });
//       setCrops(res.data);
//       initializeQuantities(res.data);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Price filter failed.');
//     }
//     setLoading(false);
//   };

//   const handleSort = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/filterPrice`);
//       setCrops(res.data);
//       initializeQuantities(res.data);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Sort failed.');
//     }
//     setLoading(false);
//   };

//   const filterByType = () => {
//     if (!typeFilter) return fetchAllCrops();
//     const filtered = crops.filter(crop => crop.type.toLowerCase() === typeFilter.toLowerCase());
//     setCrops(filtered);
//     initializeQuantities(filtered);
//   };

//   const increaseQty = (id) => {
//     setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
//   };

//   const decreaseQty = (id) => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: prev[id] > 1 ? prev[id] - 1 : 1
//     }));
//   };

//   useEffect(() => {
//     fetchAllCrops();
//   }, []);

//   return (
//     <div className="crop-dashboard">
//       <h1>🌾 Available Crops</h1>

//       <div className="crop-controls">
//         <input
//           type="text"
//           placeholder="🔍 Search by name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>

//         <input
//           type="number"
//           placeholder="Min Price"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Max Price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//         />
//         <button onClick={handleFilter}>Filter</button>

//         <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
//           <option value="">All Types</option>
//           <option value="Kharif">Kharif</option>
//           <option value="Rabi">Rabi</option>
//           <option value="Annual">Annual</option>
//         </select>
//         <button onClick={filterByType}>Filter by Type</button>

//         <button onClick={handleSort}>Sort by Price</button>
//       </div>

//       {loading && <p className="loader">Loading crops...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="crop-grid">
//         {crops.length > 0 ? (
//           crops.map((crop) => (
//             <div key={crop.id} className="crop-card">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/5447/5447063.png"
//                 alt="Crop"
//                 className="crop-image"
//               />
//               <h2>{crop.name}</h2>
//               <p><strong>Type:</strong> {crop.type}</p>
//               <p><strong>Price/kg:</strong> ₹{crop.pricePerKg}</p>
//               <p><strong>Available Quantity:</strong> {crop.totalQuantity} kg</p>
//               <p><strong>Farmer:</strong> {crop.farmerMail}</p>

//               <div className="qty-counter">
//                 <button onClick={() => decreaseQty(crop.id)}>-</button>
//                 <span>{quantities[crop.id]}</span>
//                 <button onClick={() => increaseQty(crop.id)}>+</button>
//               </div>

//               <button className="order-btn">Place Order</button>
//             </div>
//           ))
//         ) : (
//           !loading && <p className="no-results">No crops found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Crops;


