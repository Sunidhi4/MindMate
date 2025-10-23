import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { UserPost } from "../userComponents/userPost";
const Support = () => {

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/question/getAllQuestions`);
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

    getAllQuestions();
  }, [])


  return (
    <div className="">
      <section className="bg-white shadow-lg rounded-lg p-6 border border-[#98c5f1] ">
        <h2 className="text-2xl font-semibold text-[#9100BD] mb-6">Reflections</h2>
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

export default Support;