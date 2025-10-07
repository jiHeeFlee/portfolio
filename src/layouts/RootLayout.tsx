// 스크롤 복원 + 에러 경계 분리

import { Outlet, ScrollRestoration } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      {/* 추후 공통 헤더, 푸서 삽입 */}
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
