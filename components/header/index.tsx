import { UserButton } from "@clerk/nextjs"
export default function(){
    return (
        <section>
      <div className="flex justify-between mx-auto w-full max-w-7xl pt-16">
        <h2 className="text-3xl font-bold text-primary">
          AI Wallpaper
        </h2>
        <UserButton/>
      </div>
    </section>
    )
}