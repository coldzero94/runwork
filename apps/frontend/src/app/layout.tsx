import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Runwork - 하루를 달리듯 기록하세요",
  description: "달리기를 메타포로 한 데일리 로그 서비스. 일, 휴식, 기타 상태를 전환하며 하루를 기록하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
