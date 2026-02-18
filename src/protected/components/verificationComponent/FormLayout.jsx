export default function FormLayout({ title, step, children }) {
  return (
    
      <div className="w-2xl max-w-3xl bg-white shadow-xl rounded-2xl p-14">

        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full ">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-teal-600 mb-6">
          {title}
        </h2>

        {children}
      </div>
   
  );
}