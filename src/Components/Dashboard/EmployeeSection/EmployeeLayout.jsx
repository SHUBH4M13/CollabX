import React from 'react'
import { Outlet } from 'react-router'

export default function EmployeeLayout() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}
