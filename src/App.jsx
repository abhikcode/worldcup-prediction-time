import React, { useState, useMemo, useRef } from 'react';

// Inline SVG icon components (no external dependencies)
const Trophy = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
const ChevronDown = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const RotateCcw = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
const Crown = ({ size = 24, className = '', fill = 'none' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
    <path d="M5 21h14" />
  </svg>
);
const Sparkles = ({ size = 24, className = '', fill = 'none', style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);

const GROUPS = {
  A: [
    { code: 'MEX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'CZE', name: 'Czechia', flag: '🇨🇿' },
    { code: 'RSA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'KOR', name: 'South Korea', flag: '🇰🇷' },
  ],
  B: [
    { code: 'CAN', name: 'Canada', flag: '🇨🇦' },
    { code: 'BIH', name: 'Bosnia & Herz.', flag: '🇧🇦' },
    { code: 'QAT', name: 'Qatar', flag: '🇶🇦' },
    { code: 'SUI', name: 'Switzerland', flag: '🇨🇭' },
  ],
  C: [
    { code: 'BRA', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MAR', name: 'Morocco', flag: '🇲🇦' },
    { code: 'HAI', name: 'Haiti', flag: '🇭🇹' },
    { code: 'SCO', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  ],
  D: [
    { code: 'USA', name: 'United States', flag: '🇺🇸' },
    { code: 'TUR', name: 'Türkiye', flag: '🇹🇷' },
    { code: 'PAR', name: 'Paraguay', flag: '🇵🇾' },
    { code: 'AUS', name: 'Australia', flag: '🇦🇺' },
  ],
  E: [
    { code: 'GER', name: 'Germany', flag: '🇩🇪' },
    { code: 'CUW', name: 'Curaçao', flag: '🇨🇼' },
    { code: 'CIV', name: 'Ivory Coast', flag: '🇨🇮' },
    { code: 'ECU', name: 'Ecuador', flag: '🇪🇨' },
  ],
  F: [
    { code: 'NED', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'JPN', name: 'Japan', flag: '🇯🇵' },
    { code: 'SWE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'TUN', name: 'Tunisia', flag: '🇹🇳' },
  ],
  G: [
    { code: 'BEL', name: 'Belgium', flag: '🇧🇪' },
    { code: 'EGY', name: 'Egypt', flag: '🇪🇬' },
    { code: 'IRN', name: 'Iran', flag: '🇮🇷' },
    { code: 'NZL', name: 'New Zealand', flag: '🇳🇿' },
  ],
  H: [
    { code: 'ESP', name: 'Spain', flag: '🇪🇸' },
    { code: 'CPV', name: 'Cape Verde', flag: '🇨🇻' },
    { code: 'KSA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'URU', name: 'Uruguay', flag: '🇺🇾' },
  ],
  I: [
    { code: 'FRA', name: 'France', flag: '🇫🇷' },
    { code: 'SEN', name: 'Senegal', flag: '🇸🇳' },
    { code: 'IRQ', name: 'Iraq', flag: '🇮🇶' },
    { code: 'NOR', name: 'Norway', flag: '🇳🇴' },
  ],
  J: [
    { code: 'ARG', name: 'Argentina', flag: '🇦🇷' },
    { code: 'ALG', name: 'Algeria', flag: '🇩🇿' },
    { code: 'AUT', name: 'Austria', flag: '🇦🇹' },
    { code: 'JOR', name: 'Jordan', flag: '🇯🇴' },
  ],
  K: [
    { code: 'POR', name: 'Portugal', flag: '🇵🇹' },
    { code: 'COD', name: 'DR Congo', flag: '🇨🇩' },
    { code: 'UZB', name: 'Uzbekistan', flag: '🇺🇿' },
    { code: 'COL', name: 'Colombia', flag: '🇨🇴' },
  ],
  L: [
    { code: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { code: 'CRO', name: 'Croatia', flag: '🇭🇷' },
    { code: 'GHA', name: 'Ghana', flag: '🇬🇭' },
    { code: 'PAN', name: 'Panama', flag: '🇵🇦' },
  ],
};

const GROUP_LETTERS = Object.keys(GROUPS);

const BRACKET_R32_SEEDS = [
  [1, 32],
  [16, 17],
  [8, 25],
  [9, 24],
  [5, 28],
  [12, 21],
  [4, 29],
  [13, 20],
  [3, 30],
  [14, 19],
  [6, 27],
  [11, 22],
  [7, 26],
  [10, 23],
  [2, 31],
  [15, 18],
];

function findTeam(code) {
  if (!code) return null;
  for (const g of GROUP_LETTERS) {
    const t = GROUPS[g].find((x) => x.code === code);
    if (t) return t;
  }
  return null;
}

function FlagButton({
  team,
  selected,
  disabled,
  onClick,
  size = 'md',
  rank,
  dim,
}) {
  const sizes = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-7xl',
    xl: 'text-9xl',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 px-3 py-3 transition-all duration-300 ${
        selected
          ? 'border-black bg-black text-white shadow-[6px_6px_0_0_#000] -translate-y-0.5'
          : 'border-neutral-200 bg-white hover:border-black hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5'
      } ${
        disabled && !selected
          ? 'opacity-30 cursor-not-allowed hover:shadow-none hover:translate-y-0 hover:border-neutral-200'
          : ''
      } ${dim ? 'opacity-40' : ''}`}
    >
      {rank && (
        <div
          className={`absolute -top-2 -left-2 flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold tracking-tight ${
            rank === 1
              ? 'bg-yellow-400 text-black'
              : rank === 2
              ? 'bg-neutral-300 text-black'
              : rank === 3
              ? 'bg-orange-400 text-black'
              : 'bg-black text-white'
          }`}
        >
          {rank === 1 ? '1st' : rank === 2 ? '2nd' : rank === 3 ? '3rd' : rank}
        </div>
      )}
      <span className={sizes[size]} style={{ lineHeight: 1 }}>
        {team.flag}
      </span>
      <span
        className={`text-[11px] font-semibold tracking-tight uppercase ${
          selected ? 'text-white' : 'text-black'
        }`}
      >
        {team.name}
      </span>
    </button>
  );
}

function GroupCard({ letter, teams, selection, onSelect }) {
  const rankOf = (code) => {
    if (selection.first === code) return 1;
    if (selection.second === code) return 2;
    if (selection.third === code) return 3;
    return null;
  };
  const nextPickLabel = !selection.first
    ? 'Tap the WINNER'
    : !selection.second
    ? 'Tap the RUNNER-UP'
    : !selection.third
    ? 'Tap the 3rd place'
    : 'Group complete ✓';

  return (
    <div className="rounded-3xl border-2 border-black bg-white p-5 shadow-[8px_8px_0_0_#000]">
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
            Group
          </span>
          <span className="text-5xl font-black tracking-tighter">{letter}</span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          {nextPickLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {teams.map((t) => (
          <FlagButton
            key={t.code}
            team={t}
            selected={!!rankOf(t.code)}
            rank={rankOf(t.code)}
            onClick={() => onSelect(letter, t.code)}
            size="md"
          />
        ))}
      </div>
    </div>
  );
}

function MatchBox({ matchId, teamA, teamB, winner, onPick, label, compact }) {
  const pickA = teamA && winner === teamA.code;
  const pickB = teamB && winner === teamB.code;
  return (
    <div
      className={`rounded-2xl border-2 border-black bg-white p-3 ${
        compact ? '' : 'shadow-[4px_4px_0_0_#000]'
      }`}
    >
      {label && (
        <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-2 text-center">
          {label}
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => teamA && onPick(matchId, teamA.code)}
          disabled={!teamA}
          className={`flex-1 flex flex-col items-center gap-1 rounded-xl py-2 px-1 transition-all ${
            pickA ? 'bg-black text-white' : 'bg-neutral-50 hover:bg-neutral-100'
          } ${!teamA ? 'opacity-40' : ''}`}
        >
          <span className="text-3xl" style={{ lineHeight: 1 }}>
            {teamA ? teamA.flag : '❓'}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-tight truncate max-w-[80px]">
            {teamA ? teamA.name : 'TBD'}
          </span>
        </button>
        <span className="text-[10px] font-black text-neutral-400">VS</span>
        <button
          onClick={() => teamB && onPick(matchId, teamB.code)}
          disabled={!teamB}
          className={`flex-1 flex flex-col items-center gap-1 rounded-xl py-2 px-1 transition-all ${
            pickB ? 'bg-black text-white' : 'bg-neutral-50 hover:bg-neutral-100'
          } ${!teamB ? 'opacity-40' : ''}`}
        >
          <span className="text-3xl" style={{ lineHeight: 1 }}>
            {teamB ? teamB.flag : '❓'}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-tight truncate max-w-[80px]">
            {teamB ? teamB.name : 'TBD'}
          </span>
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ stage, title, subtitle, locked }) {
  return (
    <div className="relative py-6 mb-6 border-b-2 border-black">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-1">
            STAGE · {stage}
          </div>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-neutral-600 max-w-xl">{subtitle}</p>
          )}
        </div>
        {locked && (
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-neutral-300"></span>Locked
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [groupPicks, setGroupPicks] = useState(() => {
    const init = {};
    GROUP_LETTERS.forEach(
      (l) => (init[l] = { first: null, second: null, third: null })
    );
    return init;
  });
  const [bestThirds, setBestThirds] = useState([]);
  const [r32Winners, setR32Winners] = useState({});
  const [r16Winners, setR16Winners] = useState({});
  const [qfWinners, setQfWinners] = useState({});
  const [sfWinners, setSfWinners] = useState({});
  const [finalWinner, setFinalWinner] = useState(null);
  const [showCrown, setShowCrown] = useState(false);
  const winnerRef = useRef(null);

  function pickGroup(letter, code) {
    setGroupPicks((prev) => {
      const g = { ...prev[letter] };
      if (g.first === code) {
        g.first = null;
        g.second = null;
        g.third = null;
      } else if (g.second === code) {
        g.second = null;
        g.third = null;
      } else if (g.third === code) {
        g.third = null;
      } else if (!g.first) g.first = code;
      else if (!g.second) g.second = code;
      else if (!g.third) g.third = code;
      setBestThirds([]);
      setR32Winners({});
      setR16Winners({});
      setQfWinners({});
      setSfWinners({});
      setFinalWinner(null);
      return { ...prev, [letter]: g };
    });
  }

  const allGroupsComplete = useMemo(
    () =>
      GROUP_LETTERS.every(
        (l) =>
          groupPicks[l].first && groupPicks[l].second && groupPicks[l].third
      ),
    [groupPicks]
  );

  const thirdPlaceCandidates = useMemo(() => {
    if (!allGroupsComplete) return [];
    return GROUP_LETTERS.map((l) => ({
      group: l,
      team: findTeam(groupPicks[l].third),
    }));
  }, [groupPicks, allGroupsComplete]);

  function toggleThird(code) {
    setBestThirds((prev) => {
      if (prev.includes(code)) {
        const next = prev.filter((c) => c !== code);
        setR32Winners({});
        setR16Winners({});
        setQfWinners({});
        setSfWinners({});
        setFinalWinner(null);
        return next;
      }
      if (prev.length >= 8) return prev;
      const next = [...prev, code];
      setR32Winners({});
      setR16Winners({});
      setQfWinners({});
      setSfWinners({});
      setFinalWinner(null);
      return next;
    });
  }

  const thirdsComplete = bestThirds.length === 8;

  const r32Seeds = useMemo(() => {
    if (!thirdsComplete) return null;
    const seeds = {};
    GROUP_LETTERS.forEach((l, i) => {
      seeds[i + 1] = findTeam(groupPicks[l].first);
      seeds[i + 13] = findTeam(groupPicks[l].second);
    });
    bestThirds.forEach((code, i) => {
      seeds[i + 25] = findTeam(code);
    });
    return seeds;
  }, [groupPicks, bestThirds, thirdsComplete]);

  const r32Matches = useMemo(() => {
    if (!r32Seeds) return [];
    return BRACKET_R32_SEEDS.map(([a, b], idx) => ({
      id: `r32_${idx}`,
      teamA: r32Seeds[a],
      teamB: r32Seeds[b],
    }));
  }, [r32Seeds]);

  function pickR32(id, code) {
    setR32Winners((prev) => ({ ...prev, [id]: code }));
    setR16Winners({});
    setQfWinners({});
    setSfWinners({});
    setFinalWinner(null);
  }

  const r16Matches = useMemo(() => {
    if (r32Matches.length === 0) return [];
    const out = [];
    for (let i = 0; i < 16; i += 2) {
      const a = r32Winners[`r32_${i}`];
      const b = r32Winners[`r32_${i + 1}`];
      out.push({
        id: `r16_${i / 2}`,
        teamA: a ? findTeam(a) : null,
        teamB: b ? findTeam(b) : null,
      });
    }
    return out;
  }, [r32Matches, r32Winners]);

  function pickR16(id, code) {
    setR16Winners((prev) => ({ ...prev, [id]: code }));
    setQfWinners({});
    setSfWinners({});
    setFinalWinner(null);
  }

  const qfMatches = useMemo(() => {
    const out = [];
    for (let i = 0; i < 8; i += 2) {
      const a = r16Winners[`r16_${i}`];
      const b = r16Winners[`r16_${i + 1}`];
      out.push({
        id: `qf_${i / 2}`,
        teamA: a ? findTeam(a) : null,
        teamB: b ? findTeam(b) : null,
      });
    }
    return out;
  }, [r16Winners]);

  function pickQF(id, code) {
    setQfWinners((prev) => ({ ...prev, [id]: code }));
    setSfWinners({});
    setFinalWinner(null);
  }

  const sfMatches = useMemo(() => {
    const a0 = qfWinners['qf_0'],
      a1 = qfWinners['qf_1'];
    const b0 = qfWinners['qf_2'],
      b1 = qfWinners['qf_3'];
    return [
      {
        id: 'sf_0',
        teamA: a0 ? findTeam(a0) : null,
        teamB: a1 ? findTeam(a1) : null,
      },
      {
        id: 'sf_1',
        teamA: b0 ? findTeam(b0) : null,
        teamB: b1 ? findTeam(b1) : null,
      },
    ];
  }, [qfWinners]);

  function pickSF(id, code) {
    setSfWinners((prev) => ({ ...prev, [id]: code }));
    setFinalWinner(null);
  }

  const finalMatch = useMemo(() => {
    const a = sfWinners['sf_0'];
    const b = sfWinners['sf_1'];
    return {
      id: 'final',
      teamA: a ? findTeam(a) : null,
      teamB: b ? findTeam(b) : null,
    };
  }, [sfWinners]);

  function pickFinal(id, code) {
    setFinalWinner(code);
    setTimeout(() => {
      setShowCrown(true);
      winnerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 150);
  }

  function resetAll() {
    const init = {};
    GROUP_LETTERS.forEach(
      (l) => (init[l] = { first: null, second: null, third: null })
    );
    setGroupPicks(init);
    setBestThirds([]);
    setR32Winners({});
    setR16Winners({});
    setQfWinners({});
    setSfWinners({});
    setFinalWinner(null);
    setShowCrown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const winnerTeam = finalWinner ? findTeam(finalWinner) : null;

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .display-font { font-family: 'Archivo Black', sans-serif; letter-spacing: -0.04em; }
        @keyframes flagIn { 0% { transform: scale(0.2) rotate(-20deg); opacity: 0; } 60% { transform: scale(1.15) rotate(8deg); opacity: 1; } 80% { transform: scale(0.95) rotate(-4deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        @keyframes crownIn { 0% { transform: translateY(-40px) scale(0); opacity: 0; } 60% { transform: translateY(6px) scale(1.2); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes sparkle { 0%,100% { transform: scale(1) rotate(0deg); opacity: 0.9; } 50% { transform: scale(1.3) rotate(180deg); opacity: 1; } }
        @keyframes rayRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .winner-flag { animation: flagIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .winner-crown { animation: crownIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards; opacity: 0; }
        .winner-sparkle { animation: sparkle 1.8s ease-in-out infinite; }
        .winner-rays { animation: rayRotate 18s linear infinite; }
        .stripe-bg { background-image: repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 13px); }
      `}</style>

      <header className="border-b-2 border-black sticky top-0 bg-white z-30">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              <Trophy size={18} />
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                FIFA
              </div>
              <div className="display-font text-lg leading-none">
                World Cup 26
              </div>
            </div>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 pt-16 pb-12 stripe-bg border-b-2 border-black">
        <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-500 mb-3">
          Predictor · Canada · Mexico · USA · June 11 – July 19, 2026
        </div>
        <h1 className="display-font text-7xl sm:text-9xl leading-[0.82] mb-6">
          Pick the
          <br />
          Champion.
        </h1>
        <p className="max-w-xl text-base text-neutral-700 leading-relaxed">
          48 nations. 12 groups. 104 matches. One trophy. Tap a flag to pick
          your winner, runner-up, and 3rd in each group — then bracket your way
          to the final at MetLife. The first flag you tap in a group is your{' '}
          <strong>winner</strong>.
        </p>
        <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <ChevronDown className="animate-bounce" size={16} /> Scroll to begin
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-5 py-12">
        <SectionHeader
          stage="01"
          title="Group Stage"
          subtitle="For each of the 12 groups, tap the winner first, then runner-up, then 3rd place. The top 2 always advance; the best 8 third-place teams also progress."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GROUP_LETTERS.map((l) => (
            <GroupCard
              key={l}
              letter={l}
              teams={GROUPS[l]}
              selection={groupPicks[l]}
              onSelect={pickGroup}
            />
          ))}
        </div>

        <div className="mt-20">
          <SectionHeader
            stage="02"
            title="Best 8 Third-Placed Teams"
            subtitle={
              allGroupsComplete
                ? `Select the 8 third-placed teams that advance. (${bestThirds.length}/8 chosen)`
                : 'Finish all 12 groups to unlock this stage.'
            }
            locked={!allGroupsComplete}
          />
          {allGroupsComplete ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {thirdPlaceCandidates.map(({ group, team }) => {
                const selected = bestThirds.includes(team.code);
                const disabled = !selected && bestThirds.length >= 8;
                return (
                  <div key={team.code} className="relative">
                    <FlagButton
                      team={team}
                      selected={selected}
                      disabled={disabled}
                      onClick={() => toggleThird(team.code)}
                      size="md"
                    />
                    <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 text-center mt-1.5">
                      3rd · Group {group}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border-2 border-dashed border-neutral-300 rounded-3xl p-10 text-center text-neutral-400 text-sm">
              🔒 Complete all 12 groups above to unlock.
            </div>
          )}
        </div>

        <div className="mt-20">
          <SectionHeader
            stage="03"
            title="Round of 32"
            subtitle={
              thirdsComplete
                ? 'Sixteen matches. Tap a flag to send a team through.'
                : 'Select all 8 third-place teams to unlock.'
            }
            locked={!thirdsComplete}
          />
          {thirdsComplete ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {r32Matches.map((m, i) => (
                <MatchBox
                  key={m.id}
                  matchId={m.id}
                  teamA={m.teamA}
                  teamB={m.teamB}
                  winner={r32Winners[m.id]}
                  onPick={pickR32}
                  label={`Match ${i + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-neutral-300 rounded-3xl p-10 text-center text-neutral-400 text-sm">
              🔒 Pick the best 8 third-placed teams to unlock.
            </div>
          )}
        </div>

        <div className="mt-20">
          <SectionHeader
            stage="04"
            title="Round of 16"
            subtitle={
              Object.keys(r32Winners).length === 16
                ? 'Eight knockout ties. The field is tightening.'
                : 'Complete the Round of 32 first.'
            }
            locked={Object.keys(r32Winners).length !== 16}
          />
          {Object.keys(r32Winners).length === 16 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {r16Matches.map((m, i) => (
                <MatchBox
                  key={m.id}
                  matchId={m.id}
                  teamA={m.teamA}
                  teamB={m.teamB}
                  winner={r16Winners[m.id]}
                  onPick={pickR16}
                  label={`Match ${i + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-neutral-300 rounded-3xl p-10 text-center text-neutral-400 text-sm">
              🔒 Pick all 16 Round-of-32 winners to unlock.
            </div>
          )}
        </div>

        <div className="mt-20">
          <SectionHeader
            stage="05"
            title="Quarter Finals"
            subtitle={
              Object.keys(r16Winners).length === 8
                ? 'Four ties. Eight teams. Two spots in the semis per side.'
                : 'Complete the Round of 16 first.'
            }
            locked={Object.keys(r16Winners).length !== 8}
          />
          {Object.keys(r16Winners).length === 8 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {qfMatches.map((m, i) => (
                <MatchBox
                  key={m.id}
                  matchId={m.id}
                  teamA={m.teamA}
                  teamB={m.teamB}
                  winner={qfWinners[m.id]}
                  onPick={pickQF}
                  label={`QF ${i + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-neutral-300 rounded-3xl p-10 text-center text-neutral-400 text-sm">
              🔒 Pick all 8 Round-of-16 winners to unlock.
            </div>
          )}
        </div>

        <div className="mt-20">
          <SectionHeader
            stage="06"
            title="Semi Finals"
            subtitle={
              Object.keys(qfWinners).length === 4
                ? 'Four teams. Two matches. One ticket to the final each.'
                : 'Complete the Quarter Finals first.'
            }
            locked={Object.keys(qfWinners).length !== 4}
          />
          {Object.keys(qfWinners).length === 4 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {sfMatches.map((m, i) => (
                <MatchBox
                  key={m.id}
                  matchId={m.id}
                  teamA={m.teamA}
                  teamB={m.teamB}
                  winner={sfWinners[m.id]}
                  onPick={pickSF}
                  label={`Semi ${i + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-neutral-300 rounded-3xl p-10 text-center text-neutral-400 text-sm">
              🔒 Pick all 4 Quarter-Final winners to unlock.
            </div>
          )}
        </div>

        <div className="mt-20">
          <SectionHeader
            stage="07"
            title="The Final"
            subtitle={
              Object.keys(sfWinners).length === 2
                ? 'MetLife Stadium · July 19, 2026. Crown your champion.'
                : 'Complete both Semi Finals first.'
            }
            locked={Object.keys(sfWinners).length !== 2}
          />
          {Object.keys(sfWinners).length === 2 ? (
            <div className="max-w-xl mx-auto">
              <div className="rounded-3xl border-2 border-black bg-black text-white p-6 shadow-[10px_10px_0_0_#000]">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 text-center mb-4">
                  The 2026 FIFA World Cup Final
                </div>
                <MatchBox
                  matchId={finalMatch.id}
                  teamA={finalMatch.teamA}
                  teamB={finalMatch.teamB}
                  winner={finalWinner}
                  onPick={pickFinal}
                  label="Tap to crown the champion"
                  compact
                />
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-neutral-300 rounded-3xl p-10 text-center text-neutral-400 text-sm">
              🔒 Pick both Semi-Final winners to unlock.
            </div>
          )}
        </div>

        {winnerTeam && (
          <div
            ref={winnerRef}
            className="mt-24 relative rounded-3xl border-2 border-black overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse at center, #fde68a 0%, #fef3c7 30%, #ffffff 75%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <svg
                viewBox="0 0 800 800"
                className="winner-rays"
                style={{ width: '150%', height: '150%', opacity: 0.18 }}
              >
                {Array.from({ length: 36 }).map((_, i) => (
                  <polygon
                    key={i}
                    points="400,400 396,0 404,0"
                    transform={`rotate(${i * 10} 400 400)`}
                    fill="#000"
                  />
                ))}
              </svg>
            </div>
            <div className="relative z-10 px-6 py-16 text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-black text-white">
                <Crown size={14} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                  Your Champion
                </span>
              </div>
              <div className="relative inline-block">
                {showCrown && (
                  <Crown
                    className="winner-crown absolute -top-16 left-1/2 -translate-x-1/2 text-yellow-500 drop-shadow-lg"
                    size={64}
                    fill="#fbbf24"
                  />
                )}
                <div
                  key={winnerTeam.code}
                  className="winner-flag text-[180px] sm:text-[260px] inline-block"
                  style={{
                    lineHeight: 1,
                    filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.25))',
                  }}
                >
                  {winnerTeam.flag}
                </div>
                <Sparkles
                  className="winner-sparkle absolute top-4 -right-6 text-yellow-500"
                  size={28}
                  fill="#fbbf24"
                />
                <Sparkles
                  className="winner-sparkle absolute bottom-8 -left-6 text-yellow-500"
                  size={22}
                  fill="#fbbf24"
                  style={{ animationDelay: '0.4s' }}
                />
                <Sparkles
                  className="winner-sparkle absolute top-1/3 -left-10 text-yellow-500"
                  size={18}
                  fill="#fbbf24"
                  style={{ animationDelay: '0.9s' }}
                />
              </div>
              <h3 className="display-font text-6xl sm:text-8xl mt-6 leading-none">
                {winnerTeam.name}
              </h3>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-neutral-600 mt-3">
                2026 World Champions
              </p>
              <button
                onClick={resetAll}
                className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
              >
                <RotateCcw size={14} /> Predict again
              </button>
            </div>
          </div>
        )}

        <footer className="mt-24 py-8 border-t-2 border-black text-center">
          <div className="display-font text-3xl mb-1">26</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
            Predictor · Groups locked · Dec 5, 2025 draw
          </div>
        </footer>
      </main>
    </div>
  );
}
