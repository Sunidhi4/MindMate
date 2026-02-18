import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
const ExpertDashboard = () => {
  const [expert , setExpert] = useState("");
  const [loading , setLoading] = useState(false);
  useEffect(()=>{
    async function getMyProfile() {
      try{
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/expert/myProfile` , {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        if(res.data){
          setExpert(res.data);
          console.log(res.data);
        }
    }catch(e){
      console.log(e);
    }
    finally{
      setLoading(false);
    }
    }
    getMyProfile();
  } , [])
  return (
    <div>
      
      {expert ? expert.verified  && expert.verificationSubmitted ?  <div> Welcome {expert.fullName}</div> :
        expert.verificationSubmitted ? <Navigate to="/expert/underReview" replace/> : <Navigate to="/expert/verification" replace /> 
      : "loading..............."
      }

    </div>
  )
}

export default ExpertDashboard