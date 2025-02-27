import { ReactNode } from "react"
import Aside from "./Aside"
import Main from "./Main"
import Header from "./Header"
import { ToastContainer } from "react-toastify"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800 ">
        <Header />
        <div className="flex flex-1">
            <Aside />
            <Main>{children}</Main>
        </div>
      </div>
    <ToastContainer />
    </>
  )
}
export default Layout