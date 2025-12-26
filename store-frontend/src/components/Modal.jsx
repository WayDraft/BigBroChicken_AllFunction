export default function Modal({children}) {
  return (
    <div className="fixed inset-0  z-[9999] flex backdrop-blur-xs">
      <div className="bg-white px-10 w-[1000px] h-[800px] overflow-y-auto shadow-lg py-10">
        {children}
      </div>
    </div>
  )
}