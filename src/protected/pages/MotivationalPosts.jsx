import { useEffect, useState } from "react";
import ImagePost from "../components/ImagePost";
import Pagination from "../../utils/Pagination";
const MotivationalPosts = () => {
     const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page , setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages , setTotalPages] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:8080/api/media/access/getAll?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [page]);

  if (loading) return <p className="text-center mt-5">Loading posts...</p>;


  return (
    <>
     
    <div className="min-h-screen bg-gray-100 py-10 px-4 rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Motivational Posts
      </h1>

      <div className="max-w-4xl mx-auto space-y-8 flex flex-wrap">
        {posts && posts.map((post) => (
          <ImagePost key={post.id} post={post} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
    
    </>
    
  )
}

export default MotivationalPosts


