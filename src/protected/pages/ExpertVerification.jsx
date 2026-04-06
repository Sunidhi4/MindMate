import { useState, useEffect } from "react";
import Step1Basic from "../components/verificationComponent/Step1Basic";
import Step2Professional from "../components/verificationComponent/Step2Professional";
import Step3About from "../components/verificationComponent/Step3About";
import Step4Contact from "../components/verificationComponent/Step4Contact";
import Step5Upload from "../components/verificationComponent/Step5Upload";

export default function ExpertVerification() {
  const [step, setStep] = useState(1);
  const [dark, setDark] = useState(false);

  // Sync dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    address: "",
    about: "",
    fees: "",
    experience: "",
    gender: "",
    phoneNo: "",
    qualifications: [],
    documents: null,
  });

  const next = () => setStep((prev) => Math.min(prev + 1, 5));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  // ✅ Fixed: was incorrectly passing formData instead of updateData to Step5
  const updateData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const stepProps = { next, back, updateData, formData };

  return (
    <div className="relative">
      {/* Dark mode toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg transition-all hover:scale-110"
        title="Toggle dark mode"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      {step === 1 && <Step1Basic {...stepProps} />}
      {step === 2 && <Step2Professional {...stepProps} />}
      {step === 3 && <Step3About {...stepProps} />}
      {step === 4 && <Step4Contact {...stepProps} />}
      {step === 5 && <Step5Upload back={back} formData={formData} updateData={updateData} />}
    </div>
  );
}