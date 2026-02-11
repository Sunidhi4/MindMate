import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Pagination from "../../../utils/Pagination";
import { UserPost } from "../../userComponents/userPost";
const Support = () => {

  const [questions, setQuestions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(10); // fixed size
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/question/getAll?page=${page}&size=${size}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(res.data)
        setTotalPages(res.data.totalPages)
        if (Array.isArray(res.data.content)) {
          const sortedQuestions = res.data.content.sort(
            (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
          );
          setQuestions(sortedQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    getAllQuestions();
  }, [page, refresh])

  const handlePostDelete = () => {
    setRefresh(prev => !prev);
  }
  return (
    <div className="">
      <section className="bg-white shadow-lg rounded-lg p-6 border border-[#98c5f1] ">
        <h2 className="text-2xl font-semibold text-[#9100BD] mb-6">Reflections</h2>
        <div className="flex flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <UserPost
                key={question.id}
                question={question}
                onPostDeleteSuccess={handlePostDelete}
                setRefresh={setRefresh} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No questions found.</p>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>

      </section>
    </div>
  );
};

export default Support;