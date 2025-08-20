"use client";
import { useState, useEffect } from "react";
import { db } from "../libs/firebase.js";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

export default function Calendar() {
  const [reservedDates, setReservedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({
    phoneNumber: "",
  });
  const [popupDay, setPopupDay] = useState(null);
  useEffect(() => {
    const fetchReservations = async () => {
      const today = new Date();
      const nextMonth = addMonths(today, 1);

      const start = startOfMonth(today);
      const end = endOfMonth(nextMonth);

      const q = query(
        collection(db, "reservations"),
        where("date", ">=", format(start, "yyyy-MM-dd")),
        where("date", "<=", format(end, "yyyy-MM-dd")),
      );

      const snapshot = await getDocs(q);
      const dates = snapshot.docs.map((doc) => doc.data().date);

      setReservedDates(dates);
      setLoading(false);
    };

    fetchReservations();
  }, []);

  const today = new Date();
  const nextMonth = addMonths(today, 1);
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(nextMonth),
  });

  const handleReserve = async (day) => {
    const dateStr = format(day, "yyyy-MM-dd");

    if (reservedDates.includes(dateStr)) {
      alert("❌ Vec je rezervisano!");
      return;
    }

    await addDoc(collection(db, "reservations"), {
      date: dateStr,
      createdAt: new Date().toISOString(),
      phoneNumber: client.phoneNumber,
    });

    setReservedDates([...reservedDates, dateStr]);
    alert("✅ Rezervisano!");
    setPopupDay(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-orange-400 font-bold text-4xl text-center">
        Rezervacija
      </h1>
      {[today, nextMonth].map((monthDate, i) => {
        const monthDays = days.filter(
          (day) => day.getMonth() === monthDate.getMonth(),
        );
        const monthName = format(monthDate, "MMMM"); // e.g. "August"

        return (
          <div key={i} className="flex flex-col items-center">
            <h2 className="text-xl text-center font-bold mt-12 mb-2">
              {monthName}
            </h2>
            <div className="grid grid-cols-5 gap-2 mt-6  w-max ">
              {monthDays.map((day, idx) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const isReserved = reservedDates.includes(dateStr);

                return (
                  <div
                    key={idx}
                    onClick={() => !isReserved && setPopupDay(day)}
                    className={`p-2 text-center cursor-pointer w-16 rounded-lg border text-sm ${
                      isReserved
                        ? "cursor-not-allowed border-gray-500 text-gray-700"
                        : "text-white border-orange-400 font-bold hover:bg-orange-400 transition-colors duration-150"
                    }`}
                  >
                    {format(day, "d")}
                    {popupDay && format(popupDay, "yyyy-MM-dd") === dateStr && (
                      <div className="absolute w-2/3 h-2/3 gap-12 flex flex-col items-center justify-center rounded-lg bg-neutral-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <h1 className="font-bold text-center text-xl">
                          Unesi broj telefona:
                        </h1>
                        <input
                          type="text"
                          className="bg-neutral-800 border-orange-400 border-2 p-2 text-lg rounded-lg"
                          onChange={(e) => {
                            setClient({
                              phoneNumber: e.target.value,
                            });
                          }}
                        />
                        <button
                          onClick={() => {
                            handleReserve(popupDay);
                            setPopupDay(null); // close popup after reserving
                          }}
                          className="cursor-pointer rounded-full p-4 mt-20 font-bold bg-orange-400 text-center"
                        >
                          Rezervisi
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
