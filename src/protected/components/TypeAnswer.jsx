import React from 'react'
import axios from "axios";
import { useRef, useState } from 'react';

const TypeAnswer = ({question, submitting, setSubmitting}) => {

    const [loading, setLoading] = useState(false);
    const [answerInput, setAnswerInput] = useState("");
    const textAreaRef = useRef(null);

    // Submit a new answer
    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        if (!answerInput.trim()) return alert("Please write something before submitting.");
        try {
            setLoading(true);
            setSubmitting(true);
            const newAnswer = {
                questionId: question.id,
                answer: answerInput
            };
            const res = await axios.post(`http://localhost:8080/api/answer`, newAnswer,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );
            if (res.data) {
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

    const handleTextAreaChage = (e) => {
        setAnswerInput(e.target.value);
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }


    return (
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
    )
}

export default TypeAnswer