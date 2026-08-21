import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api";
import Badge from "../components/ui/Badge";

export default function ExchangesPage() {
  const [exchanges, setExchanges] = useState([]);
  useEffect(() => { apiRequest("/exchanges").then(({ exchanges: result }) => setExchanges(result)).catch(() => setExchanges([])); }, []);
  return <div><h1 className="text-2xl font-bold text-text">Exchanges</h1><p className="mt-1 text-muted">Track your skill swap requests.</p><div className="mt-7 space-y-4">{exchanges.length ? exchanges.map((exchange) => <Link to={`/exchanges/${exchange._id}`} key={exchange._id} className="block bg-white border border-border rounded-2xl p-5 hover:border-teal"><div className="flex items-center justify-between"><h2 className="font-bold text-text">{exchange.teach} for {exchange.receive}</h2><Badge color={exchange.status === "ACCEPTED" ? "teal" : "amber"}>{exchange.status}</Badge></div><p className="mt-2 text-sm text-muted">{exchange.note || "No note provided."}</p></Link>) : <p className="text-sm text-muted">No exchanges yet. Visit Find Matches to connect.</p>}</div></div>;
}
