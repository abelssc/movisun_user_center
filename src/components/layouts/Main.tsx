import { ReactNode } from "react"

const Main = ({children}:{children:ReactNode}) => {
  return (
    <div className="bg-gray-100 p-4 flex-1">
        {children}
    </div>
  )
}

export default Main