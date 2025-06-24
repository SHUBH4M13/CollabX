import { useState } from "react"
import { 
  ChevronDown,
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  LifeBuoy,
  Send,
  Frame,
  PieChart,
  Map
} from "lucide-react"

const iconMap = {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  LifeBuoy,
  Send,
  Frame,
  PieChart,
  Map
}

export function NavMain({ items }) {
  const [expandedItems, setExpandedItems] = useState(new Set(['Playground']))

  const toggleExpanded = (title) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(title)) {
      newExpanded.delete(title)
    } else {
      newExpanded.add(title)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = iconMap[item.icon] || SquareTerminal
        const isExpanded = expandedItems.has(item.title)
        
        return (
          <div key={item.title}>
            <button
              onClick={() => toggleExpanded(item.title)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors hover:bg-neutral-800 ${
                item.isActive ? 'bg-neutral-800 text-white' : 'text-neutral-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.title}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            {isExpanded && (
              <div className="ml-7 mt-1 space-y-1">
                {item.items.map((subItem) => (
                  <a
                    key={subItem.title}
                    href={subItem.url}
                    className="block px-3 py-1.5 text-sm text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
                  >
                    {subItem.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function NavProjects({ projects }) {
  return (
    <div className="space-y-1">
      <div className="px-3 py-2">
        <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Projects</h3>
      </div>
      {projects.map((project) => {
        const Icon = iconMap[project.icon] || Frame
        return (
          <a
            key={project.name}
            href={project.url}
            className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <Icon className="w-4 h-4" />
            <span>{project.name}</span>
          </a>
        )
      })}
    </div>
  )
}

export function NavSecondary({ items }) {
  return (
    <div className="space-y-1 pt-4 border-t border-neutral-800">
      {items.map((item) => {
        const Icon = iconMap[item.icon] || LifeBuoy
        return (
          <a
            key={item.title}
            href={item.url}
            className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <Icon className="w-4 h-4" />
            <span>{item.title}</span>
          </a>
        )
      })}
    </div>
  )
}

export function NavUser({ user }) {
  return (
    <div className="flex items-center gap-3 p-3 border-t border-neutral-800">
      <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
        <span className="text-xs text-neutral-400 font-medium">
          {user.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{user.name}</p>
        <p className="text-xs text-neutral-400 truncate">{user.email}</p>
      </div>
    </div>
  )
}