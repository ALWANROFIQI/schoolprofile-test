"use client";
import AdminLayout from "@/components/AdminLayout";
import { FaPlus, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    judul: "",
    keterangan: "",
    gambar: null,
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8000/api/achievements/"; // ✅ Gunakan Django API

  // Ambil data dari Django
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setAchievements)
      .catch((err) => console.error("Gagal fetch data:", err));
  }, []);

  const handleFileChange = (e) => {
    setNewAchievement({ ...newAchievement, gambar: e.target.files[0] });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!newAchievement.judul || !newAchievement.keterangan)
      return alert("Harap isi semua field!");

    const formData = new FormData();
    formData.append("judul", newAchievement.judul);
    formData.append("keterangan", newAchievement.keterangan);
    if (newAchievement.gambar) formData.append("gambar", newAchievement.gambar);

    let url = API_URL;
    let method = "POST";

    if (editingId) {
      url = `${API_URL}${editingId}/`; // ✅ Tambahkan slash
      method = "PUT";
    }

    const res = await fetch(url, { method, body: formData });
    if (!res.ok) {
      console.error(await res.text());
      return alert("Gagal menyimpan data");
    }

    const data = await res.json();

    if (editingId) {
      setAchievements(achievements.map((a) => (a.id === editingId ? data : a)));
    } else {
      setAchievements([...achievements, data]);
    }

    setNewAchievement({ judul: "", keterangan: "", gambar: null });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!id) return alert("ID prestasi tidak ditemukan!");
    const confirmDelete = confirm("Yakin ingin menghapus prestasi ini?");
    if (!confirmDelete) return;

    const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" });

    if (res.ok) {
      setAchievements(achievements.filter((a) => a.id !== id));
    } else {
      console.error(await res.text());
      alert("Gagal menghapus data");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewAchievement({
      judul: item.judul,
      keterangan: item.keterangan,
      gambar: null,
    });
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          Kelola Prestasi
        </h2>

        {/* Form tambah/update */}
        <form onSubmit={handleAddOrUpdate} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="Judul Prestasi"
            value={newAchievement.judul}
            onChange={(e) =>
              setNewAchievement({ ...newAchievement, judul: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Keterangan"
            value={newAchievement.keterangan}
            onChange={(e) =>
              setNewAchievement({
                ...newAchievement,
                keterangan: e.target.value,
              })
            }
            className="border p-2 rounded"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />

       <button
          type="submit"
          className={`self-start flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-200 ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {editingId ? (
            <>
              <FaEdit /> Update Prestasi
            </>
          ) : (
            <>
              <FaPlus /> Tambah Prestasi
            </>
          )}
        </button>


        </form>

        {/* Tabel Prestasi */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="border p-2">Gambar</th>
              <th className="border p-2">Judul</th>
              <th className="border p-2">Keterangan</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((item) => (
              <tr key={item.id}>
                <td className="border p-2 w-32">
                  {item.gambar ? (
                    <img
                        src={item.gambar}
                        alt={item.judul}
                        className="w-20 h-20 object-cover rounded"
                        />

                  ) : (
                    <span className="text-gray-400 italic">Tidak ada</span>
                  )}
                </td>
                <td className="border p-2">{item.judul}</td>
                <td className="border p-2">{item.keterangan}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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
