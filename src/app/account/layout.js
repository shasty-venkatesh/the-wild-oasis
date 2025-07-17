import SideNavigation from "../_components/SideNavigation";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full w-[80rem] gap-9">
      <div ><SideNavigation /></div>
      <div className="py-1">{children}</div>
    </div>
  );
}

export default Layout;
