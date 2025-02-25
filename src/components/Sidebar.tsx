import React, { useState } from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { FaCar, FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-screen bg-gray-900 text-white border-r shadow-md transition-all relative ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex flex-col">
          <div className="flex justify-between items-center">
            <h1
              className={`text-lg font-semibold transition-all ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              ADMIN DASHBOARD
            </h1>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-blue-500 transition-all absolute -right-3 top-4 z-10"
            >
              {expanded ? (
                <LuChevronFirst size={20} />
              ) : (
                <LuChevronLast size={20} />
              )}
            </button>
          </div>
          <hr className="mt-2 border-gray-700" />
        </div>

        <div className="mt-5 flex-1">
          <ul className="px-2 space-y-2">
            {[
              { name: "Trips", icon: FaCar, path: "/trips" },
              { name: "Add Trips", icon: FaPlusCircle, path: "/add-trips" },
              {
                name: "Real-Time Car Location",
                icon: FaMapMarkerAlt,
                path: "/real-time-car-location",
              },
            ].map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-500 transition-all"
                >
                  <item.icon size={20} className="min-w-[20px]" />
                  <span
                    className={`text-base font-medium transition-all ${
                      expanded ? "opacity-100" : "opacity-0 absolute left-14"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
