import Sidebar from "@/components/Sidebar/Sidebar";
import Providers from "@/provider/QueryClientProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between h-screen">
      <Sidebar />
      <div className="pt-[48px] flex-1 px-[52px] overflow-y-auto scrollbar-none">
      <Providers>{children}</Providers>
      </div>
    </div>
  );
}
