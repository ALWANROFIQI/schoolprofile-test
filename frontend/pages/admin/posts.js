"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";

export default function AdminPosts() {
  const API_URL = "http://localhost:8000/api/blogs/";
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    judul: "",
    tanggal: "",
    isi: "",
    gambar: null,
    slug: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Ambil data dari Django
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Gagal memuat data:", err));
  }, []);

  const handleFileChange = (e) =>
    setForm({ ...form, gambar: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("tanggal", form.tanggal);
    formData.append("isi", form.isi);
    formData.append("slug", form.slug || form.judul.toLowerCase().replace(/\s+/g, "-"));
    if (form.gambar) formData.append("gambar", form.gambar);

    const res = await fetch(
      editingId ? `${API_URL}${editingId}/` : API_URL,
      { method: editingId ? "PUT" : "POST", body: formData }
    );

    if (!res.ok) return alert("Gagal menyimpan artikel");
    const data = await res.json();

    if (editingId)
      setPosts(posts.map((p) => (p.id === editingId ? data : p)));
    else setPosts([...posts, data]);

    setForm({ judul: "", tanggal: "", isi: "", gambar: null, slug: "" });
    setEditingId(null);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm({
      judul: post.judul,
      tanggal: post.tanggal,
      isi: post.isi,
      gambar: null,
      slug: post.slug,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
    if (res.ok) setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <AdminLayout title="Kelola Artikel">
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Kelola Artikel
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-8">
          <input
            type="text"
            placeholder="Judul"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Isi Artikel"
            value={form.isi}
            onChange={(e) => setForm({ ...form, isi: e.target.value })}
            className="border p-2 rounded w-full h-32"
          />
          <input type="file" onChange={handleFileChange} className="border p-2 rounded w-full" />
          <button
            type="submit"
            className={` flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-200 ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {editingId ? (
              <>
                <FaEdit /> Update Artikel
              </>
            ) : (
              <>
                <FaPlus /> Tambah Artikel
              </>
            )}
          </button>
        </form>

        {/* Tabel Data */}
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-3 text-left">Gambar</th>
              <th className="border p-3 text-left">Judul</th>
              <th className="border p-3 text-left">Tanggal</th>
              <th className="border p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border p-3 w-32">
                  {post.gambar ? (
                    <img
                      src={post.gambar}
                      alt={post.judul}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="border p-3">{post.judul}</td>
                <td className="border p-3">{post.tanggal}</td>
                <td className="border p-3 text-center">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
