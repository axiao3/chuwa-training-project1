export default function LogOut(key, value){
    
    if(key){//if there is such a user signed in, log it out
        alert("Logged out.");
        localStorage.clear(); 
    }
    console.log("log out: " + key + value);
    
    
}