import React from 'react'

export default function AddNewSection({SectionHeader}) {
  return (
    <div className="space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{SectionHeader}</h3>
            </div>
    </div>
  )
}

