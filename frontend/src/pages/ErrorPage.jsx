import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ErrorPage(){
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate to home page
        // navigate("/home");
    }

    return (
        <div className="error-page">
            <div className="error-container">
                <AiOutlineExclamationCircle className="error-item" style={{ fontSize: "1000%", color: "#5F27FF"}}/>
                
                <h1 aria-label='Error' >Ooops, something went wrong!</h1>
                
                <button className="error-item" 
                        style={{color: "white", backgroundColor: "#5F27FF", width: "10%", height: "3rem"}}
                        onClick={handleClick}> Go Home </button>
                
            </div>
            
        </div>
    )
}