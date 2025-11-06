"use client";
import { useEffect, useState } from "react";

export default function About() {
  const [staff, setStaff] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(true);

  // Ambil data staff dari backend Django
  useEffect(() => {
    fetch("http://localhost:8000/api/staff/")
      .then((res) => res.json())
      .then((data) => {
        setStaff(data);
        setLoadingStaff(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data staff:", err);
        setLoadingStaff(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-white text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-extrabold mb-3">Tentang SMAN 1 Contoh</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Membangun generasi unggul yang berkarakter, berpengetahuan luas, dan siap menghadapi tantangan dunia modern.
          </p>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
              alt="Kepala Sekolah"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Sambutan Kepala Sekolah</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <span className="font-semibold">Assalamu’alaikum Warahmatullahi Wabarakatuh,</span>
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Selamat datang di website resmi <span className="font-semibold text-blue-700">SMAN 1 Contoh</span>.
              Kami berkomitmen untuk menghadirkan pendidikan berkualitas yang mengedepankan integritas, disiplin, serta semangat inovasi.
            </p>
            <p className="text-gray-700 italic">Wassalamu’alaikum Warahmatullahi Wabarakatuh.</p>
            <div className="mt-4">
              <p className="font-semibold text-gray-800">Drs. Budi Santoso</p>
              <p className="text-sm text-gray-500">Kepala Sekolah SMAN 1 Contoh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-16 px-6 md:px-16">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Sejarah Singkat</h3>
          <p className="text-gray-700 leading-relaxed">
            Berdiri sejak tahun 1985, SMAN 1 Contoh telah menjadi salah satu sekolah unggulan di wilayahnya.
            Bermula dengan hanya 4 ruang kelas dan 120 siswa, kini berkembang menjadi sekolah dengan lebih dari
            1.000 siswa, tenaga pendidik profesional, serta fasilitas modern yang mendukung kegiatan belajar mengajar.
          </p>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Visi</h3>
            <p className="text-gray-700 italic">
              “Terwujudnya peserta didik yang beriman, berakhlak mulia, unggul dalam prestasi, dan mampu bersaing di tingkat global.”
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Misi</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Meningkatkan kualitas pembelajaran yang berorientasi pada siswa.</li>
              <li>Menanamkan nilai disiplin, tanggung jawab, dan kerja sama.</li>
              <li>Mendorong penguasaan teknologi dan bahasa asing.</li>
              <li>Mengembangkan kegiatan ekstrakurikuler untuk pembentukan karakter.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="py-16 px-6 md:px-16">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Fasilitas Sekolah</h3>
          <ul className="list-disc list-inside grid md:grid-cols-2 gap-2 text-gray-700">
            <li>Laboratorium Komputer & Sains</li>
            <li>Perpustakaan Digital</li>
            <li>Lapangan Olahraga Multifungsi</li>
            <li>Ruang Musik & Kesenian</li>
            <li>Mushola & Area Ibadah</li>
            <li>Kantin Sehat dan Ramah Lingkungan</li>
          </ul>
        </div>
      </section>

      {/* Daftar Guru */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Daftar Guru</h3>

          {loadingStaff ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center bg-gray-100 rounded-xl p-5 animate-pulse"
                >
                  <div className="w-28 h-28 mb-4 bg-gray-300 rounded-full" />
                  <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : staff.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {staff.map((guru) => (
                <div
                  key={guru.id}
                  className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-28 h-28 mb-4">
                    <img
                      src={
                        guru.photo
                          ? guru.photo.startsWith("http")
                            ? guru.photo
                            : `http://localhost:8000${guru.photo}`
                          : "/default-avatar.png"
                      }
                      alt={guru.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800">{guru.name}</h4>
                  <p className="text-sm text-gray-600">{guru.position}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Belum ada data guru.</p>
          )}
        </div>
      </section>
    </div>
  );
}
