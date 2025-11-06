// pages/api/achievements.js

export default async function handler(req, res) {
  const API_URL = "http://localhost:8000/api/achievements/";

  if (req.method === "GET") {
    const response = await fetch(API_URL);
    const data = await response.json();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    try {
      const formData = new FormData();
      formData.append("judul", req.body.judul);
      formData.append("keterangan", req.body.keterangan);
      if (req.body.gambar) formData.append("gambar", req.body.gambar);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return res.status(201).json(data);
    } catch (err) {
      console.error("POST error:", err);
      return res.status(500).json({ error: "Gagal menambah data" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, judul, keterangan } = req.body;
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("keterangan", keterangan);
      if (req.body.gambar) formData.append("gambar", req.body.gambar);

      const response = await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error("PUT error:", err);
      return res.status(500).json({ error: "Gagal update data" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    const response = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });
    return res.status(200).json({ message: "deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
