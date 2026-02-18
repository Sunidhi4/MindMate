import { useState } from "react";
import FormLayout from "./FormLayout";

export default function Step1Basic({ next, updateData, formData }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.fullName))
      newErrors.fullName = "Name should contain only letters";

    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.dob)
      newErrors.dob = "DOB required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <FormLayout title="Basic Information" step={1}>
      <div className="space-y-5">

        <div>
          <input
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e)=>updateData({fullName:e.target.value})}
          />
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        </div>

        <div>
          <input
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
            placeholder="Email"
            value={formData.email}
            onChange={(e)=>updateData({email:e.target.value})}
          />
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        </div>

        <div>
          <input
            type="date"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
            value={formData.dob}
            onChange={(e)=>updateData({dob:e.target.value})}
          />
          <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
        </div>

        <button
          onClick={()=>validate() && next()}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg w-full"
        >
          Next
        </button>

      </div>
    </FormLayout>
  );
}