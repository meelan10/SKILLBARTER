import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

export default function MatchCard({ match }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={match.name} size={44} />
          <div>
            <p className="font-semibold text-text">{match.name}</p>
            <p className="text-sm text-muted">{match.meta}</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-brand bg-brand-soft px-2.5 py-1 rounded-full whitespace-nowrap">
          {match.match}% Match
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-page rounded-xl p-4 mt-4">
        <div>
          <p className="text-[11px] tracking-wide text-muted font-semibold mb-1">
            YOU LEARN
          </p>
          <p className="flex items-center gap-1.5 text-sm font-medium text-text">
            <span className="w-2 h-2 rounded-full bg-brand" />
            {match.learn}
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-wide text-muted font-semibold mb-1">
            YOU TEACH
          </p>
          <p className="flex items-center gap-1.5 text-sm font-medium text-text">
            <span className="w-2 h-2 rounded-full bg-teal" />
            {match.teach}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Button className="flex-1">Propose Exchange</Button>
        <Link to="/profile">
          <Button variant="secondary">View Profile</Button>
        </Link>
      </div>
    </div>
  );
}
