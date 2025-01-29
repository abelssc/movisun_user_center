import { ReactNode } from "react"

const Main = ({children}:{children:ReactNode}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900  p-4 flex-1">
        {children}
    </div>
  )
}

export default Main