import clsx from "clsx";
import { ArrowRight, HelpCircle, Lock } from "lucide-react";

const AssessmentCard = ({ assessment, onClick, highlight, disabled }) => {
  return (
    <div
      onClick={!disabled ? onClick : null}
      className={clsx(
        "group relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer backdrop-blur-sm",
        highlight
          ? "border-indigo-500/30 dark:border-indigo-400/30 bg-gradient-to-br from-indigo-50/60 to-white dark:from-indigo-950/20 dark:to-slate-900/40 shadow-xl shadow-indigo-500/5"
          : "border-slate-200/50 dark:border-slate-800/60 bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900/50 dark:to-slate-900/10 shadow-sm hover:shadow-2xl hover:border-indigo-500/30 dark:hover:border-indigo-400/30",
        disabled && "opacity-60 cursor-not-allowed hover:shadow-none hover:border-slate-200/50 dark:hover:border-slate-800/60"
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-black text-lg text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {assessment.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 max-w-md">
            {assessment.description}
          </p>
        </div>

        {/* Badge for Total Questions */}
        {assessment.totalQuestions && (
          <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 px-3 py-1.5 rounded-2xl border border-indigo-500/10 shadow-sm flex-shrink-0">
            <HelpCircle size={12} />
            {assessment.totalQuestions} Questions
          </span>
        )}
      </div>

      {/* Action area */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/40">
        <span
          className={clsx(
            "text-xs font-black tracking-tight flex items-center gap-2",
            disabled
              ? "text-rose-500 dark:text-rose-400"
              : "text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform duration-300"
          )}
        >
          {disabled ? (
            <>
              <Lock size={14} />
              Not Eligible
            </>
          ) : (
            <>
              Start Assessment
              <ArrowRight size={14} />
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default AssessmentCard;