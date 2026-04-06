import { useState } from "react";
import FormLayout from "./FormLayout";

const inputClass = `w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
  text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 
  rounded-xl px-4 py-3 text-sm
  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent 
  transition-all duration-200`;

const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
const errorClass = "text-red-500 dark:text-red-400 text-xs mt-1.5 flex items-center gap-1";

export default function Step2Professional({ next, back, updateData, formData }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const numberRegex = /^[0-9]+$/;

    if (!numberRegex.test(formData.experience))
      newErrors.experience = "Experience must be a number (years)";
    if (!formData.qualifications || formData.qualifications.length === 0)
      newErrors.qualifications = "At least one qualification is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const qualDisplay = Array.isArray(formData.qualifications)
    ? formData.qualifications.join(", ")
    : "";

  return (
    <FormLayout title="Professional Details" step={2}>
      <div className="space-y-5">

        <div>
          <label className={labelClass}>Years of Experience</label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 9"
            value={formData.experience}
            onChange={(e) => updateData({ experience: e.target.value })}
            className={inputClass}
          />
          {errors.experience && <p className={errorClass}>⚠ {errors.experience}</p>}
        </div>

        <div>
          <label className={labelClass}>Qualifications</label>
          <input
            type="text"
            placeholder="e.g. MBBS, MD Psychiatry"
            defaultValue={qualDisplay}
            onChange={(e) =>
              updateData({
                qualifications: e.target.value
                  .split(",")
                  .map((q) => q.trim())
                  .filter((q) => q !== ""),
              })
            }
            className={inputClass}
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Separate with commas</p>
          {errors.qualifications && <p className={errorClass}>⚠ {errors.qualifications}</p>}

          {/* Qualification tags preview */}
          {formData.qualifications?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.qualifications.map((q, i) => (
                <span key={i} className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-medium px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                  {q}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
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