
const AboutPage = () => {
  return (
    <div className="bg-gradient text-black min-h-screen py-12 px-6 md:px-16">

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#55037b] font-Chakra">
          Introduction
        </h1>
        <p className="mt-4 text-lg text-gray-800 font-open-sans">
          Psycho-Talk is a supportive online platform dedicated to helping individuals facing depression and mental health challenges. We provide a safe, anonymous space for users to share their experiences, connect with peers, and access expert guidance. Our goal is to foster a compassionate community where everyone feels heard, understood, and empowered on their journey to mental wellness.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-cyan-800 font-Chakra">
          Mission & Vision
        </h2>
        <p className="mt-2 text-gray-700 font-open-sans">
          <strong>Mission:</strong> To provide a safe, anonymous, and supportive online platform where individuals facing depression and mental health challenges can openly share their experiences, connect with empathetic peers, and access expert guidance for effective coping and healing.
        </p>
        <p className="text-gray-700 font-open-sans">
          <strong>Vision:</strong> To create a compassionate global community that destigmatizes mental health, empowers individuals to seek help without fear of judgment, and fosters lasting recovery through collective support, education, and professional care.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-cyan-800 font-Chakra">
          Key Features
        </h2>
        <ul className="mt-4 space-y-3 text-gray-700 font-open-sans">
          <li>
            ✅ <strong>Share Your Mind:</strong>  Users can anonymously share their feelings, thoughts, and personal struggles related to depression and mental health in a safe space.
          </li>
          <li>
            ✅ <strong>Express Your Problems:</strong>  Post detailed descriptions of the challenges impacting your mental well-being to receive community feedback and support.
          </li>
          <li>
            ✅ <strong>Support Others:</strong>  If you have experience or ideas on dealing with a particular mental health issue, you can offer advice, encouragement, or coping strategies to fellow community members.
          </li>
          <li>
            ✅ <strong>Take Expert Sessions:</strong> Book confidential one-on-one sessions with qualified mental health professionals for guidance, therapy, or advice tailored to your needs.
          </li>
          <li>
            ✅ <strong>Role-Based Access:</strong>Secure access control to ensure proper roles for users, experts, and admins preserving privacy and data security.
          </li>
        </ul>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-cyan-800 font-Chakra">
          Who Can Use PsychoTalk?
        </h2>
        <ul className="mt-4 space-y-3 text-gray-700 font-open-sans">
          <li>
            👱<strong>Individuals experiencing depression or mental health challenges seeking anonymous peer support.</strong>
          </li>
          <li>
            🧑‍⚕️ <strong>Mental health professionals offering expert consultations and guidance.</strong>
          </li>
          <li>
            💁‍♂️ <strong>Family, friends, and caregivers looking for resources and ways to support loved ones.</strong>
          </li>
        </ul>
      </div>

      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-semibold text-cyan-800 font-Chakra">
          Why Choose PsychoTalk?
        </h2>
        <p className="mt-4 text-gray-700 font-open-sans">
          ✔ Safe and anonymous platform fostering open sharing without fear of judgment.
        </p>
        <p className="text-gray-700 font-open-sans">
          ✔ Supportive community for empathetic peer interactions and shared experiences.
        </p>
        <p className="text-gray-700 font-open-sans">
          ✔ Access to professional mental health experts through confidential sessions for personalized guidance.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12 text-center border-t border-gray-700 pt-6">
        <p className="text-lg font-semibold text-cyan-900 font-Chakra">
          Thank You!
        </p>
        <p className="text-gray-900 font-open-sans">
          Thank you for engaging with Psycho-Talk. Your participation and trust are what make this community meaningful and supportive for everyone. Remember, your willingness to share and seek help can be a powerful step toward healing. We're here to support you every step of the way.
        </p>
      </div>

    </div>
  );
};

export default AboutPage;
