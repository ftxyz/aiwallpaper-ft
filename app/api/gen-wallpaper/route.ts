import { downloadAndUploadImage } from "@/lib/s3";
import { insertWallpaper } from "@/models/wallpaper";
import { getOpenAIClient } from "@/service/openai"
import { Wallpaper } from "@/types/wallpaper";
import { ImageGenerateParams } from "openai/resources/images.mjs";
import { auth, currentUser } from '@clerk/nextjs/server'
import { insertUser } from "@/models/user";
import { User } from "@/types/user";

export async function POST(req:Request){
    const { description } = await req.json();
    console.log("description: ", description)
    // 获取用户信息
    const user = await currentUser()
    if (!user){
        return Response.json({
            code: -1,
            message: "用户信息获取失败"
        })
    }
    const email = user.emailAddresses[0].emailAddress;
    // 保存用户信息到数据库
    const userInfo: User = {
        email: email,
        nickname: user.firstName || '',
        avatar_url: user.imageUrl,
        created_at: new Date().toISOString()
    }
    //await insertUser(userInfo)

    const img_size = '1792x1024';
    const llm_name = 'dall-e-3';
    const llm_params: ImageGenerateParams = {
        prompt: `generate a desktop wallpaper about ${description}`,
        model: llm_name,
        n: 1,
        quality: 'hd',
        response_format: 'url',
        size: img_size,
        style: 'natural'
    }
    // const client = getOpenAIClient()
    // const result = await client.images.generate(llm_params)
    // console.log("generate wallpaper result: ", result)
    // const img_url = result.data[0].url;
    // if (!img_url){
    //     return Response.json({
    //         code: -1,
    //         message: "图片生成失败"
    //     })
    // }
    const img_url = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-RXm0YAHbgvKhAFD4lw00H07X/user-96fnWvDNShcZ7FLhhfilX2UN/img-xWzEUJUrotKRzEnYpRhrM4Gx.png?st=2024-08-14T04%3A12%3A22Z&se=2024-08-14T06%3A12%3A22Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-08-13T22%3A13%3A40Z&ske=2024-08-14T22%3A13%3A40Z&sks=b&skv=2023-11-03&sig=fIpU6rkT8i3Iq0i3OQKs3QrVylulkwFF5D%2BdbVmPxi4%3D"
    console.log("img_url============: ", img_url)
    // 上传图片到aws
    // const s3_img = await downloadAndUploadImage(
    //     img_url,
    //     process.env.AWS_BUCKET || 'aiwallpaper-ft',
    //     `wallpapers/${new Date().getTime()}.png`
    // )
    const s3_img = {
        ETag: '"95d47475522198b92518b0299cb7bdc6"',
        ServerSideEncryption: 'AES256',
        Location: 'https://aiwallpaper-ft.s3.amazonaws.com/wallpapers/1723612657615.png',
        key: 'wallpapers/1723612657615.png',
        Key: 'wallpapers/1723612657615.png',
        Bucket: 'aiwallpaper-ft'
      }
    console.log("s3_img===============: ", s3_img)
    // 保存数据库
    const wallpaper: Wallpaper = {
        user_email: email,
        img_url: s3_img.Location,
        img_description: description,
        img_size: img_size,
        llm_name: llm_name,
        llm_params: JSON.stringify(llm_params),
        created_at: new Date().toISOString()
    }
    console.log("wallpaper: ", wallpaper)
    await insertWallpaper(wallpaper);
    return Response.json({
        code: 0,
        message: 'ok',
        data: wallpaper
    })
}