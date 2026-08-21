import { Link, useParams } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ExchangeDetailPage() {
  const { id } = useParams();
  return <div className="max-w-2xl"><Link to="/exchanges" className="text-sm text-muted hover:text-text">Back to exchanges</Link><div className="mt-5 bg-white border border-border rounded-2xl p-6"><p className="text-xs font-semibold uppercase tracking-wide text-teal-dark">EXCHANGE REQUEST</p><h1 className="mt-2 text-2xl font-bold text-text">Exchange {id}</h1><p className="mt-2 text-muted">Review the exchange details and coordinate your first session.</p><div className="mt-6 flex gap-3"><Button>Accept exchange</Button><Button variant="secondary">Message partner</Button></div></div></div>;
}
