import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";


const ProfilePage = () => {

   const {user,ready,setUser}= useContext(UserContext);
   const [redirectToHome,setRedirectToHome]= useState(null);

   let {subpage}=useParams();
   if(subpage===undefined){
    subpage='profile';
   }

   const logout = async()=>{
    await axios.post('/logout');
    setUser(null);
    setRedirectToHome('/');
   }

   if(redirectToHome){
    return(
        <Navigate to={redirectToHome}/>
    );
   }

   if(!ready){
    return 'loading......';
   }

   if(ready && !user){
    return <Navigate to={'/login'}/>
   }

   
  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button className="primary max-w-sm" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
export default ProfilePage;