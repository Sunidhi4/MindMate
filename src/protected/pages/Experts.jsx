import axios from "axios";
import { useEffect, useState } from "react";
import { ExpertCard } from "../components/ExpertCard";
import Pagination from "../../utils/Pagination";
const Experts = () => {
  const [experts , setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
   const [page , setPage] = useState(0);
   const [totalPages , setTotalPages] = useState();
   const [size] = useState(10); 
  useEffect(()=>{
      async function getAllExperts() {
        try{
          setLoading(true);
        const res = await axios.get(`http://localhost:8080/public/getAllExperts?page=${page}&size=${size}`);
        setExperts(res.data.content);
        setTotalPages(res.data.totalPages);
      }catch{
        console.log(e);
      }
      finally{
        setLoading(false);
      }
      }
      getAllExperts();
     
    },[page])
  return (
    
    
    <div className="">
     
          <section className="bg-white shadow-lg rounded-lg p-6 border border-[#98c5f1] ">
            <h2 className="text-2xl font-semibold text-[#9100BD] mb-6">Experts</h2>
            <div className="flex flex-col gap-6">
              {experts!=null && experts.length>0 ? 
              experts.map((expert)=>(
                <ExpertCard key={expert.id} expert={expert}/>
              ))
              : (<p className="text-gray-500 text-center">No Expert found.</p>)}
              
            </div>
    <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        />
          </section>
        
        </div>
  );
};

export default Experts;