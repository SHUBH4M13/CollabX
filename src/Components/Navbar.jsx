import { useNavigate } from "react-router"

const Navbar = () => {
    const navigate = useNavigate();
    return (
      <nav className="flex w-full items-center justify-between border-t border-b border-neutral-800 px-4 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold md:text-2xl font-Geist text-white">Henosis</h1>
        </div>
        <button 
        onClick={() => { navigate("/login")}}
        className="w-24 transform rounded-lg font-Geist bg-primary px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-#fd9a00-200 md:w-32">
          Login
        </button>
      </nav>
    )
  }

export default Navbar