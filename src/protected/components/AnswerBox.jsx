
import { Link } from 'react-router-dom'
import {useState } from "react";
import axios from "axios";
import { Trash2} from "lucide-react";
import { toast } from "react-toastify";

const AnswerBox = ({ans}) => {

     const [deleting, setDeleting] = useState(false);

     function displayTime(date) {
    return new Date(date).toLocaleString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
     }
    //deleting Own answer
  const handleDelete = async (answerId) => {
    let isSure = window.confirm("Do you want to delete your answer?")
    if (isSure) {
      try {
        setDeleting(true);
        const res = await axios.delete(`http://localhost:8080/api/answer/deleteAnswer/${answerId}` ,
          {
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        if (res.data == true) {
          toast.success("Reflection deleted")

        } else {
          toast.error("Error Reflection deleted")
        }
      }
      catch (error) {
        console.log(error);
      } finally {
        setDeleting(false);
      }
    }
    return;
 

}
  return (
    <div
        
              className="p-4 mb-3 bg-[#f9f9ff] border border-[#d7e3ff] rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-3 mb-2">
                <img
                  src={`https://i.pravatar.cc/50?u=${ans.displayName}`}
                  alt={ans.name}
                  className="w-8 h-8 rounded-full border border-[#9100BD]"
                />
                <div>
                  {ans.role == "USER"
                    ?
                    (<p className="font-semibold text-[#9100BD] text-sm">{ans.displayName}</p>)
                    :
                    (
                      <Link
                        key={ans.id}
                        to="/user/expertDetails"
                        state={{ expertId: ans.accountId }}
                      >
                        <p className="font-bold text-[#9100BD] text-sm underline hover:text-blue-700">{ans.displayName}<span className="text-blue-600 no-underline"> | Expert</span></p>
                      </Link>
                    )
                  }

                  <p className="text-xs text-gray-500">
                    {displayTime(ans.createdAt)}
                  
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-line text-gray-800 text-sm leading-relaxed">{ans.answer}</p>

              <div className="flex justify-between">
                <div className=" text-xs text-gray-500 mt-2 flex items-center gap-2">❤️ {ans.likes} likes</div>
                <div className="mt-2">
                  {localStorage.getItem("username") === ans.displayName ?
                    (
                      <button
                        onClick={() => handleDelete(ans.id)}
                        className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-all duration-200"
                      >
                        {deleting ? (
                          <span className="text-xs text-gray-400">Deleting...</span>
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    )
                    :
                    ""
                  }
                </div>
              </div>
            </div>
  )
}

export default AnswerBox