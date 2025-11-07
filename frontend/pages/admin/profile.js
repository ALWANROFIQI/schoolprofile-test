import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    namaSekolah: "SMAN 1 Contoh",
    alamat: "Jl. Pendidikan No. 45, Jakarta",
    email: "info@sman1contoh.sch.id",
    telepon: "021-1234567",
    deskripsi: "Sekolah Menengah Atas Negeri 1 Contoh merupakan lembaga pendidikan unggulan yang berfokus pada pembentukan karakter dan prestasi akademik.",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profil sekolah berhasil disimpan!");
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Kelola Profil Sekolah</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nama Sekolah</label>
            <input
              name="namaSekolah"
              value={form.namaSekolah}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Alamat</label>
            <input
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Telepon</label>
            <input
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
