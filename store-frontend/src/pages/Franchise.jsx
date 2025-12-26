import { useEffect, useRef, useState } from 'react'
import { PiForkKnifeFill, PiPhoneCallFill } from 'react-icons/pi';
import { MdFactory, MdOutlineScreenRotationAlt } from 'react-icons/md';
import { FaLightbulb, FaFireAlt, FaClipboardList, FaCreditCard, FaStar } from 'react-icons/fa';
import { FaHouse, FaWonSign, FaChartLine, FaPepperHot, FaCirclePlus } from 'react-icons/fa6';
import { RiEBike2Fill } from 'react-icons/ri';
import { GiClockwiseRotation } from 'react-icons/gi';
import { Link } from 'react-router-dom';

function useInView(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver (([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      }, options
    )
    if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
  }, [options])
  
  return [ref, visible]
}

function ScrollAnimation({ children, delay = 0, className="" }) {
  const [ref, isVisible] = useInView({threshold: 0.2})

  return (
    <div
      ref = {ref}
      style={{transitionDelay: `${delay}ms`}}
      className={`transition-all duration-1000 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}  
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default function Franchise() {
  const [spread, setSpread] = useState(false)
  const [boxesRef, boxesVisible] = useInView({threshold: 0.3})
  const [showRef1, showVisible1] = useInView({threshold: 0.3})
  const [showRef2, showVisible2] = useInView({threshold: 0.3})
  const [swipeRef, swipeVisible] = useInView({threshold: 0.3})
  const [circleRef, circleVisible] = useInView({threshold: 0.3})

  {/* 화면에 나타난 후 딜레이 */}
  useEffect(() => {
    if (boxesVisible) {
      const timer = setTimeout(() => setSpread(true), 100);
      return () => clearTimeout(timer);
    } else {
      setSpread(false);
    }
  }, [boxesVisible]);

  return (
    <div className="flex flex-col w-full">

      <div
        className="relative w-full bg-cover bg-center flex items-center justify-center text-white"
        style={{backgroundImage: "url('/img/grilledHalf.jpg')"}}
      >
        <div className=""></div>

      </div>  
      {/* 메인 사진 */}
      <img src="/img/main1.png" className="w-full h-[300px] sm:h-[512px]" />

      {/* 섹션 1 */}
      <div className="bg-white pt-20">
        <ScrollAnimation delay={100}>
          <p className="text-3xl sm:text-4xl font-bold">"고객은 저희의 형님입니다."</p>
          <p className="text-xl pb-5">
            존중 · 책임 · 정직 가격
          </p>
        </ScrollAnimation>

        <ScrollAnimation className="flex flex-col sm:flex-row justify-center items-center sm:items-start py-10">
          <div className="flex flex-col space-y-1 sm:space-y-3 sm:pr-[200px] pb-10 text-xl">
            <span className="text-3xl text-burgundy font-bold">'형님'의 의미</span>
            <p>
              <span className="bg-black text-white rounded-full px-3 py-1 mr-1">형님</span>
                =  한국적 신뢰와 의지의 호칭
            </p>
            <p>가까운 <span className="font-bold">보호자</span></p>
            <p>먼저 <span className="font-bold">챙겨주는 사람</span></p>
            <p>존경과 <span className="font-bold">친근함</span>을 동시에 담은 관계</p>
          </div>

          <div className="flex flex-col space-y-1 sm: space-y-3 text-xl">
            <span className="text-3xl text-burgundy font-bold">네이밍 효과</span>
            <span className="text-2xl font-bold">거리감 ↓  재방문 ↑</span>
            <p>정(情) 기반의 관계 형성으로</p>
            <p>고객 충성도와 재방문율 증가</p>
          </div>
        </ScrollAnimation>
        
        {/* 이미지 3개 위로 올라온 후 양쪽으로 펼쳐짐 */}
        <div
          ref={boxesRef}
          className="relative w-full h-[150px] sm:h-[300px] lg:h-[800px] flex justify-center"
        >
          {[0, 1, 2].map((i) => (
            <ScrollAnimation
              key={i}
              className={`absolute w-1/3 aspect-square border border-black transition-all duration-1000 ease-out transform
                ${spread ? i===0 ? '-translate-x-full' : i===2 ? 'translate-x-full' : '' : ''}
              `}
            ></ScrollAnimation>
          ))}
        </div>
      </div>
        
      {/* 섹션 2 */}

      <div className="w-full flex flex-col pb-20 pt-10">
        {/* 2024 요식업 폐업률 */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:mx-[100px]">
          {[
            {
              title: "2024 요식업 폐업률",
              rate: 16.2,
              content1: (<>높은<br/> 원물 원가</>),
              content2: (<>고비용의<br/>인테리어</>),
              content3: (<>높은 고정비와<br/>유지보수</>),
            },
            {
              title: "3년 이내 폐업률",
              rate: 53.2,
              content1: (<>저렴한<br/>원물 단가</>),
              content2: (<>믿을 수 있는<br/>인테리어</>),
              content3: (<>낮은 고정비와<br/>유지보수</>)
            },
          ].map((card, i) => (
            <div key={i} className="flex flex-col">
              <ScrollAnimation className="flex flex-col items-center space-y-3 pb-10">
                <span className="text-3xl font-bold">{card.title}</span>
                <span className="text-5xl font-extrabold text-red-700">{card.rate}%</span>
                <p className="text-xs text-gray-300 text-left">
                  출처: 통계청, 2024년 자영업 실태조사<br/>
                  {card.rate === 16.2 ? "소매업(15.9%), 인적용역(14.11%)보다도 높습니다." : ""}
                </p>
              </ScrollAnimation>

              <div
                ref={i === 0 ? showRef1 : showRef2}
                className={`
                  flex flex-col sm:flex-row pb-24 space-x-3 justify-center items-cetner px-5
                  transition-all duration-1000 ease-out transform
                  ${i === 0 ?
                    showVisible1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    : showVisible2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }  
                `}
              >
                <div className="flex flex-row justify-center space-x-1 pb-4 sm:pb-0 text-sm sm:text-md">
                  <div className="flex items-center justify-center w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] p-3 rounded-full text-white bg-burgundy">{card.content1}</div>
                  <div className="flex items-center justify-center w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] p-3 rounded-full text-white bg-burgundy">{card.content2}</div>
                  <div className="flex items-center justify-center w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] p-3 rounded-full text-white bg-burgundy">{card.content3}</div>
                </div>

                <div className="flex items-center">
                  <span className="text-5xl hidden lg:flex">➡</span>
                </div>

                {card.rate === 16.2 ?
                  <div className="flex flex-col justify-center">
                    <span className="text-xs pb-3">높은 오픈 유지비용으로 인한 과도한 초기 부담회수</span>
                    <span className="text-3xl font-bold">기간 장기화</span>
                    <span className="text-4xl font-bold">▾</span>
                    <span className="text-2xl font-extrabold text-red-700">빠르게 망하는 구조</span>
                  </div> :
                  <div className="flex flex-col justify-center">
                    <span className="text-2xl font-bold">세가지를 모두 해결한</span>
                    <span className="text-3xl font-extrabold text-red-700 pb-3">형님닭구이의 시작</span>
                    <span className="text-xs">자영업자를 가장 먼저 이해하는 상생의 프랜차이즈 모델</span>
                  </div>
                }
                 
              </div>
            </div>
          ))}
        </div>

        <span className="text-3xl sm:text-5xl font-bold text-red-700 pb-2">정답은 "형님닭구이" 입니다.</span>
        <span className="text-sm sm:text-xl">7년차 베테랑 사업가들의 증명 된 사업성으로<br className="block sm:hidden"/> 소비자와 자영업자를 엮습니다.</span>
      </div>

      {/* 섹션 3 */}
        
      <div className="flex flex-col items-center pb-20">
        <img src="/img/logo_2.jpg" className="w-full lg:w-[1000px] h-[300px]"></img>
        <ScrollAnimation className="py-10">
          <p className="text-2xl sm:text-3xl font-bold">
            "생활상권 특화 숯불닭구이,<br/>
            2년이 아닌 20년을 바라봅니다"
          </p>
        </ScrollAnimation>

        {/* 개발원천 */}
        <div className="flex flex-col justify-center items-center divide-y divide-burgundy divide-[3px] pb-10">
          <div className="flex flex-col justify-center items-center w-full lg:w-[1000px] py-5">
            <p className="text-2xl font-bold pb-3">
              저비용 안정매출 구조 
              <br className="block sm:hidden"/>
              <span className="text-3xl text-red-700">"생활 상권"</span>
            </p>
            <p className="text-md sm:text-lg">
              초기비용(임대·매입)과 상시 수요(거주민) 측면에서<br className="block sm:hidden"/> 아파트 상권이 "저비용·안정매출 구조"를 만들기 유리
            </p>
          </div>

          <div className="flex flex-col justify-center items-center w-full lg:w-[1000px] py-5">
            <p className="text-2xl font-bold pb-3">
              원가는 줄이고 소비자 가격 다운 
              <br className="block sm:hidden"/>
              <span className="text-3xl text-red-700">"원물 직유통"</span>
            </p>
            <p className="text-md sm:text-lg">
              "직접 받기(통닭·직도계·직거래)" 체계 구축은<br className="block sm:hidden"/> 타사(부위·도매 의존) 대비 <br className="block sm:hidden"/>원가 20% 절감 목표를 데이터로 방어 가능
            </p>
          </div>

          <div className="flex flex-col justify-center items-center w-full lg:w-[1000px] py-5">
            <p className="text-2xl font-bold pb-3">
              유지보수와 비용이 저렴한
              <br className="block sm:hidden"/>
              <span className="text-3xl text-red-700">"직통 인테리어"</span>
            </p>
            <p className="text-md sm:text-lg">
              표준 디테일·자체감리·로우(격자) 마감·모듈가구로 <br className="block sm:hidden"/>인테리어 라인의 30% 절감은 수치로 방어 가능. <br className="block sm:hidden"/>업계 평균 구조(인테리어 46.9%)가 근거
            </p>
          </div>
        </div>
      </div>

      {/* 섹션 4 */}
      {/* 닭을 쓰는 이유 */}
      <div className="flex flex-col justify-center items-center pb-20">
        <span className="text-3xl font-bold pb-10">왜 닭이어야 할까요?</span>
        {/* 고기 비교 */}
        <div className="flex flex-col sm:flex-row w-full px-4 space-y-2 sm:space-y-0 sm:space-x-5 justify-center items-center pb-10">
          {[
            {
              title: "소고기 식당", 
              rate: "51.2%", 
              info: (<>초기비용 : ↑ ↑ ↑<br/>원재료 비용 : ↑ ↑ ↑<br/>경쟁 밀도 : ↑</>)
            },
            {
              title: "돼지고기 식당",
              rate: "48.9%",
              info: (<>초기비용 : ↑ ↑<br/>원재료 비용 : ↑ ↑<br/>경쟁 밀도 : ↑ ↑</>)
            },
            {
              title: "닭구이 식당",
              rate: "90.2%",
              info: (<>초기비용 : ↓<br/>원재료 비용 : ↓<br/>경쟁 대비 마진 : ↑</>)
            },
          ].map((card, i) => (
            <ScrollAnimation key={i} delay={i * 300} className="w-full sm:w-[250px] h-[150px] sm:h-[300px]">
              <div
                className={`
                  flex flex-col justify-center py-3 sm:py-8 bg-gray-100 rounded-xl border border-gray-400
                  ${card.title==='닭구이 식당' ? 'bg-white border-red-600 text-red-700 border-4' : 'text-gray-500'}
                `}
              >
                <span className="text-2xl font-bold pb-3">{card.title}</span>
                <div className="flex flex-row sm:flex-col justify-between px-10">
                  <p className="py-3 sm:py-10">
                    3년 생존율<br/>
                    <span className="text-2xl font-bold">{card.rate}</span>
                  </p>
                  <p className="text-black">{card.info}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* 안정적인 닭구이 */}

        <div className="flex flex-col text-left lg:w-[1000px] px-3 sm:pl-10 py-8 mx-5 mb-10 bg-gray-200 rounded-lg">
          <span className="text-xl font-bold py-5">왜 닭구이집이 안정적인가요?</span>
          <p className="pb-3"><span className="font-bold">접근성과 친숙함</span> -<br className="block sm:hidden"/> 생활상권에서 가장 보편적인 외식</p>
          <p className="pb-3"><span className="font-bold">안정적 수요</span> - <br className="block sm:hidden"/>인구 2만명 이상, 아파트 6000세대 이상 상권에서 폐업률 0.5% 미만</p>
          <p className="pb-3"><span className="font-bold">원가 구조</span> - <br className="block sm:hidden"/>달국이는 소/돼지 대비 원재료비 변동이 적고 마진율이 안정적</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center">
          <div className="flex flex-col items-center space-y-5 mx-5 sm:mx-20 pb-8 sm:pb-0">
            {[
              {
                title : "1인당 닭고기 소비량 지속 증가",
                detail : (<>지난 10년간 연평균 <span className="text-red-700">4.8% </span>성장</>)
              },
              {
                title : "생활식의 세컨드 스테이플",
                detail : "돼지·소보다 저렴하고 다양한 조리법 적용 가능"
              },
              {
                title : "프랜차이즈 표준화 용이",
                detail : "도계→가공→유통→조리의 시스템화 구축 완성도"
              },
            ].map((card, i) => (
              <ScrollAnimation className="flex flex-col w-full justify-center items-center p-3 border border-gray-100 rounded-xl shadow" delay={i * 300}>
                <span className="text-xl font-bold pb-3">{card.title}</span>
                <span>{card.detail}</span>
              </ScrollAnimation>
            ))}
          </div>

          <div className="flex flex-col space-y-3 items-start text-left">
            <span className="text-xl font-bold">닭고기 프랜차이즈의 비즈니스 우위</span>
            {[
              {num : 1, content : "낮은 식재료 원가로 마진 안정성 확보"},
              {num : 2, content : "표준화된 레시피와 조리법 적용 용이"},
              {num : 3, content : "다양한 메뉴 변형과 응용 가능"},
              {num : 4, content : "소득 변화에 상대적으로 안정적인 수요"},
            ].map((card) => (
              <p className="text-lg">
                <span className="inline-flex items-center justify-center text-xl text-red-600 text-lg font-bold w-10 h-10 bg-red-200 rounded-full p-2 mr-5">{card.num}</span>
                {card.content}
              </p>
            ))}
          </div>
        </div>
          
      </div>

      {/* 섹션 5 */}

      <div className="w-full flex-col justify-center">
        <ScrollAnimation className="py-10">
            <p className="text-3xl sm:text-4xl font-bold">"생존하는 닭구이집의 <br className="block sm:hidden"/>3대 무기를 찾았습니다"</p>
        </ScrollAnimation>
           
        <div className="flex flex-col lg:flex-row justify-center items-center sm:pb-10">
          {[
            {
              title: "원가우위 (직영 공급망)",
              detail: "본사 직영 닭공장 운영",
              content1: "원육 단가 -30% 절감",
              content2: "동일 품질 + 가격 경쟁력",
              content3: "마진율 +15% 상승",
              ex: "A사 대비 원가율 분석 (2023년 기준)"
            },
            {
              title: "낮은 초기·유지 비용",
              detail: "사내 인테리어·간판팀 직접 운영",
              content1: "초기 10개 총비용 -3%",
              content2: "투자금 회수 기간 20개월",
              content3: "시공비 -20% 절감",
              ex: "업계 평균 회수 기간 36개월 (공정위 자료)"
            },
            {
              title: "생활상권 + 홀 중심 모델",
              detail: "아파트 밀집 상권 + 현장 경험 특화",
              content1: "재방문율 67% (업계 평균 22%)",
              content2: "테이블 회전율 25%",
              content3: "객단가 32% (배달 대비)",
              ex: "시범 매장 3개월 운영 데이터 기준"
            },
          ].map((card, i) => (
            <ScrollAnimation className="w-full lg:w-[500px] aspect-square sm:py-10 mx-10 flex flex-col items-center justify-center rounded-3xl shadow-xl font-bold">
              <div className="flex flex-row py-10 items-center">
                <div className="text-left pr-5 pb-3">
                  <span className="text-2xl sm:text-5xl font-bold text-burgundy">{i+1}</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold flex-col">{card.title}</p>
              </div>

              <div className="flex flex-col w-[300px] sm:w-[400px] mx-4 items-center text-xl space-y-2">
                <div className="w-full border-l-[3px] border-red-700 bg-gray-200 p-3 mb-5">
                  <span className="text-red-700">{card.detail}</span>
                </div>
                 
                <div className="flex flex-col text-left pl-2 space-y-2">
                  <p><span className="text-red-700 text-2xl">→ </span>{card.content1}</p>
                  <p><span className="text-red-700 text-2xl">→ </span>{card.content2}</p>
                  <p><span className="text-red-700 text-2xl">→ </span>{card.content3}</p>

                  <span className="text-sm text-gray-700 text-left">{card.ex}</span>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
            
        <div className="flex flex-col items-start py-10 px-3 sm:px-[200px]">
          <span className="text-lg font-bold py-5">타 프랜차이즈 대비 수익성 비교</span>
          <div className="flex flex-row justify-center sm:justify-between w-full space-x-8 py-5 rounded-2xl bg-gray-200 sm:px-[200px]">
            <p>초기 투자비<br/><span className="text-xl sm:text-3xl text-red-700 font-bold">-42%</span></p>
            <p>월 고정비<br/><span className="text-xl sm:text-3xl text-red-700 font-bold">-25%</span></p>
            <p>손익분기점<br/><span className="text-xl sm:text-3xl text-red-700 font-bold">월 1,250만원</span></p>
        </div>
      </div>

      {/* 섹션 6 */}

      <div className="flex flex-col w-full pb-20">
        <div className="flex flex-col w-full py-10 bg-burgundy">
          <span className="text-xl sm:text-3xl font-bold text-white pb-3">원가 낮추고(COGS), 투자 줄이고(CAPEC), 생활상권에서 오랫동안 팔리는 모델</span>
          <span className="text-lg text-white">이 조합이 형님닭구이의 가장 큰 무기입니다.</span>
        </div>

        <div className="flex flex-col sm:flex-row pt-20 justify-center sm:space-x-[200px]">

          <div className="flex flex-col justify-center space-y-8 text-left py-10 ml-5 pl-5 border-l-[5px] border-burgundy">
            <span className="text-3xl font-bold">대표와 이사들의 경력</span>

            <div className="flex flex-row pr-3 sm:pb-5">
              <div className="flex justify-center items-center mr-5 p-2 bg-gray-200 rounded-full w-[40px] sm:w-[80px] h-[40px] sm:h-[80px]">
                <PiForkKnifeFill className="text-burgundy text-3xl sm:text-4xl" />
              </div>
              <div className="flex flex-col text-lg sm:text-xl">
                <span className="font-bold pb-3">풍부한 외식업 현장 경력</span>
                <span className="font-bold pb-3">다년간의 레스토랑 운영 및 프랜차이즈 관리 경험</span>
              </div>
            </div>

            <div className="flex flex-row pr-3">
              <div className="flex justify-center items-center mr-5 p-2 bg-gray-200 rounded-full w-[40px] sm:w-[80px] h-[40px] sm:h-[80px]">
                <MdFactory className="text-burgundy text-3xl sm:text-4xl" />
              </div>
              <div className="flex flex-col text-lg sm:text-xl">
                <span className="font-bold pb-3">직영 닭공장 운영</span>
                <span className="font-bold pb-3">원재료부터 가공까지 닭고기 공급망 전체 프로세스 경험</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8 text-left py-10 ml-5 pl-5 border-l-[5px] border-burgundy">
            <span className="text-3xl font-bold">형님닭구이의 탄생</span>
            {[
              {content: '생활상권 특화', detail: '도심 중심지 대신 동네 상권 티켓팅'},
              {content: '원가우위 확보', detail: '직영 닭공장 통한 원재료 원가 절감'},
              {content: '사내 시공 표준화', detail: '인테리어·설비 직영 운영으로 개설비 최소화'},
            ].map((history, i) => (
              <div className="flex flex-col sm:flex-row pr-3 items-start sm:items-center">
                <div className="flex justify-center items-center mr-5 px-5 py-3 mb-2 bg-burgundy rounded-2xl">
                  <span className="text-white font-bold">해결 방향 {i+1}</span>
                </div>
                <div className="flex flex-col text-lg sm:text-xl pl-3 sm:pl-0">
                  <span className="font-bold sm:pb-3">{history.content}</span>
                  <span className="sm:b-3 text-sm">{history.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 섹션 7 */}

      <div className="flex flex-col space-y-10 pb-20">
        <span className="text-2xl sm:text-3xl font-bold">생활상권 + 홀 중심 모델 수익 전략</span>
        <div className="flex flex-row p-5 h-[130px] rounded-2xl bg-red-100 border-[1px] border-burgundy items-center mx-3 sm:mx-10">
          <FaLightbulb className="text-4xl text-burgundy mr-5"/>
          <div className="flex flex-col text-left">
            <span className="text-md sm:text-xl text-red-700 font-bold pb-2">아파트 밀집 생활상권 특성 활용한 홀 중심 운영으로 회전율↑·객단가↑ 달성</span>
            <span>재방문 고객 유도 + 현장 퍼포먼스 극대화 = 안정적인 수익성 확보</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between px-3 sm:px-[100px]">
          <div className="flex flex-col space-y-2 sm:space-y-5 pb-5 sm:pb-0">
            <span className="text-2xl font-bold">생활상권 홀 중심 차별화 전략</span>
            {[
              {
                icon: <FaHouse/>,
                title: "아파트 밀집 생활상권 집중",
                detail: "도보 5분 거리 2,000세대 이상 밀집 지역 타켓팅으로 안정적 단골 고객 확보"
              },
              {
                icon: <MdOutlineScreenRotationAlt/>,
                title: "테이블 회전 최적화",
                detail: "좌석 배치 & 대기/콜 시스템 효율화로 회전율 30% ↑ 달성 (업계 평균 대비)"
              },
              {
                icon: <FaFireAlt/>,
                title: "숯불 퍼포먼스 차별화",
                detail: "테이블당 숯불 그릴 퍼포먼스로 객단가 25% ↑ 및 인스타그램 인증 확산 효과"
              },
              {
                icon: <RiEBike2Fill/>,
                title: "배달은 보조 전략",
                detail: "피크타임 평준화용, 매출 비중 30% 이하 유지로 주방 효율성 극대화"
              },
            ].map((card) => (
              <ScrollAnimation className="flex flex-row p-3 sm:p-5 bg-red-100 border-l-[4px] border-burgundy items-center">
                <div className="text-2xl sm:text-4xl text-burgundy mr-5">{card.icon}</div>
                <div className="flex flex-col text-left">
                  <span className="text-lg sm:text-xl font-bold pb-2">{card.title}</span>
                  <span className="text-sm sm:text-lg">{card.detail}</span>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold pb-2 sm:pb-5">생활상권 홀 중심 KPI 향상 효과</span>
             
            <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-5">
              {[
                {title: "회전율", info: 30, content: "테이블당 일평균 회전수 5.2회", icon: <MdOutlineScreenRotationAlt/>},
                {title: "객단가", info: 25, content: "1인당 평균 주문금액 22,800원", icon: <FaWonSign/>},
                {title: "재방문율", info: 40, content: "월 2회 이상 방문 고객 비율", icon: <GiClockwiseRotation/>},
                {title: "순이익률", info: 35, content: "배달앱 수수료 절감 효과 포함", icon: <FaChartLine/>},
              ].map((card) => (
                <div className="flex flex-row justify-between items-center sm:w-[400px] bg-gray-100 rounded-lg border border-gray-300 p-4">
                  <div className="flex flex-col space-y-3 text-left">
                    <span>{card.title}</span>
                    <p className="text-3xl font-bold text-red-700">+{card.info}% <span className="text-green-700">↑</span></p>
                    <span>{card.content}</span>
                  </div>
                  <div className="hidden sm:flex text-4xl font-bold text-burgundy">{card.icon}</div>
                </div>
              ))}
            </div>

            <span className="text-2xl py-5">회전 최적화 흐름</span>
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-y-5 sm:gap-y-0">
              {[
                {icon: <FaClipboardList/>, title: '주문', time: '3-5분'},
                {icon: <FaFireAlt/>, title: '조리', time: '8-12분'},
                {icon: <PiForkKnifeFill/>, title: '서빙', time: '15-20분'},
                {icon: <FaCreditCard/>, title: '결제', time: '2-4분'},
              ].map((card, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center w-[140px] sm:w-[180px] h-[110px] sm:h-[150px] p-3 border border-gray-200 rounded-2xl shadow">
                    <div className="p-3 rounded-full bg-burgundy text-white text-xl sm:text-2xl">{card.icon}</div>
                    <span className="text-xl">{card.title}</span>
                    <span>{card.time}</span>
                  </div>
                  {i < 3 && (
                    <>
                    {i === 1
                      ? (<div className="hidden sm:block w-5 sm:w-10 h-[4px] bg-burgundy"/>)
                      : (<div className="w-5 sm:w-10 h-[4px] bg-burgundy"/>)}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 8 */}
              
      <div className="w-full flex flex-col items-center justify-center pb-20">
        <ScrollAnimation className="flex flex-col font-bold py-8">
          <p className="text-3xl pb-3">SIGNATURE MENU</p>
          <p className="text-xl pb-3">메인메뉴 - 숯불닭구이</p>
        </ScrollAnimation>

        <div
          ref={swipeRef}
          className="w-full flex-col lg:grid lg:grid-cols-2 px-4 overflow-x-hidden"
        >
          {[
            {
              menu: "소금구이", price: "42,000", detail: "특제 천일염으로 간을 한 담백한 맛",
              amount: "1000g", icon: <FaFireAlt/>, side:  "숯불향 100%"
            },
            {
              menu: "양념구이", price: "42,000", detail: "특제 양념으로 버무려 감칠맛이 일품",
              amount: "1000g", icon: <FaPepperHot/>, side:  "매콤달콤"
            },
            {
              menu: "닭목살구이", price: "19,000", detail: "특수부위로 쫄깃한 맛이 일품",
              amount: "400g", icon: <FaStar/>, side:  "인기메뉴"
            },
            {
              menu: "닭발", price: "12,000", detail: "추가 주문으로 제격인 사이드 메뉴",
              amount: "250g", icon: <FaCirclePlus/>, side:  "사이드 미포함"
            },
          ].map((menu, i) => (
            <div className={`
              w-full h-[200px] flex flex-col sm:pl-3 space-y-5 justify-center border border-gray-300
              transition-all duration-1000 ease-out transform
              ${i===0 || i===2 ?
                swipeVisible ? 'translate-x-0 items-center lg:items-end sm:pr-[50px]' : '-translate-x-full'
                : swipeVisible ? 'translate-x-0 items-center lg:items-start sm:pl-[50px]' : 'opacity-0 translate-x-full'
              }
            `}
            >
              <div className="flex flex-row justify-center space-x-10">
                <p className="text-3xl font-bold pb-3">{menu.menu}</p>
                <div className="flex justify-center items-center p-2 rounded-full text-white bg-burgundy">{menu.price}</div>
              </div> 
              <span className="text-xl">{menu.detail}</span>
              <div className="flex flex-row space-x-2 items-center">
                <div> <PiForkKnifeFill/> </div>
                <span>{menu.amount} / </span>
                <span>{menu.icon}</span>
                <span>{menu.side}</span>
              </div>
            </div>
          ))}
        </div>

        <span className="text-2xl sm:text-3xl font-bold pt-20 pb-10">사이드 메뉴-닭 전문 사이드 구성으로 전문성 업그레이드</span>
        <div className="flex flex-col sm:w-[1000px] w-[350px] p-5 bg-red-100 border-l-[4px] border-red-700 sm:px-[100px]">
          <span className="text-2xl font-bold pb-5">사이드 메뉴 라인업</span>
          <div className="flex flex-col sm:grid sm:grid-cols-2 grid-rows-3 gap-x-10 gap-y-3">
            {[
              {menu: "닭 죽", price: "5,000원"},
              {menu: "주류", price: "5,000원"},
              {menu: "닭 칼국수", price: "7,000원"},
              {menu: "음료", price: "2,000원"},
              {menu: "갱시기", price: "6,000원"},
              {menu: "공기밥", price: "1,000원"},
            ].map((side) => (
              <div className="flex flex-row justify-between text-xl">
                <p><span className="text-burgundy">●  </span>{side.menu}</p>
                <p>{side.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center py-3 gap-x-[200px]">
          <div className="flex flex-col space-y-5 items-start mx-5 sm:mx-0 pb-10 sm:pb-0">
            <span className="text-xl font-bold">가격 포지셔닝 & 업셀 전략</span>
            {[
              {
                content: (<>동급 대비 <span className="text-red-700">- 10%</span> 메인 메뉴 가격</>),
                detail: "경쟁사 가격보다 낮게 책정하여 진입장벽 낮춤"
              },
              {
                content: (<><span className="text-red-700">사이드 메뉴 다양화</span>로 객단가 상승</>),
                detail: "메인 주문 고객의 67%가 사이드 1개 이상 주문 (업계 평균)"
              },
              {
                content: (<><span className="text-red-700">숯불 퍼포먼스</span>로 현장 체류가치 증대</>),
                detail: "테이블에서 직접 구워먹는 경험으로 음료·사이드 추가 주문율 ↑"
              },
            ].map((card) => (
              <div className="flex flex-row justify-center items-center text-left">
                <span className="text-burgundy pr-3">●</span>
                <div className="flex flex-col">
                  <p className="text-xl">{card.content}</p>
                  <span>{card.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center w-[300px] py-8 px-3 bg-red-100 border border-red-300 rounded-2xl">
            <span className="text-2xl font-bold pb-3">메뉴 순이익률</span>
            <span>업계 평균 대비 +3.5%</span>
            <span className="text-6xl text-red-700 font-bold pt-10">24.5%</span>
          </div>
        </div>
        <span className="text-xs sm:text-md text-gray-500 pb-20">자료출처: 공정위 정보공개서, 전국 닭구이/구이 전문점 업계 평균 (2024)</span>

        <div className="flex flex-col sm:flex-row items-center gap-x-[200px]">
          <div className="flex flex-col">
            <span className="text-3xl font-bold pb-2">형님닭구이 평균 객단가</span>
            <span className="text-xl pb-5 sm:pb-10">업계 평균 대비 -10%</span>
            <span className="text-5xl sm:text-6xl text-red-700 font-bold pb-10">23,000원</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-row w-full justify-between pb-3">
              <span>경쟁사 평균</span>
              <span>20,000원</span>
            </div>
            <div className="relative bg-gray-200 rounded-full w-[350px] sm:w-[630px] h-[50px]">
              <div className="absolute bg-red-500 w-[300px] sm:w-[580px] h-[50px] rounded-full" />
            </div>

            <div className="flex flex-row w-full justify-between pt-5 sm:pt-10 pb-3">
              <span>형님닭구이</span>
              <span>23,000원</span>
            </div>
            <div className="relative bg-red-500 rounded-full w-[350px] sm:w-[630px] h-[50px]"/>
          </div>
        </div>
      </div>

      {/* 섹션 9 */}

      <div className="flex flex-col pb-20">
        <span className="text-3xl font-bold">기대효과 & 콜 투 액션</span>
        <span className="text-xl pb-10">형님닭구이와 함께하는 성공 창업</span>

        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row justify-center items-center bg-gray-200 py-20 px-3 sm:px-[100px]">
            <span className="text-3xl font-bold pb-8">핵심 기대효과</span>
            <div className="grid grid-cols-2 gap-3 sm:gap-0 sm:flex sm:flex-row">
              {[
                {title: "초기 투자비 절감", info: "-30", detail: "정보공개서 대비 개설비용"},
                {title: "시공비 절감", info: "-20", detail: "외주 대비 사내 시공 효과"},
                {title: "회전율 증가", info: "+25", detail: "홀 중심 운영 테이블 회전"},
                {title: "객단가 상승", info: "+18", detail: "업셀 메뉴를 통한 객단가"},
              ].map((effects) => (
                <div
                  ref={circleRef}
                  className={`
                    flex flex-col space-y-2 justify-center items-center p-5 pb-8 w-full sm:mx-[50px] aspect-square bg-white rounded-full
                    transition-all duration-700 ease-out transform
                    ${circleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}
                  `}
                >
                  <span className="text-lg sm:text-2xl font-bold">{effects.title}</span>
                  <p className="text-3xl sm:text-6xl font-bold">{effects.info}<span className="text-red-700">%</span></p>
                  <span className="text-xs sm:text-xl">{effects.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 10 */}

      <div className="flex flex-col sm:flex-row justify-center items-center pb-20">
        <div className="flex flex-col sm:pr-[100px] pb-10 sm:pb-0">
          <span className="text-4xl font-bold pb-3">창업 상담 신청</span>
          <span className="text-2xl">형님닭구이 창업상담팀</span>
          <div className="flex flex-row items-center">
            <PiPhoneCallFill className="text-burgundy text-5xl pr-3" />
            <span className="text-3xl font-bold">010-6378-5802</span>
          </div>
        </div>
        <Link
          to="/inquiry"
          className="flex justify-center items-center px-8 py-3 h-[80px] rounded-3xl bg-burgundy"
        >
          <span className="text-3xl text-white font-bold">지금 상담 예약하기 ▶</span>
        </Link>
      </div>
      </div>
    </div>
  )
}