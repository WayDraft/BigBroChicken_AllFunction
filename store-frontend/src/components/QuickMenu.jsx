import { Link } from 'react-router-dom'

export default function QuickMenu() {
  return (
    <div className="
      fixed bottom-0 flex flex-row justify-center bg-black/90 z-50 w-full h-[90px]
      lg:top-[150px] lg:right-[10px] lg:h-[500px] lg:w-[100px] lg:flex-col lg:rounded-2xl
    ">
      <div className="
        flex w-full h-full justify-between items-center px-10 divide-x divide-white text-white
        lg:flex-col lg:divide-x-0 lg:divide-y lg:px-0 lg:justify-around
      ">
        <Link to="/store" className="flex-1 text-center lg:py-10">구매</Link>
        <div className="flex-1 text-center lg:py-10">퀵메뉴2</div>
        <div className="flex-1 text-center lg:py-10">퀵메뉴3</div>
        <div className="flex-1 text-center lg:py-10">퀵메뉴4</div>
      </div>
    </div>
  )
}   