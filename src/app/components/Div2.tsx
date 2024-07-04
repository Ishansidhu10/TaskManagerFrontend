'use client';
import Image from "next/image";
import React, { useContext, useState } from "react";
import { myContext } from "./AuthForm";



export default function Div2() {
    const conA = useContext(myContext)
    console.log(conA);
  return (
    
    <div>
        <p>Hey whats up</p>
    </div>  
    
  );
};