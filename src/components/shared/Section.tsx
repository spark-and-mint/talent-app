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
  return (
    <div
      id={id}
      className={`
      relative
      ${
        customPaddings || `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32" : ""}`
      }
      ${className || ""}`}
    >
      {children}

      <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-40" />
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-40" />

      {crosses && (
        <>
          <div
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
