export default function Footer() {
  const infoList = [
    { label: "가맹문의", value: "010-6378-5802" },
    { label: "왜관점", value: "경북 칠곡군 왜관읍 석전로7길 9" },
    { label: "구미점", value: "경북 구미시 신시로 7" },
  ];

  return (
    <footer className="text-sm sm:text-lg bg-burgundy text-white w-full p-6 flex items-start flex-col mb-[90px] lg:mb-0">
      <div className="flex flex-low gap-x-5 sm:gap-x-8">
        <p>개인정보처리방침</p>
        <p>이용약관</p>
        <p>이메일무단수집거부</p>
      </div>

      {/* 구분선 */}
      <div className="w-full border-[1px] my-4" />

      <img
        src="/img/logo.png"
        className="w-[180px] pb-2"
      />
      <div className="flex flex-wrap gap-x-5 pb-3">
        <p>(주)형님</p>
        <p>사업자등록번호 : 111-11-11111</p>
        <p>대표 : 배성룡</p>
      </div>

      <div className="ml-0">
        {infoList.map((item, index) => (
          <div key={index} className="flex mb-2">
            <div className="w-20 font-bold text-left">{item.label}</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>
    </footer>
  )
}