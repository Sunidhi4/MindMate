import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, CheckCircle2, Sparkles, HelpCircle } from "lucide-react";
import clsx from "clsx";

const AssessmentQuestions = ({ type, onBack }) => {
  const token = localStorage.getItem("token");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/assessment/${type}`,
          { headers }
        );
        setQuestions(res.data || []);
      } catch (err) {
        console.error("Failed to load questions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchQuestions();
    }
  }, [type]);

  const handleChange = (qid, score) => {
    setAnswers((prev) => ({ ...prev, [qid]: score }));
  };

  const handleSubmit = async () => {
    const payload = {
      userId: 1, // adjust if needed
      assessmentType: type,
      answers: Object.entries(answers).map(([q, s]) => ({
        questionId: Number(q),
        score: Number(s),
      })),
    };

    try {
      await axios.post(
        "http://localhost:8080/api/assessment",
        payload,
        { headers }
      );
      
      alert("Assessment submitted successfully!");
      if (onBack) onBack();
    } catch (err) {
      console.error("Failed to submit assessment:", err);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="animate-pulse space-y-6 w-full max-w-3xl p-8 bg-white border border-slate-200/60 rounded-3xl shadow-2xl">
          <div className="h-10 bg-indigo-500/10 rounded-2xl w-1/4"></div>
          <div className="h-32 bg-indigo-500/5 rounded-3xl"></div>
          <div className="h-32 bg-indigo-500/5 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-fuchsia-50/20 px-6 py-10 w-full text-slate-800">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-black text-indigo-600 bg-white backdrop-blur-md px-5 py-3.5 rounded-2xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-slate-50 active:scale-98 transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform text-indigo-500" />
            Back to Assessments
          </button>

          <div className="flex items-center gap-2.5 text-xs font-black bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 px-5 py-3.5 rounded-2xl border border-indigo-500/20 backdrop-blur-md">
            <Sparkles size={16} className="text-indigo-600 animate-pulse" />
            <span className="capitalize tracking-wider text-indigo-700">
              {type ? type.toLowerCase().replace("_", " ") : "Assessment"}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white border border-indigo-100 rounded-3xl p-6 shadow-[0_10px_40px_rgb(0,0,0,0.03)] space-y-3.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-500 tracking-wide flex items-center gap-2">
              <HelpCircle size={14} className="text-indigo-500" />
              Assessment Progress
            </span>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
              {answeredCount} / {questions.length} Answered
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/30">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          {questions.map((q, index) => {
            const selectedScore = answers[q.id];

            return (
              <div
                key={q.id}
                className={clsx(
                  "p-6 rounded-3xl border transition-all duration-300",
                  selectedScore !== undefined
                    ? "border-indigo-500/30 bg-white shadow-[0_12px_40px_rgb(0,0,0,0.05)] ring-1 ring-indigo-500/10"
                    : "border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-indigo-400/50"
                )}
              >
                <div className="flex items-start gap-5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-white font-black flex items-center justify-center text-xs flex-shrink-0 shadow-lg shadow-indigo-500/20">
                    {index + 1}
                  </div>

                  <div className="space-y-6 w-full">
                    <p className="text-sm font-black text-slate-800 leading-relaxed tracking-tight">
                      {q.question}
                    </p>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { label: "Never", score: 0, activeStyle: "bg-emerald-50 border-emerald-400 text-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.1)] font-black" },
                        { label: "Rarely", score: 1, activeStyle: "bg-teal-50 border-teal-400 text-teal-700 shadow-[0_0_20px_rgba(20,184,166,0.1)] font-black" },
                        { label: "Sometimes", score: 2, activeStyle: "bg-amber-50 border-amber-400 text-amber-700 shadow-[0_0_20px_rgba(245,158,11,0.1)] font-black" },
                        { label: "Often", score: 3, activeStyle: "bg-orange-50 border-orange-400 text-orange-700 shadow-[0_0_20px_rgba(249,115,22,0.1)] font-black" },
                        { label: "Very Often", score: 4, activeStyle: "bg-rose-50 border-rose-400 text-rose-700 shadow-[0_0_20px_rgba(244,63,94,0.1)] font-black" }
                      ].map((opt) => {
                        const isSelected = selectedScore === opt.score;
                        return (
                          <button
                            key={opt.score}
                            onClick={() => handleChange(q.id, opt.score)}
                            className={clsx(
                              "px-3 py-3.5 rounded-2xl text-[11px] border transition-all duration-300 text-center flex flex-col items-center gap-1.5 focus:outline-none text-slate-600 font-bold",
                              isSelected
                                ? opt.activeStyle
                                : "border-slate-200 bg-slate-50/40 hover:text-indigo-600 hover:border-indigo-400/80 hover:bg-indigo-50/30"
                            )}
                          >
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Section */}
        {questions.length > 0 && (
          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
              className={clsx(
                "w-full py-4 rounded-3xl font-black tracking-tight text-sm shadow-2xl transition-all duration-300 flex items-center justify-center gap-2",
                answeredCount < questions.length
                  ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:via-purple-500 hover:to-fuchsia-500 text-white shadow-purple-500/20 active:scale-[0.99]"
              )}
            >
              <CheckCircle2 size={16} />
              Submit Assessment
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AssessmentQuestions;