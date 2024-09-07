'use client'
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Link from 'next/link';

export default function verifyEmailPage() {
  const [ token,setToken] = useState("");
  const [ error,setError ] = useState(false);
  const [verified,setVerified ] = useState(false)

  const verifyUser = async() =>{
     try {
       const response = await axios.post("/api/users/verifyemail",{token});
       setVerified(true);
     } catch (error:any) {
        setError(true);
        console.log("error occur while veriufying",error.response.data);
     }
      
     useEffect(()=>{
      const urlToken = window.location.search.split("=")[1]
      setToken(urlToken || "");

      //extracting token from the url using Next.js
      // const {query} = router;
      // const urlTokenTwo = query.token;
      //and also we can provide the dependency array router in this 
      //useEffect so that whenever there will be change in the url 
      //page automatic gets mount.

     }, [])

     useEffect(()=>{
      if(token.length > 0){
        verifyUser();
      }
     }, [token]);
  }
  return (
    <div className="verifyPage">
      <h1>Verify Email</h1>
      <h2>
        {token?`${token}`:"No Token"}
      </h2>
      {verified && (
        <div>
            <h2>Verified</h2>
            <Link href="/login">Login Page</Link>
        </div>
      )}
      {error && (
        <div>
            <h2>Error</h2>
        </div>
      )}
    </div>
  )
}

