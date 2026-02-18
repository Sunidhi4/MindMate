import { useState } from "react";
import FormLayout from "./FormLayout";

export default function Step4Contact({ next, back, updateData, formData }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const numberRegex = /^[0-9]+$/;
    const phoneRegex = /^\+91[6-9]\d{9}$/;

    if (!formData.address || formData.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    if (!numberRegex.test(formData.fees)) {
      newErrors.fees = "Fees must be numeric";
    }

    if (!phoneRegex.test(formData.phoneNo)) {
      newErrors.phoneNo = "Phone must be +91XXXXXXXXXX format";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <FormLayout title="Contact & Fee Details" step={4}>
      <div className="space-y-5">

        {/* Address */}
        <div>
          <input
            type="text"
            placeholder="Clinic / Professional Address"
            value={formData.address}
            onChange={(e)=>updateData({address:e.target.value})}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.address}
          </p>
        </div>

        {/* Fees */}
        <div>
          <input
            type="text"
            placeholder="Consultation Fees"
            value={formData.fees}
            onChange={(e)=>updateData({fees:e.target.value})}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.fees}
          </p>
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            placeholder="+919845012345"
            value={formData.phoneNo}
            onChange={(e)=>updateData({phoneNo:e.target.value})}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.phoneNo}
          </p>
        </div>

        {/* Gender */}
        <div>
          <select
            value={formData.gender}
            onChange={(e)=>updateData({gender:e.target.value})}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <p className="text-red-500 text-sm mt-1">
            {errors.gender}
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