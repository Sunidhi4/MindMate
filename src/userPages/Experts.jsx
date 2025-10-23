import axios from "axios";
import { useEffect, useState } from "react";
import { ExpertCard } from "../userComponents/ExpertCard";
const Experts = () => {
  const [experts , setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
  useEffect(()=>{
      async function getAllExperts() {
        try{
        const res = await axios.get("http://localhost:8080/Expert/getAllExperts");
        console.log(res.data);
        setExperts(res.data);
      }catch{
        console.log(e);
      }
      finally{
        setLoading(false);
      }
      }
      getAllExperts();
    },[])
  return (
    
    <div className="">
          <section className="bg-white shadow-lg rounded-lg p-6 border border-[#98c5f1] ">
            <h2 className="text-2xl font-semibold text-[#9100BD] mb-6">Experts</h2>
            <div className="flex flex-col gap-6">
              {experts!=null && experts.length>0 ? 
              experts.map((expert)=>(
                <ExpertCard expert={expert}/>
              ))
              : (<p className="text-gray-500 text-center">No Expert found.</p>)}
              
            </div>
    
          </section>
        </div>
  );
};

export default Experts;