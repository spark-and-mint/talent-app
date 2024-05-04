import { Route, Routes } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import {
  Account,
  Contract,
  Home,
  Profile,
  Opportunities,
  Projects,
  EmailVerification,
  Project,
  Support,
  Referral,
} from "./_root/pages"
import SignUpForm from "./_auth/forms/SignUpForm"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "sonner"
import "./globals.css"
import Header from "./components/shared/Header"
import Section from "./components/shared/Section"
import ResetPassword from "./_auth/forms/ResetPassword"

const App = () => {
  return (
    <main className="flex flex-col sm:h-screen">
      <div className="absolute inset-x-0 h-[480px] bg-gradient-to-b from-[#06374e] to-transparent opacity-40" />

      <Header />

      <Section crosses className="flex-grow">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/reset" element={<ResetPassword />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/account" element={<Account />} />
            <Route path="/verify" element={<EmailVerification />} />
            <Route path="/support" element={<Support />} />
          </Route>
        </Routes>
      </Section>

      <Toaster position="top-right" expand={true} richColors />
    </main>
  )
}

export default App
