"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/blogs/")
      .then((res) => res.json())
      .then(setBlogs)
      .catch(console.error);
  }, []);

  return (
    <>
      <section
        className="relative text-white py-20 px-6 md:px-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.7)), url('https://source.unsplash.com/1600x800/?school,education')",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Blog Sekolah</h1>
          <p className="text-lg mb-8 text-gray-200">
            Temukan berbagai kegiatan, prestasi, dan informasi terbaru dari sekolah kami.
          </p>
        </div>
      </section>

      <section id="artikel" className="py-16 px-6 md:px-16 bg-gray-50 text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center">
            Artikel Terbaru
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                {b.gambar && (
                  <img
                    src={b.gambar}
                    alt={b.judul}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {b.judul}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(b.tanggal).toLocaleDateString("id-ID")}
                  </p>
                  <p className="text-gray-700 line-clamp-3">{b.isi}</p>

                  <Link
                    href={`/blog/${b.slug}`}
                    className="inline-block mt-3 text-blue-600 font-semibold hover:underline"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
