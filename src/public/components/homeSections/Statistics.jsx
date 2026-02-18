import React from "react";
import image1 from "../../assets/statisticsImages/image1.png"
import image2 from "../../assets/statisticsImages/image2.png"
import image3 from "../../assets/statisticsImages/image3.png"
import image4 from "../../assets/statisticsImages/image4.png"
import image5 from "../../assets/statisticsImages/image5.png"
import image6 from "../../assets/statisticsImages/image6.png"

const statisticsData = [
    {
        title: "1 in 7 Indians Battles Mental Illness",
        value: "≈204 Million People",
        image: image1,
        desc: "Imagine a shadow touching nearly every seventh person you know—friends, family, neighbors. In India, around 204 million lives grapple with mental disorders like crippling depression, relentless anxiety, bipolar swings, or schizophrenia's isolating grip. That's not just a number; it's mothers silencing their pain to care for children, youth staring blankly at futures clouded by fear, and elders withdrawing into silence amid societal stigma. The WHO flags India as home to 15% of global mental health cases, yet access to care lags disastrously—only 0.75 psychiatrists per 100,000 people. COVID-19 amplified this crisis, spiking suicides and breakdowns. These aren't distant statistics; they're our people, enduring invisible wars daily. Breaking the silence starts with us—empathy, awareness, and action can light the path to healing. Will you stand with them?"
    },
    {
        title: "Depression & Anxiety Grip Millions",
        value: "≈47 Million Each",
        image: image2,
        desc: "Picture the quiet despair in everyday Indian lives: a young professional in Mumbai paralyzed by anxiety before meetings, a farmer in rural Bihar sinking into depression after crop failure, a student in Delhi crushed by exam pressure. Depression and anxiety aren't weaknesses—they're the most rampant mental health thieves in India, each ensnaring around 47 million souls. That's one in every 30 Indians, per NIMHANS' National Mental Health Survey, with women hit hardest and suicides soaring among youth. Stigma whispers, keeping 90% from seeking help amid just 1 psychiatrist per 200,000. Yet these silent epidemics fuel lost productivity worth billions and shattered families. They're treatable—with therapy, meds, and support. In a nation pulsing with resilience, let's shatter the silence: talk, listen, heal. Every story shared saves a life. Who's ready to break the chain?"
    },
    {
        title: "Suicide Kills 171K Indians Yearly",
        value: "~171,000 Deaths (2023)",
        image: image3,
        desc: "Every 3 minutes, an Indian life ends in suicide—mostly vibrant youth and working-age adults trapped in despair. In 2023, NCRB tallied 171,418 deaths, a steady climb from 170,924 in 2022, with 18-45-year-olds claiming three in five cases. Students alone hit record highs, fueled by exam hell, jobless futures, and family pressures in a nation where one dies by suicide hourly. Rural farmers swallow poison after debt; urban grads leap from despair amid failure stigma. Women face dowry abuse, men mask breakdowns as weakness.This isn't fate—it's a systemic scream: 12.3 suicides per 100,000, mental health tabs up 44% post-COVID, yet helplines and psychiatrists are ghosts. These are our brothers, sisters, dreams cut short. India, awaken: fund care, smash silence, save tomorrow's builders. One conversation could be the lifeline. Will we act before the next toll?"
    },
    {
        title: "80-85% Untreated Mental Illness",
        value: "162-173 Million Neglected",
        image: image4,
        desc: "Picture 8 out of 10 Indians battling inner demons—depression, anxiety, psychosis—without a lifeline, their cries drowned in stigma and scarcity. Over 80-85% face this brutal treatment gap, leaving 162-173 million adrift in a nation of 1.4 billion, where mental illness strikes 1 in 7 yet care reaches a pitiful fraction. Families whisper pagalpan, hiding loved ones; rural hearts break without counselors; urban grinders fake smiles amid burnout. Only 0.75 psychiatrists serve every 100,000, one-tenth the global norm—no beds, few pills, zero community nets. COVID tore wounds wider, spiking untreated cases 40%, costing billions in lost lives and labor. This isn't neglect by chance; it's a policy scream for 38 million more professionals yesterday. Yet hope glimmers: tele-helplines, apps, and awareness can bridge it. India, these are our warriors—demand care, shatter shame, heal as one. Every delayed step claims another soul."
    },
    {
        title: "Youth Crisis: 60% Under 35",
        value: "Mental Disorders Strike Early",
        image: image5,
        desc: "Imagine India's brightest—teens coding dreams in Bengaluru hostels, rural girls chasing degrees, young hustlers in startup grind—silently crumbling as mental health storms hit before 35. Over 60% of conditions like anxiety, depression, and bipolar ignite in this vulnerable window, robbing futures when intervention could rewrite fates. In a youth-bulge nation (65% under 35), exam hell, jobless despair, social media traps, and family weight crush spirits; suicides spike 25% among students post-COVID. Brains still wiring, they face adult pressures without tools—stigma labels it laziness, helplines ring empty. Early signs? Withdrawal, irritability, sleepless nights. Yet 90% go unchecked, costing trillions in lost potential. This generation fuels India's rise—don't let silence snuff their fire. Parents, peers, policymakers: spot it, talk it, treat it now. School counselors, apps, community nets can pivot tragedy to triumph. Their mental armor today builds tomorrow's billion dreams. Act—because 14-30 is not phase, it's a plea."
    },
    {
        title: "0.75 Psychiatrists per 100k",
        value: "Dire Workforce Crisis",
        image: image6,
        desc: "Envision millions of tormented minds in India—farmers drowning in debt despair, students buckling under exam tyranny, professionals masking burnout—begging for help that never arrives. With just 0.75 psychiatrists per 100,000 people (one-tenth the global benchmark), our 1.4 billion nation starves for 38 lakh more professionals yesterday. One doctor juggles thousands, rural voids echo empty, while urban queues snake endlessly; counselors? A myth for most. This gaping hole fuels the 80% treatment chasm, spiking suicides (171k yearly) and shattering families. Post-COVID, demand rocketed 40%, yet training stalls—stigma repels talent, budgets limp at 0.5% of health spend. These aren't faceless stats; they're your neighbor's silent scream, a child's stifled dreams. India boasts tech giants, yet ignores mind healers? No more. Scale colleges, fund fellowships, weave community paraprofessionals now. Every missing expert costs lives—build the army to mend our souls. The workforce gap isn't policy; it's a national emergency. Heal the healers first."
    }
];

const Statistics = () => {
    return (
        <section className="py-20 bg-linear-to-b from-[#f4f8ff] to-white">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black">
                        Mental Health in India
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Understanding the scale of mental health challenges helps us build
                        stronger, more compassionate communities.
                    </p>
                </div>

                <div className="space-y-20">

                    {statisticsData.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >

                            {/* Image */}
                            <div className="w-2xl h-2xl">
                                <div className=" overflow-hidden rounded-2xl shadow-lg shadow-[#afa9ed] hover:shadow-2xl hover:shadow-[#ebc5f9] transition-transform duration-200">
                                    <img
                                        src={stat.image}
                                        alt={stat.title}
                                        className="w-full h-full object-cover hover:scale-[1.1] transition-transform duration-400"
                                        //loading="eager"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="md:w-1/2">
                                <h3 className="text-2xl font-bold text-[#9100BD] mb-3">
                                    {stat.value}
                                </h3>
                                <h4 className="text-lg font-semibold text-black mb-2">
                                    {stat.title}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {stat.desc}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Statistics;
