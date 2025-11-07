import AdminLayout from "../../components/AdminLayout";
import {
  FaNewspaper,
  FaBullhorn,
  FaUser,
  FaTrophy,
  FaImages,
  FaUserTie
} from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Artikel */}
        <Link
          href="/admin/posts"
          className="flex flex-col items-center justify-center bg-blue-600 text-white py-6 rounded-xl shadow hover:bg-blue-700 transition"
        >
          <FaNewspaper size={32} className="mb-3" />
          <span className="font-semibold text-lg">Kelola Artikel</span>
        </Link>

        {/* Profil Sekolah */}
        <Link
          href="/admin/profile"
          className="flex flex-col items-center justify-center bg-indigo-600 text-white py-6 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <FaUser size={32} className="mb-3" />
          <span className="font-semibold text-lg">Kelola Profil</span>
        </Link>

        {/* Prestasi */}
        <Link
          href="/admin/achievements"
          className="flex flex-col items-center justify-center bg-yellow-500 text-white py-6 rounded-xl shadow hover:bg-yellow-600 transition"
        >
          <FaTrophy size={32} className="mb-3" />
          <span className="font-semibold text-lg">Kelola Prestasi</span>
        </Link>

        {/* Galeri */}
        <Link
          href="/admin/gallery"
          className="flex flex-col items-center justify-center bg-pink-600 text-white py-6 rounded-xl shadow hover:bg-pink-700 transition"
        >
          <FaImages size={32} className="mb-3" />
          <span className="font-semibold text-lg">Kelola Galeri</span>
        </Link>

        <Link
          href="/admin/gallery"
          className="flex flex-col items-center justify-center bg-green-600 text-white py-6 rounded-xl shadow hover:bg-green-700 transition"
        >
          <FaUserTie size={32} className="mb-3" />
          <span className="font-semibold text-lg">Kelola Staff</span>
        </Link>
      </div>
    </AdminLayout>
  );
}
