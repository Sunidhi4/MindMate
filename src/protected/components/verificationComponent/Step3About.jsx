import { useState } from "react";
import FormLayout from "./FormLayout";

export default function Step3About({ next, back, updateData, formData }) {
  const [error, setError] = useState("");
  const MIN_CHARS = 500;

  const validate = () => {
    if (!formData.about || formData.about.length < MIN_CHARS) {
      setError(`About must be at least ${MIN_CHARS} characters`);
      return false;
    }
    setError("");
    return true;
  };

  const charCount = formData.about?.length || 0;
  const progress = Math.min((charCount / MIN_CHARS) * 100, 100);
  const isEnough = charCount >= MIN_CHARS;

  return (
    <FormLayout title="Professional Summary" step={3}>
      <div className="space-y-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            About You
          </label>
          <textarea
            rows="9"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
              text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 
              rounded-xl px-4 py-3 text-sm resize-none
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent 
              transition-all duration-200"
            placeholder="Describe your clinical expertise, approach to care, specializations, and achievements..."
            value={formData.about}
            onChange={(e) => {
              updateData({ about: e.target.value });
              if (error && e.target.value.length >= MIN_CHARS) setError("");
            }}
          />

          {/* Character counter + bar */}
          <div className="mt-2 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className={isEnough ? "text-teal-600 dark:text-teal-400 font-medium" : "text-gray-400 dark:text-gray-500"}>
                {charCount} / {MIN_CHARS} min characters
              </span>
              {isEnough && (
                <span className="text-teal-600 dark:text-teal-400 font-medium">✓ Looks good!</span>
              )}
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${isEnough ? "bg-teal-500" : "bg-amber-400"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">⚠ {error}</p>}
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={back}
            className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition-all duration-200"
          >
            ← Back
          </button>
          <button
            onClick={() => validate() && next()}
            className="flex-2 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md shadow-teal-500/20"
          >
            Continue →
          </button>
        </div>

      </div>
    </FormLayout>
  );
}