import React from 'react'
import {
    insertRegistration,
    getAllRegistrations,
    searchRegistration,
    updateRegistration,
    deleteRegistration
} from "../../services/registrationService.js";
import { useEffect } from 'react';
import { useState } from 'react';

const initialForm = {
    name: "",
    email: "",
    password: "",
    gender: "",
    hobbies: [],
    city: "",
    dob: "",
    photo: null
};


const Registration = () => {
    const [form, setForm] = useState(initialForm);
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getAllRegistrations();
            setData(res.data);
        } catch {
            setMessage("Unable to load registrations");
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm({
            ...form,
            [name]: name === "photo" ? files[0] : value
        });
    };

    const handleHobby = (e) => {
        const { value, checked } = e.target;

        setForm({
            ...form,
            hobbies: checked
                ? [...form.hobbies, value]
                : form.hobbies.filter((h) => h !== value)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const fd = new FormData();

            fd.append("name", form.name);
            fd.append("email", form.email);
            fd.append("password", form.password);
            fd.append("gender", form.gender);
            fd.append("hobbies", JSON.stringify(form.hobbies));
            fd.append("city", form.city);
            fd.append("dob", form.dob);

            if (form.photo) {
                fd.append("photo", form.photo);
            }

            if (editId) {
                await updateRegistration(editId, fd);
                setMessage("Registration updated successfully");
            } else {
                if (!form.photo) {
                    setMessage("Please select a photo");
                    return;
                }

                await insertRegistration(fd);
                setMessage("Registration inserted successfully");
            }

            resetForm();
            await loadData();
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Operation failed"
            );
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);

        setForm({
            name: item.name || "",
            email: item.email || "",
            password: item.password || "",
            gender: item.gender || "",
            hobbies: item.hobbies || [],
            city: item.city || "",
            dob: item.dob || "",
            photo: null
        });

        document.getElementById("registrationForm")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) {
            return;
        }

        try {
            await deleteRegistration(id);
            setMessage("Registration deleted successfully");

            if (editId === id) {
                resetForm();
            }

            await loadData();
        } catch {
            setMessage("Delete failed");
        }
    };

    const handleSearch = async () => {
        try {
            if (!search.trim()) {
                await loadData();
                return;
            }

            const res = await searchRegistration(search.trim());
            setData(res.data);
        } catch {
            setMessage("Search failed");
        }
    };

    const resetForm = () => {
        setForm(initialForm);
        setEditId(null);

        const input = document.getElementById("photo");
        if (input) input.value = "";
    };
  return (
    <div className="container py-4">
            <h2 className="text-center mb-4">
                Registration Management
            </h2>

            {message && (
                <div className="alert alert-info">
                    {message}
                    <button
                        className="btn-close float-end"
                        onClick={() => setMessage("")}
                    />
                </div>
            )}

            <div className="card shadow-sm p-4 mb-4" id="registrationForm">
                <h4 className="mb-3">
                    {editId ? "Update Registration" : "New Registration"}
                </h4>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                className="form-control"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label d-block">Gender</label>

                            {["Male", "Female", "Other"].map((g) => (
                                <div className="form-check form-check-inline" key={g}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={form.gender === g}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label">{g}</label>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label d-block">Hobbies</label>

                            {["Reading", "Music", "Sports"].map((h) => (
                                <div className="form-check form-check-inline" key={h}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={h}
                                        checked={form.hobbies.includes(h)}
                                        onChange={handleHobby}
                                    />
                                    <label className="form-check-label">{h}</label>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">City</label>
                            <select
                                className="form-select"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select City</option>
                                <option value="Surat">Surat</option>
                                <option value="Ahmedabad">Ahmedabad</option>
                                <option value="Vadodara">Vadodara</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dob"
                                value={form.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Photo</label>
                            <input
                                id="photo"
                                type="file"
                                className="form-control"
                                name="photo"
                                accept="image/*"
                                onChange={handleChange}
                                required={!editId}
                            />

                            {editId && (
                                <small className="text-muted">
                                    Select a new photo only if you want to replace it.
                                </small>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success me-2">
                        {editId ? "Update" : "Insert"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={resetForm}
                    >
                        Clear
                    </button>
                </form>
            </div>

            <div className="d-flex gap-2 mb-3">
                <input
                    className="form-control"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                />

                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        setSearch("");
                        loadData();
                    }}
                >
                    Display All
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Hobbies</th>
                            <th>City</th>
                            <th>DOB</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    {item.photo && (
                                        <img
                                            src={`http://localhost:5000/uploads/${encodeURIComponent(item.photo)}`}
                                            alt={item.name}
                                            width="60"
                                            height="60"
                                            style={{ objectFit: "cover" }}
                                        />
                                    )}
                                </td>

                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td>{(item.hobbies || []).join(", ")}</td>
                                <td>{item.city}</td>
                                <td>{item.dob}</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-1 mb-1"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm mb-1"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No registrations found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Registration