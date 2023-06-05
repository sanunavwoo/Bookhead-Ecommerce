import axios from "axios"

export const signupService= async(firstName,lastName,email,password,dispatchAuth,setIsUserSignedUp)=>{
   
    try{
        const res= await axios({
            method:'POST',
            url:'/api/auth/signup',
            data:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
            }
        });
        
        if(res.status===201){

            console.log("The created User: ",res.data.createdUser);

            localStorage.setItem("loginDetails", JSON.stringify({user: res.data.createdUser, token: res.data.encodedToken}));

            // dispatchAuth({
            //     type:"CREATE_USER",
            //     payload: res.data.createdUser
            // });

            dispatchAuth({
                type:"CREATE_USER",
                payload: {user: res.data.createdUser, token: res.data.encodedToken}
            });
            
            // localStorage.setItem("Token",res.data.encodedToken);
            // setIsUserSignedUp(true);
        }
    }
    catch(e){
        console.error(e);
    }
}