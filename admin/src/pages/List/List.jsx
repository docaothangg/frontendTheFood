import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  const url = 'http://localhost:4000';
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState({
    Morning: [],
    Lunch: [],
    Evening: [],
  });
  const [selectedCategory, setSelectedCategory] = useState('Morning');

  // Lấy danh sách món ăn từ server
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching food list');
      }
    } catch (error) {
      toast.error('Unable to fetch the food list');
    }
  };

  // Thêm món ăn vào danh mục
  const addToCategory = (food) => {
    setCategories((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], food],
    }));
    toast.success(`Added "${food.name}" to ${selectedCategory}`);
  };

  // Xóa món ăn khỏi danh mục
  const removeFromCategory = (category, foodId) => {
    setCategories((prev) => ({
      ...prev,
      [category]: prev[category].filter((food) => food._id !== foodId),
    }));
    toast.info(`Removed food from ${category}`);
  };

  // Lấy danh sách món ăn khi component được render
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>ALL Foods List</p>
      
      {/* Danh sách món ăn */}
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              defaultValue="Morning"
            >
              <option value="Morning">Morning</option>
              <option value="Lunch">Lunch</option>
              <option value="Evening">Evening</option>
            </select>
            <button onClick={() => addToCategory(item)}>Add</button>
          </div>
        ))}
      </div>

      {/* Hiển thị danh mục */}
      <div className="categories">
        {Object.keys(categories).map((category) => (
          <div key={category} className="category-column">
            <h3>{category}</h3>
            <ul>
              {categories[category].map((food) => (
                <li key={food._id}>
                  {food.name}{' '}
                  <button onClick={() => removeFromCategory(category, food._id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default List;
