/** @jsx React.createElement */
import { initialTestsData, getPointsForCategory } from "./data/tests.js";
import { translations } from "./i18n/index.js";
import { rules } from "./data/rules.js";

const { useState, useEffect, createContext, useContext, useMemo } = React;

// Contextos
const LanguageContext = createContext();
const TournamentContext = createContext();
const ThemeContext = createContext();
const PointsVisibilityContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ca");
  const t = (key, replacements = {}) => {
    let text = translations[language][key] || key;
    Object.keys(replacements).forEach(
      (r) => (text = text.replace(`{${r}}`, replacements[r]))
    );
    return text;
  };
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
const useLanguage = () => useContext(LanguageContext);

const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = sessionStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);

// --- ICONOS ---
const TrophyIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
    />
  </svg>
);
const ClipboardListIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);
const ArrowRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-5 w-5 ml-2"}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
const PlusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-5 w-5"}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);
const TrashIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
      clipRule="evenodd"
    />
  </svg>
);
const SunIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-5 w-5"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const MoonIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-5 w-5"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const PaletteIcon = ({ className = "h-5 w-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    style={{ display: "inline-block", verticalAlign: "middle" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3C7.03 3 3 7.03 3 12c0 3.87 3.13 7 7 7h1a1 1 0 011 1v1a1 1 0 001 1c4.97 0 9-4.03 9-9s-4.03-9-9-9z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="10.5" r="1.2" fill="#fbbf24" />
    <circle cx="15.5" cy="7.5" r="1.2" fill="#60a5fa" />
    <circle cx="15.5" cy="14.5" r="1.2" fill="#34d399" />
  </svg>
);

const ToolsIcon = ({ className = "h-5 w-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// --- LÓGICA DEL TORNEO (PROVIDER) (SIN CAMBIOS) ---
const initialTournamentState = {
  status: "configuring",
  config: { maxRounds: 10, minTeamSize: 2, maxTeams: 0, bonusTestProbability: 0.02 },
  players: [],
  teams: [],
  tests: [],
  rounds: [],
  currentRound: 0,
};
const funnyAdjectives = [
  "puta mare",
  "Autists",
  "Extrems",
  "Suprems",
  "Inpraiplas",
  "Bombollejants",
  "Veloços",
  "Mantes",
  "Fills de ",
  "Estupenis",
  "Prasiosus",
  "Brutencis",
  "Incontrolables",
  "Drogadictes",
  "Esparracades",
  "Revisors de",
  "Família de",
  "Crancs de",
  "Desperts",
];
const funnyNouns = [
  "agumon",
  "Barrakeros",
  "Mancs",
  "Xamos",
  "Premohs",
  "Nyus",
  "Tortugues d'aigua",
  "Dropos",
  "Mites",
  "Putes",
  "Papa",
  "Indivisibles",
  "Aquatics",
  "Metaleros",
  "Birreros",
  "Mugic",
  "Viciats",
  "Espardenyes",
  "Flipats",
  "Caps de cony",
  "Mar",
  "Riu",
  "Somniatruites",
];

const TournamentProvider = ({ children }) => {
  const { t } = useLanguage();
  const [tournament, setTournament] = useState(() => {
    try {
      const savedState = localStorage.getItem("macrotorneigState");
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.tests && parsed.tests.length > 0) return parsed;
      }
    } catch (error) {
      console.error("Error loading state:", error);
    }
    return {
      ...initialTournamentState,
      tests: initialTestsData.map((test) => ({
        ...test,
        id: `test_${Math.random()}`,
        utilizada: false,
        puntos: getPointsForCategory(test.categoria),
      })),
    };
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);
  useEffect(() => {
    if (!isLoading)
      localStorage.setItem("macrotorneigState", JSON.stringify(tournament));
  }, [tournament, isLoading]);

  const saveTournamentState = (newState) => setTournament(newState);
  const resetTournament = () => {
    if (window.confirm(t("resetConfirm"))) {
      localStorage.removeItem("macrotorneigState");
      setTournament({
        ...initialTournamentState,
        tests: initialTestsData.map((test) => ({
          ...test,
          id: `test_${Math.random()}`,
          utilizada: false,
          puntos: getPointsForCategory(test.categoria),
        })),
      });
    }
  };
  const updateConfig = (newConfig) =>
    saveTournamentState({
      ...tournament,
      config: { ...tournament.config, ...newConfig },
    });
  const addPlayer = (name) => {
    if (name.trim())
      saveTournamentState({
        ...tournament,
        players: [
          ...tournament.players,
          { id: `player_${Date.now()}`, nombre: name.trim() },
        ],
      });
  };
  const removePlayer = (id) =>
    saveTournamentState({
      ...tournament,
      players: tournament.players.filter((p) => p.id !== id),
    });
  const generateTeams = () => {
    let playersCopy = [...tournament.players];
    for (let i = playersCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playersCopy[i], playersCopy[j]] = [playersCopy[j], playersCopy[i]];
    }
    const { minTeamSize, maxTeams } = tournament.config;
    const numPlayers = playersCopy.length;
    let numTeams = Math.floor(numPlayers / minTeamSize);
    if (maxTeams > 0 && numTeams > maxTeams) numTeams = maxTeams;
    if (numTeams === 0 && numPlayers > 0) numTeams = 1;
    const newTeams = Array.from({ length: numTeams }, (_, i) => ({
      id: `team_${Date.now()}_${i}`,
      nombre: `${
        funnyAdjectives[Math.floor(Math.random() * funnyAdjectives.length)]
      } ${funnyNouns[Math.floor(Math.random() * funnyNouns.length)]}`,
      jugadores: [],
      puntosTotales: 0,
      historialEnfrentaments: [],
    }));
    let playerIndex = 0;
    while (playerIndex < numPlayers) {
      for (let i = 0; i < numTeams && playerIndex < numPlayers; i++) {
        newTeams[i].jugadores.push(playersCopy[playerIndex++]);
      }
    }
    saveTournamentState({ ...tournament, teams: newTeams });
  };
  const startTournament = () =>
    saveTournamentState({ ...tournament, status: "in_progress" });
  const updateTeamName = (teamId, newName) =>
    saveTournamentState({
      ...tournament,
      teams: tournament.teams.map((t) =>
        t.id === teamId ? { ...t, nombre: newName } : t
      ),
    });
  const addTest = (test) => {
    const newTest = {
      id: `test_${Date.now()}`,
      ...test,
      puntos: getPointsForCategory(test.categoria),
      utilizada: false,
    };
    saveTournamentState({
      ...tournament,
      tests: [...tournament.tests, newTest],
    });
  };
  const removeTest = (id) =>
    saveTournamentState({
      ...tournament,
      tests: tournament.tests.filter((t) => t.id !== id),
    });
  const startNewRound = () => {
    const normalTests = tournament.tests.filter((t) => !t.utilizada && t.categoria !== 'bonus');
    const bonusTests = tournament.tests.filter((t) => !t.utilizada && t.categoria === 'bonus');

    const numTeams = tournament.teams.length;
    const numMatches = Math.floor(numTeams / 2);

    if (normalTests.length < numMatches) {
      alert("No hay suficientes pruebas normales disponibles para la ronda.");
      return;
    }

    let teamsToPair = [...tournament.teams];
    let restingTeam = null;

    if (numTeams % 2 !== 0) {
      const lastRoundRestingId =
        tournament.rounds[tournament.rounds.length - 1]?.restingTeam?.id;
      const potentialRestingTeams = teamsToPair.filter(
        (t) => t.id !== lastRoundRestingId
      );
      restingTeam =
        potentialRestingTeams[
          Math.floor(Math.random() * potentialRestingTeams.length)
        ];
      teamsToPair = teamsToPair.filter((t) => t.id !== restingTeam?.id);
    }

    for (let i = teamsToPair.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [teamsToPair[i], teamsToPair[j]] = [teamsToPair[j], teamsToPair[i]];
    }

    const enfrentamientos = [];
    let availableNormalTests = [...normalTests];
    let availableBonusTests = [...bonusTests];
    const usedTestIds = [];

    for (let i = 0; i < numMatches; i++) {
      const equipo1 = teamsToPair[i * 2],
        equipo2 = teamsToPair[i * 2 + 1];
      if (!equipo1 || !equipo2) continue;

      // Assign a normal test
      const normalTestIndex = Math.floor(Math.random() * availableNormalTests.length);
      const normalPrueba = availableNormalTests.splice(normalTestIndex, 1)[0];
      usedTestIds.push(normalPrueba.id);

      let bonusPrueba = null;
      // Optionally assign a bonus test if available and probability allows
      if (availableBonusTests.length > 0 && Math.random() < tournament.config.bonusTestProbability) {
        const bonusTestIndex = Math.floor(Math.random() * availableBonusTests.length);
        bonusPrueba = availableBonusTests.splice(bonusTestIndex, 1)[0];
        usedTestIds.push(bonusPrueba.id);
      }

      enfrentamientos.push({
        id: `match_${Date.now()}_${i}`,
        equipo1: equipo1.id,
        equipo2: equipo2.id,
        normalPrueba: normalPrueba,
        bonusPrueba: bonusPrueba, // Can be null
        resultado: null,
        puntosPorGanar: normalPrueba.puntos,
      });
    }

    if (enfrentamientos.length === 0 && restingTeam) {
      saveTournamentState({
        ...tournament,
        rounds: [
          ...tournament.rounds,
          {
            numero: tournament.currentRound + 1,
            enfrentamientos: [],
            completada: true,
            restingTeam: restingTeam,
          },
        ],
        currentRound: tournament.currentRound + 1,
      });
      return;
    }
    if (enfrentamientos.length === 0) return;

    const newRound = {
      numero: tournament.currentRound + 1,
      enfrentamientos: enfrentamientos,
      completada: false,
      restingTeam: restingTeam,
    };

    const updatedTests = tournament.tests.map((t) =>
      usedTestIds.includes(t.id) ? { ...t, utilizada: true } : t
    );

    saveTournamentState({
      ...tournament,
      rounds: [...tournament.rounds, newRound],
      currentRound: tournament.currentRound + 1,
      tests: updatedTests,
    });
  };
  const registerResult = (matchId, winningTeamId) => {
    let pointsAwarded = 0,
      currentRoundData = null;
    const updatedRounds = tournament.rounds.map((r) => {
      if (r.numero === tournament.currentRound) {
        const updatedMatches = r.enfrentamientos.map((m) =>
          m.id === matchId
            ? ((pointsAwarded = m.normalPrueba.puntos),
              { ...m, resultado: winningTeamId })
            : m
        );
        currentRoundData = {
          ...r,
          enfrentamientos: updatedMatches,
          completada: updatedMatches.every((m) => m.resultado !== null),
        };
        return currentRoundData;
      }
      return r;
    });
    const updatedTeams = tournament.teams.map((t) =>
      t.id === winningTeamId
        ? { ...t, puntosTotales: t.puntosTotales + pointsAwarded }
        : t
    );
    const isLastRound = tournament.currentRound >= tournament.config.maxRounds;
    const isRoundComplete = currentRoundData?.completada;
    const newStatus =
      isLastRound && isRoundComplete ? "review_history" : tournament.status;
    saveTournamentState({
      ...tournament,
      rounds: updatedRounds,
      teams: updatedTeams,
      status: newStatus,
    });
  };
  const updateMatchTeams = (matchId, newTeamId, teamSlot) => {
    const updatedRounds = tournament.rounds.map((r) =>
      r.numero === tournament.currentRound
        ? {
            ...r,
            enfrentamientos: r.enfrentamientos.map((m) =>
              m.id === matchId ? { ...m, [teamSlot]: newTeamId } : m
            ),
          }
        : r
    );
    saveTournamentState({ ...tournament, rounds: updatedRounds });
  };
  const assignExtraPoints = (points) => {
    const updatedTeams = tournament.teams.map((t) => {
      const extraPoints = points[t.id] || 0;
      return {
        ...t,
        puntosTotales: t.puntosTotales + extraPoints,
        puntosExtra: extraPoints,
      };
    });
    saveTournamentState({
      ...tournament,
      teams: updatedTeams,
      status: "results",
    });
  };

  const editMatchResult = (roundNumber, matchId, newWinnerId) => {
    let originalWinnerId = null;
    let points = 0;

    const updatedRounds = tournament.rounds.map(r => {
        if (r.numero === roundNumber) {
            const updatedEnfrentamientos = r.enfrentamientos.map(m => {
                if (m.id === matchId) {
                    originalWinnerId = m.resultado;
                    points = m.normalPrueba.puntos;
                    return { ...m, resultado: newWinnerId };
                }
                return m;
            });
            return { ...r, enfrentamientos: updatedEnfrentamientos };
        }
        return r;
    });

    const updatedTeams = tournament.teams.map(t => {
        if (t.id === originalWinnerId) {
            return { ...t, puntosTotales: t.puntosTotales - points };
        }
        if (t.id === newWinnerId) {
            return { ...t, puntosTotales: t.puntosTotales + points };
        }
        return t;
    });

    saveTournamentState({
        ...tournament,
        rounds: updatedRounds,
        teams: updatedTeams,
    });
  };

  const setTournamentStatus = (newStatus) =>
    saveTournamentState({ ...tournament, status: newStatus });
  const value = {
    ...tournament,
    isLoading,
    updateConfig,
    addPlayer,
    removePlayer,
    generateTeams,
    startTournament,
    updateTeamName,
    addTest,
    removeTest,
    startNewRound,
    registerResult,
    resetTournament,
    updateMatchTeams,
    assignExtraPoints,
    setTournamentStatus,
    editMatchResult,
  };
  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
const useTournament = () => useContext(TournamentContext);

const PointsVisibilityProvider = ({ children }) => {
  const [hidePoints, setHidePoints] = useState(true); // Por defecto activado
  return (
    <PointsVisibilityContext.Provider value={{ hidePoints, setHidePoints }}>
      {children}
    </PointsVisibilityContext.Provider>
  );
};
const usePointsVisibility = () => useContext(PointsVisibilityContext);

// --- COMPONENTES DE UI (ADAPTADOS A CSS VARS)---

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="absolute top-4 left-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 text-sm rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--interactive-highlight)]"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <option value="ca">Català</option>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
      <PointsVisibilitySwitcher />
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--interactive-highlight)]"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-primary)",
        }}
        title="Cambiar tema"
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};

