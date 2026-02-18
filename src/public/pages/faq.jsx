import { useState } from "react";
import { Link } from "react-router-dom";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is PsychoTalk?",
      answer:
        "PsychoTalk is a supportive online platform where individuals facing mental health challenges can share experiences anonymously, connect with peers, and access professional guidance in a safe environment."
    },
    {
      question: "Is PsychoTalk anonymous and confidential?",
      answer:
        "Yes. We prioritize your privacy. You can participate anonymously, and all shared information and expert sessions remain confidential."
    },
    {
      question: "Who can use PsychoTalk?",
      answer:
        "Anyone seeking mental health support, peer connection, or professional guidance can join. Licensed mental health professionals also provide consultations through the platform."
    },
    {
      question: "How can I connect with a mental health expert?",
      answer:
        "You can book confidential one-on-one sessions with verified professionals directly through the platform for personalized support."
    },
    {
      question: "Is the community judgment-free?",
      answer:
        "Absolutely. PsychoTalk fosters a respectful, empathetic environment where members are encouraged to share openly without fear of criticism."
    },
    {
      question: "Is PsychoTalk free to use?",
      answer:
        "Community participation is free. Professional consultations may involve fees depending on the provider and session type."
    },
    {
      question: "What if I experience inappropriate behavior?",
      answer:
        "Our moderation team actively monitors the platform. You can report any inappropriate content or behavior for immediate review and action."
    },
    {
      question: "How do I get started?",
      answer:
        "Create an account or join anonymously, explore discussions, share your thoughts, and schedule expert sessions when needed."
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5f8ff] via-white to-[#fdfbff] py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#55037b] font-Chakra">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
            Find answers to common questions about PsychoTalk, privacy, expert sessions, and community guidelines.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-purple-100"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-semibold text-gray-800 text-sm md:text-lg">
                  {faq.question}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 text-purple-600 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-sm md:text-base">
            Still have questions?
          </p>
          <Link
            to="/contact"
            className="inline-block mt-3 px-6 py-2 rounded-full bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] 
                       text-white font-medium hover:shadow-lg transition duration-300"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FAQs;
