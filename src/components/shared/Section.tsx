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
      ${customPaddings || `py-10 lg:py-16 ${crosses ? "lg:py-18" : ""}`}
      ${className || ""}
      `}
    >
      {children}
      <div
        style={{ opacity: member.id ? 1 : 0 }}
        className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-40"
      />
      <div
        style={{ opacity: member.id ? 1 : 0 }}
        className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-40"
      />
      {crosses && (
        <>
          <div
            style={{ opacity: member.id ? 1 : 0 }}
            className={`hidden absolute top-0 -left-7.5 right-8.5 h-0.25 bg-stroke-1 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left0- right-0`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </div>
  )
}

export default Section
