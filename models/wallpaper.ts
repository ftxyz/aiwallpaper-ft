import { Wallpaper } from "@/types/wallpaper";
import { getDb } from "./db";

export async function insertWallpaper(wallpaper: Wallpaper){
    console.log("insertWallpaper====", wallpaper)
    const db = await getDb()
    console.log("db====", db)
    const res = await db.query(
        `INSERT INTO wallpaper (user_email, img_description, img_size, img_url, llm_name, llm_params, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
        [wallpaper.user_email, wallpaper.img_description, wallpaper.img_size, wallpaper.img_url, wallpaper.llm_name, wallpaper.llm_params, wallpaper.created_at]
    )
    console.log("res====", res)
    return res;
}

export async function getWallpapers(
    page: number = 1,
    pageSize: number = 50
): Promise<Wallpaper[]> {
    const db = await getDb()
    const res = await db.query(
        `SELECT * FROM wallpaper ORDER BY created_at DESC LIMIT $1 OFFSET $2`, 
        [pageSize, (page - 1) * pageSize]
    )
    if (res.rowCount === 0) {
        return []
    }
    const { rows } = res
    let wallpapers: Wallpaper[] = []
    rows.forEach((row)=>{
        const wallpaper: Wallpaper = {
            id: row.id,
            user_email: row.user_email,
            img_description: row.img_description,
            img_size: row.img_size,
            img_url: row.img_url,
            llm_name: row.llm_name,
            llm_params: row.llm_params,
            created_at: row.created_at
        }
        wallpapers.push(wallpaper)
    })
    return wallpapers
}