import { SignupInput } from "@anusha-pannati/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Auth = ({ type }: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password:''
    });

    async function sendRequest() {
        try{
            console.log("inside sending")
            console.log(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`)
            console.log(postInputs)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            console.log("done with backend call")
            const jwt = response.data.jwt;
            console.log(jwt);
            localStorage.setItem("Authorization",jwt);
            const storedToken = localStorage.getItem("Authorization")

            if (storedToken === jwt) {
                navigate("/blogs");
            } else {
            console.error(" Failed to save token to localStorage")
            }
            
        } catch(e) {
            if (axios.isAxiosError(e)) {
                console.error("Axios Error:", e.response?.status, e.response?.data, e.message);
            } else {
                console.error("Unexpected Error:", e);
            }
        }
    }

    return <div className="h-screen flex justify-center flex-col bg-white">
        <div className="flex justify-center">
            <div className="w-full max-w-md">
                <div className="px-10">
                    <div className="text-3xl font-extrabold text-gray-900">
                        {type === "signup" ? "Create an account" : "Welcome back"}
                    </div>
                    <div className="text-gray-600 mt-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 text-green-700 hover:text-green-800 underline font-medium" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Anusha Pannati..." onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }}></LabelledInput> : null}
                     <LabelledInput label="Username" placeholder="Anusha@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }}></LabelledInput>
                     <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></LabelledInput>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-gray-900 font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={ type || "text"} id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 hover:border-green-400 transition-colors" placeholder={placeholder} required />
    </div>
}
