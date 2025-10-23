import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Discussion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionId = location.state?.questionId;

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answerInput, setAnswerInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!questionId) {
      navigate("/user");
      return;
    }

    async function fetchQuestionDetails() {
      try {
        const res = await axios.get(
          `http://localhost:8080/question/getQuestionById?id=${questionId}`
        );
        setQuestion(res.data);
      } catch (error) {
        console.error("Failed to fetch question details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestionDetails();
  }, [questionId, navigate]);

  // Submit a new answer
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answerInput.trim()) return alert("Please write something before submitting.");

    const userId = sessionStorage.getItem("id");
    const username = sessionStorage.getItem("name");

    try {
      setSubmitting(true);
      const newAnswer = { 
        answer: answerInput,
        user : {id : sessionStorage.getItem("id")},
      };
      const res = await axios.post(`http://localhost:8080/answer/postAnswerByQuestionId/${questionId}`, newAnswer);

      if (res.data.status === "success" || res.data === true) {
        setAnswerInput("");
        // Refresh question data to include the new answer
        const updated = await axios.get(
          `http://localhost:8080/question/getQuestionById?id=${questionId}`
        );
        setQuestion(updated.data);
      } else {
        alert("Failed to post your answer.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading discussion...</p>;
  if (!question) return <p className="text-center text-gray-500 mt-10">Question not found.</p>;

  const readableTime = new Date(question.createdTime).toLocaleString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Sort answers: latest first
  const sortedAnswers = [...(question.answerList || [])].sort(
    (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
  );

  return (
    <div className=" bg-white shadow-lg rounded-lg border border-[#b1d0f0] p-10">
      {/* Question Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-[#000000] mb-2">{question.question}</h1>
        <p className="text-gray-600 text-sm">
          Asked by{" "}
          <span className="font-semibold text-purple-800">{question.username}</span> on{" "}
          {readableTime}
        </p>
      </div>

      {/* Answer Box directly below question */}
      <form onSubmit={handleSubmitAnswer} className="mb-6">
        <h3 className="text-lg font-semibold text-[#3C9BF9] mb-2">Your Answer</h3>
        <textarea
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          placeholder="Write your answer here..."
          className="w-full h-20 p-2 border border-[#9100BD] rounded-md focus:ring-1 focus:ring-[#3C9BF9] focus:outline-none resize-none text-sm text-black placeholder:text-gray-500"
        ></textarea>
        <div className="flex justify-end">
          <button
          type="submit"
          disabled={submitting}
          className={`mt-2 px-5 py-1.5 rounded-md text-white font-semibold text-sm transition
            ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] hover:opacity-80 hover:text-black"
            }`}
        >
          {submitting ? "Posting..." : "Post Answer"}
        </button>
        </div>
      </form>

      <hr className="mb-4 border-[#b1d0f0]" />

      {/* Answers Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#3C9BF9] mb-3">
          Answers ({sortedAnswers.length})
        </h2>

        {sortedAnswers.length > 0 ? (
          sortedAnswers.map((ans) => (
            <div
              key={ans.id}
              className="p-4 mb-3 bg-[#f9f9ff] border border-[#d7e3ff] rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-3 mb-2">
                <img
                  src={`https://i.pravatar.cc/50?u=${ans.user.email}`}
                  alt={ans.user.username}
                  className="w-8 h-8 rounded-full border border-[#9100BD]"
                />
                <div>
                  <p className="font-semibold text-[#9100BD] text-sm">{ans.user.username}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(ans.createdTime).toLocaleString("en-US", {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-line text-gray-800 text-sm leading-relaxed">{ans.answer}</p>

              <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                ❤️ {ans.likes} likes
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No answers yet. Be the first to respond!</p>
        )}
      </div>
    </div>
  );
};

export default Discussion;
