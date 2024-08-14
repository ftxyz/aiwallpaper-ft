import { getWallpapers } from "@/models/wallpaper"
import { Wallpaper } from "@/types/wallpaper"

export async function GET(req:Request){
    const wallpaper: Wallpaper[] = await getWallpapers()
    return Response.json({
        code: 0,
        message: 'ok',
        data: wallpaper
    })
}