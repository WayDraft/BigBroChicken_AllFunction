import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'

export default function Main({isOpen, setIsOpen}) {
  const exampleBox = [
    'bg-red-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-purple-400',
  ]
  const [visibleCount, setVisibleCount] = useState(window.innerWidth >= 1024 ? 4 : 2);
  const delay = 5000;
  const [index, setIndex] = useState(visibleCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);
    const [itemWidth, setItemWidth] = useState(300); // item width based on wrapper's clientWidth
  const gap = 20; // px gap between items
    // parent will provide side padding (px-36). We calculate using wrapper clientWidth.

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

  const slides = [
    ...exampleBox.slice(-visibleCount),
    ...exampleBox,
    ...exampleBox.slice(0, visibleCount),
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

  // 무한 슬라이드 효과: 마지막(오른쪽 끝)에서 바로 처음(왼쪽 끝)으로 점프
  useEffect(() => {
    if (index === exampleBox.length + visibleCount) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(visibleCount);
      }, 700);
    } else if (index === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(exampleBox.length);
      }, 700);
    } else {
      setIsTransitioning(true);
    }
  }, [index, exampleBox.length, visibleCount]);

  const nextSlide = () => setIndex((prev) => prev + 1);
  const prevSlide = () => setIndex((prev) => prev - 1);

  return (
    <>
    <main className="bg-gray-100 w-full flex flex-col">
      <img src="/img/main.png" className="w-full" />

      <div className="w-full h-128 flex flex-col items-center justify-center py-52">
        <p className="text-4xl font-bold text-red-800 pb-7">형님 닭구이</p>
        <p className="text-2xl pb-3">"고객님은 저희의 형님입니다."</p>
        <p className="text-xl pb-9">
          공장 직제조로 원가를 낮추고, 동네상권에 더 가깝게.<br/>
          직화 숯불로 구워 담백·든든하게 즐기는 동네 대표 닭구이집.
        </p>
        <Link
          to="/brand"
          className="border-2 border-black p-3 flex justify-between w-40 rounded-3xl"
        >
          <p className="text-lg">브랜드 스토리</p>
          <p>→</p>
        </Link>
      </div>

      <div className="w-full flex flex-col items-center justify-center bg-red-500 py-[40px] px-36">
        <p className='pb-10'>형님 닭구이</p>

        {/* 슬라이드 영역 */}
        <div
          ref={wrapperRef}
          className="mx-auto overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '100vw',
          }}
        >
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{
              transform: `translateX(-${index * (itemWidth + gap)}px)`,
              width: `${slides.length * (itemWidth + gap) - gap}px`,
            }}
            onTransitionEnd={() => {
              if (!isTransitioning) setIsTransitioning(true);
            }}
          >
            {slides.map((color, i) => (
              <div
                key={i}
                className={`flex items-center justify-center text-white font-bold text-2xl ${color}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                  marginRight: i !== slides.length - 1 ? `${gap}px` : 0,
                  flex: '0 0 auto',
                }}
              >
                Box {((i - visibleCount + exampleBox.length) % exampleBox.length) + 1}
              </div>
            ))}
          </div>
        </div>

        {/* 좌우 화살표 버튼 - absolute로 배치 */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
        >
          ›
        </button>
        
      </div>

      <div className="w-full h-128 flex flex-col items-center justify-center py-52">
        <p className="text-3xl font-bold text-red-800 pb-5">가맹문의</p>
        <p className="text-lg pb-6">가맹문의 모집 멘트 삽입란</p>
        <Link
          to="/inquiry"
          className="border-2 border-black p-3 flex justify-between w-40 rounded-3xl"
        >
          <p>가맹 문의하기</p>
          <p>→</p>
        </Link>
      </div>
    </main>
    </>
  )
}