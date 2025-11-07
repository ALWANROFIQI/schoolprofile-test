"use client";
import React from "react";
import Link from "next/link";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8000/api/galeri/");
  const galeri = await res.json();

  return { props: { galeri } };
}
export default function GaleriPage({ galeri }) {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl">
            Galeri Kegiatan
          </h1>
          <p className="text-gray-200 mt-4 text-lg md:text-xl">
            Menyajikan momen-momen terbaik kegiatan sekolah kami
          </p>
        </div>
      </section>

      {/* Galeri Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {galeri && galeri.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galeri.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1"
              >
                {/* Gambar dengan efek zoom saat hover */}
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Overlay gelap saat hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold tracking-wide px-3 text-center">
                    {item.judul}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Belum ada gambar galeri.</p>
        )}

      </section>
    </div>
  );
}
