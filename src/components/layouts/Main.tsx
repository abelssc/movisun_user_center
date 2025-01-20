import { ReactNode } from "react"

const Main = ({children}:{children:ReactNode}) => {
  return (
    <div className="bg-gray-400 h-screen p-4 flex-1">
        {children}
    </div>
  )
}

export default Main