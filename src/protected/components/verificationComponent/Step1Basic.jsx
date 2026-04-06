import { useState } from "react";
import FormLayout from "./FormLayout";

const inputClass = `w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
  text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 
  rounded-xl px-4 py-3 text-sm
  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent 
  transition-all duration-200`;

const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
const errorClass = "text-red-500 dark:text-red-400 text-xs mt-1.5 flex items-center gap-1";

export default function Step1Basic({ next, updateData, formData }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z\s.]{3,80}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.fullName))
      newErrors.fullName = "Name should contain only letters (3–80 chars)";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.dob)
      newErrors.dob = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <FormLayout title="Basic Information" step={1}>
      <div className="space-y-5">

        <div>
          <label className={labelClass}>Full Name</label>
          <input
            className={inputClass}
            placeholder="e.g. Dr. Neha Sharma"
            value={formData.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
          />
          {errors.fullName && <p className={errorClass}>⚠ {errors.fullName}</p>}
        </div>

        <div>
          <label className={labelClass}>Email Address</label>
          <input
            className={inputClass}
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => updateData({ email: e.target.value })}
          />
          {errors.email && <p className={errorClass}>⚠ {errors.email}</p>}
        </div>

        <div>
          <label className={labelClass}>Date of Birth</label>
          <input
            type="date"
            className={inputClass}
            value={formData.dob}
            onChange={(e) => updateData({ dob: e.target.value })}
          />
          {errors.dob && <p className={errorClass}>⚠ {errors.dob}</p>}
        </div>

        <button
          onClick={() => validate() && next()}
          className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md shadow-teal-500/20 mt-2"
        >
          Continue →
        </button>
      </div>
    </FormLayout>
  );
}