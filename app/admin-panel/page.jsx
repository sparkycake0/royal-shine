"use client";
import { useEffect, useMemo, useState } from "react";
import { db } from "../libs/firebase.js";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminPanel() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("upcoming"); // upcoming|today|all|past

  useEffect(() => {
    const q = query(collection(db, "reservations"), orderBy("date", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setReservations(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const todayStr = useMemo(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  }, []);

  const filtered = useMemo(() => {
    return reservations
      .filter((r) => {
        if (!r.date) return false;

        // date filter
        if (dateFilter === "today" && r.date !== todayStr) return false;
        if (dateFilter === "upcoming" && r.date < todayStr) return false;
        if (dateFilter === "past" && r.date >= todayStr) return false;

        // search filter (phone/description)
        const blob =
          `${r.phoneNumber || ""} ${r.description || ""}`.toLowerCase();
        return blob.includes(search.toLowerCase());
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [reservations, dateFilter, search, todayStr]);

  const removeReservation = async (id) => {
    if (!confirm("Delete this reservation?")) return;
    await deleteDoc(doc(db, "reservations", id));
  };

  const formatDatePretty = (yyyy_mm_dd) => {
    const [y, m, d] = yyyy_mm_dd.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Admin Panel <span className="text-orange-400">/ Rezervacije</span>
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraga opis / broj telefona"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 outline-none focus:border-orange-400"
          />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 outline-none focus:border-orange-400"
          >
            <option value="upcoming">Predstojeće</option>
            <option value="today">Danas</option>
            <option value="all">Sve</option>
            <option value="past">Prošle</option>
          </select>

          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700">
              Ukupno: <span className="font-semibold">{filtered.length}</span>
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-neutral-800">
          <table className="w-full border-collapse">
            <thead className="bg-neutral-900/60">
              <tr className="text-left text-sm">
                <th className="px-4 py-3 border-b border-neutral-800">Datum</th>
                <th className="px-4 py-3 border-b border-neutral-800">
                  Telefon
                </th>
                <th className="px-4 py-3 border-b border-neutral-800">Opis</th>
                <th className="px-4 py-3 border-b border-neutral-800">
                  Kreirano
                </th>
                <th className="px-4 py-3 border-b border-neutral-800">
                  Akcije
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {loading && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-neutral-400"
                  >
                    Učitavanje rezervacija…
                  </td>
                </tr>
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-neutral-400"
                  >
                    Nema rezervacija.
                  </td>
                </tr>
              )}

              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-900/40">
                  <td className="px-4 py-3 border-t border-neutral-900">
                    <div className="font-semibold">
                      {r.date ? formatDatePretty(r.date) : "—"}
                    </div>
                    <div className="text-xs text-neutral-400">{r.date}</div>
                  </td>
                  <td className="px-4 py-3 border-t border-neutral-900">
                    {r.phoneNumber || "—"}
                  </td>
                  <td className="px-4 py-3 border-t border-neutral-900">
                    {r.description || "—"}
                  </td>
                  <td className="px-4 py-3 border-t border-neutral-900">
                    <div className="text-xs text-neutral-300">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleString()
                        : "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-t border-neutral-900">
                    <button
                      onClick={() => removeReservation(r.id)}
                      className="rounded-lg border border-red-500/70 px-3 py-1 text-xs font-semibold hover:bg-red-500/70 hover:text-neutral-900 transition"
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
