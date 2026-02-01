export default function Form({ className=[], label, children }) {
  return (
    <div className={`flex flex-row justify-between items-center w-full gap-3 text-lg ${className}`}>
      <span className="w-1/5 pt-2">{label}</span>
      <div className="w-4/5">
        {children}
      </div>
    </div>
  )
}