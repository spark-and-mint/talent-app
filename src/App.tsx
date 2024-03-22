import { Route, Routes } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import {
  Account,
  Contract,
  Home,
  Profile,
  Work,
  EmailVerification,
} from "./_root/pages"
import SignUpForm from "./_auth/forms/SignUpForm"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "sonner"
import "./globals.css"
import Header from "./components/shared/Header"
import Section from "./components/shared/Section"

const App = () => {
  return (
    <main>
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
            <Route path="/verify" element={<EmailVerification />} />
          </Route>
        </Routes>
      </Section>

      <Toaster position="top-right" expand={true} richColors />
    </main>
  )
}

export default App
