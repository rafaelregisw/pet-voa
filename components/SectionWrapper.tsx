interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  noPadding?: boolean
}

export default function SectionWrapper({ 
  children, 
  className = '', 
  id,
  noPadding = false 
}: SectionWrapperProps) {
  return (
    <section 
      id={id}
      className={`
        ${noPadding ? '' : 'py-16 md:py-24 lg:py-32'}
        relative
        ${className}
      `}
    >
      {children}
    </section>
  )
}