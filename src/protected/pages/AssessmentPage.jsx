// AssessmentPage.jsx
// Full Assessment Agent page
// Route: /assessment
//
// Assumed API endpoints (add these to your backend):
//   GET  /api/assessment/history/:userId        → AssessmentRecord[]
//   POST /api/assessment/start                  → { session_id, questions: Question[] }
//   POST /api/assessment/submit                 → { result, risk_level, score, flags }
//   GET  /api/assessment/report/:sessionId      → AssessmentReport
//   POST /api/escalation/trigger                → { escalation_id, status }
//   GET  /api/escalation/status/:userId         → EscalationStatus

import { useState, useEffect, useRef } from "react";

// ─── mock data (replace with real fetch) ──────────────────────────────────────
const MOCK_HISTORY = [
  { id: "a1", date: "2025-03-10", risk_level: "moderate", score: 62, status: "completed", conducted_by: "Agent AI" },
  { id: "a2", date: "2024-12-01", risk_level: "low",      score: 30, status: "completed", conducted_by: "Agent AI" },
  { id: "a3", date: "2024-08-15", risk_level: "high",     score: 81, status: "completed", conducted_by: "Human Agent" },
];

const MOCK_QUESTIONS = [
  { id: "q1", text: "How many months have you missed a repayment in the past year?",  type: "options", options: ["0","1-2","3-5","6+"] },
  { id: "q2", text: "What is your current debt-to-income ratio (approximate)?",        type: "options", options: ["<20%","20-40%","40-60%",">60%"] },
  { id: "q3", text: "Have you taken any new loans in the past 6 months?",              type: "options", options: ["No","Yes – 1","Yes – 2+"] },
  { id: "q4", text: "Do you have any active legal/collection notices?",                type: "options", options: ["No","Yes"] },
  { id: "q5", text: "Rate your confidence in meeting next month's obligation (1-5).",  type: "options", options: ["1","2","3","4","5"] },
];

