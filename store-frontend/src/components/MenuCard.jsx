export default function MenuCard({title, description, img}) {
  return (
    <>
    <div className="grid grid-row-4 gap-6 py-30">
      <div className="w-[400px] h-[500px] flex flex-col rounded-3xl shadow-2xl justify-center items-center px-8">
        <img 
          src={img}
          className="w-[230px] aspect-square cursor-pointer hover:scale-105 transition-transform duration-300"
        />
        <div className="bg-gray-300 w-full h-[1px] mt-12 mb-3" />
        <span className="text-2xl my-2 font-bold my-3">{title}</span>
        <span className="text-md">{description}</span>
      </div>
    </div>
    </>    
  )
}