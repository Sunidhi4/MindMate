import { useState } from "react";
import FormLayout from "./FormLayout";

const inputClass = `w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
  text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 
  rounded-xl px-4 py-3 text-sm
  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent 
  transition-all duration-200`;

const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";
const errorClass = "text-red-500 dark:text-red-400 text-xs mt-1.5";

export default function Step4Contact({ next, back, updateData, formData }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const numberRegex = /^[0-9]+$/;
    const phoneRegex = /^\+91[6-9]\d{9}$/;

    if (!formData.address || formData.address.length < 10)
      newErrors.address = "Address must be at least 10 characters";
    if (!numberRegex.test(formData.fees))
      newErrors.fees = "Fees must be a numeric value";
    if (!phoneRegex.test(formData.phoneNo.replace(/[-\s]/g, "")))
      newErrors.phoneNo = "Format: +91XXXXXXXXXX (10 digits after +91)";
    if (!formData.gender)
      newErrors.gender = "Please select a gender";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <FormLayout title="Contact & Fee Details" step={4}>
      <div className="space-y-5">

        <div>
          <label className={labelClass}>Clinic / Professional Address</label>
          <input
            type="text"
            placeholder="e.g. Serenity Mind Clinic, Indiranagar, Bengaluru"
            value={formData.address}
            onChange={(e) => updateData({ address: e.target.value })}
            className={inputClass}
          />
          {errors.address && <p className={errorClass}>⚠ {errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Consultation Fees (₹)</label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 1800"
              value={formData.fees}
              onChange={(e) => updateData({ fees: e.target.value })}
              className={inputClass}
            />
            {errors.fees && <p className={errorClass}>⚠ {errors.fees}</p>}
          </div>

          <div>
            <label className={labelClass}>Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => updateData({ gender: e.target.value })}
              className={inputClass}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other / Prefer not to say</option>
            </select>
            {errors.gender && <p className={errorClass}>⚠ {errors.gender}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="text"
            placeholder="+919845012345"
            value={formData.phoneNo}
            onChange={(e) => updateData({ phoneNo: e.target.value })}
            className={inputClass}
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Include country code: +91XXXXXXXXXX</p>
          {errors.phoneNo && <p className={errorClass}>⚠ {errors.phoneNo}</p>}
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