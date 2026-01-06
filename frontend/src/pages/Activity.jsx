import { useEffect, useState } from "react";

export default function Activity() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(JSON.parse(localStorage.getItem("activityLogs")) || []);
  }, []);

  return (
    <div className="page-activity">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="card">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white">
              📜 Library Activity
            </h2>
            <p className="text-white/70 mt-2">
              Track all book issues, returns and deletions
            </p>
          </div>

          {/* EMPTY STATE */}
          {logs.length === 0 ? (
            <div className="text-center py-20 text-white/60">
              📭 No activity recorded yet
            </div>
          ) : (
            <div className="relative pl-6">

              {/* VERTICAL LINE */}
              <div className="absolute left-2 top-0 bottom-0 w-px bg-white/20"></div>

              <ul className="space-y-8">
                {logs
                  .slice()
                  .reverse()
                  .map((log, i) => (
                    <li key={i} className="relative flex gap-6">

                      {/* DOT */}
                      <span className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-blue-500 shadow"></span>

                      {/* CARD */}
                      <div className="bg-white/10 border border-white/20 rounded-xl p-5 w-full backdrop-blur-md">
                        <p className="font-semibold text-white">
                          {log.action}
                        </p>
                        <p className="text-sm text-white/60 mt-1">
                          ⏰ {log.time}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
