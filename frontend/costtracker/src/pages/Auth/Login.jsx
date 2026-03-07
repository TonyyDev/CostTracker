import { useContext, useState } from "react";
import { Authlayout } from "../../components/layouts/Authlayout"
import { useNavigate, Link } from "react-router-dom"
import { Input } from "../../components/inputs/Input";
import { validateEmail  } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";


export const Login = ()=>{

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);
     const navigate = useNavigate();

    //handle loggin form submit
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }
        
        if (!password){
            setError("Please enter the correct password")
            return;
        }

        setError("")


        //login api call
        try{
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                console.log(user);
                
                updateUser(user);
                navigate("/dashboard");
            }

        }catch(error){
            if(error.response && error.response.data.message){
                setError(error.response.data.message)
            }else{
                setError("Something went wrong, please try again later")
            }
        }
 }



return(
        <Authlayout>
            <div className="lg:w-[50%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black" > Welcome Back! </h3>
                    <p className="text-xs text-slate-700 mt-[5px] mb-6">
                        Please enter your details to log in
                    </p>
                    <form onSubmit={handleLogin}>
                        <Input value={email} 
                                onChange={({target}) => setEmail(target.value) }
                                label="Email address"
                                placeholder="email@hotmail.com"
                                type="text" />

                         <Input value={password} 
                                onChange={({target}) => setPassword(target.value) }
                                label="Password"
                                placeholder="*******"
                                type="password" />
                        
                        { error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                        <button 
                        type="submit"
                        className="btn-primary">
                            LOGIN
                        </button>
                        <p className="text-[13px] text-slate-800 mt-3"> Dont have an account? {" "}
                            <Link className="font-medium text-primary underline" to="/signup">
                                SignUp
                            </Link> 
                        </p>

                    </form>
            </div>
        </Authlayout>
    )
} 