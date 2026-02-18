import { useState } from "react";
import Step1Basic from "../../components/verificationComponent/Step1Basic";
import Step2Professional from "../../components/verificationComponent/Step2Professional";
import Step3About from "../../components/verificationComponent/Step3About";
import Step4Contact from "../../components/verificationComponent/Step4Contact";
import Step5Upload from "../../components/verificationComponent/Step5Upload";

export default function ExpertVerification() {
  const [step, setStep] = useState(1);

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
    documents: null
  });

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  const updateData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="flex justify-center items-center bg-gradient flex-col min-h-screen">
      <h2 className="font-bold text-xl text-gray-600 p-3">Verification Required (Step {step} of 5)</h2>

      {step === 1 && <Step1Basic next={next} updateData={updateData} formData={formData} />}
      {step === 2 && <Step2Professional next={next} back={back} updateData={updateData} formData={formData} />}
      {step === 3 && <Step3About next={next} back={back} updateData={updateData} formData={formData} />}
      {step === 4 && <Step4Contact next={next} back={back} updateData={updateData} formData={formData} />}
      {step === 5 && <Step5Upload back={back} formData={formData} updateData={formData} />}
    </div>
  );
}