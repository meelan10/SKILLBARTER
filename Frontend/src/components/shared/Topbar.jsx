import { Search, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-4 px-8 py-5 border-b border-border bg-white">
      <div className="relative flex-1 max-w-xl">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search skills, people or requests..."
          className="w-full bg-page border border-border rounded-full pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-dark/20"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative text-text">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red" />
        </button>
        <Link to="/chat/1" className="relative text-text">
          <MessageSquare size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red" />
        </Link>
        <Link to="/profile" className="flex items-center gap-1.5">
          <Avatar name={user?.name || "Aarav Sharma"} size={34} />
          <ChevronDown size={15} className="text-muted" />
        </Link>
      </div>
    </div>
  );
}
