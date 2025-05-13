'use client'

import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Main from "./Main"
import Footer from "./Footer"
import { MinimalUser } from "@/types"

export default function HomeComponent({ users }: { users: MinimalUser[] }) {
  const [darkMode, setDarkMode] = useState(false);
  console.log("users", users);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleAuthentication = () => {
    
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Main darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  )
}