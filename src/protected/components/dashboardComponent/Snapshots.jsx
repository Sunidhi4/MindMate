import axios from "axios";
import React, { useEffect, useState } from "react";
import { Heart, Users, Star, Activity } from "lucide-react";

/* ── Animated counter ── */
const Counter = ({ target, suffix = "" }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let n = 0;
    const step = Math.ceil(target / 60);

    const t = setInterval(() => {
      n += step;
      if (n >= target) {
        setVal(target);
        clearInterval(t);
      } else {
        setVal(n);
      }
    }, 20);

    return () => clearInterval(t);
  }, [target]);

  return <span>{val.toLocaleString()}{suffix}</span>;
};

const Snapshots = () => {
  const [snapshots, setSnapshots] = useState({
    totalMembers: 0,
    totalQuestions: 0,
    totalExperts: 0,
    totalAppointments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSnapshots() {
      try {
        const res = await axios.get("http://localhost:8080/public/snapshots");

        if (res.status === 200) {
          setSnapshots(res.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    getSnapshots();
  }, []);

  const stats = [
    {
      icon: <Users size={18} className="text-purple-500" />,
      label: "Community Members",
      val: snapshots.totalMembers,
      suffix: "+",
    },
    {
      icon: <Heart size={18} className="text-pink-500" />,
      label: "Feelings Shared",
      val: snapshots.totalQuestions,
      suffix: "+",
    },
    {
      icon: <Star size={18} className="text-yellow-500" />,
      label: "Expert Sessions",
      val: snapshots.totalAppointments,
      suffix: "+",
    },
    {
      icon: <Activity size={18} className="text-blue-500" />,
      label: "Total Experts",
      val: snapshots.totalExperts,
      suffix: "+",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-5 
          shadow-md hover:shadow-xl transition hover:-translate-y-1 border border-purple-100 dark:border-gray-500"
        >
          <div className="mb-2">{s.icon}</div>

          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {loading ? "..." : <Counter target={s.val} suffix={s.suffix} />}
          </p>

          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">{s.label}</p>
        </div>
      ))}

    </div>
  );
};

export default Snapshots;