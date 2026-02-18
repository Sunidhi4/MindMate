import { useState } from "react";
import FormLayout from "./FormLayout";
import { Navigate, replace } from "react-router-dom";
export default function Step5Upload({ back, formData, updateData }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("Please select a file");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB");
      return;
    }

    updateData({ documents: file });
    setError("");
  };

  const removeFile = () => {
    updateData({ documents: null });
  };

  const handleSubmit = async () => {
    if (!formData.documents) {
      setError("Please upload required documents");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();

      form.append(
        "data",
        new Blob(
          [JSON.stringify(formData)],
          { type: "application/json" }
        )
      );

      form.append("file", formData.documents);

      const res = await fetch(
        "http://localhost:8080/expert/getVerified",
        {
          method: "POST",
          body: form,
        }
      );

      if (!res.ok) {
        throw new Error("Submission failed");
      }else{
       <Navigate to="/expert/underReview" replace/>
      }

      alert("Verification submitted successfully!");
    } catch (err) {
      setError("Something went wrong while submitting.");
    }

    setLoading(false);
  };

  return (
    <FormLayout title="Upload Documents" step={5}>
      <div className="space-y-8">

        {/* Upload Card */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-teal-500 transition">

          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-700">
              Upload Verification Documents
            </p>

            <p className="text-sm text-gray-500">
              Combine Aadhaar, PAN, Degree Certificates, Bank Details into one PDF
            </p>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-4 block w-full text-sm text-gray-600 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-600 file:text-white
              hover:file:bg-teal-700"
            />
          </div>
        </div>

        {/* Selected File Preview */}
        {formData.documents && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-green-700 font-medium">
                {formData.documents.name}
              </p>
              <p className="text-sm text-green-600">
                {(formData.documents.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={back}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Verification"}
          </button>
        </div>

      </div>
    </FormLayout>
  );
}