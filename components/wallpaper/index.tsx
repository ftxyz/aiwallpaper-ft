"use client";

import { Wallpaper } from "@/types/wallpaper";
import { useEffect, useState } from "react";

interface Props{
    wallpapers: Wallpaper[];
}

export default function({ wallpapers }: Props){
    // const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

    // const fetchWallpapers = async function(){
    //     const result = await fetch("/api/get-wallpapers");
    //     const { data } = await result.json()
    //     if(data){
    //         setWallpapers(data)
    //     }
    // }

    // useEffect(() => {
    //     fetchWallpapers()
    // }, [])

    return (
        <section>
            <div className="text-center text-2xl pt-10 pb-5">
                <h1 className="text-4xl font-bold">全部壁纸</h1>
                <p className="text-center text-sm text-gray-500 sm:text-base">
                    一共 {wallpapers.length} 张壁纸
                </p>
            </div>
      <div className="mx-auto w-full max-w-7xl px-5">
      <div className="mb-8 grid gap-5 sm:grid-cols-2 sm:justify-items-stretch md:mb-12 md:grid-cols-3 lg:mb-16 lg:gap-6">
            {wallpapers && wallpapers.map((wallpaper:Wallpaper, idx:number)=>{
                return (
                    <a
                    href={wallpaper.img_url}
                    className="flex flex-col gap-4 rounded-md px-4 py-8 md:p-0"
                    key={idx}
                    target="_blank"
                    >
                    <img
                        src={wallpaper.img_url}
                        alt=""
                        className="h-60 object-cover"
                    />
                    <div className="flex flex-col items-start">
                        <p className="text-xl font-bold md:text-2xl">
                        {wallpaper.img_description}
                        </p>
                        <div className="flex flex-auto items-start text-sm text-gray-500 lg:flex-row lg:items-center">
                        <p>{wallpaper.user_nick}</p>
                        <p className="ml-2">{wallpaper.img_size}</p>
                        </div>
                    </div>
                    </a>
                
                )
            })}
          </div>
        
      </div>
    </section>
    )
}

//服务端请求有缓存，改成客户端请求
// import { Wallpaper } from "@/types/wallpaper";

// async function getData():Promise<Wallpaper[]> {
//     const result = await fetch("http://localhost:3000/api/get-wallpapers");
//     const { data } = await result.json();
//     return data;
// }

// export default async function(){
//     const data = await getData();
//     console.log("data====:", data)
//     return (
//         <section className="max-w-lg mx-auto">
//             <div>
//                 {data.map((wallpaper, idx)=>{
//                     return (
//                         <div>
//                             <h2>{wallpaper.img_description}</h2>
//                             <img src={wallpaper.img_url} />
//                             <p>{wallpaper.img_size}</p>
//                         </div>
//                     )
//                 })}
//             </div>
//         </section>
//     )
// }