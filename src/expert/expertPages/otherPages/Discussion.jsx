import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import axios from "axios";
import API from "../../../services/api";
import { toast } from "react-toastify";

const Discussion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [answerInput, setAnswerInput] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [answers, setAnswers] = useState([]);
    const textAreaRef = useRef(null);
    const [deleting, setDeleting] = useState(false);
    const expertId = sessionStorage.getItem("id");
    const expertname = sessionStorage.getItem("name");

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
                const res = await axios.get(`http://localhost:8080/answer/getAllAnswersByQuestionId/${question.id}`);
                if (res.data) {
                    setAnswers(res.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getAllAnswersByQuestionId();
    }, [submitting, deleting])

    const handleTextAreaChage = (e) => {
        setAnswerInput(e.target.value);
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
    // Submit a new answer
    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        if (!answerInput.trim()) return alert("Please write something before submitting.");
        try {
            setLoading(true);
            setSubmitting(true);
            const newAnswer = {
                answer: answerInput,
                expert: { id: expertId },
            };
            const res = await axios.post(`http://localhost:8080/answer/postAnswerByQuestionId/${question.id}`, newAnswer);

            if (res.data.status === "success" || res.data === true) {
                setAnswerInput("");
                setLoading(false);
            } else {
                alert("Failed to post your answer.");
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading discussion...</p>;


    const readableTime = new Date(question.createdTime).toLocaleString("en-US", {
        month:"short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    // Sort answers: latest first
    const sortedAnswers = [...(answers || [])].sort(
        (a, b) => new Date(b.time) - new Date(a.time)
    );

    //deleting Own answer
    const handleDelete = async (answerId) => {
        let isSure = window.confirm("Do you want to delete your answer?")
        if (isSure) {
            try {
                setDeleting(true);
                const res = await axios.delete(`http://localhost:8080/answer/deleteAnswerByAnswerId/${answerId}`);
                if (res.data == true) {
                    toast.success("Reflection deleted")

                } else {
                    toast.error("Error Reflection deleted")
                }
            }
            catch (error) {
                console.log(error);
            } finally {
                setDeleting(false);
            }
        }
        return;
    }

    return (
        <div className=" bg-white shadow-lg rounded-lg border border-[#b1d0f0] p-10">
            <p className="pb-3 -mt-4 text-sm flex items-center gap text-blue-500 hover:underline" onClick={() => navigate(-1)}><ArrowLeft size={14} />back</p>
            {/* Question Header */}
            <div className="mb-4">

                <h1 className="text-3xl font-semibold text-[#000000] mb-2">
                    {question.question}
                </h1>
                <p className="text-gray-600 text-sm">
                    Asked by <span className="text-[#a612bd] font-semibold">{question.username } </span> 
                     
                    on
                    {`  ${readableTime}`}

                </p>
            </div>

            {/* Answer Box directly below question */}
            <form onSubmit={handleSubmitAnswer} className="mb-6">
                <h3 className="text-lg font-semibold text-[#3C9BF9] mb-2">Your Answer</h3>
                <textarea
                    ref={textAreaRef}
                    onChange={handleTextAreaChage}
                    value={answerInput}

                    placeholder="Write your answer here..."
                    className="w-full min-h-20  p-2 border border-[#9100BD] rounded-md focus:ring-1 focus:ring-[#3C9BF9] focus:outline-none resize-none text-sm text-black placeholder:text-gray-500"
                ></textarea>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`mt-2 px-5 py-1.5 rounded-md text-white font-semibold text-sm transition
            ${submitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-linear-to-r from-[#3C9BF9] to-[#9100BD] hover:opacity-80 hover:text-black"
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
                    Answers ({answers.length})
                </h2>

                {sortedAnswers.length > 0 ? (
                    sortedAnswers.map((ans) => (
                        <div
                            key={ans.id}
                            className="p-4 mb-3 bg-[#f9f9ff] border border-[#d7e3ff] rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-start gap-3 mb-2">
                                <img
                                    src={`https://i.pravatar.cc/50?u=${ans.name}`}
                                    alt={ans.name}
                                    className="w-8 h-8 rounded-full border border-[#9100BD]"
                                />
                                <div>
                                    {ans.senderType == "user"
                                        ?
                                        (<p className="font-semibold text-[#9100BD] text-sm">{ans.name}</p>)
                                        :
                                        (

                                            <p className="font-bold text-[#9100BD] text-sm  ">{ans.name === expertname ? "You" : `${ans.name}`}<span className="text-blue-600 no-underline"> | Expert</span></p>

                                        )
                                    }

                                    <p className="text-xs text-gray-500">
                                        {new Date(ans.time).toLocaleString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <p className="whitespace-pre-line text-gray-800 text-sm leading-relaxed">{ans.answer}</p>

                            <div className="flex justify-between">
                                <div className=" text-xs text-gray-500 mt-2 flex items-center gap-2">❤️ {ans.likes} likes</div>
                                <div className="mt-2">
                                    {expertname === ans.name ?
                                        (
                                            <button
                                                onClick={() => handleDelete(ans.id)}
                                                className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-all duration-200"
                                            >
                                                {deleting ? (
                                                    <span className="text-xs text-gray-400">Deleting...</span>
                                                ) : (
                                                    <Trash2 size={18} />
                                                )}
                                            </button>
                                        )
                                        :
                                        ""
                                    }
                                </div>
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
