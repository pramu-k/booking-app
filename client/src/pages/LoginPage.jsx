import { useState,useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


const LoginPage = () => {
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [redirect,setRedirect]=useState(false);

    const {setUser} = useContext(UserContext);

    const handleLoginSubmit = async (event)=>{
        event.preventDefault();
        try {
            const response = await axios.post('/login',{email,password});
            setUser(response.data);
            console.log(response);
            alert("Login Successful!");
            setRedirect(true);
            
        } catch (error) {
            console.log(error);
            alert(`Login Failed!`);
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-36">
        <h1 className="text-4xl text-center">Login</h1>
        <form className="max-w-md mx-auto pt-2" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              
            }}
          />
          <button className="primary my-2">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register Now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
