import axios from "axios";
import { useEffect, useState } from "react";
import { UserPost } from "../../userComponents/userPost";

const Share = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const userId = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("name");

  //updating profile when user share somethig on this page
  async function updateSessionStorage() {
    try {
      const res = await axios.get(`http://localhost:8080/User/getUserById/${userId}`);
      if (res.data.status === "success") {
        sessionStorage.setItem("answersCount", res.data.user.answersCount);
        sessionStorage.setItem("questionsCount", res.data.user.questionsCount);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //getting users all previous questions
  useEffect(() => {
    const getAllQuestionsByUserId = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/question/getQuestionByUserId?id=${userId}`);
        if (Array.isArray(res.data)) {
          const sortedQuestions = res.data.sort(
            (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
          );
          setQuestions(sortedQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    getAllQuestionsByUserId();
  }, [userId])

  //user posting a post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      alert("Please enter some text before sending!");
      return;
    }

    const newQuestion = {
      question: inputValue,
      userId: userId,
      username: username
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "http://localhost:8080/question/createQuestion",
        newQuestion
      );

      if (res.data.status === "success") {
        updateSessionStorage();
        setInputValue("");
        await getAllQuestionsByUserId();
      } else {
        console.error("Server error:", res.data);
      }
    } catch (error) {
      console.error("Error posting question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Section 1: Share Your Mind */}
      <section className="bg-white shadow-lg rounded-lg p-6 border border-[#b1d0f0] ">
        <h2 className="text-2xl font-semibold text-[#9100BD] mb-6 px-4">Share Your Mind</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Express your thoughts, emotions, or problems here..."
            className="w-full h-40 p-4 border border-[#9100BD] rounded-md focus:ring-1 focus:ring-[#3C9BF9] focus:outline-none resize-none placeholder:text-gray-400 text-gray-900 bg-white"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`self-end px-6 py-2 rounded-md text-white font-semibold transition
              ${isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-[#3C9BF9] to-[#9100BD] hover:opacity-80 hover:text-black"
              }`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </section>

      {/* Section 2: Your Shared Reflections */}
      <section className="bg-white shadow-lg rounded-lg p-6 border border-[#98c5f1] ">
        <h2 className="text-2xl font-semibold text-[#9100BD] mb-6">Your Shared Reflections</h2>
        <div className="flex flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <UserPost key={question.id} question={question} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No questions found.</p>
          )}

        </div>

      </section>
    </div>
  );
};

export default Share;
