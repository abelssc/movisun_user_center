import { ReactNode } from "react"
import Aside from "./Aside"
import Footer from "./Footer"
import Main from "./Main"
import Header from "./Header"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
            <Aside />
            <Main>{children}</Main>
        </div>
        <Footer />
    </div>
  )
}
export default Layout