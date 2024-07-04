'use client';
import Image from "next/image";
import React, { useState } from "react";
import AuthPage from "./components/AuthForm";
import TasksPage from "./components/TaskPage";
import { useAuth } from "./contexts/AuthContext";



export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    
      // <AuthPage></AuthPage>
      <TasksPage></TasksPage>
  );
};