// ─── colour helpers ────────────────────────────────────────────────────────────
const RISK_COLORS = {
  low:      { bg: "#dcfce7", text: "#15803d", border: "#86efac" },
  moderate: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
  high:     { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
  critical: { bg: "#f3e8ff", text: "#581c87", border: "#c084fc" },
};
const rc = (level) => RISK_COLORS[level] ?? { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" };

// ─── main component ────────────────────────────────────────────────────────────
export default function AssessmentPage({ userId = "user_1" }) {
  const [tab, setTab]               = useState("overview");   // overview | take | history | report
  const [history, setHistory]       = useState([]);
  const [loadingHist, setLoadingHist] = useState(true);
  const [currentAssess, setCurrentAssess] = useState(null);  // active session
  const [answers, setAnswers]       = useState({});
  const [result, setResult]         = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [escalating, setEscalating] = useState(false);
  const [escalated, setEscalated]   = useState(false);

  useEffect(() => { loadHistory(); }, [userId]);

  const loadHistory = async () => {
    try {
      const res = await fetch(`/api/assessment/history/${userId}`);
      const d   = await res.json();
      setHistory(d);
    } catch { setHistory(MOCK_HISTORY); }
    finally   { setLoadingHist(false); }
  };

  const startAssessment = async () => {
    try {
      const res = await fetch("/api/assessment/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      const d = await res.json();
      setCurrentAssess({ session_id: d.session_id, questions: d.questions });
    } catch {
      setCurrentAssess({ session_id: "mock_" + Date.now(), questions: MOCK_QUESTIONS });
    }
    setAnswers({});
    setResult(null);
    setTab("take");
  };

  const submitAssessment = async () => {
    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: currentAssess.session_id, answers, user_id: userId }),
      });
      const d = await res.json();
      setResult(d);
    } catch {
      // mock result
      const score = Math.round(Object.values(answers).reduce((s, v) => s + (parseInt(v) || 1), 0) * 6.2);
      const rl    = score < 30 ? "low" : score < 60 ? "moderate" : score < 80 ? "high" : "critical";
      setResult({ score, risk_level: rl, flags: ["Sample flag: high utilization"], session_id: currentAssess.session_id });
    }
    setTab("result");
  };

  const triggerEscalation = async () => {
    setEscalating(true);
    try {
      await fetch("/api/escalation/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, assessment_session: result?.session_id }),
      });
    } catch { /* mock */ }
    setTimeout(() => { setEscalating(false); setEscalated(true); }, 1200);
  };

  const allAnswered = currentAssess &&
    currentAssess.questions.every(q => answers[q.id] !== undefined);

  return (
    <div style={P.page}>
      {/* Page header */}
      <div style={P.header}>
        <div>
          <h1 style={P.h1}>Risk Assessment</h1>
          <p style={P.sub}>AI-powered financial risk profiling</p>
        </div>
        <button onClick={startAssessment} style={P.startBtn}>
          + New Assessment
        </button>
      </div>

      {/* Tab nav */}
      <div style={P.tabs}>
        {[["overview","Overview"],["history","History"],].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ ...P.tab, ...(tab===k ? P.tabActive : {}) }}>{l}</button>
        ))}
      </div>

      {/* ── OVERVIEW tab ─────────────────────────────────────── */}
      {tab === "overview" && (
        <div style={P.content}>
          {/* Latest result card */}
          {history[0] ? (
            <LatestCard record={history[0]} />
          ) : (
            <EmptyState onStart={startAssessment} />
          )}

          {/* How it works */}
          <div style={P.section}>
            <h2 style={P.sectionTitle}>How assessment works</h2>
            <div style={P.stepsGrid}>
              {[
                { n:"1", title:"Answer questions", desc:"Short AI-guided questionnaire about your financial behaviour." },
                { n:"2", title:"AI analysis",      desc:"Our agent evaluates patterns and calculates a risk score." },
                { n:"3", title:"Get your report",  desc:"Receive a detailed breakdown with actionable insights." },
                { n:"4", title:"Escalation",       desc:"High-risk profiles are escalated to a human advisor automatically." },
              ].map(s => <StepCard key={s.n} {...s} />)}
            </div>
          </div>

          {/* Quick stats */}
          {history.length > 0 && (
            <div style={P.section}>
              <h2 style={P.sectionTitle}>Your stats</h2>
              <div style={P.statsGrid}>
                <StatCard label="Assessments taken" value={history.length} />
                <StatCard label="Latest score"       value={history[0].score} />
                <StatCard label="Current risk level" value={history[0].risk_level} color={rc(history[0].risk_level).text} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAKE ASSESSMENT tab ──────────────────────────────── */}
      {tab === "take" && currentAssess && (
        <div style={P.content}>
          <h2 style={P.sectionTitle}>Answer all questions</h2>
          <p style={{ ...P.sub, marginBottom: 20 }}>Session: {currentAssess.session_id}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {currentAssess.questions.map((q, i) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={i}
                value={answers[q.id]}
                onChange={v => setAnswers(a => ({ ...a, [q.id]: v }))}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button onClick={() => setTab("overview")} style={P.cancelBtn}>Cancel</button>
            <button
              onClick={submitAssessment}
              disabled={!allAnswered}
              style={{ ...P.submitBtn, opacity: allAnswered ? 1 : .45 }}
            >
              Submit Assessment
            </button>
          </div>
        </div>
      )}

      {tab === "take" && !currentAssess && (
        <div style={P.content}>
          <EmptyState onStart={startAssessment} />
        </div>
      )}

      {/* ── RESULT tab ───────────────────────────────────────── */}
      {tab === "result" && result && (
        <div style={P.content}>
          <ResultCard
            result={result}
            onEscalate={triggerEscalation}
            escalating={escalating}
            escalated={escalated}
            onBack={() => { setTab("overview"); loadHistory(); }}
          />
        </div>
      )}

      {/* ── HISTORY tab ──────────────────────────────────────── */}
      {tab === "history" && (
        <div style={P.content}>
          <h2 style={P.sectionTitle}>Past assessments</h2>
          {loadingHist ? (
            <p style={P.sub}>Loading…</p>
          ) : history.length === 0 ? (
            <EmptyState onStart={startAssessment} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {history.map(r => (
                <HistoryRow
                  key={r.id}
                  record={r}
                  onView={() => { setSelectedReport(r); setTab("report"); }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── REPORT tab ───────────────────────────────────────── */}
      {tab === "report" && selectedReport && (
        <div style={P.content}>
          <button onClick={() => setTab("history")} style={P.backBtn}>← Back to history</button>
          <ReportView record={selectedReport} userId={userId} />
        </div>
      )}
    </div>
  );
}

// ─── sub-components ────────────────────────────────────────────────────────────

function LatestCard({ record }) {
  const c = rc(record.risk_level);
  return (
    <div style={{ ...P.card, border: `1.5px solid ${c.border}`, background: `${c.bg}44` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Latest assessment • {record.date}</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: c.text }}>{record.risk_level.toUpperCase()}</p>
          <p style={{ fontSize: 13, color: "#374151", marginTop: 2 }}>Score: <strong>{record.score}/100</strong></p>
        </div>
        <div style={{ width: 70, height: 70 }}>
          <ScoreDial score={record.score} color={c.text} />
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>Conducted by: {record.conducted_by}</p>
    </div>
  );
}

function EmptyState({ onStart }) {
  return (
    <div style={{ ...P.card, textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
      <h3 style={{ color: "#374151", marginBottom: 6 }}>No assessments yet</h3>
      <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 20 }}>
        Take your first risk assessment to get a personalised financial risk profile.
      </p>
      <button onClick={onStart} style={P.startBtn}>Start Assessment</button>
    </div>
  );
}

function StepCard({ n, title, desc }) {
  return (
    <div style={P.stepCard}>
      <div style={P.stepNum}>{n}</div>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", marginBottom: 3 }}>{title}</h3>
      <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={P.statCard}>
      <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: .5 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 800, color: color ?? "#1f2937", marginTop: 4 }}>{value}</p>
    </div>
  );
}

function QuestionCard({ question, index, value, onChange }) {
  return (
    <div style={{ ...P.card, padding: "16px 18px" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>Question {index + 1}</p>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 12, lineHeight: 1.5 }}>
        {question.text}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {question.options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              ...P.optBtn,
              ...(value === opt ? P.optBtnActive : {}),
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultCard({ result, onEscalate, escalating, escalated, onBack }) {
  const c = rc(result.risk_level);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ ...P.card, border: `2px solid ${c.border}`, background: `${c.bg}55` }}>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Assessment complete</p>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div>
            <p style={{ fontSize: 32, fontWeight: 900, color: c.text }}>
              {result.risk_level.toUpperCase()}
            </p>
            <p style={{ fontSize: 14, color: "#374151" }}>Score: <strong>{result.score}/100</strong></p>
          </div>
          <div style={{ width: 80, height: 80 }}>
            <ScoreDial score={result.score} color={c.text} />
          </div>
        </div>
      </div>

      {result.flags?.length > 0 && (
        <div style={P.card}>
          <p style={P.sectionTitle}>Detected flags</p>
          {result.flags.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#374151" }}>{f}</span>
            </div>
          ))}
        </div>
      )}

      {/* Escalation section */}
      {(result.risk_level === "high" || result.risk_level === "critical") && (
        <div style={{ ...P.card, background: "#fff7ed", border: "1.5px solid #fed7aa" }}>
          <p style={{ fontWeight: 700, color: "#c2410c", marginBottom: 4 }}>⚠ High-risk detected</p>
          <p style={{ fontSize: 13, color: "#7c2d12", marginBottom: 12 }}>
            Your profile has been flagged. You can escalate this to a human advisor for review.
          </p>
          {escalated ? (
            <div style={{ ...P.successBadge }}>✓ Escalation raised — advisor will contact you</div>
          ) : (
            <button onClick={onEscalate} disabled={escalating} style={P.escalateBtn}>
              {escalating ? "Escalating…" : "Escalate to Human Advisor"}
            </button>
          )}
        </div>
      )}

      <button onClick={onBack} style={P.cancelBtn}>← Back to overview</button>
    </div>
  );
}

function HistoryRow({ record, onView }) {
  const c = rc(record.risk_level);
  return (
    <div style={{ ...P.card, display: "flex", alignItems: "center", gap: 14, padding: "12px 16px" }}>
      <div style={{ ...P.riskPill, background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
        {record.risk_level}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{record.date}</p>
        <p style={{ fontSize: 12, color: "#9ca3af" }}>Score {record.score} · {record.conducted_by}</p>
      </div>
      <span style={{ ...P.statusDot, background: record.status === "completed" ? "#16a34a" : "#d97706" }} />
      <button onClick={onView} style={P.viewBtn}>View report</button>
    </div>
  );
}

function ReportView({ record, userId }) {
  const [report, setReport] = useState(null);
  const c = rc(record.risk_level);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/assessment/report/${record.id}`);
        setReport(await res.json());
      } catch {
        setReport({
          summary: "Moderate risk profile identified. Two repayment irregularities detected over the past year. Credit utilization remains elevated. Recommend restructuring existing liabilities within 90 days.",
          recommendations: [
            "Consolidate high-interest debt",
            "Set up auto-repayment schedule",
            "Avoid new credit applications for 6 months",
          ],
          conducted_by: record.conducted_by,
          status: record.status,
        });
      }
    })();
  }, [record.id]);

  if (!report) return <p style={P.sub}>Loading report…</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ ...P.card, border: `1.5px solid ${c.border}`, background: `${c.bg}44` }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 12, color: "#6b7280" }}>Assessment Report • {record.date}</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: c.text, marginTop: 4 }}>
              {record.risk_level.toUpperCase()}
            </p>
          </div>
          <span style={{ fontSize: 28, fontWeight: 900, color: c.text }}>{record.score}</span>
        </div>
      </div>

      <div style={P.card}>
        <p style={P.sectionTitle}>Summary</p>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{report.summary}</p>
      </div>

      <div style={P.card}>
        <p style={P.sectionTitle}>Recommendations</p>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {report.recommendations.map((r, i) => (
            <li key={i} style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>{r}</li>
          ))}
        </ul>
      </div>

      <div style={{ ...P.card, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: "#6b7280" }}>Conducted by</span>
        <span style={{ fontWeight: 600, color: "#111827" }}>{report.conducted_by}</span>
      </div>
    </div>
  );
}

// SVG score dial
function ScoreDial({ score, color }) {
  const r  = 28;
  const cx = 35;
  const cy = 35;
  const circ = 2 * Math.PI * r;
  const dash = circ * (score / 100);

  return (
    <svg viewBox="0 0 70 70" style={{ width: "100%", height: "100%" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={6} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dasharray .6s ease" }}
      />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{score}</text>
    </svg>
  );
}

// ─── styles ────────────────────────────────────────────────────────────────────
const P = {
  page:         { fontFamily: "'Nunito', 'Segoe UI', sans-serif", padding: "28px 24px", maxWidth: 860, margin: "0 auto" },
  header:       { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  h1:           { fontSize: 26, fontWeight: 900, background: "linear-gradient(135deg,#6366f1,#8b5cf6,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 },
  sub:          { fontSize: 13, color: "#9ca3af", margin: "4px 0 0" },
  startBtn:     { padding: "10px 18px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", whiteSpace: "nowrap" },
  tabs:         { display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #e5e7eb", paddingBottom: 0 },
  tab:          { padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#6b7280", border: "none", background: "none", cursor: "pointer", borderBottom: "2px solid transparent", marginBottom: -1 },
  tabActive:    { color: "#6366f1", borderBottom: "2px solid #6366f1" },
  content:      { display: "flex", flexDirection: "column", gap: 16 },
  card:         { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,.05)" },
  section:      { marginTop: 8 },
  sectionTitle: { fontSize: 14, fontWeight: 800, color: "#1f2937", marginBottom: 12 },
  stepsGrid:    { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 },
  stepCard:     { background: "linear-gradient(135deg,#f5f3ff,#eff6ff)", border: "1px solid #c7d2fe", borderRadius: 12, padding: "14px 14px" },
  stepNum:      { width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, marginBottom: 10 },
  statsGrid:    { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12 },
  statCard:     { background: "linear-gradient(135deg,#f5f3ff,#eff6ff)", border: "1px solid #c7d2fe", borderRadius: 12, padding: "14px 16px" },
  optBtn:       { padding: "7px 14px", borderRadius: 8, border: "1.5px solid #d1d5db", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .15s" },
  optBtnActive: { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "1.5px solid #6366f1" },
  submitBtn:    { flex: 1, padding: "12px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" },
  cancelBtn:    { padding: "10px 16px", borderRadius: 10, border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" },
  backBtn:      { padding: "7px 0", border: "none", background: "none", color: "#6366f1", fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 8 },
  viewBtn:      { padding: "6px 14px", borderRadius: 8, border: "1px solid #c7d2fe", background: "#f5f3ff", color: "#6366f1", fontWeight: 700, fontSize: 12, cursor: "pointer" },
  riskPill:     { padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: "capitalize", whiteSpace: "nowrap" },
  statusDot:    { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  escalateBtn:  { padding: "10px 18px", background: "linear-gradient(135deg,#dc2626,#f97316)", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" },
  successBadge: { background: "#dcfce7", color: "#15803d", border: "1px solid #86efac", borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 13 },
};