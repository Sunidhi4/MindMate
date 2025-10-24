import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const UserSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        gender: ""
    });

    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    const validateEmail = (email) => emailRegex.test(email);
    const validatePassword = (password) => passwordRegex.test(password);
    const validatePhone = (phone) => phoneRegex.test(phone);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            toast.error("Invalid Email!");
            return;
        }

        if (!validatePassword(formData.password)) {
            toast.error(
                "Password must be at least 8 characters, with one uppercase, one number, and one special character!"
            );
            return;
        }
        if (!validatePhone(formData.phone)) {
            toast.error("incorrect phone number");
            return;
        }

        setLoading(true);


        try {
            const res = await axios.post("http://localhost:8080/User/register", formData);

            if (res.data.status === "success") {
                console.log("User registered:", res.data);
                toast.success("User registered successfully! Please login.");
                navigate("/login");
            } else {
                toast.success("Username or Email already exist.");
            }

        } catch (error) {
            console.error("Registration failed:", error.response?.data || error);
            toast.error(error.response?.data.message || error);
        } finally {
            setLoading(false);
        }
    };
    return (


        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex justify-center gap-8 ">
                <div className="">

                    <label className="block text-gray-400 text-sm mt-3 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}

                        className={`w-2xs p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}
                        required
                    />

                    <label className="block text-gray-400 text-sm mt-3 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        className={`w-full p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}
                        required
                    />

                    <label className="block text-gray-400 text-sm mt-3 mb-1">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        className={`w-full p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mt-3 mb-1">Sex</label>

                    <div className="flex gap-6">
                        <label
                            htmlFor="male"
                            className={`flex h-10 items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 
                         ${formData.gender === "male" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                        >
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                                className="accent-blue-500 cursor-pointer"
                            />
                            <span>Male</span>
                        </label>

                        <label
                            htmlFor="female"
                            className={`flex h-10 items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 
                        ${formData.gender === "female" ? "bg-pink-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                        >
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                                className="accent-pink-500 cursor-pointer"
                            />
                            <span>Female</span>
                        </label>
                    </div>


                    <label htmlFor="age" className="block text-gray-400 text-sm mt-3 mb-1">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        onChange={handleChange}
                        required
                        className={`w-2xs p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}

                    />

                    <label className="block text-gray-400 text-sm mt-3 mb-1">
                        Password
                    </label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            required
                            className={`w-2xs p-2 rounded-full text-black ring-1 ring-[#3C9BF9] focus:outline-none focus:ring-1 focus:ring-[#9100BD]`}

                        />



                        <button
                            type="button"
                            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "show" : "hide"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-2xs mt-5">
                <button
                    type="submit"
                    className="w-full mt-6 mb-3 bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] text-white py-2 rounded-full hover:from-[#9100BD] hover:to-[#3C9BF9] cursor-pointer font-bold flex items-center justify-center gap-2 relative"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 my-0.5 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Register"
                    )}
                </button>
                <div className="w-full bg-gradient-to-r from-[#3C9BF9] to-[#9100BD] p-[1px] rounded-lg mt-3"></div>
                <p className="text-sm text-gray-400 mt-3">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-gradient font-medium"
                    >
                        Login
                    </Link>
                </p>
            </div>

        </form>








    )
}

export default UserSignup