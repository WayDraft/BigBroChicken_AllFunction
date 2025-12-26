import BaseInput from './BaseInput'

export default function OptionInput({ value, setValue, ...props }) {
  return (
    <BaseInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  )
}