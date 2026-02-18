import { useState } from "react";
import FormLayout from "./FormLayout";

export default function Step3About({ next, back, updateData, formData }) {
  const [error, setError] = useState("");

  const validate = () => {
    if (!formData.about || formData.about.length < 500) {
      setError("About must be at least 1000 characters");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <FormLayout title="Professional Summary" step={3}>
      <div className="space-y-5">

        <textarea
          rows="8"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-teal-500"
          placeholder="Write detailed professional summary..."
          value={formData.about}
          onChange={(e)=>updateData({about:e.target.value})}
        />

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {formData.about.length} characters
          </span>
          <span className="text-red-500">{error}</span>
        </div>

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