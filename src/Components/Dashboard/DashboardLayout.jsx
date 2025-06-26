// Dashboard.jsx
import React, { useState } from 'react'
import AppSidebar from './AppSidebar'
import DashboardPage from './RightDashboardPage'

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <div className="flex">
        <AppSidebar isCollapsed={sidebarCollapsed} />
        <DashboardPage onToggleSidebar={toggleSidebar} />
      </div>
    </div>
  )
}