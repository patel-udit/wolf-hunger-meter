import { useEffect, useMemo, useState } from "react";
import WolfAnimation from "./WolfAnimation";

const CPH_GOAL = 1250;

const API_URL = process.env.REACT_APP_CPH_API_URL || "http://localhost:4000/api/cph";
const API_KEY = process.env.REACT_APP_CPH_API_KEY || "";


function WolfMeter({ mode, demoCPH }) {
  const [liveCPH, setLiveCPH] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (mode !== "live") return;

    let cancelled = false;

    async function fetchCPH() {
        try {
            setIsLoading(true);

            const res = await fetch(API_URL, {
                headers: API_KEY ? { "x-api-key": API_KEY } : {},
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            if (!cancelled) setLiveCPH(Number(data.cph || 0));
        } catch (err) {
            if (!cancelled) setApiError("Could not load live data.");
        } finally {
            if (!cancelled) setIsLoading(false);
        }
    }

    fetchCPH();
    const interval = setInterval(fetchCPH, 5000); // 👈 Auto-refresh every 5s

    return () => {
        cancelled = true;
        clearInterval(interval);
    };
}, [mode]);


  const currentCPH = mode === "demo" ? demoCPH : liveCPH ?? 0;

  const wolfState = useMemo(() => {
    if (currentCPH < 650)
      return {
        id: "very_hungry",
        label: "Very Hungry",
        message: "We are running low … feed the wolf!",
        barColor: "#FF5A5A",
      };
    if (currentCPH < 1000)
      return {
        id: "hungry",
        label: "Hungry Wolf",
        message: "Good flow — keep feeding the wolf!",
        barColor: "#FACC15",
      };
    if (currentCPH < CPH_GOAL)
      return {
        id: "almost_full",
        label: "Almost Full",
        message: "Almost there! Wolf is feeling strong!",
        barColor: "#4ADE80",
      };

    return {
      id: "full_strong",
      label: "Strong Wolf",
      message: "Well done this hour! Keep it up!",
      barColor: "#146EB4",
    };
  }, [currentCPH]);

  const progressPct = Math.min(100, Math.round((currentCPH / CPH_GOAL) * 100));

  return (
    <main className="wolf-container">
      <section className="wolf-panel">

        {/* LEFT: Animation */}
        <div className="wolf-animation">
          <WolfAnimation state={wolfState.id} />
        </div>

        {/* RIGHT: Stats */}
        <div className="wolf-info">
    <div className="cph-display">
        <div className="cph-number">{currentCPH}</div>
        <div className="goal-number">/ {CPH_GOAL}</div>
    </div>

    

    <div className="progress-wrapper">
        <div className="progress-track">
            <div
                className="progress-bar"
                style={{
                    width: `${progressPct}%`,
                    backgroundColor: wolfState.barColor,
                }}
            />
        </div>
        <div className="progress-text">{progressPct}% of goal</div>
    </div>

    <div className={`wolf-message-box ${wolfState.id}`}>
        {wolfState.message}
    </div>

    {mode === "demo" && (
        <p className="hint">
            Demo mode: move the slider to simulate different CPH values.
        </p>
    )}
</div>


      </section>
    </main>
  );
}

export default WolfMeter;
