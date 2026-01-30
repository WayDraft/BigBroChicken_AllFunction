import MenuCard from '../components/MenuCard'
import menuItems from '../data/MenuItem'

export default function Menu() {
  return (
    <div className="py-20 px-[120px] bg-white min-h-screen flex flex-col justify-center mb-20">
      <h2 className="text-5xl font-bold pb-20">메뉴</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center items-center">
        {menuItems.map((item) => (
          <MenuCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            cost={item.nonMember}
            img={item.img}
          />
        ))}
      </div>
    </div>
  )
}