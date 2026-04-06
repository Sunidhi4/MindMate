import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "./FormLayout";
import axios from "axios";

export default function Step5Upload({ back, formData, updateData }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleFile = (file) => {
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

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const removeFile = () => {
    updateData({ documents: null });
  };

  const handleSubmit = async () => {
    if (!formData.documents) {
      setError("Please upload your verification documents");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Build the payload object (exclude the File object from JSON)
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        dob: formData.dob,
        address: formData.address,
        about: formData.about,
        fees: Number(formData.fees),
        experience: Number(formData.experience),
        gender: formData.gender,
        phoneNo: formData.phoneNo,
        qualifications: formData.qualifications,
      };

      const form = new FormData();

      // 'data' field: JSON blob with content-type application/json
      form.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );

      // 'file' field: the actual PDF File object
      form.append("file", formData.documents, formData.documents.name);

      const res = await axios.post("http://localhost:8080/expert/getVerified", form,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
       );

      if (!res.ok) {
        
      }

      // Navigate on success
      navigate("/expert/underReview", { replace: true });

    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout title="Upload Documents" step={5}>
      <div className="space-y-5">

        {/* Info banner */}
        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
          <p className="text-sm font-semibold text-teal-800 dark:text-teal-300 mb-1">What to include in the PDF:</p>
          <ul className="text-xs text-teal-700 dark:text-teal-400 space-y-1 list-disc list-inside">
            <li>Aadhaar Card</li>
            <li>PAN Card</li>
            <li>Degree / Qualification Certificates</li>
            <li>Bank Account Details / Cancelled Cheque</li>
          </ul>
        </div>

        {/* Drop zone */}
        {!formData.documents ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer
              ${dragOver
                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/10"
              }`}
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="pointer-events-none space-y-3">
              {/* PDF icon */}
              <div className="mx-auto w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>

              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Drop your PDF here, or <span className="text-teal-600 dark:text-teal-400">browse</span>
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PDF only · Max 5MB</p>
              </div>
            </div>
          </div>
        ) : (
          /* File preview */
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-green-800 dark:text-green-300 font-semibold text-sm truncate">
                {formData.documents.name}
              </p>
              <p className="text-green-600 dark:text-green-400 text-xs mt-0.5">
                {(formData.documents.size / 1024 / 1024).toFixed(2)} MB · PDF
              </p>
            </div>

            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium shrink-0 transition-colors"
            >
              Remove
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
            <p className="text-red-600 dark:text-red-400 text-sm">⚠ {error}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={back}
            disabled={loading}
            className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !formData.documents}
            className="flex-2 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md shadow-teal-500/20 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit for Verification ✓"
            )}
          </button>
        </div>

      </div>
    </FormLayout>
  );
}