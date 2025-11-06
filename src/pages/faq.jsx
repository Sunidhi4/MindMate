import { useState } from "react";
import { Link } from "react-router-dom";

const FAQs = () => {
    // State to track which FAQ is open
    const [openIndex, setOpenIndex] = useState(null);

    // Function to toggle the visibility of an answer
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // List of FAQs with questions and answers
    const faqs = [
        {
            question: "What is Psycho-Talk?",
            answer: "Psycho-Talk is an anonymous online platform designed to support individuals facing depression and mental health challenges by providing a safe space to share experiences, seek peer support, and access expert guidance."
        },
        {
            question: "Is Psycho-Talk confidential and anonymous?",
            answer: "Yes, Psycho-Talk prioritizes your privacy by allowing you to participate anonymously and ensuring all shared information remains confidential within the community and professional sessions."
        },
        {
            question: "Who can join Psycho-Talk?",
            answer: "Anyone dealing with mental health issues, looking for peer support, or seeking expert help can join Psycho-Talk. Mental health professionals also use the platform to offer consultations."
        },
        {
            question: "How can I get help from mental health experts?",
            answer: "You can book confidential one-on-one sessions with qualified mental health professionals through the platform to receive personalized advice and therapy."
        },
        {
            question: "Can I share my feelings without fear of judgment?",
            answer: "Absolutely. Psycho-Talk fosters a supportive, empathetic community where members are encouraged to share openly and respectfully without fear of judgment."
        },
        {
            question: "Is there a cost to use Psycho-Talk?",
            answer: "Basic community access is free. Expert consultations and therapy sessions may have associated fees depending on the provider and session type."
        },
        {
            question: "What if I encounter negative behavior or content?",
            answer: "Psycho-Talk has moderators who actively monitor the community to maintain a safe and respectful environment. You can report any inappropriate behavior or content for prompt action."
        },
        {
            question: "How do I start using Psycho-Talk?",
            answer: "Simply create an account or join anonymously, browse the community discussions, share your thoughts, and book expert sessions as needed to begin your journey towards mental wellness."
        },
        
    ];

    return (
        <section className="bg-gradient  sm:py-16 lg:py-24 text-black min-h-screen">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-5xl">
                {/* Heading Section */}
                <div className="max-w-3xl pt-8 md:pt-0 mx-auto text-center">
                    <h2 className="text-lg md:text-2xl font-bold font-Chakra leading-tight sm:text-4xl lg:text-5xl">
                        Frequently Asked Questions (FAQ’s) – PsychoTalk
                    </h2>
                </div>
                {/* FAQ List */}
                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    {faqs.map((faq, index) => (
                        <div className=" rounded-xl p-0.5" key={index}> 
                            <div
                                
                                className="transition-all duration-200 bg-linear-to-l from-[#76bce5] to-[#df74e9] border-2 border-transparent rounded-[calc(10px-1px)] shadow-lg"
                            >
                                {/* FAQ Question Button */}
                                <button
                                    type="button"
                                    className=" flex items-center justify-between cursor-pointer w-full px-4 py-2 md:px-6 md:py-4 sm:p-6 text-sm md:text-lg font-semibold "
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <span>{faq.question}</span>
                                    {/* Expand/Collapse Icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className={`w-6 h-6 text-gray-800 transform transition-transform ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {/* FAQ Answer Section */}
                                {openIndex === index && (
                                    <div className="text-xs  md:text-base px-4 py-2 md:px-6 md:pb-4 sm:px-6 sm:pb-6 text-gray-800">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Contact Support Section */}
                <p className="text-center text-gray-800 text-xs md:text-base mt-10">
                    Still have questions?{' '}
                    <Link to={"/contact"} className="cursor-pointer font-medium text-blue-500 transition-all duration-200 hover:text-blue-400">
                        Contact our support
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default FAQs;
