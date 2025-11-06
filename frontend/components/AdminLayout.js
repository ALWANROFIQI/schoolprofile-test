import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome,
  FaNewspaper,
  FaUser,
  FaTrophy,
  FaSignOutAlt,
  FaImages,
  FaUserTie,
} from "react-icons/fa";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    // Tambahkan logika hapus session/token kalau ada
    // localStorage.removeItem("token");
    router.push("/"); // arahkan ke halaman beranda
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

        <nav className="flex-1 space-y-3">
          <Link
            href="/admin"
            className={`flex items-center gap-3 p-3 rounded hover:bg-blue-700 ${
              router.pathname === "/admin" ? "bg-blue-700" : ""
            }`}
          >
            <FaHome /> Dashboard
          </Link>

          <Link
            href="/admin/posts"
            className={`flex items-center gap-3 p-3 rounded hover:bg-blue-700 ${
              router.pathname.startsWith("/admin/posts") ? "bg-blue-700" : ""
            }`}
          >
            <FaNewspaper /> Artikel
          </Link>

          <Link
            href="/admin/profile"
            className={`flex items-center gap-3 p-3 rounded hover:bg-blue-700 ${
              router.pathname.startsWith("/admin/profile") ? "bg-blue-700" : ""
            }`}
          >
            <FaUser /> Profil Sekolah
          </Link>

          <Link href="/admin/achievements" className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded">
            <FaTrophy /> Prestasi
          </Link>

          <Link href="/admin/galeri"className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded">
            <FaImages /> Galeri
          </Link>

          <Link
            href="/admin/staff"
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded text-white transition-colors duration-200"
          >
            <FaUserTie className="text-lg" /> 
            <span>Staff Sekolah</span>
          </Link>


        </nav>

        {/* Tombol Keluar */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 p-3 rounded text-white mt-auto transition"
        >
          <FaSignOutAlt /> Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Navbar Admin */}
        <header className="bg-white shadow-md p-4 rounded-lg mb-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-700">
            Dashboard Admin
          </h1>
          <span className="text-gray-500 text-sm">Login sebagai Admin</span>
        </header>

        {/* Konten Halaman */}
        {children}

        {/* Footer Admin */}
        <footer className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SMAN 1 Contoh — Admin Panel
        </footer>
      </main>
    </div>
  );
}
