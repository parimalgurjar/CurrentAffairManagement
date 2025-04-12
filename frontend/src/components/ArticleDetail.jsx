import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/affairs/${id}`);
        setArticle(res.data);
      } catch (err) {
        toast.error("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ToastContainer position="top-right" autoClose={2000} />

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : !article ? (
        <p className="text-center text-red-500">No article found.</p>
      ) : (
        <div className="bg-white border border-gray-300 rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>

          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>Date:</strong> {new Date(article.date).toLocaleDateString()}</p>
            <p><strong>Subject:</strong> {article.subject}</p>
            <p><strong>Topic:</strong> {article.topic}</p>
            <p><strong>Source:</strong> {article.source}</p>
            <p><strong>Page Number:</strong> {article.pageNumber}</p>
          </div>

          {article.image ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${article.image}`}
              alt={article.title}
              className="mt-4 rounded-md max-w-full"
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <p className="italic text-gray-400 mt-4">No image available</p>
          )}

          <p className="mt-4 text-gray-800">{article.description}</p>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
