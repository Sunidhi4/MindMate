import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MotivationalPosts = () => {
    const [data , setData] = useState([]);
    const [loading , setLoading] = useState(false);
useEffect(()=>{

        const getAllImagePostData= async()=>{
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:8080/postImage/getAllImagePost");
                if(res.data){
                    console.log(res.data);
                    setData([...res.data]);
                    setLoading(false);
                }else{
                   toast("no post found") 
                }
            
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
        }
        getAllImagePostData();
    },[]);
  return (
    <>
    {
        loading ? (<p>data loading</p>)
        
        : data ?
        (<div>
            {data.map((post)=>(
                <div>
                    <img src={`http://localhost:8080/${post.path}`} alt="hello" />
                    <p>{post.expert}</p>
                </div>
            ))}
            
        </div>)
        : <p>no data found</p>  
    }
    
    </>
    
  )
}

export default MotivationalPosts