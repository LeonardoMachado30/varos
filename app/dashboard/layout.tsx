import HeaderDefault from "@/components/molecules/HeaderDefault";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderDefault></HeaderDefault>
      {children}
    </>
  );
}
