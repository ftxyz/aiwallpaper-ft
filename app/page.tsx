"use client"
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Input from "@/components/input";
import Wallpapers from "@/components/wallpaper";
import { Wallpaper } from "@/types/wallpaper";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])

  const getAllPapers = async function(){
    const result = await fetch("/api/get-wallpapers");
    const { data } = await result.json();
    if(data){
      setWallpapers(data)
    }
  }

  useEffect(()=>{
    getAllPapers()
  }, [])
  
  return (
    <div className="w-screen h-screen">
      <Header />
      <Hero />
      <Input setWallpapers={setWallpapers} />
      <Wallpapers wallpapers={wallpapers} />
      <Footer />
    </div>
  )
}
