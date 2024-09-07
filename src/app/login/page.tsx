'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React,{useEffect, useState} from 'react'

export default function loginPage(){
  const router = useRouter();
  const [user,setUser] = useState({
    email:"",
    password:""
  });
  const [ verified,setVerified ] = useState(false);
  const [ loading,setLoading ] = useState(false);
  const [buttondisabled,setButtonDisabled ] = useState(false);

  const signInUser = async() =>{
   try {
     setLoading(true);
     await axios.post("/api/users/login",user);
     setVerified(true);
     router.push("/verifyemail");
   } catch (error:any) {
    console.log(error.response.data);
    setVerified(false);
   }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length >0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='login-page'>
      <h2>Login</h2><br/><br/>
      {loading ?"Processing":""}<br/>
      <label htmlFor='email'>Email</label><br/>
      <input 
      id='email'
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder='email'
       type='text'
      /><br/><br/>
        <label htmlFor='password'>Password</label>
      <input 
      id='password'
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder='password'
       type='password'
      />
      <button
      onClick={signInUser}
      style={{cursor:"pointer"}}
      >
        {buttondisabled ?"Fill all the fields":"Login"}
      </button>
    </div>
  )
}



