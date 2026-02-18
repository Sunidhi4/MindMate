import { useState } from "react";
import FormLayout from "./FormLayout";

export default function Step2Professional({ next, back, updateData, formData }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const numberRegex = /^[0-9]+$/;

    if (!numberRegex.test(formData.experience)) {
      newErrors.experience = "Experience must be numeric";
    }

    if (!formData.qualifications || formData.qualifications.length === 0) {
      newErrors.qualifications = "At least one qualification required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <FormLayout title="Professional Details" step={2}>
      <div className="space-y-5">

        {/* Experience */}
        <div>
          <input
            type="text"
            placeholder="Years of Experience"
            value={formData.experience}
            onChange={(e)=>updateData({experience:e.target.value})}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.experience}
          </p>
        </div>

        {/* Qualifications */}
        <div>
          <input
            type="text"
            placeholder="Qualifications (comma separated)"
            onChange={(e)=>
              updateData({
                qualifications: e.target.value
                  .split(",")
                  .map(q=>q.trim())
                  .filter(q=>q !== "")
              })
            }
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.qualifications}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={back}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg"
          >
            Back
          </button>

          <button
            onClick={()=>validate() && next()}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
          >
            Next
          </button>
        </div>

      </div>
    </FormLayout>
  );
}