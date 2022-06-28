import React from 'react'
import { getAuth,setAuth,signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { useLocation,useNavigate } from 'react-router-dom'
import { doc,setDoc,getDoc,serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { toast } from 'react-toastify'
import {FcGoogle} from 'react-icons/fc'

const OAuth = () => {
    const location=useLocation()
    const navigate =useNavigate()

    const onGoogleAuthHandler=async ()=>{
        try {
            const auth =getAuth()
            const provider=new GoogleAuthProvider()
            const result =await signInWithPopup(auth,provider)
            const user = result.user
            const docRef = doc(db,'users',user.uid)
            const docSnap =await getDoc(docRef)
            if(!docSnap.exists()){
                await setDoc(doc(db,'users',user.uid),{
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('something wrong with google auth')
        }

    }
  return (
    <div className='mt-2'>
    <h6 >sign {location.pathname === '/signup'?'up':'in'} with &nbsp;
    <button  onClick={onGoogleAuthHandler}>
        <FcGoogle/>
    </button>
    </h6>
    </div>
  )
}

export default OAuth