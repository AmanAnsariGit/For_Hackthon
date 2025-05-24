import React, { useEffect, useState } from "react";
import { supabase } from "../Supabase/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  // 🔽 File Upload Function
  const uploadFile = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('books') // Bucket name
      .upload(fileName, file);

    if (error) {
      console.error("Upload failed:", error);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from('books')
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  };

  // 🔽 Fetch Books
  const fetchBooks = async () => {
    const { data, error } = await supabase.from("books").select("*");
    if (error) console.error(error);
    else setBooks(data);
    setLoading(false);
  };

  // 🔽 Auth Check
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) navigate("/");
    };

    checkSession();
    fetchBooks();
  }, []);

  // 🔽 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // 🔽 Submit Upload Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert("Title and file required");
      return;
    }

    const pdfUrl = await uploadFile(file);
    if (!pdfUrl) return;

    const user = await supabase.auth.getUser();
    const submitted_by = user.data.user.email;

    const { error } = await supabase.from("book_requests").insert([
      {
        title,
        author,
        pdf_url: pdfUrl,
        submitted_by,
      },
    ]);

    if (error) {
      console.error("Insert failed:", error);
    } else {
      alert("Book request submitted for approval!");
      setFile(null);
      setTitle("");
      setAuthor("");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 Book Library</h1>
        <div className="space-x-2">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-6 border p-4 rounded bg-gray-50 shadow"
      >
        <h2 className="text-lg font-semibold mb-2">Upload Book Request</h2>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full mb-2 border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="block w-full mb-2 border p-2 rounded"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <a
                href={book.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                View PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
