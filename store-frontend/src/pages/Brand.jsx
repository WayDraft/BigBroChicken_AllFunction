export default function Brand() {
  return (
    <main>
      <div className="flex flex-col w-full">        
        <div className="relative w-full h-[450px] lg:h-[600px] flex flex-col justify-center">
          <img
            src="/img/chicken_1.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"/>
          <div className="relative z-10 flex flex-col items-center text-center px-5 text-white">
            <p className="font-bold text-2xl sm:text-3xl lg:text-4xl pb-8">"고객님은 저희의 형님입니다."</p>
            <div className="text-sm sm:text-lg lg:text-xl space-y-5">
              <p>
                안녕하세요, 형님 닭구이입니다.<br/>
                퇴근 후 한 잔 곁들인 닭구이 한 점이 누군가에겐 하루의 위로가 되길 바라며 시작했습니다.<br/>
              </p>
              <p>
                국내산 신선육만 사용하고, 숯불 향 그대로, 직접 구운 닭구이로<br/>
                동네에서 가장 따뜻한 저녁을 굽고 있습니다.
              </p>
              <p>
                오늘도 형님처럼, 든든하고 진심으로.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-[550px] flex flex-col sm:flex-row items-center sm:justify-between lg:justify-center my-[200px]">
          <div className="flex flex-col text-left pl-5 lg:pr-[300px]">
            <span className="text-4xl pt-10 sm:pt-0 lg:text-6xl font-bold pb-10">
              단지 곁에서<br />
              더 합리적이게
            </span>
            <p className="pb-5 lg:text-xl">
              우리는 공장 직제조로 불필요한 비용을 줄이고,<br/>
              직화 숯불로 닭의 풍미를 제대로 살립니다.
            </p>
            <p className="lg:text-xl">
              소금·양념 2종과 시그니처 사이드메뉴 목살,<br/>
              그리고 누구나 좋아하는 사이드로 다가갑니다.
            </p>
          </div>
          <div className="sm:relative flex flex-row items-center justify-end h-full sm:pr-5">
            <img
              src="/img/chicken_2.jpg"
              className="
                sm:relative sm:z-20 sm:rounded-xl sm:object-cover shadow-lg sm:ml-[30px]
                w-1/3
                sm:top-[60px] sm:w-[300px] sm:h-[200px] 
                lg:top-[120px] lg:left-[130px] lg:w-[400px] lg:h-[300px]"
            />
            <img
              src="/img/logo_2.jpg"
              className="
                sm:absolute z-10 sm:rounded-xl sm:object-cover shadow-lg
                w-2/3 
                sm:right-[80px] sm:bottom-[260px] sm:w-[400px] sm:h-[280px]
                lg:bottom-[240px] lg:right[120px] lg:w-[500px]"
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:pr-[120px] mb-[200px]">
          <img src="/img/store.jpg" className="w-full h-[300px] lg:w-[800px] lg:h-[400px]" />
          <div className="lg:text-right py-10 sm:py-20 text-sm sm:text-xl">
            <p className="pb-4">
              <span className="text-burgundy font-bold text-xl sm:text-3xl">형님닭구이</span>는 공장 직제조와 직배송 원육으로<br/>
              신선함과 가격을 모두 잡은 직화 숯불 닭구이 전문점입니다.
            </p>
            <p>
              소금·양념 2종과 시그니쳐 목살,
              <br classNmae="block sm:hidden" />그리고 닭발&칼국수&닭죽으로 간단한 구성에<br/>
              가족 누구나 편하게 즐길 수있으며, 오로지 직접 오셔야 드실 수 있게 만들어<br/>
              훨씬 주민들과 가까이에서 함께합니다.
            </p>
          </div>
        </div>

        <div className="relative w-full h-[350px] lg:h-[600px] flex flex-col justify-center">
          <img
            src="/img/store_outside.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"/>
          <div className="relative z-10 flex flex-col justify-center items-center text-2xl sm:text-3xl text-white font-bold">
            <p className="pb-3">오늘도 동네 이웃이 안심하고 찾는</p>
            <p>'국민 닭구이집'을 지향합니다.</p>
          </div>
        </div>

      </div>
    </main>
  )
}