const PointsVisibilitySwitcher = () => {
  const { hidePoints, setHidePoints } = usePointsVisibility();
  const { t } = useLanguage();
  return (
    <button
      onClick={() => setHidePoints(!hidePoints)}
      className={`p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--interactive-highlight)]
        border border-[var(--border-primary)]
        bg-[var(--bg-primary)]
        text-[var(--text-primary)]
        transition-colors
        ${hidePoints ? "opacity-60 ring-2 ring-[var(--accent-yellow)]" : ""}
      `}
      title={t("hidePoints") || "Ocultar puntos y colores"}
      aria-label={t("hidePoints") || "Ocultar puntos y colores"}
      style={{ marginRight: "0.25rem" }}
    >
      <PaletteIcon className="h-5 w-5" />
    </button>
  );
};

const Input = (props) => (
  <input
    {...props}
    className={`w-full p-2 rounded-md transition-colors ${props.className}`}
    style={{
      backgroundColor: "var(--bg-primary)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-primary)",
    }}
  />
);

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-semibold transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary:
      "bg-[var(--button-primary-bg)] hover:bg-[var(--button-primary-hover)] text-[var(--text-on-primary-button)]",
    secondary:
      "bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)] text-[var(--text-primary)]",
    danger:
      "bg-[var(--button-danger-bg)] hover:bg-[var(--button-danger-hover)] text-white",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`p-4 md:p-6 rounded-xl shadow-lg transition-colors ${className}`}
    style={{
      backgroundColor: "var(--bg-primary)",
      border: `1px solid var(--border-primary)`,
    }}
  >
    {children}
  </div>
);

