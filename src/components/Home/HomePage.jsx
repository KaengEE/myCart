import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";

export const HomePage = () => {
  return (
    <div>
      {/* 히어로섹션 */}
      <HeroSection
        title="아이폰 14 프로 그 이상"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="/"
        image={iphone}
      />
      {/* 상품들 */}
      {/* 히어로섹션 */}
      <HeroSection
        title="궁극의 장비를 세팅하세요"
        subtitle="You can add Studio Display and color-matched Magic accessories to your bag after configure your Mac mini."
        link="/"
        image={mac}
      />
    </div>
  );
};