// AppSidebar.jsx
import { Command } from "lucide-react"
import { NavMain } from "./SidebarFunctions/NavMain"
import { useNavigate } from "react-router"

const sidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Manage",
      url: "#",
      icon: "SquareTerminal",
      isActive: true,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
  ],
  navSecondary: [
    { title: "Support", url: "#", icon: "LifeBuoy" },
    { title: "Feedback", url: "#", icon: "Send" },
  ],
  projects: [
    { name: "PrepX", url: "#", icon: "Frame" },
  ],
}

export default function AppSidebar({ isCollapsed = false }) {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("_id");
  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-neutral-950 border-r border-neutral-800 flex flex-col transition-all duration-300 animate-fadeIn`}>
      {/* Header */}
      <div className="p-4 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
      <a
  href="#"
  className={` ${isCollapsed ? 'opacity-0' : 'opacity-100'} flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-900 transition-colors`}
>
  <img
    className="w-10 h-10 object-contain"
    src="https://images.icon-icons.com/2699/PNG/512/nvidia_logo_icon_169902.png"
    alt="Company Logo"
  />
  <div className="flex flex-col">
    <span className="text-sm font-semibold text-white">Company Inc</span>
    <span className="text-xs text-neutral-400">Enterprise</span>
  </div>
</a>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 px-4 space-y-6 animate-fadeIn overflow-y-auto" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <NavMain items={sidebarData.navMain} />
          
          {/* Projects Section */}
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Projects</h3>
            </div>
            {sidebarData.projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <span>{project.name}</span>
              </a>
            ))}
          </div>

          <div className="flex-1" />
          
          {/* Secondary Navigation */}
          <div className="space-y-1 pt-4 border-t border-neutral-800">
            {sidebarData.navSecondary.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div className="animate-fadeIn" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
          <div className="flex items-center gap-3 p-3 border-t border-neutral-800">
            <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
              <span className="text-xs text-neutral-400">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{sidebarData.user.name}</p>
              <p className="text-xs text-neutral-400 truncate">{sidebarData.user.email}</p>
            </div>
            <button
              onClick={() => navigate(`/user/${user_id}/edit`)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-700 transition-colors duration-200 group"
              title="Profile Settings"
            >
              <svg
                className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
)}
    </div>
  )
}