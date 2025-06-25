import { Menu, ChevronRight } from "lucide-react"
import { Outlet } from "react-router"


export default function RightDashboardPage({ onToggleSidebar }) {
  return (
    <div className="flex-1 flex flex-col bg-neutral-950">

      <header className="flex h-16 items-center border-b border-neutral-800 bg-neutral-950 animate-fadeIn">
        <div
          onClick={onToggleSidebar}
          className="flex items-center gap-2 px-4">
          <button
            onClick={onToggleSidebar}
            className="-ml-1 p-2 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded transition-all duration-200 cursor-pointer"
          >
            <Menu
              className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-4 p-4 flex-1">
          <Outlet/>
      </div>

    </div>
  )
}