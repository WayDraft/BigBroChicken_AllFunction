export default function Store() {
  const onClickPayment = () => {
    const { IMP } = window
    console.log("IMP : ", IMP)

    IMP.init("imp21136635")
    console.log("init 완료")

    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        name: "테스트 상품",
        amount: 100,
      },
      (rsp) => {
        console.log("결제 응답: ", rsp)
        if (rsp.success) {
          console.log("결제 성공:", rsp)
          alert("결제 성공")
        } else {
          console.log("결제 실패:", rsp)
          alert("결제 실패")
        }
      }
    )
  }
  return (
    <div className="flex flex-col">
      <span className="pb-10">테스트 상품</span>
      <button onClick={onClickPayment} className="bg-gray-500 p-5">
        구매하기
      </button>
    </div>
  )
}