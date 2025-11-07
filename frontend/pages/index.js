import { useEffect, useState } from "react";
import axiosClient from "../lib/api";
import Link from "next/link";
import { FaUsers, FaBook, FaTrophy, FaChalkboardTeacher } from "react-icons/fa";


export default function Home() {
  const [profile, setProfile] = useState(null);
  const [prestasi, setPrestasi] = useState([]);
  const [galeri, setGaleri] = useState([]);

  useEffect(() => {
    // Ambil profil sekolah dari API backend (Laravel)
    axiosClient
      .get("/profiles/")
      .then((res) => {
        if (res.data.length) setProfile(res.data[0]);
      })
      .catch(console.error);

    // Ambil data prestasi dari API Next.js
    fetch("/api/achievements")
      .then((res) => res.json())
      .then(setPrestasi)
      .catch(console.error);

    fetch("http://localhost:8000/api/galeri/")
      .then((res) => res.json())
      .then((data) => setGaleri(data))
      .catch((err) => console.error(err));

  }, []);

  return (
    <main className="text-gray-800">
      {/* HERO SECTION */}
      <section
        className="relative h-[85vh] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Selamat Datang di <br />
            <span className="text-blue-400">SMAN 1 Contoh</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200">
            Membangun Generasi Cerdas, Berkarakter, dan Berprestasi
          </p>
          <Link
            href="/about"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition font-semibold"
          >
            Lihat Profil Sekolah
          </Link>
        </div>
      </section>

      {/* STATISTIK SEKOLAH */}
      <section className="relative z-20 -mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 bg-white shadow-lg rounded-2xl py-10 px-6">
          {/* Jumlah Siswa */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-3">
              <FaUsers size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">850+</h3>
            <p className="text-gray-500">Siswa Aktif</p>
          </div>

          {/* Guru */}
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-600 p-4 rounded-full mb-3">
              <FaChalkboardTeacher size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">45</h3>
            <p className="text-gray-500">Guru & Staff</p>
          </div>

          {/* Prestasi */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-3">
              <FaTrophy size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">120+</h3>
            <p className="text-gray-500">Prestasi</p>
          </div>

          {/* Program */}
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-3">
              <FaBook size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">12</h3>
            <p className="text-gray-500">Program Unggulan</p>
          </div>
        </div>
      </section>



      {/* TENTANG SEKOLAH */}
      <section className="max-w-5xl mx-auto text-center px-6 py-20">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-12 tracking-wide">
           Tentang Kami
          </h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
          SMAN 1 Contoh berdiri sejak tahun 1985 dengan komitmen untuk menciptakan
          lingkungan belajar yang inspiratif, inovatif, dan menyenangkan. Kami percaya
          bahwa setiap siswa memiliki potensi unik yang perlu dikembangkan untuk
          menghadapi tantangan masa depan.
        </p>
      </section>

      {/* PRESTASI TERBARU */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-12 tracking-wide">
            Prestasi Terbaru
          </h2>

          {prestasi.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {prestasi.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                >
                  {/* Gambar Prestasi */}
                  {item.gambar ? (
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-52 object-cover rounded-t-2xl mb-4"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400 rounded-t-2xl mb-4">
                      Tidak ada gambar
                    </div>
                  )}

                  {/* Judul dan Keterangan */}
                  <div className="px-6 pb-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-700 hover:text-blue-900 transition-colors">
                      {item.judul}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.keterangan}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg mt-4">Belum ada data prestasi.</p>
          )}
        </div>
      </section>



      {/* GALERI */}
      <section className="max-w-6xl mx-auto text-center px-6 py-20">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-12 tracking-wide">
          Galeri Kegiatan
        </h2>

        {galeri.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galeri.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1"
                >
                  {/* Gambar dengan efek zoom saat hover */}
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Overlay gelap saat hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold tracking-wide px-3">
                      {item.judul}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol lihat selengkapnya */}
            <div className="mt-10">
              <Link
                href="/galeri"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
              >
                Lihat Selengkapnya
              </Link>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Belum ada gambar galeri.</p>
        )}
      </section>
    </main>
  );
}
