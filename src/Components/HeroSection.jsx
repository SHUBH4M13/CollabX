import Navbar from "./Navbar"
import discordphoto from "../assets/discordphoto.png/"
import { useNavigate } from "react-router"

export default function HeroSection() {

    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center justify-center bg-black text-white min-h-screen">
            <Navbar />
            <div className="px-4 py-10 md:py-20">
                <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold md:text-4xl lg:text-7xl animate-fade-in">
                    Lorem ipsum dolor sit amet 
                </h1>
                <p className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400 animate-fade-in-delay">
                   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque nostrum ipsum minus explicabo aliquid.
                </p>
                <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-in-delay-2">

                    <button 
                    onClick={() => { navigate("/signup")}}
                    className="w-60 font-Geist transform rounded-lg bg-primary px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-#fd9a00-200">
                        Get Started
                    </button>
                </div>

                <div className=" flex justify-center items-center  ">
                    <div className="relative z-10 w-5/6 mt-20 rounded-3xl border border-neutral-800 bg-neutral-900 p-4 shadow-md animate-fade-in-delay-3">
                        <div className="w-full overflow-hidden rounded-xl border border-gray-700">
                            <img
                                src={discordphoto}
                                alt="Landing page preview"
                                className="aspect-[16/9] h-auto w-full object-cover"
                                height={1000}
                                width={1000}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

