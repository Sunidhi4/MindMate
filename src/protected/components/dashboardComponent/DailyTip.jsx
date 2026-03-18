import axios from "axios";
import { Sun } from "lucide-react"
import { useEffect, useState } from "react"

const DailyTip = () => {

    const [tip, setTip] = useState({
        
    "tip": "",
    "date": Date.now()

    });

    useEffect(()=>{
        async function getTip() {
            try{
                const res = await axios.get("http://localhost:8080/public/tip");
                if(res.status === 200){
                    setTip(res.data);
                }
            }catch(e){
                console.log(e);
            }
        }
        getTip();
    },[])
    
  return (
    <div className="px-6 py-5">
            <div className="flex gap-3 items-start rounded-xl p-4 bg-[#fffbeb] dark:bg-amber-100" style={{border: "1px solid #fde68a" }}>
              <div className="pulse-dot w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "#fef3c7" }}>
                <Sun size={15} className="text-amber-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-600 mb-1">Daily Wellness Tip | {tip.date ? new Date(tip.date).toLocaleDateString() : ""}</p>
                <p className="text-xs text-amber-800 leading-relaxed">
                   {tip.tip || "Loading your daily tip..."}
                </p>
              </div>
            </div>
          </div>
  )
}

export default DailyTip