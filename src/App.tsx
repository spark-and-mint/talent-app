import { Route, Routes } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import { Account, Contract, Home, Profile, Work } from "./_root/pages"
import SignUpForm from "./_auth/forms/SignUpForm"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "sonner"
import "./globals.css"
import Header from "./components/shared/Header"
import Section from "./components/shared/Section"
// import { useMemberContext } from "./context/AuthContext"

const App = () => {
  // const { isAuthenticated, member } = useMemberContext()

  // console.log(member)

  return (
    <main
    // className="opacity-0"
    // style={{
    //   transition: "opacity 0.15s ease-out",
    //   opacity: isAuthenticated ? 1 : 0,
    // }}
    >
      <Header />

      <Section crosses>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </Section>

      <Toaster position="top-right" expand={true} richColors />
    </main>
  )
}

export default App
