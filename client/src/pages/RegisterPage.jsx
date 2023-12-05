import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser =async (event) => {
    try {
      event.preventDefault();
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful! Now you can log in.");
    } catch (error) {
      alert("Registration failed. Please try again")
    }
    
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-36">
        <h1 className="text-4xl text-center">Sign Up</h1>
        <form className="max-w-md mx-auto pt-2" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="your name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="your@email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary my-2">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?{" "}
            <Link className="underline text-black" to={"/login"}>
              login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
