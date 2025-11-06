"use client";
import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";

export default function AdminGaleri() {
  const [galeri, setGaleri] = useState([]);
  const [judul, setJudul] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil data dari backend
  const fetchGaleri = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/galeri/");
      if (!res.ok) throw new Error("Gagal memuat galeri");
      const data = await res.json();
      setGaleri(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  // Tambah data baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gambar) return alert("Pilih gambar terlebih dahulu!");
    setLoading(true);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("gambar", gambar);

    try {
      const res = await fetch("http://localhost:8000/api/galeri/", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Gagal upload gambar");
      setJudul("");
      setGambar(null);
      setPreview(null);
      await fetchGaleri();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hapus data
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/galeri/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        setGaleri((prev) => prev.filter((g) => g.id !== id));
      } else {
        alert("Gagal menghapus data.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Preview gambar sebelum upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <AdminLayout title="Kelola Galeri Kegiatan">
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Kelola Galeri
        </h1>

        {/* Form Tambah */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Judul kegiatan"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="border p-2 rounded w-full md:w-1/3"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded transition`}
            >
              {loading ? "Mengunggah..." : "+ Tambah"}
            </button>
          </div>

          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="h-40 rounded-lg shadow"
              />
            </div>
          )}
        </form>

        {/* Daftar Galeri */}
        <div className="grid md:grid-cols-4 gap-6">
          {galeri.length > 0 ? (
            galeri.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-xl shadow overflow-hidden group relative"
              >
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 flex justify-between items-center">
                  <p className="text-sm text-gray-700 truncate">
                    {item.judul}
                  </p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Belum ada data galeri.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
