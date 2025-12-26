export default function BaseInput({ className='', ...props }) {
  return (
    <input
      className={`
        px-3 py-2 border border-gray-600 focus:outline-none
        ${className}
      `}
      {...props}
    />
  )
}