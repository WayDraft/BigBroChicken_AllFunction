import BaseInput from './BaseInput'

export default function InputError({ value, setValue, ...props }) {
  const [clicked, setClicked] = useState(false)

  const handleBlur = () => {
    setClicked(true)
  }

  return (
    <div className="flex flex-col">
      <BaseInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        className={`${clicked && !value ? 'border-red-500 mb-0' : 'mb-8'}`}
        {...props}
      />
      {clicked && !value && (
        <p className="text-red-700 text-sm mt-1">필수 항목입니다.</p>
      )}
    </div>
  )
}