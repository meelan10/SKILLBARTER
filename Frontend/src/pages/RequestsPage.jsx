import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useApi, useResource } from "../hooks/useApi";

export default function RequestsPage() {
  const { user } = useAuth();
  const { data: exchanges = [], loading, error } = useResource("/exchanges", "exchanges");
  const { request, loading: updating, error: updateError } = useApi();
  const [items, setItems] = useState(null);
  const requests = items || exchanges;

  const updateStatus = async (id, status) => {
    const result = await request(`/exchanges/${id}`, { method: "PATCH", body: { status } });
    setItems(requests.map((item) => item._id === id ? result.exchange : item));
  };

  return <div>
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><h1 className="text-2xl font-bold text-text">Requests</h1><p className="mt-1 text-muted">Review and manage your skill exchange requests.</p></div>
      <Link to="/matches"><Button>Find a partner</Button></Link>
    </div>
    <div className="mt-7 space-y-4">
      {loading ? <p className="text-sm text-muted">Loading requests...</p> : error ? <p className="text-sm text-red">{error}</p> : requests.length ? requests.map((exchange) => {
        const recipientId = exchange.recipient?._id || exchange.recipient;
        const incoming = String(recipientId) === String(user?.id);
        return <div key={exchange._id} className="rounded-2xl border border-border bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-teal-dark">{incoming ? "Incoming request" : "Your request"}</p><h2 className="mt-2 font-bold text-text">{exchange.teach} for {exchange.receive}</h2></div><Badge color={exchange.status === "ACCEPTED" ? "teal" : exchange.status === "DECLINED" ? "red" : "amber"}>{exchange.status}</Badge></div>
          <p className="mt-2 text-sm text-muted">{exchange.note || "No note provided."}</p>
          {incoming && exchange.status === "PENDING" && <div className="mt-4 flex gap-2"><Button disabled={updating} onClick={() => updateStatus(exchange._id, "ACCEPTED")} className="flex items-center gap-1.5"><Check size={15} /> Accept</Button><Button disabled={updating} variant="secondary" onClick={() => updateStatus(exchange._id, "DECLINED")} className="flex items-center gap-1.5"><X size={15} /> Decline</Button></div>}
        </div>;
      }) : <p className="text-sm text-muted">No requests yet. Find a partner to start an exchange.</p>}
      {updateError && <p className="text-sm text-red">{updateError}</p>}
    </div>
  </div>;
}
