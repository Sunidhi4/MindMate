import axios from "axios";


const Profile = () => {

 
  
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const age = sessionStorage.getItem("age");
  const gender = sessionStorage.getItem("gender");
  const phone = sessionStorage.getItem("phone");
  const Reflections = sessionStorage.getItem("questionsCount");
  const sharedReflections = sessionStorage.getItem("answersCount");

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-[#0C4663] flex items-center justify-center text-white text-3xl font-bold">
          {name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-[#0C4663] capitalize">{name}</h2>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 p-2 text-gray-700 flex flex-col gap-4">

        <div>
          <div className="flex justify-between py-1">
            <span className="font-medium ">Gender:</span>
            <span className="capitalize">{gender}</span>
          </div>
          <hr className="w-full text-gray-200" />
        </div>

        <div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Age:</span>
            <span>{age}</span>
          </div>
          <hr className="w-full text-gray-200" />
        </div>

        <div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Phone:</span>
            <span>{phone}</span>
          </div>
          <hr className="w-full text-gray-200" />
        </div>

        <div>
          <div className="flex justify-between py-1">
            <span className="font-medium ">You Shared:</span>
            <span>{Reflections}</span>
          </div>
          <hr className="w-full text-gray-200" />
        </div>

        <div>
          <div className="flex justify-between py-1">
            <span className="font-medium ">Your Replies:</span>
            <span>{sharedReflections}</span>
          </div>
          <hr className="w-full text-gray-200" />
        </div>

      </div>
    </>
  );
};

export default Profile;
