import SideNav from "./_components/sidenav";

const MainLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-screen flex dark:bg-[#1F1F1F]">
      <SideNav />
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
