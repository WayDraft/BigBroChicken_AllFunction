import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaShoppingCart } from "react-icons/fa"

export default function MenuCard({id, title, description, price, cost, img}) {
  const { user } = useAuth()
  return (
    <Link to={`/menu/${id}`}>
      <div className="cursor-pointer grid gap-6 py-8 lg:py-30">
        <div className="w-[180px] lg:w-[400px] lg:h-[500px] flex flex-col justify-center items-center px-5 lg:px-8 text-left">
          <img 
            src={img}
            className="lg:w-[230px] aspect-square cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          <div className="bg-gray-300 w-full h-[1px] mt-5 lg:mt-12 mb-3" />
          <div className="flex flex-col items-start w-full px-2">
            <span className="text-lg lg:text-2xl lg:my-2 font-bold">{title}</span>
            <div className="flex flex-row justify-between items-center w-full">
              {user ?
                (<span className="text-md lg:text-lg">{price} 원</span>) :
                (<span className="text-md lg:text-lg">{cost} 원</span>)
              }
              <FaShoppingCart className="text-lg lg:text-2xl" />
            </div>
          </div>
          
        </div>
      </div>
    </Link>    
  )
}