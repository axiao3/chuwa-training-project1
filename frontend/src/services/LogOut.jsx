export default function LogOut(key){
    // localStorage.clear();
    if(key){
        alert("Logged out.");
        localStorage.removeItem(key);
    }
    console.log("log out: " + key);
    
    
}