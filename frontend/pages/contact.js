"use client";

import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function Contact() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      q: "Bagaimana cara mendaftar ke SMAN 1 Contoh?",
      a: "Pendaftaran dapat dilakukan secara online melalui website resmi sekolah atau datang langsung ke bagian administrasi sekolah.",
    },
    {
      q: "Apakah sekolah menerima pindahan dari sekolah lain?",
      a: "Ya, kami menerima siswa pindahan sesuai dengan ketentuan dan ketersediaan kuota.",
    },
    {
      q: "Bagaimana cara menghubungi pihak sekolah?",
      a: "Anda dapat menghubungi kami melalui form kontak di atas, email resmi, atau nomor telepon yang tersedia.",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">

      {/* Header Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-white text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-extrabold mb-3">Hubungi Kami</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Kami siap membantu Anda dan keluarga dalam mendapatkan informasi seputar pendidikan di sekolah kami. Silakan hubungi kami melalui form atau media komunikasi yang tersedia.
          </p>
        </div>
      </section>


      {/* Contact Section */}
      <section className="max-w-6xl mx-auto py-20 px-6 md:px-16 grid md:grid-cols-2 gap-12 bg-white shadow-lg rounded-2xl mt-16 relative z-10">
        {/* Form */}
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border border-gray-300 p-3 rounded-md h-32 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition w-full"
          >
            Send Message
          </button>
        </form>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-blue-700 font-semibold text-lg mb-2">Contact Us</h3>
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 leading-relaxed">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui
              kontak berikut atau kirim pesan melalui form.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaPhone className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-800">Call Us</p>
                <p className="text-gray-600">+62 812 3456 7890</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-800">Email Us</p>
                <p className="text-gray-600">info@sman1contoh.sch.id</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FaGlobe className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-800">Website</p>
                <p className="text-gray-600">www.sman1contoh.sch.id</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
              <div>
                <p className="font-semibold text-gray-800">Address</p>
                <p className="text-gray-600">
                  Jl. Pendidikan No. 12, Kota Contoh, Indonesia
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <p className="font-semibold text-gray-800 mb-2">Follow Us On</p>
            <div className="flex space-x-4 text-blue-600 text-2xl">
              <a href="#" aria-label="Facebook" className="hover:text-blue-800 transition">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-800 transition">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-blue-800 transition">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-800 transition">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 px-6 md:px-20 mt-16 border-t border-gray-100">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg shadow-sm">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full text-left px-6 py-4 font-semibold text-gray-800 flex justify-between items-center"
              >
                {item.q}
                <span className="text-blue-600">
                  {openFAQ === index ? "−" : "+"}
                </span>
              </button>
              {openFAQ === index && (
                <p className="px-6 pb-4 text-gray-600 leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.349940970514!2d110.37052707414618!3d-7.847938792205831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57b3d1c64eb9%3A0x42d2f4cf97a98f9f!2sSMAN%201%20Contoh!5e0!3m2!1sid!2sid!4v1709814457783!5m2!1sid!2sid"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </section>
    </div>
  );
}
