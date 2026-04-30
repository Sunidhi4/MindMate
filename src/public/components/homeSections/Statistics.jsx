import image1 from "../../assets/statisticsImages/image1.png";
import image2 from "../../assets/statisticsImages/image2.png";
import image3 from "../../assets/statisticsImages/image3.png";
import image4 from "../../assets/statisticsImages/image4.png";
import image5 from "../../assets/statisticsImages/image5.png";
import image6 from "../../assets/statisticsImages/image6.png";
import { AlertTriangle, TrendingUp, Users, Heart, Brain, Stethoscope } from "lucide-react";

const statisticsData = [
  {
    icon: <Users size={18} />,        accentColor: "#9100BD",
    value: "≈204 Million",           tag: "Prevalence",
    title: "1 in 7 Indians Battles Mental Illness",
    image: image1,
    desc: "Around 204 million lives grapple with mental disorders like depression, anxiety, bipolar, or schizophrenia. The WHO flags India as home to 15% of global mental health cases, yet access to care lags — only 0.75 psychiatrists per 100,000 people. COVID-19 amplified this crisis, spiking suicides and breakdowns. These aren't distant statistics; they're our people, enduring invisible wars daily.",
  },
  {
    icon: <Brain size={18} />,        accentColor: "#3C9BF9",
    value: "≈47 Million Each",       tag: "Disorders",
    title: "Depression & Anxiety Grip Millions",
    image: image2,
    desc: "Depression and anxiety are the most rampant mental health thieves in India, each ensnaring around 47 million souls — one in every 30 Indians. Women are hit hardest, suicides soar among youth, and stigma keeps 90% from seeking help. Yet these silent epidemics fuel lost productivity worth billions. They're treatable — with therapy, support, and community.",
  },
  {
    icon: <AlertTriangle size={18} />, accentColor: "#ef4444",
    value: "~171,000 Deaths",         tag: "Crisis (2023)",
    title: "Suicide Claims 171K Indians Yearly",
    image: image3,
    desc: "Every 3 minutes, an Indian life ends in suicide — mostly youth and working-age adults. In 2023, NCRB tallied 171,418 deaths. Students hit record highs, fueled by exam pressure, jobless futures, and family burdens. These are our brothers, sisters, and dreams cut short. One conversation could be the lifeline.",
  },
  {
    icon: <Heart size={18} />,        accentColor: "#ec4899",
    value: "80–85% Untreated",        tag: "Treatment Gap",
    title: "Millions Left Without Care",
    image: image4,
    desc: "Over 80–85% of those with mental illness receive no treatment, leaving 162–173 million adrift. Families hide loved ones in shame; rural areas echo empty without counselors. COVID tore wounds wider, spiking untreated cases by 40%. Yet hope glimmers — tele-helplines, apps, and awareness can bridge the gap.",
  },
  {
    icon: <TrendingUp size={18} />,   accentColor: "#f59e0b",
    value: "60% Under Age 35",        tag: "Youth Crisis",
    title: "Mental Disorders Strike Early",
    image: image5,
    desc: "Over 60% of mental health conditions ignite before age 35. In a youth-bulge nation, exam hell, jobless despair, social media pressure, and family weight crush spirits. Early signs: withdrawal, irritability, sleepless nights. Yet 90% go unchecked. This generation fuels India's rise — don't let silence snuff their fire.",
  },
  {
    icon: <Stethoscope size={18} />,  accentColor: "#10b981",
    value: "0.75 per 100,000",        tag: "Workforce",
    title: "Dire Psychiatrist Shortage",
    image: image6,
    desc: "With just 0.75 psychiatrists per 100,000 people — one-tenth the global benchmark — India starves for care. One doctor juggles thousands; rural voids echo empty; counselors are a myth for most. This gap fuels the 80% treatment chasm. Scale colleges, fund fellowships, weave community support now.",
  },
];

const Statistics = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase
                           text-purple-600 dark:text-purple-400
                           bg-purple-100 dark:bg-purple-900/30
                           px-3 py-1 rounded-full border border-purple-200 dark:border-purple-700/50 mb-4">
            ✦ The Reality
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Mental Health in{" "}
            <span style={{
              background: "linear-gradient(90deg,#9100BD,#3C9BF9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              India
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Understanding the scale of mental health challenges helps us build
            stronger, more compassionate communities.
          </p>
          <div className="mt-5 h-px max-w-xs mx-auto"
            style={{ background: "linear-gradient(to right,transparent,#ddd6fe,transparent)" }} />
        </div>

        {/* ── Stats rows ── */}
        <div className="space-y-14 sm:space-y-20">
          {statisticsData.map((stat, index) => (
            <div key={index}
              className={`flex flex-col ${index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-14`}>

              {/* ── Image ── */}
              <div className="w-full md:w-1/2 shrink-0">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group"
                  style={{ border: `1px solid ${stat.accentColor}25` }}>
                  {/* colored overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"
                    style={{ background: stat.accentColor }} />
                  <img
                    src={stat.image}
                    alt={stat.title}
                    className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Value overlay badge */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20"
                    style={{ background: "linear-gradient(to top,rgba(0,0,0,0.6),transparent)" }}>
                    <span className="text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${stat.accentColor}cc` }}>
                      {stat.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Content ── */}
              <div className="w-full md:w-1/2 space-y-4">

                {/* Value pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white text-sm"
                  style={{ background: `linear-gradient(90deg,${stat.accentColor},${stat.accentColor}aa)` }}>
                  <span className="text-white/90">{stat.icon}</span>
                  {stat.value}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                  {stat.title}
                </h3>

                <div className="h-0.5 rounded-full w-12"
                  style={{ background: `linear-gradient(90deg,${stat.accentColor},transparent)` }} />

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-20 rounded-2xl p-8 text-center text-white"
          style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}>
          <Heart className="mx-auto mb-3 opacity-80" size={24} />
          <p className="text-xl font-bold mb-2">You're not alone.</p>
          <p className="text-sm text-white/75 mb-5 max-w-md mx-auto">
            Millions face these challenges every day. MindMate is here to help
            you find support, share your story, and heal together.
          </p>
          <a href="/signup"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold
                       text-purple-700 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            Join the Community
          </a>
        </div>
      </div>
    </section>
  );
};

export default Statistics;