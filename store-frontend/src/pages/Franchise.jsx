export default function Franchies() {
  return (
    <div className="w-full text-white">
      {/* 상단 검은 섹션 */}
      <div className="flex flex-col gap-5 bg-black py-[300px] text-2xl px-32">
        <p>
          안녕하세요, <span className="font-bold">김창열과 함께하는 형님닭구이</span>입니다.
        </p>

        <p>
          청년들이 직접 굽고, 직접 담근 정직한 닭구이,<br />
          <span className="font-bold">국내산 HACCP 인증 생닭</span>만을 사용해 믿을 수 있습니다.
        </p>
      </div>

      {/* 이미지 배경 섹션 */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* 배경 이미지 */}
        <img
          src="/img/grilledHalf.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* 검은 오버레이 */}
        <div className="absolute inset-0 bg-black/50" />

        {/* 콘텐츠 */}
        <div className="relative z-10 mx-auto py-[200px] px-32">
          <div className="flex flex-col justify-start text-left gap-10 text-lg pb-[300px]">
            <span className="text-4xl font-bold pb-8">
              형님 닭구이가 성공할 수 밖에 없는 이유.
            </span>

            <p>
              <span className="font-bold text-2xl">제조원가 절감</span><br />
              청년들이 직접 HACCP 인증 닭공장을 운영함으로써 유통마진을 최소화하여<br />
              <span className="font-bold">
                100g기준 타사 대비 약 20% 저렴한 가격으로 납품
              </span>
              이 가능합니다.<br />
              원가 절감 효과를 통해 고객에게 합리적인 가격과 높은 만족도를 제공합니다.
            </p>

            <p>
              <span className="font-bold text-2xl">시공비 절감</span><br />
              매장 인테리어를 자체 시공팀이 직접 진행하여 타사 대비 약 20%의 시공비 절감을 실현함.<br />
              직접 컨택이 가능해 빠른 공정 진행과 맞춤 시공이 가능함.
            </p>

            <p>
              <span className="font-bold text-2xl">고정비 절감</span><br />
              아파트 단지 및 동네 상권 중심 운영 구조로 임대로 등 고정비 부담이 낮고,<br />
              소규모 효율형 매장으로 초기 투자 리스크를 최소화함.
            </p>
          </div>

          <div className="flex flex-col justify-end text-right gap-10 text-lg">
            <p>
              <span className="font-bold text-2xl">전문 마케팅 및 홍보 효과</span><br />
              홍보전문위원 DJ DOC 김창열과 협업하여 브랜드 신뢰도를 강화하고,<br />
              오픈 당일 직접 방문 및 콘텐츠노출로 매장 홍보 효과 극대화 예정.
            </p>

            <p>
              <span className="font-bold text-2xl">청년 중심의 안정적 운영</span><br />
              실제 청년들이 시행착오 끝에 만든 프랜차이즈로,<br />
              위기 대응 능력과 실행력이 높으며 끝까지 함께하는 브랜드를 목표로 운영함.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
