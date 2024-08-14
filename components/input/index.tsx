"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Wallpaper } from "@/types/wallpaper";

interface Props{
    setWallpapers: Dispatch<SetStateAction<Wallpaper[]>>
}

export default function({ setWallpapers }: Props){
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)

    const headlerClick = async function(){
        console.log("current description:",description)
        if (!description){
            return alert("请输入描述")
        }
        try{
            generateWallpaper()
        }catch(e){
            console.log("error:",e)
        }
    }

    const generateWallpaper = async function(){
        const param = {
            description: description
        }
        setLoading(true)
        const result = await fetch("/api/gen-wallpaper", {
            method: "POST",
            body: JSON.stringify(param)
        })
        console.log("result====:", result)
        const { data } = await result.json()
        console.log("data====:", data)
        // 将数据添加到wallpapers中
        setWallpapers((prev)=>{
            return [data, ...prev]
        })
        setLoading(false)
        console.log("data====:", data)
    }

    return <div className="flex items-center justify-center mt-10">
        <Input 
            type="text" 
            placeholder="请描述你要生成的壁纸" 
            className="max-w-lg mr-5"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            disabled={loading}
        />
        <Button onClick={headlerClick} disabled={loading}>{loading ? '生成中...' : '生成壁纸'}</Button>'
    </div>
}