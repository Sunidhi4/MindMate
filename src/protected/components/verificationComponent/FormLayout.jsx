export default function FormLayout({ title, step, children }) {
  const steps = ["Basic Info", "Professional", "Summary", "Contact", "Documents"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-2xl">

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-teal-100/30 dark:shadow-teal-900/20 overflow-hidden border border-gray-100 dark:border-gray-800">

          {/* Top accent bar */}
          <div className="h-1.5 bg-linear-to-r from-teal-400 via-teal-500 to-emerald-500" />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800">
            {/* Step dots */}
            <div className="flex items-center gap-2 mb-5">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300
                    ${i + 1 < step
                      ? "bg-teal-500 text-white"
                      : i + 1 === step
                      ? "bg-teal-600 text-white ring-4 ring-teal-200 dark:ring-teal-900"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600"
                    }`}>
                    {i + 1 < step ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (i + 1)}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 w-6 sm:w-10 rounded-full transition-all duration-500 ${i + 1 < step ? "bg-teal-400" : "bg-gray-200 dark:bg-gray-700"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden mb-4">
              <div
                className="bg-linear-to-r from-teal-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>

            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
              <span className="text-sm font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
                {step} / 5
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {children}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6">
          Your information is encrypted and securely transmitted.
        </p>
      </div>
    </div>
  );
}