import React from 'react'
import { MessageCircleHeart, Shield, Image, Users, UserCheck, HeartHandshake } from "lucide-react";

const features = () => {

  
const features = [
  {
    icon: <Shield size={32} />,
    title: "100% Anonymous Conversations",
    desc: "Share your thoughts, emotions, and struggles freely without revealing your identity."
  },
  {
    icon: <MessageCircleHeart size={32} />,
    title: "Peer-to-Peer Support",
    desc: "Connect with people who truly understand and support each other in a safe space."
  },
  {
    icon: <UserCheck size={32} />,
    title: "Expert Guidance",
    desc: "Get professional advice and guidance from verified mental health experts."
  },
  {
    icon: <Image size={32} />,
    title: "Share Image Posts",
    desc: "Express yourself visually by posting images and viewing posts from others."
  },
  {
    icon: <HeartHandshake size={32} />,
    title: "Affordable Support",
    desc: "Access expert mental health support at a cost that’s designed to be accessible."
  },
  {
    icon: <Users size={32} />,
    title: "Community Healing",
    desc: "Grow together in a compassionate, judgment-free mental wellness community."
  },
];

  return (
     <section className="py-20 bg-gradient-to-b from-white to-[#f4f8ff]">
      <div className="container mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          Why Choose <span className="text-[#9100BD]">PsychoTalk?</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          A safe digital space designed for emotional expression, expert guidance,
          and supportive connections — all in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#dc19e6] hover:-translate-y-2 hover:border-[#6819e6]"
            >
              <div className="flex justify-center mb-4 text-[#3C9BF9]">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2 text-black">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default features