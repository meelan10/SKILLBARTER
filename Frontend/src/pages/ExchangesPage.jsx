import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { exchanges } from "../utils/mockData";

const statusColor = {
  ACCEPTED: "teal",
  PENDING: "amber",
  COMPLETED: "gray",
};

export default function ExchangesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Exchanges</h1>
      <p className="text-muted mt-1">
        Structured proposals — one skill given, one skill received.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        {exchanges.map((ex) => (
          <div
            key={ex.id}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={ex.name} size={40} />
                <div>
                  <p className="font-semibold text-text">
                    Exchange with {ex.name}
                  </p>
                  <p className="text-sm text-muted">{ex.note}</p>
                </div>
              </div>
              <Badge color={statusColor[ex.status]}>{ex.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-page rounded-xl p-4 mt-4">
              <div>
                <p className="text-[11px] tracking-wide text-muted font-semibold mb-1">
                  YOU TEACH
                </p>
                <p className="flex items-center gap-1.5 text-sm font-medium text-text">
                  <span className="w-2 h-2 rounded-full bg-teal" />
                  {ex.teach}
                </p>
              </div>
              <div>
                <p className="text-[11px] tracking-wide text-muted font-semibold mb-1">
                  YOU RECEIVE
                </p>
                <p className="flex items-center gap-1.5 text-sm font-medium text-text">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  {ex.receive}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <Button className="flex-1">{ex.primaryAction}</Button>
              {ex.secondaryAction && (
                <Button variant="secondary">{ex.secondaryAction}</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
