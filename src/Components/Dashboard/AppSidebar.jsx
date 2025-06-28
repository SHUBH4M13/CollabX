// AppSidebar.jsx
import { Command } from "lucide-react"
import { useNavigate } from "react-router"
import { useState } from "react";
import AddSectionHeader from "./AddSectionHeader";
import AddSectionItem from "./AddSectionItem";

const sidebarData = {
  user: {
    name: "Shubham Karna",
    email: "svk13gaming@gmail.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
}


export default function AppSidebar({ isCollapsed = false }) {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("_id");
  const [isActive , setisActive ] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} min-h-screen bg-neutral-950 border-r border-neutral-800 flex flex-col transition-all duration-300 animate-fadeIn`}>

      {/* Header */}
      <div className="p-4 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <a
          href="/dashboard"
          className={` ${isCollapsed ? 'opacity-0' : 'opacity-100'} flex justify-center items-center gap-3 p-3 rounded-lg hover:bg-hovercolor transition-colors`}
        >
          <img
            className="w-40 h-30 object-contain"
            src="https://religglobal.com/wp-content/uploads/2019/10/relig-solution-1024x379.webp"
            alt="Company Logo"
          />
        </a>
      </div>

      {!isCollapsed && (
        <div className="flex-1 px-4 space-y-3 animate-fadeIn overflow-y-auto" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          
        <>
        <AddSectionHeader SectionHeader="Manage" />
        <AddSectionItem 
        onClick={ () => { navigate("employees")}}
        itemName={"Employees"} />
        <AddSectionItem 
        onClick={ () => { navigate("employees/add")}}
        itemName={"Add New Employee"} />
        </>    

        <>
        <AddSectionHeader SectionHeader="PrepX" />
        <AddSectionItem 
        onClick={ () => { navigate("project/PrepX/info")}}
        itemName={"PrepX Info"} />
        <AddSectionItem 
        onClick={ () => { navigate("project/PrepX/teams")}}
        itemName={"PrepX Team"} />
        <AddSectionItem 
        onClick={ () => { navigate("project/PrepX/board")}}
        itemName={"PrepX Board"} />
        </>  


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
                onClick={() => navigate(`/edit/${user_id}`)}
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
        </div>
      )}
    </div>
  );
}