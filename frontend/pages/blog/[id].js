"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/blogs/");
        const data = await res.json();

        const current = data.find((item) => item.id === parseInt(id));
        const others = data.filter((item) => item.id !== parseInt(id));

        setBlog(current || null);
        setOtherBlogs(others);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <section className="py-16 text-center">
        <p>Memuat artikel...</p>
      </section>
    );

  if (!blog)
    return (
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Artikel tidak ditemukan.
        </h2>
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Kembali ke Blog
        </Link>
      </section>
    );

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative text-white py-24 px-6 md:px-16 bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.7)), url(${blog.gambar})`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-3">{blog.judul}</h1>
          <p className="text-gray-200">
            {new Date(blog.tanggal).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* KONTEN ARTIKEL */}
      <section className="py-16 px-6 md:px-16 bg-gray-50 text-gray-800">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Gambar Artikel */}
          {blog.gambar && (
            <img
              src={blog.gambar}
              alt={blog.judul}
              className="w-full h-auto rounded-2xl shadow-md object-cover"
            />
          )}

          {/* Isi Artikel */}
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.isi}
          </p>

          {/* Tombol Kembali */}
          <Link
            href="/blog"
            className="inline-flex items-center mt-8 text-blue-600 font-semibold hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Blog
          </Link>
        </div>
      </section>


      {/* ARTIKEL LAINNYA */}
      {otherBlogs.length > 0 && (
        <section className="py-16 px-6 md:px-16 bg-white border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
              Artikel Lainnya
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {otherBlogs.map((b) => (
                <article
                  key={b.id}
                  className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                >
                  {b.gambar && (
                    <img
                      src={b.gambar}
                      alt={b.judul}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800">{b.judul}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(b.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3">{b.isi.slice(0, 120)}...</p>

                    <Link
                      href={`/blog/${b.id}`}
                      className="group inline-flex items-center mt-3 text-blue-600 font-semibold transition-colors duration-300 hover:text-blue-800"
                    >
                      Baca Selengkapnya
                      <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
