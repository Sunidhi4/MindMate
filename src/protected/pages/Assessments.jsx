import { useEffect, useState } from "react";
import axios from "axios";
import AssessmentCard from "../components/AssessmentCard";
import AssessmentQuestions from "../components/AssessmentQuestions";
import AssessmentResults from "../components/AssessmentResults";
import { Sparkles, CheckCircle2, ShieldCheck, Activity, HelpCircle } from "lucide-react";

const Assessments = () => {
  const token = localStorage.getItem("token");

  const [available, setAvailable] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [eligible, setEligible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [availRes, recRes, eligRes] = await Promise.all([
          axios.get("http://localhost:8080/api/assessment/getAvailableAssessments", { headers }),
          axios.get("http://localhost:8080/api/assessment/getRecommendedAssessment", { headers }),
          axios.get("http://localhost:8080/api/assessment/isEligible", { headers }),
        ]);

        setAvailable(availRes.data || []);
        setRecommended(recRes.data || []);
        setEligible(eligRes.data === true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  if (selected) {
    return (
      <AssessmentQuestions
        type={selected.type}
        onBack={() => setSelected(null)}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="animate-pulse space-y-6 w-full max-w-4xl p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
          <div className="h-28 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl"></div>
          <div className="h-64 bg-slate-100/40 dark:bg-slate-850/40 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/10 to-purple-50/10 dark:from-slate-950 dark:via-indigo-950/20 dark:to-purple-950/20 w-full px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Premium Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5 pointer-events-none"></div>
          <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 dark:from-indigo-400 dark:via-purple-400 dark:to-fuchsia-400">
                Mental Health Assessments
              </h1>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                <Activity size={14} className="text-indigo-600 dark:text-indigo-400 animate-pulse" />
                Understand your mental state and get personalized AI insights and recommendations.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-indigo-50/30 dark:bg-indigo-950/30 px-5 py-3 rounded-2xl border border-indigo-500/10 backdrop-blur-md shadow-sm">
              {eligible ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                    Eligibility: <span className="text-emerald-600 dark:text-emerald-400 font-black">Active</span>
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} className="text-amber-500" />
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                    Eligibility: <span className="text-amber-500 font-black">Restricted</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        {recommended.length > 0 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center gap-2.5">
                <Sparkles size={16} className="text-indigo-500 dark:text-indigo-400" />
                Recommended For You
              </h2>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Personalized needs</span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {recommended.map((a) => (
                <AssessmentCard
                  key={a.id}
                  assessment={a}
                  highlight
                  disabled={!eligible}
                  onClick={() => setSelected(a)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Assessments Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
              <HelpCircle size={16} className="text-slate-500 dark:text-slate-400" />
              All Assessments
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {available.map((a) => (
              <AssessmentCard
                key={a.id}
                assessment={a}
                disabled={!eligible}
                onClick={() => setSelected(a)}
              />
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="pt-6 border-t border-slate-200/30 dark:border-slate-800/40">
          <AssessmentResults />
        </div>

      </div>
    </div>
  );
};

export default Assessments;