const SetupWizard = () => {
  const [step, setStep] = useState(1);
  const {
    config,
    players,
    teams,
    updateConfig,
    addPlayer,
    removePlayer,
    generateTeams,
    startTournament,
    updateTeamName,
  } = useTournament();
  const { t } = useLanguage();
  const [playerName, setPlayerName] = useState("");
  const [editableTeams, setEditableTeams] = useState([]);
  const [roundsError, setRoundsError] = useState("");

  useEffect(() => {
    if (teams.length > 0) setEditableTeams(teams.map((t) => ({ ...t })));
  }, [teams]);
  useEffect(() => {
    if (step === 4) generateTeams();
  }, [step]);

  const handleAddPlayer = (e) => {
    e.preventDefault();
    addPlayer(playerName);
    setPlayerName("");
  };
  const handleTeamNameChange = (id, name) => {
    setEditableTeams(
      editableTeams.map((t) => (t.id === id ? { ...t, nombre: name } : t))
    );
    updateTeamName(id, name);
  };
  const handleStartTournament = () => startTournament();

  const totalSteps = 4;
  const teamsToGenerate = Math.min(
    config.maxTeams > 0 ? config.maxTeams : Infinity,
    Math.floor(players.length / config.minTeamSize)
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("step1Title")}</h2>
            <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
              {t("roundsLimit")}
            </label>
            <Input
              type="number"
              value={config.maxRounds}
              onChange={(e) => {
                const val = e.target.value;
                updateConfig({ maxRounds: val });
                if (parseInt(val) < 1) setRoundsError(t("roundsMinError") || "El número de rondas debe ser al menos 1.");
                else setRoundsError("");
              }}
              min={1}
            />
            {roundsError && (
              <p className="text-red-600 text-sm mt-2">{roundsError}</p>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("step2Title")}</h2>
            <form onSubmit={handleAddPlayer} className="flex mb-4">
              <Input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={t("playerName")}
                className="rounded-r-none"
              />
              <Button
                type="submit"
                className="rounded-l-none flex items-center justify-center"
              >
                <PlusIcon />
              </Button>
            </form>
            <ul className="space-y-2 max-h-60 overflow-y-auto p-2 bg-[var(--bg-secondary)] rounded-md">
              {players.map((p, index) => (
                <li
                  key={p.id}
                  className="flex justify-between items-center p-2 bg-[var(--bg-primary)] rounded-md"
                >
                  <span>
                    {index + 1}. {p.nombre}
                  </span>
                  <button
                    onClick={() => removePlayer(p.id)}
                    className="text-[var(--accent-red)] hover:opacity-75"
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("step3Title")}</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {t("teamConfigInfo")}
            </p>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                {t("minTeamSize")}
              </label>
              <Input
                type="number"
                value={config.minTeamSize}
                onChange={(e) =>
                  updateConfig({ minTeamSize: e.target.value })
                }
                min="2"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                {t("maxTeamsLimit")}
              </label>
              <Input
                type="number"
                value={config.maxTeams}
                onChange={(e) =>
                  updateConfig({ maxTeams: e.target.value })
                }
                min="0"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("step4Title")}</h2>
            <p
              className="text-[var(--text-secondary)] mb-4"
              dangerouslySetInnerHTML={{
                __html: t("reviewInfo", {
                  teams: teamsToGenerate,
                  players: players.length,
                }),
              }}
            />
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {editableTeams.map((team) => (
                <div key={team.id} className="flex items-center">
                  <Input
                    type="text"
                    value={team.nombre}
                    onChange={(e) =>
                      handleTeamNameChange(team.id, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-2.5">
          <div
            className="bg-[var(--interactive-highlight)] h-2.5 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
      {renderStep()}
      <div className="flex justify-between mt-6">
        <Button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 1}
          variant="secondary"
        >
          {t("back")}
        </Button>
        {step < totalSteps ? (
          <Button
            onClick={() => {
              if (step === 1 && config.maxRounds < 1) {
                setRoundsError(t("roundsMinError") || "El número de rondas debe ser al menos 1.");
                return;
              }
              setStep((s) => s + 1);
            }}
            disabled={step === 2 && players.length < config.minTeamSize}
            className="flex items-center"
          >
            {t("next")} <ArrowRightIcon />
          </Button>
        ) : (
          <Button
            onClick={handleStartTournament}
            className="flex items-center bg-[var(--accent-green)] hover:opacity-80"
          >
            {t("startTournament")} <TrophyIcon className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
};

const TestManager = () => {
  const { tests, addTest, removeTest } = useTournament();
  const { t } = useLanguage();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [jugadores, setJugadores] = useState("EQUIPS");
  const [categoria, setCategoria] = useState("azul");

  const categoryColors = {
    negro: "bg-black text-white",
    rojo: "bg-[var(--accent-red)] text-white",
    verde: "bg-[var(--accent-green)] text-white",
    azul: "bg-[var(--accent-blue)] text-white",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      addTest({ nombre, descripcion, jugadores, categoria });
      setNombre("");
      setDescripcion("");
      setJugadores("EQUIPS");
      setCategoria("azul");
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <ClipboardListIcon className="mr-2 w-6" />
        {t("testManagerTitle")}
      </h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
          {t("bonusTestProbability")}
        </label>
        <Input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={config.bonusTestProbability}
          onChange={(e) => updateConfig({ bonusTestProbability: parseFloat(e.target.value) || 0 })}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={t("testName")}
            className="md:col-span-2"
          />
          <Input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder={t("testDescription")}
            className="md:col-span-3"
          />
          <select
            value={jugadores}
            onChange={(e) => setJugadores(e.target.value)}
            className="p-2 border border-[var(--border-primary)] rounded-md bg-[var(--bg-primary)] text-[var(--text-primary)]"
          >
            <option value="EQUIPS">{t("players_EQUIPS")}</option>
            <option value="1Jugador">{t("players_1Jugador")}</option>
            <option value="2Jugadores">{t("players_2Jugadores")}</option>
          </select>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="p-2 border border-[var(--border-primary)] rounded-md bg-[var(--bg-primary)] text-[var(--text-primary)]"
          >
            <option value="negro">{t("category_negro")}</option>{" "}
            <option value="rojo">{t("category_rojo")}</option>{" "}
            <option value="verde">{t("category_verde")}</option>
            <option value="azul">{t("category_azul")}</option>
            <option value="bonus">{t("category_bonus")}</option>
          </select>
        </div>
        <Button
          type="submit"
          className="mt-4 w-full flex items-center justify-center"
        >
          <PlusIcon /> {t("addTest")}
        </Button>
      </form>

      <h3 className="text-xl font-semibold text-[var(--text-secondary)] mb-2">
        {t("availableTests")}
      </h3>
      <div className="space-y-2 max-h-96 overflow-y-auto p-2 bg-[var(--bg-secondary)] rounded-md">
        {tests.length > 0 ? (
          tests.map((test) => (
            <div
              key={test.id}
              className={`p-3 rounded-md flex justify-between items-center transition-colors ${
                test.utilizada
                  ? "bg-[var(--bg-tertiary)]"
                  : "bg-[var(--bg-primary)] border border-[var(--border-primary)]"
              }`}
            >
              <div>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded-full mr-3 ${
                    categoryColors[test.categoria]
                  }`}
                >
                  {t(`category_${test.categoria}`)}
                </span>
                <span
                  className={`${
                    test.utilizada
                      ? "text-[var(--text-secondary)] line-through"
                      : "text-[var(--text-primary)]"
                  }`}
                >
                  {test.nombre}
                </span>
                {test.descripcion && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {test.descripcion}
                  </p>
                )}
                {test.jugadores && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {t("players")}: {test.jugadores}
                  </p>
                )}
              </div>
              {!test.utilizada && (
                <button
                  onClick={() => removeTest(test.id)}
                  className="text-[var(--accent-red)] hover:opacity-75"
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-[var(--text-secondary)] text-center py-4">
            {t("noTests")}
          </p>
        )}
      </div>
    </Card>
  );
};

const CurrentRoundView = ({ round }) => {
  const { teams, registerResult, updateMatchTeams } = useTournament();
  const { t } = useLanguage();
  const { hidePoints } = usePointsVisibility();
  const [revealedMatch, setRevealedMatch] = useState(null);
  const getTeam = (teamId) => teams.find((t) => t.id === teamId);

  const handleModifyTeams = (matchId, newTeamId, teamSlot) =>
    updateMatchTeams(matchId, newTeamId, teamSlot);
  const categoryBorderColors = {
    negro: "border-black",
    rojo: "border-[var(--accent-red)]",
    verde: "border-[var(--accent-green)]",
    azul: "border-[var(--accent-blue)]",
  };

  if (!round)
    return (
      <Card className="text-center">
        <p className="text-[var(--text-secondary)]">{t("noActiveRound")}</p>
      </Card>
    );

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">
        {t("currentRound", { round: round.numero })}
      </h3>
      {round.restingTeam && (
        <div
          className="mb-4 p-3 bg-[var(--accent-blue)]/10 border-l-4 border-[var(--accent-blue)] text-[var(--accent-blue)] rounded-r-lg"
          dangerouslySetInnerHTML={{
            __html: t("restingTeam", {
              teamName: getTeam(round.restingTeam.id)?.nombre,
            }),
          }}
        />
      )}
      <div className="space-y-4">
        {round.enfrentamientos.map((match) => {
          const team1 = getTeam(match.equipo1),
            team2 = getTeam(match.equipo2);
          if (!team1 || !team2) return null;

          return (
            <Card
              key={match.id}
              className={`transition-all duration-300 ${
                match.resultado
                  ? "bg-[var(--bg-secondary)]"
                  : "bg-[var(--bg-primary)]"
              } ${!hidePoints && !match.resultado ? categoryBorderColors[match.prueba.categoria] + " border-2" : ""}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[var(--accent-blue)]">
                  {team1.nombre}
                </span>
                <span className="text-[var(--text-secondary)] font-mono">
                  VS
                </span>
                <span className="font-bold text-lg text-[var(--accent-purple)]">
                  {team2.nombre}
                </span>
              </div>

              {match.resultado ? (
                <div className="mt-4 text-center">
                  <p className="font-semibold text-[var(--accent-green)]">
                    {t("winner")}: {getTeam(match.resultado).nombre}
                    {!hidePoints && <> (+{match.normalPrueba.puntos} pts)</>}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {t("test")}: {match.normalPrueba.nombre}
                  </p>
                  {match.bonusPrueba && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      {t("bonusTest")}: {match.bonusPrueba.nombre}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-4">
                  {revealedMatch !== match.id ? (
                    <button
                      onClick={() => setRevealedMatch(match.id)}
                      className={`w-full py-2 px-4 rounded-md border-2 border-dashed ${
                        !hidePoints ? categoryBorderColors[match.normalPrueba.categoria] : ""
                      } text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]`}
                    >
                      {t((hidePoints ? "revealTestSinPuntos" : "revealTest"), { points: hidePoints ? "" : match.normalPrueba.puntos })}
                    </button>
                  ) : (
                    <div
                      className={`p-4 border rounded-lg text-center ${
                        `${categoryBorderColors[match.normalPrueba.categoria]} border-2`
                      }`}
                    >
                      <h4 className="text-lg font-bold">{match.normalPrueba.nombre}</h4>
                      {match.normalPrueba.descripcion && (
                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                          {match.normalPrueba.descripcion}
                        </p>
                      )}
                      {match.normalPrueba.jugadores && (
                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                          {t("players")}: {match.normalPrueba.jugadores}
                        </p>
                      )}
                      <p className="text-sm text-[var(--text-secondary)] capitalize">
                        {t(`category_${match.normalPrueba.categoria}`).split(" ")[0]}
                      </p>
                        <p
                          className={`text-xl font-black mt-2`}
                          style={{
                            color: `var(--accent-${match.normalPrueba.categoria})`
                          }}
                        >
                          {match.normalPrueba.puntos} {t("points").toUpperCase()}
                        </p>
                      {match.normalPrueba.categoria === "negro" && (
                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-2"
                            style={{
                              color: "var(--text-primary)"
                            }}
                          >
                            {t("modifyTeams")}
                          </label>
                          <div className="flex gap-2">
                          <select
                            className="p-2 rounded-md mb-2 w-full bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--interactive-highlight)]"
                            style={{
                              backgroundColor: "var(--bg-primary)",
                              color: "var(--text-primary)",
                              borderColor: "var(--border-primary)"
                            }}
                            onChange={(e) =>
                              handleModifyTeams(
                                match.id,
                                e.target.value,
                                "equipo1"
                              )
                            }
                          >
                            <option value="">{t("selectTeam")}</option>
                            {teams.map((team) => (
                              <option key={team.id} value={team.id}>
                                {team.nombre}
                              </option>
                            ))}
                          </select>
                          <select
                            className="p-2 rounded-md mb-2 w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--interactive-highlight)]"
                            style={{
                              backgroundColor: "var(--bg-secondary)",
                              color: "var(--text-primary)",
                              borderColor: "var(--border-primary)"
                            }}
                            onChange={(e) =>
                              handleModifyTeams(
                                match.id,
                                e.target.value,
                                "equipo2"
                              )
                            }
                          >
                            <option value="">{t("selectTeam")}</option>
                            {teams.map((team) => (
                              <option key={team.id} value={team.id}>
                                {team.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                        </div>
                      )}
                      {match.bonusPrueba && (
                        <div className="mt-4 p-2 border border-[var(--border-primary)] rounded-md">
                          <h5 className="font-bold text-md">{t("bonusTest")}: {match.bonusPrueba.nombre}</h5>
                          <p className="text-sm text-[var(--text-secondary)]">{match.bonusPrueba.descripcion}</p>
                        </div>
                      )}

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Button
                          onClick={() => {
                            registerResult(match.id, team1.id);
                            setRevealedMatch(null);
                          }}
                          className="bg-[var(--accent-blue)] hover:opacity-80"
                        >
                          {t("wins")} {team1.nombre}
                        </Button>
                        <Button
                          onClick={() => {
                            registerResult(match.id, team2.id);
                            setRevealedMatch(null);
                          }}
                          className="bg-[var(--accent-purple)] hover:opacity-80"
                        >
                          {t("wins")} {team2.nombre}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const AllRoundsHistory = () => {
  const { rounds, teams, status, editMatchResult, setTournamentStatus } = useTournament();
  const { t } = useLanguage();
  const getTeam = (teamId) => teams.find((t) => t.id === teamId);
  const [editingMatch, setEditingMatch] = useState(null);

  const handleEdit = (roundNumber, matchId, newWinnerId) => {
    editMatchResult(roundNumber, matchId, newWinnerId);
    setEditingMatch(null);
  };

  if (rounds.length === 0)
    return (
      <Card className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t("roundHistoryTitle")}</h2>
        <p className="text-[var(--text-secondary)]">{t("noRoundsPlayed")}</p>
      </Card>
    );

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t("roundHistoryTitle")}</h2>
        {status === 'review_history' && (
            <Button onClick={() => setTournamentStatus('assign_points')}>
                {t('continueToAssignPoints')}
            </Button>
        )}
      </div>
      <div className="space-y-6">
        {rounds
          .slice()
          .reverse()
          .map((round) => (
            <div
              key={round.numero}
              className="border-b border-[var(--border-primary)] pb-4 last:border-b-0"
            >
              <h3 className="text-xl font-semibold mb-2">
                {t("currentRound", { round: round.numero })}
              </h3>
              {round.restingTeam && (
                <p
                  className="text-sm text-[var(--accent-blue)] mb-2"
                  dangerouslySetInnerHTML={{
                    __html: t("restingTeam", {
                      teamName: getTeam(round.restingTeam.id)?.nombre,
                    }),
                  }}
                />
              )}
              <ul className="space-y-2">
                {round.enfrentamientos.map((match) => {
                  const team1 = getTeam(match.equipo1),
                    team2 = getTeam(match.equipo2),
                    winner = match.resultado ? getTeam(match.resultado) : null;
                  
                  const isEditing = editingMatch === match.id;

                  return (
                    <li
                      key={match.id}
                      className="p-2 bg-[var(--bg-secondary)] rounded-md text-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span>
                          {team1?.nombre} vs {team2?.nombre}
                        </span>
                        {winner && !isEditing && (
                          <span className="font-bold text-[var(--accent-green)]">
                            {t("winner")}: {winner.nombre}
                          </span>
                        )}
                        {(status === 'review_history' || (status === 'in_progress' && winner)) && !isEditing && (
                            <Button onClick={() => setEditingMatch(match.id)} variant="secondary" className="text-xs">
                                {t('edit')}
                            </Button>
                        )}
                      </div>
                      <div className="text-[var(--text-secondary)]">
                        {t("test")}: {match.normalPrueba.nombre}
                        {match.normalPrueba.descripcion && (
                          <p className="text-xs text-[var(--text-secondary)] mt-1">
                            {match.normalPrueba.descripcion}
                          </p>
                        )}
                        {match.normalPrueba.jugadores && (
                          <p className="text-xs text-[var(--text-secondary)] mt-1">
                            {t("players")}: {match.normalPrueba.jugadores}
                          </p>
                        )}
                        (+
                        {match.normalPrueba.puntos} pts)
                        {match.bonusPrueba && (
                          <p className="text-sm text-[var(--text-secondary)] mt-1">
                            {t("bonusTest")}: {match.bonusPrueba.nombre}
                            {match.bonusPrueba.descripcion && (
                              <span className="text-xs text-[var(--text-secondary)] ml-1">
                                ({match.bonusPrueba.descripcion})
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                      {isEditing && (
                        <div className="mt-2">
                          <select
                            defaultValue={winner?.id}
                            onChange={(e) => handleEdit(round.numero, match.id, e.target.value)}
                            className="p-2 border border-[var(--border-primary)] rounded-md bg-[var(--bg-primary)] text-[var(--text-primary)]"
                          >
                            <option value={team1.id}>{team1.nombre}</option>
                            <option value={team2.id}>{team2.nombre}</option>
                          </select>
                          <Button onClick={() => setEditingMatch(null)} variant="secondary" className="text-xs ml-2">
                            {t('cancel')}
                          </Button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </div>
    </Card>
  );
};

const GeneralStandings = () => {
  const { teams, rounds } = useTournament();
  const { t } = useLanguage();
  const sortedTeams = useMemo(
    () => [...teams].sort((a, b) => b.puntosTotales - a.puntosTotales),
    [teams]
  );
  const getRoundsPlayed = (teamId) =>
    rounds.reduce(
      (count, round) =>
        count +
        (round.enfrentamientos.some(
          (match) => match.equipo1 === teamId || match.equipo2 === teamId
        )
          ? 1
          : 0),
      0
    );

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <TrophyIcon className="mr-2 w-6" />
        {t("generalStandings")}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[var(--bg-secondary)]">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                {t("rank")}
              </th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                {t("team")}
              </th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                {t("points")}
              </th>
              <th className="py-2 px-4 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                {t("roundsPlayed")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr
                key={team.id}
                className="border-b border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] last:border-b-0"
              >
                <td className="py-3 px-4">
                  <span
                    className={`font-bold ${
                      index < 3 ? "text-[var(--accent-yellow)]" : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <p className="font-semibold">{team.nombre}</p>
                  <div className="flex flex-wrap text-xs text-[var(--text-secondary)]">
                    {team.jugadores.map((j) => j.nombre).join(", ")}
                  </div>
                </td>
                <td className="py-3 px-4 font-black text-lg">
                  {team.puntosTotales}
                </td>
                <td className="py-3 px-4">{getRoundsPlayed(team.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const RulesViewer = () => {
  const { language } = useLanguage();
  const { t } = useLanguage();
  const [currentRules, setCurrentRules] = useState(rules[language]);

  useEffect(() => {
    setCurrentRules(rules[language] || rules.es);
  }, [language]);

  return (
    <Card>
      <h2 className="text-3xl font-extrabold text-[var(--text-primary)] mb-6">
        {currentRules.title}
      </h2>
      <div className="space-y-6">
        {currentRules.sections.map((section, index) => (
          <div
            key={index}
            className="p-4 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-secondary)]"
          >
            <h3 className="text-xl font-bold text-[var(--interactive-highlight)] mb-2">
              {section.title}
            </h3>
            <div
              className="prose prose-sm max-w-none text-[var(--text-secondary)]"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

const Stopwatch = ({ t }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [playSound, setPlaySound] = useState(true);
  const intervalRef = React.useRef(null);

  const formatTime = (timeInMs) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (time > 0) {
      setHistory([...history, time]);
      if (playSound) {
        const audio = new Audio(
          "./assets/sounds/alert.mp3"
        );
        audio.play();
      }
    }
    setTime(0);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setHistory([]);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">{t("stopwatch")}</h2>
      <div className="text-5xl font-mono text-center mb-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
        {formatTime(time)}
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <Button onClick={handleStartPause} variant="primary">
          {isRunning ? t("pause") : t("start")}
        </Button>
        <Button onClick={handleStop} variant="danger">
          {t("stop")}
        </Button>
        <Button onClick={handleReset} variant="secondary">
          {t("reset")}
        </Button>
      </div>
      <div className="flex items-center justify-center mb-4">
        <input
          type="checkbox"
          checked={playSound}
          onChange={() => setPlaySound(!playSound)}
          className="mr-2"
        />
        <label>{t("alertOnStop")}</label>
      </div>
      <h3 className="text-xl font-semibold mt-6 mb-2">{t("history")}</h3>
      <ul className="space-y-2 max-h-40 overflow-y-auto p-2 bg-[var(--bg-secondary)] rounded-md">
        {history.map((lap, index) => (
          <li
            key={index}
            className="flex justify-between p-2 bg-[var(--bg-primary)] rounded-md"
          >
            <span>
              {t("lap")} {index + 1}
            </span>
            <span>{formatTime(lap)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

const Countdown = ({ t }) => {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState({ h: 0, m: 0, s: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [playSound, setPlaySound] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const intervalRef = React.useRef(null);

  useEffect(() => {
    if (time <= 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      if (playSound) {
        const audio = new Audio(
          "./assets/sounds/alert.mp3"
        );
        audio.play();
      }
      if (Notification.permission === "granted") {
        new Notification(t("countdownFinished"));
      }
    }
  }, [time, isRunning, playSound, t]);

  const formatTime = (timeInMs) => {
    const totalSeconds = Math.max(0, Math.ceil(timeInMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInitialTime({ ...initialTime, [name]: value });
  };

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      let totalMs =
        ((parseInt(initialTime.h) || 0) * 3600 +
          (parseInt(initialTime.m) || 0) * 60 +
          (parseInt(initialTime.s) || 0)) *
        1000;
      if (time > 0) {
        totalMs = time;
      }
      setTime(totalMs);

      if (totalMs > 0) {
        const endTime = Date.now() + totalMs;
        intervalRef.current = setInterval(() => {
          const newTime = endTime - Date.now();
          setTime(newTime > 0 ? newTime : 0);
        }, 1000);
        setIsRunning(true);
      }
    }
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">{t("countdown")}</h2>
      <div className="text-5xl font-mono text-center mb-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
        {formatTime(time)}
      </div>
      <div className="flex justify-center gap-2 mb-4">
        <Input
          type="number"
          name="h"
          value={initialTime.h}
          onChange={handleInputChange}
          className="w-20 text-center"
          placeholder="HH"
        />
        <Input
          type="number"
          name="m"
          value={initialTime.m}
          onChange={handleInputChange}
          className="w-20 text-center"
          placeholder="MM"
        />
        <Input
          type="number"
          name="s"
          value={initialTime.s}
          onChange={handleInputChange}
          className="w-20 text-center"
          placeholder="SS"
        />
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <Button onClick={handleStartPause} variant="primary">
          {isRunning ? t("pause") : t("start")}
        </Button>
        <Button onClick={handleStop} variant="danger">
          {t("stop")}
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={playSound}
          onChange={() => setPlaySound(!playSound)}
          className="mr-2"
        />
        <label className="mr-4">{t("alertOnFinish")}</label>
        {notificationPermission !== 'granted' && (
            <Button onClick={requestNotificationPermission} variant="secondary">
                {t("enableNotifications")}
            </Button>
        )}
      </div>
    </Card>
  );
};

const Tools = () => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center">
        <ToolsIcon className="w-8 h-8 mr-3" />
        {t("tools")}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Stopwatch t={t} />
        <Countdown t={t} />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const {
    rounds,
    currentRound,
    startNewRound,
    config,
    status,
    resetTournament,
    teams,
    setTournamentStatus,
  } = useTournament();
  const { t } = useLanguage();
  const [view, setView] = useState("current");

  useEffect(() => {
    if (status === 'review_history') {
      setView('history');
    }
  }, [status]);

  const currentRoundData = rounds.find((r) => r.numero === currentRound);
  const canStartNewRound =
    status === "in_progress" &&
    (currentRound === 0 || currentRoundData?.completada) &&
    currentRound < config.maxRounds;
  const tabs = [
    { id: "current", label: t("roundsAndStandings") },
    { id: "history", label: t("allRoundsHistory") },
    { id: "tests", label: t("manageTests") },
    { id: "rules", label: t("rules") },
    { id: "tools", label: t("tools") },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          {t("dashboardTitle")}
        </h1>
        <div className="flex gap-2">
          <Button onClick={resetTournament} variant="danger" className="text-sm">
            {t("reset")}
          </Button>
          {/* Botón para finalizar el torneo antes de tiempo */}
          {status === "in_progress" && (
            <Button
              onClick={() => {
                if (
                  window.confirm(
                    t("confirmEndTournament") ||
                      "¿Seguro que quieres finalizar el torneo y asignar puntos extra?"
                  )
                ) {
                  setTournamentStatus("review_history");
                }
              }}
              variant="secondary"
              className="text-sm"
            >
              {t("endTournamentNow") || "Finalizar torneo ahora"}
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6 border-b border-[var(--border-primary)]">
        <nav className="flex flex-wrap justify-center sm:justify-start space-x-2 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`py-2 px-4 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                view === tab.id
                  ? "border-[var(--interactive-highlight)] text-[var(--interactive-highlight)]"
                  : "border-transparent text-[var(--text-secondary)] hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {view === "current" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {canStartNewRound && teams.length > 1 ? (
              <Button
                onClick={startNewRound}
                className="w-full bg-[var(--accent-green)] hover:opacity-80 py-4 text-xl flex items-center justify-center"
              >
                <ArrowRightIcon className="w-8 h-8 mr-2" />{" "}
                {t("startRound", { round: currentRound + 1 })}
              </Button>
            ) : status === "in_progress" &&
              currentRoundData &&
              !currentRoundData.completada ? (
              <div
                className="p-3 bg-[var(--accent-yellow)]/10 border-l-4 border-[var(--accent-yellow)] text-[var(--accent-yellow)] rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: t("roundInProgress") }}
              />
            ) : null}
            <CurrentRoundView round={currentRoundData} />
          </div>
          <div>
            <GeneralStandings />
          </div>
        </div>
      )}
      {view === "history" && <AllRoundsHistory />}
      {view === "tests" && <TestManager />}
      {view === "rules" && <RulesViewer />}
      {view === "tools" && <Tools />}
    </div>
  );
};

const AssignPointsView = () => {
  const { teams, assignExtraPoints } = useTournament();
  const { t } = useLanguage();
  const [points, setPoints] = useState({});
  const handleAssignPoints = (teamId, value) =>
    setPoints({ ...points, [teamId]: value });
  const handleSubmit = () => assignExtraPoints(points);

  return (
    <Card className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-black text-[var(--accent-yellow)] mb-2">
        {t("assignPointsTitle")}
      </h1>
      <p className="text-[var(--text-secondary)] mb-6">
        {t("assignPointsInfo")}
      </p>
      <div className="space-y-4 text-left">
        {teams.map((team) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-md"
          >
            <span className="font-bold text-lg">{team.nombre}</span>
            <Input
              type="number"
              value={points[team.id] || ""}
              onChange={(e) => handleAssignPoints(team.id, e.target.value)}
              className="w-24 text-center"
            />
          </div>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        className="mt-8 bg-[var(--accent-green)] hover:opacity-80"
      >
        {t("submitPoints")}
      </Button>
    </Card>
  );
};

const FinishedView = () => {
  const { teams, rounds, resetTournament } = useTournament();
  const { t } = useLanguage();
  const sortedTeams = useMemo(
    () => [...teams].sort((a, b) => b.puntosTotales - a.puntosTotales),
    [teams]
  );
  const winner = sortedTeams[0];

  const exportResultsToTxt = () => {
    let content = `${t("finishedTitle")}\n\n${t("winningTeamIs")} ${
      winner.nombre
    }\n\n${t("generalStandings")}:\n`;
    sortedTeams.forEach((team, index) => {
      const extra = team.puntosExtra
        ? ` (+${team.puntosExtra} ${t("assignPointsTitle")})`
        : "";
      content += `${index + 1}. ${team.nombre} - ${team.puntosTotales} ${t(
        "points"
      )}${extra}\n`;
    });
    content += `\n${t("roundHistoryTitle")}:\n`;
    rounds.forEach((round) => {
      content += `\n${t("currentRound", { round: round.numero })}\n`;
      round.enfrentamientos.forEach((match) => {
        const team1 = teams.find((t) => t.id === match.equipo1)?.nombre || "";
        const team2 = teams.find((t) => t.id === match.equipo2)?.nombre || "";
        const winnerName = match.resultado
          ? teams.find((t) => t.id === match.resultado)?.nombre
          : "N/A";
        content += `${team1} vs ${team2} - ${t("winner")}: ${winnerName}\n`;
      });
    });
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tournament_results.txt";
    link.click();
  };

  return (
    <Card className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-black text-[var(--accent-yellow)] mb-2">
        {t("finishedTitle")}
      </h1>
      <h2 className="text-2xl font-bold mb-6">{t("winningTeamIs")}</h2>

      {winner && (
        <div className="inline-block p-6 bg-gradient-to-br from-[var(--accent-yellow)] to-[var(--accent-blue)] rounded-lg text-white shadow-2xl mb-8">
          <TrophyIcon className="w-16 h-16 mx-auto mb-2" />
          <p className="text-3xl font-extrabold">{winner.nombre}</p>
          <p className="text-xl font-bold">
            {winner.puntosTotales} {t("points")}
          </p>
        </div>
      )}

      <GeneralStandings />
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          {t("roundHistoryTitle")}
        </h3>
        {/* Mostrar primero los puntos extra asignados */}
        <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-lg">
          <h4 className="text-xl font-semibold text-[var(--accent-yellow)] mb-2">
            {t("assignPointsTitle")}
          </h4>
          <ul className="space-y-2">
            {sortedTeams.map((team) =>
              team.puntosExtra ? (
                <li
                  key={team.id}
                  className="p-2 bg-[var(--bg-primary)] rounded-md text-sm flex justify-between items-center"
                >
                  <span className="font-semibold">{team.nombre}</span>
                  <span className="text-[var(--accent-yellow)]">
                    +{team.puntosExtra} {t("points")}
                  </span>
                </li>
              ) : null
            )}
          </ul>
        </div>

        {/* Historial de rondas */}
        <div className="space-y-6">
          {rounds.map((round) => (
            <div key={round.numero} className="border-b border-[var(--border-primary)] pb-4">
              <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                {t("currentRound", { round: round.numero })}
              </h4>
              <ul className="space-y-2">
                {round.enfrentamientos.map((match) => {
                  const team1 =
                    teams.find((t) => t.id === match.equipo1)?.nombre || "";
                  const team2 =
                    teams.find((t) => t.id === match.equipo2)?.nombre || "";
                  const winner = match.resultado
                    ? teams.find((t) => t.id === match.resultado)?.nombre
                    : t("noActiveRound");
                  return (
                    <li
                      key={match.id}
                      className="p-2 bg-[var(--bg-secondary)] rounded-md text-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span>
                          {team1} vs {team2}
                        </span>
                        <span className="font-bold text-green-600">
                          {t("winner")}: {winner}
                        </span>
                      </div>
                      <div className="text-gray-500">
                        {t("test")}: {match.prueba.nombre} (+
                        {match.puntosPorGanar} pts)
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Button onClick={exportResultsToTxt}>{t("exportResultsToTxt")}</Button>
        <Button onClick={resetTournament} variant="danger">
          {t("startNewTournament")}
        </Button>
      </div>
    </Card>
  );
};

// --- COMPONENTE PRINCIPAL ---
function MainApp() {
  const { status, isLoading } = useTournament();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--bg-primary)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--interactive-highlight)]"></div>
        <span className="ml-4 text-xl">{t("loading")}</span>
      </div>
    );
  }

  let content;
  switch (status) {
    case "configuring":
      content = <SetupWizard />;
      break;
    case "in_progress":
      content = <Dashboard />;
      break;
    case "review_history":
      content = <Dashboard />;
      break;
    case "assign_points":
      content = <AssignPointsView />;
      break;
    case "results":
      content = <FinishedView />;
      break;
    default:
      content = <div>{t("loading")}</div>;
  }

  return (
    <div className="min-h-screen">
      <ThemeSwitcher />
      <LanguageSwitcher />
      <div className="container mx-auto p-4 pt-20">{content}</div>
    </div>
  );
}

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <TournamentProvider>
        <PointsVisibilityProvider>
          <MainApp />
        </PointsVisibilityProvider>
      </TournamentProvider>
    </LanguageProvider>
  </ThemeProvider>
);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
