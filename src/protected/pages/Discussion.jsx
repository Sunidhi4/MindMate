import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import AnswerBox from "../components/AnswerBox";
import TypeAnswer from "../components/TypeAnswer";

const Discussion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const username = localStorage.getItem("username");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  //getting question data
  const [question, setQuestion] = useState(location.state?.question);
  useEffect(() => {
    if (!question) {
      alert("question not found");
      navigate(-1)
    }
  }, []);

  useEffect(() => {
    const getAllAnswersByQuestionId = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/answer/getAllAnswersByQuestionId/${question.id}?page=${page}&size=${size}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setTotalPages(res.data.totalPages)
        setTotalElements(res.data.totalElements)
        if (res.data) {
          setAnswers(res.data.content);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAllAnswersByQuestionId();
  }, [page, submitting, deleting])


  if (loading) return <p className="text-center text-gray-500 mt-10">Loading discussion...</p>;

  function displayTime(date) {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }


  // Sort answers: latest first
  const sortedAnswers = [...(answers || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );



  return (
    <div className=" bg-white shadow-lg rounded-lg border border-[#b1d0f0] p-10">
      <p className="pb-3 -mt-4 text-sm flex items-center gap text-blue-500 hover:underline" onClick={() => navigate(-1)}><ArrowLeft size={14} />back</p>
      {/* Question Header */}
      <div className="mb-4">

        <h1 className="text-3xl font-semibold text-[#000000] mb-2">
          {question.question}
        </h1>
        <p className="text-gray-600 text-sm">
          Asked by{" "}
          {question.username !== username ? (
            <span className="font-semibold text-purple-800">
              {question.username}
            </span>
          ) : (
            <span className="font-semibold text-purple-800">you</span>
          )}{" "}
          on
          {`  ${displayTime(question.createdTime)}`}

        </p>
      </div>

      {/* Answer Box directly below question */}
      {question.username !== username
        ?
        <TypeAnswer
         question={question}  
         submitting={submitting}
         setSubmitting={setSubmitting}
         />
        : ""
      }

      <hr className="mb-4 border-[#b1d0f0]" />
      {/* Answers Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#3C9BF9] mb-3">
          Answers ({totalElements})
        </h2>

        {sortedAnswers.length > 0 ? (
          sortedAnswers.map((ans) => (
            <AnswerBox ans={ans} key={ans.id} />
          ))
        ) : (
          <p className="text-gray-500 italic">No answers yet. Be the first to respond!</p>
        )}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>
  );
};

export default Discussion;
