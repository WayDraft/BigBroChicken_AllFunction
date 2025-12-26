export default function PwReset() {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-row justify-between items-center w-full gap-3 text-lg">
        <span className="w-1/5">비밀번호</span>
        <input className="w-4/5 border border-black px-3 py-2" type="password" />
      </div>

      <div className="flex flex-row justify-between items-center w-full gap-3 text-lg">
        <span className="w-1/5">비밀번호 확인</span>
        <input className="w-4/5 border border-black px-3 py-2" type="password" />
      </div>
    </div>
  )
}