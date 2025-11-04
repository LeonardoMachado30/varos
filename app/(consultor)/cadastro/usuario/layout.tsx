import HeaderDefault from "@/components/molecules/HeaderDefault";
import HeaderForm from "@/components/molecules/HeaderForm";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
