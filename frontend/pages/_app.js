import Link from "next/link";
import "../styles/globals.css";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Cek apakah sedang di halaman admin
  const isAdminPage = router.pathname.startsWith("/admin");

  // Jika halaman admin, jangan tampilkan navbar/footer umum
  if (isAdminPage) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen">
        <Component {...pageProps} />
      </div>
    );
  }
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-blue-700 text-white shadow-md">
        <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">SMAN 1 Contoh</h1>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="no-underline hover:text-gray-200">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/about" className="no-underline hover:text-gray-200">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/blog" className="no-underline hover:text-gray-200">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="no-underline hover:text-gray-200">
                Kontak
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="no-underline hover:text-gray-200 font-semibold"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full">
        <Component {...pageProps} />
      </main>

      {/* FOOTER */}
      <footer className="bg-blue-800 text-white mt-20">
        {/* Bagian atas */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 py-12 border-b border-blue-600">
          {/* Tentang */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tentang SMAN 1 Contoh</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              SMAN 1 Contoh adalah sekolah menengah atas unggulan yang berkomitmen
              mencetak generasi berprestasi, berakhlak mulia, dan siap bersaing
              di era global melalui pendidikan berkualitas dan kegiatan inspiratif.
            </p>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Berita & Artikel
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-white text-lg mt-1" />
                <span>Jl. Pendidikan No. 10, Kota Contoh, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-white text-lg" />
                <a href="tel:+6221123456" className="hover:text-white transition">
                  (021) 123456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-white text-lg" />
                <a
                  href="mailto:info@sman1contoh.sch.id"
                  className="hover:text-white transition"
                >
                  info@sman1contoh.sch.id
                </a>
              </li>
            </ul>

            {/* Sosial Media */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-blue-400 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bagian bawah */}
        <div className="bg-blue-900 text-center py-4 text-sm text-blue-200">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">SMAN 1 Contoh</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
