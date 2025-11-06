"use client";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { FaUserTie, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function StaffAdminPage() {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", position: "", email: "", photo: null });
  const [editingId, setEditingId] = useState(null);

  const fetchStaff = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/staff/");
      if (!res.ok) throw new Error("Gagal memuat data staff");
      const data = await res.json();
      setStaff(data);
    } catch (err) {
      console.error("Gagal memuat data staff:", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newStaff.name);
    formData.append("position", newStaff.position);
    formData.append("email", newStaff.email);
    if (newStaff.photo) formData.append("photo", newStaff.photo);

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8000/api/staff/${editingId}/`
      : "http://localhost:8000/api/staff/";

    await fetch(url, { method, body: formData });
    setNewStaff({ name: "", position: "", email: "", photo: null });
    setEditingId(null);
    fetchStaff();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewStaff({ name: item.name, position: item.position, email: item.email, photo: null });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const res = await fetch(`http://localhost:8000/api/staff/${id}/`, { method: "DELETE" });
    if (res.ok) setStaff(staff.filter((s) => s.id !== id));
  };

  // Handle URL foto
  const getPhotoUrl = (photo) => photo?.startsWith("http") ? photo : `http://localhost:8000${photo}`;

  return (
    <AdminLayout title="Kelola Staff">
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-3">
         Kelola Staff
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-8">
          <input
            type="text"
            placeholder="Nama"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Jabatan"
            value={newStaff.position}
            onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newStaff.email}
            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewStaff({ ...newStaff, photo: e.target.files[0] })}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className={`${
              editingId ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
            } text-white px-4 py-2 rounded flex items-center gap-2`}
          >
            <FaPlus /> {editingId ? "Update Staff" : "Tambah Staff"}
          </button>
        </form>

        {/* Tabel */}
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-3 text-left">Foto</th>
              <th className="border p-3 text-left">Nama</th>
              <th className="border p-3 text-left">Jabatan</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {staff.length > 0 ? (
              staff.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-3 w-24">
                    {item.photo ? (
                      <img
                        src={getPhotoUrl(item.photo)}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="border p-3">{item.name}</td>
                  <td className="border p-3">{item.position}</td>
                  <td className="border p-3">{item.email}</td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  Belum ada data staff.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
