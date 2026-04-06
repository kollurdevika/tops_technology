import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageMenu() {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: ""
  });

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  const fetchMenu = async () => {
    const res = await axios.get(
      "https://restrodev-3a326-default-rtdb.firebaseio.com/menuItems.json"
    );

    const data = res.data;

    if (data) {
      const formatted = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setMenu(formatted);
    } else {
      setMenu([]);
    }
  };

  const fetchCategories = async () => {
    const res = await axios.get(
      "https://restrodev-3a326-default-rtdb.firebaseio.com/categories.json"
    );

    const data = res.data;

    if (data) {
      const formatted = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setCategories(formatted);
    }
  };
  // ================= FORM CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD ITEM =================

  const handleAdd = async () => {
    console.log("Submitting:", form);

    if (!form.name || !form.description || !form.price || !form.categoryId || !form.image) {
      alert("All fields are required!");
      return;
    }


    try {
      const newItem = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        categoryId: form.categoryId,
        isAvailable: true
      };

      const res = await axios.post(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/menuItems.json",
        newItem
      );

      console.log("Saved in Firebase:", res.data);

      fetchMenu();

      setForm({
        id: null,
        name: "",
        description: "",
        price: "",
        categoryId: "",
        image: ""
      });

    } catch (err) {
      console.error("Error:", err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setIsEditing(true);
    setForm(item);
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    await axios.patch(
      `https://restrodev-3a326-default-rtdb.firebaseio.com/menuItems/${form.id}.json`,
      {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        categoryId: form.categoryId
      }
    );
    setIsEditing(false);
    fetchMenu();
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid item ID");
      return;
    }

    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(
          `https://restrodev-3a326-default-rtdb.firebaseio.com/menuItems/${id}.json`
        ); fetchMenu();
      } catch (error) {
        console.error(error);
        alert("Delete failed. Check JSON Server.");
      }
    }
  };

  // ================= CATEGORY NAME HELPER =================
  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.catName : "Unknown";
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🍽️ Manage Menu</h2>

      {/* FORM */}
      <div className="card p-4 mb-4 shadow">
        <h4>{isEditing ? "✏️ Edit Menu Item" : "➕ Add New Menu Item"}</h4>

        <div className="row g-3 mt-2">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Food Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price ₹"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <select
              name="categoryId"
              className="form-control"
              value={form.categoryId}
              onChange={handleChange}
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.catName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              name="image"
              className="form-control"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12 text-end mt-3">
            {isEditing ? (
              <button className="btn btn-warning" onClick={handleUpdate}>
                ✔ Update
              </button>
            ) : (
              <button className="btn btn-success" onClick={handleAdd}>
                ➕ Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card p-4 shadow">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt="" width="60" />
                </td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{getCategoryName(item.categoryId)}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {menu.length === 0 && <p className="text-center">No items found</p>}
      </div>
    </div>
  );
}

export default ManageMenu;
