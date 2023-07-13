'use client';
import Script from 'next/script';

export default function Kakao() {
  const kakaoInit = () => {
    // 페이지가 로드시 실행
    if (window) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  };
  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit} />
    </>
  );
}
