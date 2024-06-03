import { useMemberContext } from "@/context/AuthContext"
import SectionSvg from "../../svg/SectionSvg"

interface SectionProps {
  className?: string
  id?: string
  crosses?: boolean
  crossesOffset?: string
  customPaddings?: boolean
  children: React.ReactNode
}

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}: SectionProps) => {
  const { member } = useMemberContext()

  return (
    <div
      id={id}
      className={`
      relative
      ${customPaddings || `py-2 lg:py-16 ${crosses ? "lg:py-18" : ""}`}
      ${className || ""}
      `}
    >
      {children}
      <div
        style={{
          opacity: member.id ? 1 : 0,
          transition: "opacity .5s ease-in-out",
        }}
        className="hidden absolute top-0 left-5 w-0.25 h-full bg-accent/40 pointer-events-none md:block lg:left-[5.75rem] 2xl:left-[10rem]"
      />
      <div
        style={{
          opacity: member.id ? 1 : 0,
          transition: "opacity .5s ease-in-out",
        }}
        className="hidden absolute top-0 right-5 w-0.25 h-full bg-accent/40 pointer-events-none md:block lg:right-[5.75rem] 2xl:right-[10rem]"
      />
      {crosses && (
        <div
          style={{
            opacity: member.id ? 1 : 0,
            transition: "opacity .5s ease-in-out",
          }}
        >
          <div
            className={`hidden absolute top-0 -left-7.5 right-8.5 h-0.25 bg-accent/40 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block right-0`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </div>
      )}
    </div>
  )
}

export default Section
