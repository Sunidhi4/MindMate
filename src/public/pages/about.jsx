const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f8ff] via-white to-[#fdfbff] py-16 px-6 md:px-16">

      {/* INTRO */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-3xl md:text-5xl font-bold text-[#55037b] font-Chakra">
          About PsychoTalk
        </h1>
        <p className="mt-6 text-gray-700 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
          PsychoTalk is a supportive online platform dedicated to helping individuals
          facing depression and mental health challenges. We provide a safe,
          anonymous space to share experiences, connect with peers, and access
          expert guidance — fostering a compassionate community where everyone
          feels heard and empowered.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-semibold text-[#0f6c8d] mb-4 font-Chakra">
            Our Mission
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            To provide a safe, anonymous, and supportive space where individuals
            can openly share their struggles, connect with empathetic peers,
            and access expert guidance for healing and growth.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-semibold text-[#0f6c8d] mb-4 font-Chakra">
            Our Vision
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            To create a compassionate global community that destigmatizes mental
            health and empowers individuals to seek help confidently through
            collective support and professional care.
          </p>
        </div>
      </div>

      {/* KEY FEATURES */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold text-center text-[#0f6c8d] mb-10 font-Chakra">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            "Share Your Mind anonymously in a safe space.",
            "Express detailed mental health challenges.",
            "Support others with advice and encouragement.",
            "Book confidential expert sessions.",
            "Secure role-based access control."
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex items-start gap-3"
            >
              <span className="text-[#9100BD] text-lg">✔</span>
              <p className="text-gray-700 text-sm md:text-base">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHO CAN USE */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold text-center text-[#0f6c8d] mb-10 font-Chakra">
          Who Can Use PsychoTalk?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            "Individuals seeking anonymous peer support.",
            "Mental health professionals offering guidance.",
            "Families & caregivers supporting loved ones."
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700 text-sm md:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-semibold text-[#0f6c8d] mb-6 font-Chakra">
          Why Choose PsychoTalk?
        </h2>

        <div className="space-y-4 text-gray-700 text-sm md:text-base">
          <p>✔ Safe and anonymous environment.</p>
          <p>✔ Supportive peer community.</p>
          <p>✔ Access to qualified mental health professionals.</p>
        </div>
      </div>

      {/* FOOTER THANK YOU */}
      <div className="max-w-4xl mx-auto text-center border-t border-gray-200 pt-10">
        <h3 className="text-xl font-semibold text-[#55037b] mb-4 font-Chakra">
          Thank You for Being Here
        </h3>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          Your willingness to share and seek help is a powerful step toward healing.
          PsychoTalk is here to support you — every step of the way.
        </p>
      </div>

    </div>
  );
};

export default AboutPage;
