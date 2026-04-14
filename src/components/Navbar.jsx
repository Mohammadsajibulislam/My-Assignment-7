import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { LuClock, LuChartPie } from "react-icons/lu";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition ${
      isActive
        ? "bg-[#244d3f] text-white"
        : "text-gray-600 hover:text-[#244d3f]"
    }`;

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="KeenKeeper" className="h-8" />
      </div>
      <div className="flex items-center gap-1">
        <NavLink to="/" className={linkClass}>
          <AiOutlineHome size={16} /> Home
        </NavLink>
        <NavLink to="/timeline" className={linkClass}>
          <LuClock size={16} /> Timeline
        </NavLink>
        <NavLink to="/stats" className={linkClass}>
          <LuChartPie size={16} /> Stats
        </NavLink>
      </div>
    </nav>
  );
}
