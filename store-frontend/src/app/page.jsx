import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'

export default function Main() {
  const exampleBox = [
    { img: '/img/menu/간장구이.png', name: '간장구이' },
    { img: '/img/menu/소금구이.png', name: '소금구이' },
    { img: '/img/menu/양념구이.png', name: '양념구이' },
    { img: '/img/menu/닭목살.png', name: '닭목살' },
    { img: '/img/menu/닭발.png', name: '닭발' },
  ]
  const [visibleCount, setVisibleCount] = useState(window.innerWidth >= 1024 ? 4 : 2);   // 한 화면에 보여질 슬라이딩 박스 개수. 데스크탑: 4개, 모바일: 2개
  const delay = 5000;   // 슬라이딩 딜레이 시간
  const [index, setIndex] = useState(exampleBox.length);   // 현재 슬라이드 박스 위치
  const [isTransitioning, setIsTransitioning] = useState(true);   // 애니메이션 제어. true: 부드러움, false: 순간이동
  const timeoutRef = useRef(null);   // 슬라이드 타이머 관리
  const wrapperRef = useRef(null);   // 슬라이드 컨테이너 너비 계산
  const [itemWidth, setItemWidth] = useState(100);   // 슬라이드 박스 크기
  const gap = window.innerWidth >= 1024 ? 50 : 20;   // 웹일 때는 메뉴 사이 갭이 50, 모바일은 20

  // 반응형 visibleCount 및 itemWidth 계산
  useEffect(() => {
    const handleResize = () => {
      const newVisible = window.innerWidth >= 1024 ? 4 : 2;
      setVisibleCount(newVisible);

      const containerWidth = wrapperRef.current?.clientWidth ?? window.innerWidth;
      setItemWidth((containerWidth - gap * (newVisible - 1)) / newVisible);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // visibleCount가 바뀌면 index와 itemWidth 재계산
  useEffect(() => {
    const containerWidth = wrapperRef.current?.clientWidth ?? window.innerWidth;
    setItemWidth((containerWidth - gap * (visibleCount - 1)) / visibleCount);
    setIndex(visibleCount);
  }, [visibleCount]);

  // 무한 슬라이드 생성 (앞, 뒤 슬라이드는 무한 슬라이드 연출을 위한 가짜)
  const slides = [
    ...exampleBox, ...exampleBox, ...exampleBox
  ];

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
 
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, delay);
    return () => resetTimeout();
  }, [index, visibleCount]);

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true)
      })
    }
  }, [isTransitioning])

  return (
    <>
    <main className="bg-white w-full flex flex-col">
      <img src="/img/main.png" className="w-full" />

      <div className="w-full h-128 flex flex-col items-center justify-center py-20 lg:py-52">
        <p className="text-3xl lg:text-4xl font-bold text-red-800 pb-7">형님 닭구이</p>
        <p className="text-xl lg:text-2xl pb-3">"고객님은 저희의 형님입니다."</p>
        <p className="text-md lg:text-xl pb-9">
          공장 직제조로 원가를 낮추고, 동네상권에 더 가깝게.<br/>
          직화 숯불로 구워 담백·든든하게 즐기는 동네 대표 닭구이집.
        </p>
        <Link
          to="/brand"
          className="border-2 border-black px-5 py-3 flex justify-between items-center w-36 lg:w-[180px] rounded-3xl"
        >
          <p className="text-sm lg:text-lg">브랜드 스토리</p>
          <p>→</p>
        </Link>
      </div>

      <div className="w-full flex flex-col items-center justify-center bg-burgundy py-24 lg:py-[150px] px-3 lg:px-36">
        <p className='text-2xl lg:text-4xl text-white font-bold pb-10 lg:pb-20'>형님 닭구이 대표 메뉴</p>

        {/* 슬라이드 영역 */}
        <div
          ref={wrapperRef}
          className="mx-auto overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '100vw',
          }}
        >
          <div className="overflow-hidden w-full">
            <div
              className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{
                transform: `translateX(-${index * (itemWidth + gap)}px)`,
                width: `${slides.length * (itemWidth + gap)}px`,
              }}
              onTransitionEnd={() => {
                if (index >= exampleBox.length * 2) {
                  setIsTransitioning(false)
                  setIndex(exampleBox.length)
                }

                if (index <= exampleBox.length - visibleCount) {
                  setIsTransitioning(false)
                  setIndex(exampleBox.length)
                }
              }}
            >
              {/* 메뉴 밖스(흰색) 디자인 */}
              {slides.map((img, i) => (
                <div
                  className="rounded-xl bg-white py-5 px-5"
                  key={i}
                  style={{
                    width: `${itemWidth}px`,
                    marginRight: `${gap}px`,
                    flex: '0 0 auto',
                  }}
                >
                  <div
                    className="w-full h-4/5 aspect-square flex items-center justify-center">
                    <img
                      src={img.img}
                      className="max-w-full max-h-full object-center"
                    />
                  </div>

                  <div className="border-[1px] border-gray-200 my-2 lg:my-5" />

                  <div className="py-2 text-center">
                    <span className="text-sm lg:text-xl">{img.name}</span>
                  </div>
                </div>
              ))}     
            </div>
          </div>
        </div>        
      </div>

      <div className="w-full h-128 flex flex-col items-center justify-center py-32 lg:py-52">
        <p className="text-2xl lg:text-4xl font-bold text-red-800 pb-5">가맹문의</p>
        <Link
          to="/inquiry"
          className="border-2 border-black px-5 py-3 flex justify-between items-center lg:w-[180px] rounded-3xl"
        >
          <p className="text-sm lg:text-lg">가맹 문의하기</p>
          <p>→</p>
        </Link>
      </div>
    </main>
    </>
  )
}