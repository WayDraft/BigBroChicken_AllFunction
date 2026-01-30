export default function RadioGroup({
  key, name, value, checked, onChange, label, className=""
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        key={key}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden peer"
      />

      <div className="flex flex-row justify-between items-center gap-3">
        <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-gray-200">
          <div className={`w-2 h-2 rounded-full transition-transform duration-200 ${className}`} />
        </div>

        <span className="pt-1">{label}</span>
      </div>
    </label>
  )
}