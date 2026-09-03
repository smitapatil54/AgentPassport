import { useEffect, useMemo, useState } from "react";

import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import "./App.css";

/* =========================================================
   ICONS
   ========================================================= */

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M18 9.2C18 5.9 15.8 4 12 4C8.2 4 6 5.9 6 9.2V12.4C6 14 5.4 15.2 4.3 16.3C3.9 16.7 4.2 17.4 4.8 17.4H19.2C19.8 17.4 20.1 16.7 19.7 16.3C18.6 15.2 18 14 18 12.4V9.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 20C10.2 20.7 11 21 12 21C13 21 13.8 20.7 14.4 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.5 19C6.2 15.7 8.3 14 12 14C15.7 14 17.8 15.7 18.5 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
    >
      <path
        d={open ? "M6 14L12 8L18 14" : "M6 10L12 16L18 10"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 2.5V5M12 19V21.5M21.5 12H19M5 12H2.5M18.7 5.3L16.9 7.1M7.1 16.9L5.3 18.7M18.7 18.7L16.9 16.9M7.1 7.1L5.3 5.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <path
        d="M20 15.4C18.9 15.8 17.8 16 16.6 16C11.9 16 8 12.1 8 7.4C8 6.2 8.2 5.1 8.6 4C5.2 5.4 3 8.5 3 12.1C3 17 7 21 11.9 21C15.5 21 18.6 18.8 20 15.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <path
        d="M5 12.5L9.2 16.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 3L19 6V11C19 15.7 16.2 19.2 12 21C7.8 19.2 5 15.7 5 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12L10.8 14.2L15.7 9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   NAVIGATION
   ========================================================= */

const mainMenu = [
  { path: "/", label: "Overview", icon: "⌂" },
  { path: "/agents", label: "Agents", icon: "◈" },
  { path: "/security", label: "Security Center", icon: "◉" },
  { path: "/policies", label: "Policies", icon: "◇" },
  { path: "/audit", label: "Audit Trail", icon: "▤" },
  { path: "/copilot", label: "AI Copilot", icon: "✦" },
];

const systemMenu = [
  { path: "/settings", label: "Settings", icon: "⚙" },
  { path: "/help", label: "How to Use", icon: "?" },
];

/* =========================================================
   SIDEBAR
   ========================================================= */

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <div className="brand-logo">A</div>

        {!collapsed && (
          <div className="brand-copy">
            <h2>AgentPassport</h2>
            <span>AI Security Platform</span>
          </div>
        )}
      </div>

      <div className="sidebar-scroll">
        <div className="nav-group">
          {!collapsed && (
            <div className="nav-label">WORKSPACE</div>
          )}

          {mainMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              title={collapsed ? item.label : ""}
            >
              <span className="nav-icon">{item.icon}</span>

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="nav-group settings-group">
          {!collapsed && (
            <div className="nav-label">SYSTEM</div>
          )}

          {systemMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              title={collapsed ? item.label : ""}
            >
              <span className="nav-icon">{item.icon}</span>

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        {!collapsed && (
          <div className="secure-card">
            <div className="secure-icon">
              <CheckIcon />
            </div>

            <div>
              <strong>System Protected</strong>
              <span>Security services active</span>
            </div>
          </div>
        )}

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   HEADER
   ========================================================= */

function Header({ theme, toggleTheme, onMobileMenu }) {
  const location = useLocation();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const titles = {
    "/": [
      "Overview",
      "Your AI security command center",
    ],
    "/agents": [
      "Agents",
      "Identity, trust and access management",
    ],
    "/security": [
      "Security Center",
      "Zero-trust protection and threat controls",
    ],
    "/policies": [
      "Policies",
      "Control exactly what agents can access",
    ],
    "/audit": [
      "Audit Trail",
      "A complete record of security activity",
    ],
    "/copilot": [
      "AI Security Copilot",
      "Ask questions about your security",
    ],
    "/settings": [
      "Settings",
      "Manage your platform configuration",
    ],
    "/help": [
      "How to Use",
      "A simple guide to AgentPassport",
    ],
  };

  const [title, subtitle] =
    titles[location.pathname] || titles["/"];

  const notifications = [
    {
      id: 1,
      type: "danger",
      title: "Security incident detected",
      text: "Research Agent attempted blocked tool access.",
      time: "18 min ago",
    },
    {
      id: 2,
      type: "warning",
      title: "Policy updated",
      text: "Developer Agent permissions were changed.",
      time: "1 hr ago",
    },
    {
      id: 3,
      type: "success",
      title: "Agent verified",
      text: "Finance Agent identity was successfully verified.",
      time: "2 hrs ago",
    },
  ];

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="mobile-menu"
          onClick={onMobileMenu}
        >
          ☰
        </button>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        <button
          className="theme-switch"
          onClick={toggleTheme}
        >
          <span className="theme-symbol">
            {theme === "dark" ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </span>

          <span>
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>

        <div className="header-dropdown-wrapper">
          <button
            className={`notification ${
              showNotifications ? "active" : ""
            }`}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
          >
            <BellIcon />
            <i></i>
          </button>

          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-panel-header">
                <div>
                  <strong>Notifications</strong>
                  <span>Security activity</span>
                </div>

                <span className="notification-count">
                  3 new
                </span>
              </div>

              <div className="notification-list">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    className="notification-item"
                    onClick={() =>
                      setShowNotifications(false)
                    }
                  >
                    <div
                      className={`notification-item-icon ${notification.type}`}
                    >
                      {notification.type === "success"
                        ? "✓"
                        : "!"}
                    </div>

                    <div className="notification-item-content">
                      <strong>
                        {notification.title}
                      </strong>
                      <span>{notification.text}</span>
                      <small>{notification.time}</small>
                    </div>
                  </button>
                ))}
              </div>

              <button
                className="view-notifications"
                onClick={() =>
                  setShowNotifications(false)
                }
              >
                View security activity →
              </button>
            </div>
          )}
        </div>

        <div className="header-dropdown-wrapper">
          <button
            className={`admin-profile ${
              showProfile ? "active" : ""
            }`}
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          >
            <div className="admin-avatar">
              <UserIcon />
            </div>

            <div className="admin-text">
              <strong>Security Admin</strong>
              <span>Administrator</span>
            </div>

            <span className="profile-chevron">
              <ChevronIcon open={showProfile} />
            </span>
          </button>

          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-large-avatar">
                  <UserIcon />
                </div>

                <div>
                  <strong>Security Admin</strong>
                  <span>Administrator</span>
                </div>
              </div>

              <div className="profile-menu">
                <button
                  onClick={() => setShowProfile(false)}
                >
                  <UserIcon />

                  <div>
                    <strong>My Profile</strong>
                    <small>
                      View administrator details
                    </small>
                  </div>
                </button>

                <button
                  onClick={() => setShowProfile(false)}
                >
                  ⚙

                  <div>
                    <strong>Account Settings</strong>
                    <small>
                      Manage your account
                    </small>
                  </div>
                </button>

                <button
                  onClick={() => setShowProfile(false)}
                >
                  🔐

                  <div>
                    <strong>Security Settings</strong>
                    <small>
                      Authentication and security
                    </small>
                  </div>
                </button>
              </div>

              <div className="profile-dropdown-footer">
                <button
                  className="logout-button"
                  onClick={() => setShowProfile(false)}
                >
                  ↪ Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  icon,
  label,
  value,
  detail,
  trend,
  variant,
}) {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-card-header">
        <div className="stat-icon">{icon}</div>
        <span className="stat-trend">{trend}</span>
      </div>

      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-detail">{detail}</div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard({ agents, onRegister }) {
  const trustData = useMemo(() => {
    const trusted = agents.filter(
      (agent) => agent.trustScore >= 80
    ).length;

    const monitored = agents.filter(
      (agent) =>
        agent.trustScore >= 60 &&
        agent.trustScore < 80
    ).length;

    const restricted = agents.filter(
      (agent) => agent.trustScore < 60
    ).length;

    return [
      {
        name: "Trusted",
        value: trusted,
        color: "#4f8df7",
      },
      {
        name: "Monitored",
        value: monitored,
        color: "#8da1b8",
      },
      {
        name: "Restricted",
        value: restricted,
        color: "#e19a3c",
      },
    ].filter((item) => item.value > 0);
  }, [agents]);

  const totalAgents = agents.length;

  const securityScore =
    totalAgents === 0
      ? 0
      : Math.round(
          agents.reduce(
            (sum, agent) =>
              sum + agent.trustScore,
            0
          ) / totalAgents
        );

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-pill">
            <span></span>
            ZERO-TRUST AI SECURITY
          </div>

          <h2>
            Your AI agents.
            <br />
            <em>Protected by design.</em>
          </h2>

          <p>
            AgentPassport gives every AI agent a
            verified digital identity and checks
            every sensitive action before it is
            allowed.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={onRegister}
            >
              + Register Agent
            </button>

            <NavLink
              to="/security"
              className="secondary-btn"
            >
              Explore Security →
            </NavLink>
          </div>
        </div>

        {/* =================================================
            SECURITY RING — KEEP THIS
           ================================================= */}

        <div className="hero-security">
          <div className="security-visual">
            <svg
              className="security-svg"
              viewBox="0 0 300 300"
              role="img"
              aria-label="Agent security protection active"
            >
              <defs>
                <radialGradient id="securityGlow">
                  <stop
                    offset="0%"
                    stopColor="#4f46e5"
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="55%"
                    stopColor="#06b6d4"
                    stopOpacity="0.10"
                  />
                  <stop
                    offset="100%"
                    stopColor="#06b6d4"
                    stopOpacity="0"
                  />
                </radialGradient>

                <linearGradient
                  id="securityRingGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#4f46e5"
                  />
                  <stop
                    offset="50%"
                    stopColor="#06b6d4"
                  />
                  <stop
                    offset="100%"
                    stopColor="#22c55e"
                  />
                </linearGradient>

                <filter
                  id="securityBlur"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              <circle
                cx="150"
                cy="150"
                r="125"
                fill="url(#securityGlow)"
              />

              <circle
                cx="150"
                cy="150"
                r="108"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="8"
                opacity="0.12"
                filter="url(#securityBlur)"
              />

              <circle
                cx="150"
                cy="150"
                r="105"
                fill="none"
                stroke="url(#securityRingGradient)"
                strokeWidth="3"
                strokeDasharray="45 15 80 20"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 150 150"
                  to="360 150 150"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="150"
                cy="150"
                r="91"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="8 18"
                opacity="0.75"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 150 150"
                  to="0 150 150"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle
                cx="150"
                cy="150"
                r="68"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.18"
              />

              <ellipse
                cx="150"
                cy="150"
                rx="116"
                ry="48"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="1.5"
                opacity="0.35"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 150 150"
                  to="360 150 150"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </ellipse>

              <line
                x1="150"
                y1="82"
                x2="150"
                y2="108"
                stroke="#06b6d4"
                strokeWidth="2"
                opacity="0.6"
              />

              <line
                x1="91"
                y1="150"
                x2="108"
                y2="150"
                stroke="#4f46e5"
                strokeWidth="2"
                opacity="0.6"
              />

              <line
                x1="192"
                y1="150"
                x2="209"
                y2="150"
                stroke="#22c55e"
                strokeWidth="2"
                opacity="0.6"
              />

              <circle
                cx="150"
                cy="75"
                r="17"
                fill="var(--surface)"
                stroke="#06b6d4"
                strokeWidth="2"
              />

              <text
                x="150"
                y="79"
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="var(--text)"
              >
                ID
              </text>

              <circle
                cx="82"
                cy="150"
                r="17"
                fill="var(--surface)"
                stroke="#4f46e5"
                strokeWidth="2"
              />

              <text
                x="82"
                y="154"
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="var(--text)"
              >
                ZT
              </text>

              <circle
                cx="218"
                cy="150"
                r="17"
                fill="var(--surface)"
                stroke="#22c55e"
                strokeWidth="2"
              />

              <text
                x="218"
                y="154"
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill="var(--text)"
              >
                AI
              </text>

              <path
                d="M150 105 L177 116 V139 C177 158 164 174 150 181 C136 174 123 158 123 139 V116 Z"
                fill="var(--surface)"
                stroke="url(#securityRingGradient)"
                strokeWidth="3"
              />

              <path
                d="M138 141 L147 150 L164 131"
                fill="none"
                stroke="#22c55e"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="150"
                cy="150"
                r="70"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                opacity="0.35"
              >
                <animate
                  attributeName="r"
                  values="65;78;65"
                  dur="2.5s"
                  repeatCount="indefinite"
                />

                <animate
                  attributeName="opacity"
                  values="0.45;0;0.45"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            <div className="security-status">
              <span className="security-status-dot"></span>
              <span>SECURE</span>
              <small>Protection Active</small>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Security at a glance</h2>
            <p>
              Everything important, without the noise.
            </p>
          </div>

          <div className="live">
            <span></span>
            LIVE MONITORING
          </div>
        </div>

        <div className="stats">
          <StatCard
            icon="◈"
            label="Registered Agents"
            value={totalAgents}
            detail="Digital identities managed"
            trend="Live"
            variant="blue"
          />

          <StatCard
            icon="✓"
            label="Security Score"
            value={`${securityScore}%`}
            detail="Average agent trust level"
            trend="+4.2%"
            variant="green"
          />

          <StatCard
            icon="⊘"
            label="Blocked Actions"
            value="27"
            detail="Prevented by security policies"
            trend="12 today"
            variant="orange"
          />

          <StatCard
            icon="!"
            label="Security Incidents"
            value="03"
            detail="2 critical · 1 warning"
            trend="Review"
            variant="red"
          />
        </div>
      </section>

      <section className="analytics">
        <div className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <h3>Recent agent activity</h3>
              <p>
                What your agents are doing right now
              </p>
            </div>

            <NavLink to="/audit">
              View all →
            </NavLink>
          </div>

          <div className="activity-list">
            <Activity
              status="success"
              icon="✓"
              title="Finance Agent"
              text="Payment request verified"
              time="2 min ago"
            />

            <Activity
              status="danger"
              icon="⊘"
              title="Research Agent"
              text="External tool access blocked"
              time="18 min ago"
            />

            <Activity
              status="success"
              icon="✓"
              title="Email Agent"
              text="Intent lock validated"
              time="34 min ago"
            />

            <Activity
              status="warning"
              icon="!"
              title="Developer Agent"
              text="Permission policy updated"
              time="1 hr ago"
            />

            <Activity
              status="success"
              icon="✓"
              title="Support Agent"
              text="Agent identity verified"
              time="2 hrs ago"
            />
          </div>
        </div>

        {/* =================================================
            REAL PIE / DONUT CHART — KEEP THIS
           ================================================= */}

        <div className="panel trust-panel">
          <div className="panel-heading">
            <div>
              <h3>Trust distribution</h3>
              <p>
                Current classification of registered agents
              </p>
            </div>
          </div>

          <div className="trust-body">
            <div className="real-donut">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={trustData}
                    cx="50%"
                    cy="50%"
                    innerRadius={57}
                    outerRadius={82}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {trustData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>

                </PieChart>
              </ResponsiveContainer>

              <div className="donut-center">
                <strong>{totalAgents}</strong>
                <span>AI Agents</span>
              </div>
            </div>

            <div className="trust-list">
              {trustData.map((item) => (
                <TrustRow
                  key={item.name}
                  color={item.color}
                  label={item.name}
                  value={item.value}
                  percentage={
                    totalAgents
                      ? `${Math.round(
                          (item.value /
                            totalAgents) *
                            100
                        )}%`
                      : "0%"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="panel pipeline-panel">
        <div className="panel-heading">
          <div>
            <h3>
              How Zero Trust protects an action
            </h3>

            <p>
              Every sensitive request follows the same
              security flow.
            </p>
          </div>

          <span className="protected-badge">
            PROTECTED
          </span>
        </div>

        <div className="pipeline">
          <Pipeline
            icon="◈"
            number="01"
            title="Identity"
          />

          <span className="pipeline-arrow">→</span>

          <Pipeline
            icon="◇"
            number="02"
            title="Permission"
          />

          <span className="pipeline-arrow">→</span>

          <Pipeline
            icon="◎"
            number="03"
            title="Intent"
          />

          <span className="pipeline-arrow">→</span>

          <Pipeline
            icon="◉"
            number="04"
            title="Risk"
          />

          <span className="pipeline-arrow">→</span>

          <Pipeline
            icon="✓"
            number="05"
            title="Execute"
          />
        </div>
      </section>

      <section className="dashboard-section quick-section">
        <div className="section-heading">
          <div>
            <h2>What would you like to do?</h2>
            <p>
              Common security actions are always one click
              away.
            </p>
          </div>
        </div>

        <div className="quick-actions">
          <QuickAction
            icon="◈"
            title="Register an Agent"
            text="Create a verified Agent Passport"
            onClick={onRegister}
          />

          <QuickAction
            icon="◇"
            title="Create a Policy"
            text="Set access permissions"
            to="/policies"
          />

          <QuickAction
            icon="✦"
            title="Ask Copilot"
            text="Get security insights"
            to="/copilot"
          />

          <QuickAction
            icon="?"
            title="Learn AgentPassport"
            text="Start the guided tour"
            to="/help"
          />
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   ACTIVITY
   ========================================================= */

function Activity({
  status,
  icon,
  title,
  text,
  time,
}) {
  return (
    <div className="activity">
      <div className={`activity-icon ${status}`}>
        {icon}
      </div>

      <div className="activity-content">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

      <time>{time}</time>
    </div>
  );
}

/* =========================================================
   TRUST ROW
   ========================================================= */

function TrustRow({
  color,
  label,
  value,
  percentage,
}) {
  return (
    <div className="trust-row">
      <span
        className="trust-dot"
        style={{ background: color }}
      ></span>

      <span>{label}</span>

      <strong>{value}</strong>

      <small>{percentage}</small>
    </div>
  );
}

/* =========================================================
   PIPELINE
   ========================================================= */

function Pipeline({
  icon,
  number,
  title,
}) {
  return (
    <div className="pipeline-step">
      <div className="pipeline-icon">
        {icon}
      </div>

      <small>{number}</small>

      <strong>{title}</strong>
    </div>
  );
}

/* =========================================================
   QUICK ACTION
   ========================================================= */

function QuickAction({
  icon,
  title,
  text,
  onClick,
  to,
}) {
  const content = (
    <>
      <div className="quick-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

      <b>→</b>
    </>
  );

  if (to) {
    return (
      <NavLink
        className="quick-action"
        to={to}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button
      className="quick-action"
      onClick={onClick}
    >
      {content}
    </button>
  );
}

/* =========================================================
   INITIAL AGENT DATA
   ========================================================= */

const initialAgents = [
  {
    id: "IDAP-AG-000001",
    name: "Finance Agent",
    type: "AI Agent",
    owner: "Finance Department",
    description:
      "Handles approved financial workflows and payment verification.",
    trustScore: 92,
    status: "Verified",
    risk: "Low",
    capabilities: [
      "Payment",
      "Email",
      "CRM",
    ],
    authMethod: "Signed Requests",
    dataAccess: "Confidential",
    environment: "Production",
    humanApproval: true,
    protections: {
      promptInjection: true,
      intentLock: true,
      behavioralMonitoring: true,
    },
  },
  {
    id: "IDAP-AG-000002",
    name: "Customer Support Agent",
    type: "Assistant Agent",
    owner: "Customer Support",
    description:
      "Assists customers with approved support workflows.",
    trustScore: 86,
    status: "Verified",
    risk: "Low",
    capabilities: [
      "Email",
      "CRM",
      "Customer Search",
    ],
    authMethod: "OAuth 2.0",
    dataAccess: "Internal",
    environment: "Production",
    humanApproval: false,
    protections: {
      promptInjection: true,
      intentLock: true,
      behavioralMonitoring: true,
    },
  },
  {
    id: "IDAP-AG-000003",
    name: "Research Agent",
    type: "AI Agent",
    owner: "Research Team",
    description:
      "Researches approved external information sources.",
    trustScore: 61,
    status: "Under Review",
    risk: "Medium",
    capabilities: [
      "Web Search",
      "Documents",
    ],
    authMethod: "API Key",
    dataAccess: "Internal",
    environment: "Staging",
    humanApproval: true,
    protections: {
      promptInjection: true,
      intentLock: true,
      behavioralMonitoring: true,
    },
  },
];

/* =========================================================
   AGENT FLEET
   ========================================================= */

function AgentFleet({
  agents,
  onRegister,
  onUpdateAgent,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedAgent, setSelectedAgent] =
    useState(null);

  const filteredAgents = agents.filter((agent) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      agent.name
        .toLowerCase()
        .includes(searchValue) ||
      agent.id
        .toLowerCase()
        .includes(searchValue) ||
      agent.owner
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      agent.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page agent-page">
      <div className="agent-page-header">
        <div>
          <div className="hero-pill">
            <span></span>
            AGENT IDENTITY MANAGEMENT
          </div>

          <h2>Agent Fleet</h2>

          <p>
            Register, verify and control the digital
            identities of AI agents connected to your
            environment.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={onRegister}
        >
          + Register Agent
        </button>
      </div>

      <div className="agent-explanation">
        <div className="agent-explanation-icon">
          <ShieldIcon />
        </div>

        <div>
          <strong>
            Why does an agent need an Agent Passport?
          </strong>

          <p>
            Before an AI agent can access protected
            resources, AgentPassport gives it a unique
            digital identity. That identity is then used
            to check permissions, intent and risk before
            sensitive actions are executed.
          </p>
        </div>
      </div>

      <div className="agent-toolbar">
        <div className="agent-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search agents, passport ID or owner..."
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Verified">Verified</option>
          <option value="Under Review">
            Under Review
          </option>
          <option value="Frozen">Frozen</option>
          <option value="Revoked">Revoked</option>
        </select>
      </div>

      <div className="agent-summary-row">
        <div>
          <strong>{agents.length}</strong>
          <span>Total Agents</span>
        </div>

        <div>
          <strong>
            {
              agents.filter(
                (agent) =>
                  agent.status === "Verified"
              ).length
            }
          </strong>
          <span>Verified</span>
        </div>

        <div>
          <strong>
            {
              agents.filter(
                (agent) =>
                  agent.status === "Under Review"
              ).length
            }
          </strong>
          <span>Under Review</span>
        </div>

        <div>
          <strong>
            {
              agents.filter(
                (agent) =>
                  agent.status === "Frozen" ||
                  agent.status === "Revoked"
              ).length
            }
          </strong>
          <span>Restricted</span>
        </div>
      </div>

      <div className="agent-grid">
        {filteredAgents.map((agent) => (
          <div
            className="agent-card"
            key={agent.id}
          >
            <div className="agent-card-top">
              <div className="agent-avatar">
                {agent.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <span
                className={`agent-status ${agent.status
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                <span></span>
                {agent.status}
              </span>
            </div>

            <h3>{agent.name}</h3>

            <p className="agent-type">
              {agent.type}
            </p>

            <div className="agent-id">
              <span>Passport ID</span>
              <strong>{agent.id}</strong>
            </div>

            <div className="agent-info-row">
              <span>Owner</span>
              <strong>{agent.owner}</strong>
            </div>

            <div className="agent-info-row">
              <span>Risk</span>
              <strong
                className={`risk-${agent.risk.toLowerCase()}`}
              >
                {agent.risk}
              </strong>
            </div>

            <div className="trust-score-mini">
              <div>
                <span>Trust Score</span>

                <strong>
                  {agent.trustScore}
                </strong>
              </div>

              <div className="trust-bar">
                <div
                  style={{
                    width: `${agent.trustScore}%`,
                  }}
                />
              </div>
            </div>

            <div className="capability-list">
              {agent.capabilities
                .slice(0, 3)
                .map((capability) => (
                  <span key={capability}>
                    {capability}
                  </span>
                ))}

              {agent.capabilities.length > 3 && (
                <span>
                  +{agent.capabilities.length - 3}
                </span>
              )}
            </div>

            <button
              className="agent-manage-btn"
              onClick={() =>
                setSelectedAgent(agent)
              }
            >
              View Passport →
            </button>
          </div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="empty-agent-state">
          <div>⌕</div>

          <h3>No agents found</h3>

          <p>
            Try another search or register a new agent.
          </p>

          <button
            className="primary-btn"
            onClick={onRegister}
          >
            Register Agent
          </button>
        </div>
      )}

      {selectedAgent && (
        <AgentPassportModal
          agent={selectedAgent}
          onClose={() =>
            setSelectedAgent(null)
          }
          onUpdate={onUpdateAgent}
        />
      )}
    </div>
  );
}

/* =========================================================
   AGENT PASSPORT MODAL
   ========================================================= */

function AgentPassportModal({
  agent,
  onClose,
  onUpdate,
}) {
  const freezeAgent = () => {
    onUpdate(agent.id, {
      status: "Frozen",
    });

    onClose();
  };

  const reactivateAgent = () => {
    onUpdate(agent.id, {
      status: "Verified",
    });

    onClose();
  };

  const revokeAgent = () => {
    onUpdate(agent.id, {
      status: "Revoked",
    });

    onClose();
  };

  return (
    <div
      className="agent-detail-overlay"
      onMouseDown={onClose}
    >
      <div
        className="agent-detail-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="agent-detail-header">
          <div>
            <span className="modal-kicker">
              DIGITAL AGENT PASSPORT
            </span>

            <h2>{agent.name}</h2>

            <p>{agent.id}</p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="passport-status-row">
          <span
            className={`passport-status ${agent.status
              .toLowerCase()
              .replaceAll(" ", "-")}`}
          >
            {agent.status}
          </span>

          <span className="passport-risk">
            Risk:{" "}
            <strong>{agent.risk}</strong>
          </span>

          <span className="passport-trust">
            Trust Score:{" "}
            <strong>
              {agent.trustScore}
            </strong>
          </span>
        </div>

        <div className="passport-grid">
          <PassportItem
            label="Agent Type"
            value={agent.type}
          />

          <PassportItem
            label="Owner"
            value={agent.owner}
          />

          <PassportItem
            label="Authentication"
            value={agent.authMethod}
          />

          <PassportItem
            label="Data Access"
            value={agent.dataAccess}
          />

          <PassportItem
            label="Environment"
            value={agent.environment}
          />

          <PassportItem
            label="Human Approval"
            value={
              agent.humanApproval
                ? "Required"
                : "Not Required"
            }
          />
        </div>

        <div className="passport-description">
          <span>Purpose</span>
          <p>{agent.description}</p>
        </div>

        <div className="passport-section-block">
          <h4>Capabilities</h4>

          <div className="passport-capabilities">
            {agent.capabilities.map(
              (capability) => (
                <span key={capability}>
                  ✓ {capability}
                </span>
              )
            )}
          </div>
        </div>

        <div className="passport-section-block">
          <h4>Security Controls</h4>

          <div className="security-control-grid">
            <SecurityControl
              active={
                agent.protections
                  .promptInjection
              }
              title="Prompt Injection Protection"
            />

            <SecurityControl
              active={
                agent.protections.intentLock
              }
              title="Cryptographic Intent Lock"
            />

            <SecurityControl
              active={
                agent.protections
                  .behavioralMonitoring
              }
              title="Behavioral Monitoring"
            />
          </div>
        </div>

        <div className="passport-actions">
          {agent.status !== "Frozen" &&
            agent.status !== "Revoked" && (
              <button
                className="danger-outline-btn"
                onClick={freezeAgent}
              >
                Freeze Agent
              </button>
            )}

          {agent.status === "Frozen" && (
            <button
              className="success-outline-btn"
              onClick={reactivateAgent}
            >
              Reactivate Agent
            </button>
          )}

          {agent.status !== "Revoked" && (
            <button
              className="danger-outline-btn"
              onClick={revokeAgent}
            >
              Revoke Agent
            </button>
          )}

          <button
            className="secondary-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PASSPORT ITEM
   ========================================================= */

function PassportItem({
  label,
  value,
}) {
  return (
    <div className="passport-section">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   SECURITY CONTROL
   ========================================================= */

function SecurityControl({
  active,
  title,
}) {
  return (
    <div
      className={`security-control ${
        active ? "active" : "inactive"
      }`}
    >
      <span>
        {active ? "✓" : "!"}
      </span>

      <div>
        <strong>{title}</strong>

        <small>
          {active
            ? "Enabled"
            : "Disabled"}
        </small>
      </div>
    </div>
  );
}

/* =========================================================
   REGISTER AGENT
   ========================================================= */

const capabilityOptions = [
  "Email",
  "CRM",
  "Customer Search",
  "Web Search",
  "Documents",
  "Database",
  "Payment",
  "File Access",
];

function RegisterAgent({
  onClose,
  onRegistered,
}) {
  const [form, setForm] = useState({
    name: "",
    type: "AI Agent",
    owner: "",
    description: "",
    capabilities: [],
    authMethod: "Signed Requests",
    dataAccess: "Internal",
    environment: "Staging",
    humanApproval: true,
    promptInjection: true,
    intentLock: true,
    behavioralMonitoring: true,
    emergencyContact: "",
    acknowledgement: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [createdId, setCreatedId] = useState("");

  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const toggleCapability = (
    capability
  ) => {
    setForm((current) => ({
      ...current,

      capabilities:
        current.capabilities.includes(
          capability
        )
          ? current.capabilities.filter(
              (item) =>
                item !== capability
            )
          : [
              ...current.capabilities,
              capability,
            ],
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name =
        "Agent name is required.";
    }

    if (!form.owner.trim()) {
      nextErrors.owner =
        "Owner / organization is required.";
    }

    if (!form.description.trim()) {
      nextErrors.description =
        "Describe what this agent is responsible for.";
    }

    if (
      form.capabilities.length === 0
    ) {
      nextErrors.capabilities =
        "Select at least one capability.";
    }

    if (!form.emergencyContact.trim()) {
      nextErrors.emergencyContact =
        "Security contact is required.";
    }

    if (!form.acknowledgement) {
      nextErrors.acknowledgement =
        "You must acknowledge the security requirements.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const calculateTrust = () => {
    let score = 70;

    if (
      form.authMethod ===
      "Signed Requests"
    ) {
      score += 10;
    }

    if (
      form.authMethod === "mTLS"
    ) {
      score += 15;
    }

    if (form.humanApproval) {
      score += 5;
    }

    if (form.promptInjection) {
      score += 3;
    }

    if (form.intentLock) {
      score += 5;
    }

    if (
      form.behavioralMonitoring
    ) {
      score += 2;
    }

    if (
      form.dataAccess ===
      "Restricted"
    ) {
      score -= 10;
    }

    if (
      form.capabilities.includes(
        "Payment"
      )
    ) {
      score -= 8;
    }

    return Math.max(
      0,
      Math.min(100, score)
    );
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const trustScore =
      calculateTrust();

    const randomNumber =
      100000 +
      Math.floor(
        Math.random() *
          900000
      );

    const passportId =
      `IDAP-AG-${String(
        randomNumber
      ).padStart(6, "0")}`;

    const newAgent = {
      id: passportId,
      name: form.name.trim(),
      type: form.type,
      owner: form.owner.trim(),
      description:
        form.description.trim(),
      trustScore,
      status: "Under Review",

      risk:
        form.dataAccess ===
          "Restricted" ||
        form.capabilities.includes(
          "Payment"
        )
          ? "High"
          : trustScore >= 80
          ? "Low"
          : "Medium",

      capabilities:
        form.capabilities,

      authMethod:
        form.authMethod,

      dataAccess:
        form.dataAccess,

      environment:
        form.environment,

      humanApproval:
        form.humanApproval,

      protections: {
        promptInjection:
          form.promptInjection,

        intentLock:
          form.intentLock,

        behavioralMonitoring:
          form.behavioralMonitoring,
      },
    };

    setCreatedId(passportId);
    onRegistered(newAgent);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="agent-form-overlay">
        <div className="registration-success">
          <div className="success-check">
            <CheckIcon />
          </div>

          <span className="modal-kicker">
            AGENT PASSPORT CREATED
          </span>

          <h2>
            Registration submitted
          </h2>

          <p>
            The agent identity has been
            created and placed into
            verification before protected
            access is granted.
          </p>

          <div className="created-passport">
            <span>Passport ID</span>

            <strong>
              {createdId}
            </strong>
          </div>

          <div className="registration-next">
            <div>
              <strong>
                Next security step
              </strong>

              <span>
                Verify identity → review
                permissions → activate
                protected access
              </span>
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="agent-form-overlay"
      onMouseDown={onClose}
    >
      <div
        className="agent-form-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="agent-form-header">
          <div>
            <span className="modal-kicker">
              AGENT PASSPORT REGISTRATION
            </span>

            <h2>
              Register a new AI agent
            </h2>

            <p>
              Create a controlled digital
              identity before this agent can
              access protected resources.
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="registration-security-banner">
          <div className="registration-security-icon">
            <ShieldIcon />
          </div>

          <div>
            <strong>
              Registration is the first
              security boundary
            </strong>

            <span>
              AgentPassport records who owns
              the agent, what it can do, how
              it authenticates and which
              protections must be active.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* BASIC IDENTITY */}

          <div className="form-section">
            <div className="form-section-title">
              <span>01</span>

              <div>
                <h3>
                  Agent identity
                </h3>

                <p>
                  Tell AgentPassport exactly
                  what this agent is and who
                  is responsible for it.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <FormField
                label="Agent Name"
                required
                error={errors.name}
              >
                <input
                  value={form.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Finance Agent"
                />
              </FormField>

              <FormField
                label="Agent Type"
                required
              >
                <select
                  value={form.type}
                  onChange={(event) =>
                    updateField(
                      "type",
                      event.target.value
                    )
                  }
                >
                  <option>
                    AI Agent
                  </option>
                  <option>
                    Assistant Agent
                  </option>
                  <option>
                    Automation Agent
                  </option>
                  <option>
                    Research Agent
                  </option>
                  <option>
                    Workflow Agent
                  </option>
                </select>
              </FormField>

              <FormField
                label="Owner / Organization"
                required
                error={errors.owner}
              >
                <input
                  value={form.owner}
                  onChange={(event) =>
                    updateField(
                      "owner",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Finance Department"
                />
              </FormField>

              <FormField
                label="Security Contact"
                required
                error={
                  errors.emergencyContact
                }
              >
                <input
                  value={
                    form.emergencyContact
                  }
                  onChange={(event) =>
                    updateField(
                      "emergencyContact",
                      event.target.value
                    )
                  }
                  placeholder="security@company.com"
                />
              </FormField>

              <div className="form-field full">
                <label>
                  What does this agent do?
                  <span>*</span>
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe the agent's responsibility, purpose and expected workflow..."
                  rows="4"
                />

                {errors.description && (
                  <small className="field-error">
                    {errors.description}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* CAPABILITIES */}

          <div className="form-section">
            <div className="form-section-title">
              <span>02</span>

              <div>
                <h3>
                  Capabilities & access
                </h3>

                <p>
                  Only select capabilities
                  the agent genuinely needs.
                </p>
              </div>
            </div>

            <div className="capability-selection">
              {capabilityOptions.map(
                (capability) => (
                  <label
                    key={capability}
                    className={`capability-option ${
                      form.capabilities.includes(
                        capability
                      )
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.capabilities.includes(
                        capability
                      )}
                      onChange={() =>
                        toggleCapability(
                          capability
                        )
                      }
                    />

                    <span className="fake-checkbox">
                      ✓
                    </span>

                    <span>
                      {capability}
                    </span>
                  </label>
                )
              )}
            </div>

            {errors.capabilities && (
              <small className="field-error">
                {errors.capabilities}
              </small>
            )}

            <div className="form-grid compact">
              <FormField
                label="Data Access Level"
                required
              >
                <select
                  value={form.dataAccess}
                  onChange={(event) =>
                    updateField(
                      "dataAccess",
                      event.target.value
                    )
                  }
                >
                  <option>
                    Public
                  </option>
                  <option>
                    Internal
                  </option>
                  <option>
                    Confidential
                  </option>
                  <option>
                    Restricted
                  </option>
                </select>
              </FormField>

              <FormField
                label="Environment"
                required
              >
                <select
                  value={form.environment}
                  onChange={(event) =>
                    updateField(
                      "environment",
                      event.target.value
                    )
                  }
                >
                  <option>
                    Development
                  </option>
                  <option>
                    Staging
                  </option>
                  <option>
                    Production
                  </option>
                </select>
              </FormField>
            </div>
          </div>
                    {/* AUTHENTICATION */}

          <div className="form-section">
            <div className="form-section-title">
              <span>03</span>

              <div>
                <h3>Authentication</h3>

                <p>
                  How should AgentPassport verify that
                  the agent making a request is really
                  this registered agent?
                </p>
              </div>
            </div>

            <div className="auth-options">
              {[
                {
                  value: "Signed Requests",
                  title: "Signed Requests",
                  description:
                    "Requests are cryptographically signed before verification.",
                },
                {
                  value: "mTLS",
                  title: "mTLS",
                  description:
                    "Mutual TLS provides certificate-based identity verification.",
                },
                {
                  value: "OAuth 2.0",
                  title: "OAuth 2.0",
                  description:
                    "Token-based authentication for supported integrations.",
                },
                {
                  value: "API Key",
                  title: "API Key",
                  description:
                    "Simple credential-based authentication.",
                },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`auth-option ${
                    form.authMethod === method.value
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="authMethod"
                    value={method.value}
                    checked={
                      form.authMethod ===
                      method.value
                    }
                    onChange={(e) =>
                      updateField(
                        "authMethod",
                        e.target.value
                      )
                    }
                  />

                  <span className="radio-dot"></span>

                  <div>
                    <strong>{method.title}</strong>

                    <small>
                      {method.description}
                    </small>
                  </div>
                </label>
              ))}
            </div>

            {errors.authMethod && (
              <small className="field-error">
                {errors.authMethod}
              </small>
            )}
          </div>

          {/* SECURITY CONTROLS */}

          <div className="form-section">
            <div className="form-section-title">
              <span>04</span>

              <div>
                <h3>Security controls</h3>

                <p>
                  These controls protect the agent after
                  registration.
                </p>
              </div>
            </div>

            <div className="security-toggle-list">
              <SecurityToggle
                title="Prompt Injection Protection"
                description="Detect suspicious instructions attempting to manipulate the agent."
                checked={form.promptInjection}
                onChange={(value) =>
                  updateField(
                    "promptInjection",
                    value
                  )
                }
              />

              <SecurityToggle
                title="Cryptographic Intent Lock"
                description="Validate that a sensitive action matches the approved intent."
                checked={form.intentLock}
                onChange={(value) =>
                  updateField(
                    "intentLock",
                    value
                  )
                }
              />

              <SecurityToggle
                title="Behavioral Monitoring"
                description="Monitor behavior and detect unusual activity over time."
                checked={
                  form.behavioralMonitoring
                }
                onChange={(value) =>
                  updateField(
                    "behavioralMonitoring",
                    value
                  )
                }
              />

              <SecurityToggle
                title="Human approval for sensitive actions"
                description="Require a human decision before high-impact actions such as payments or restricted data access."
                checked={form.humanApproval}
                onChange={(value) =>
                  updateField(
                    "humanApproval",
                    value
                  )
                }
              />
            </div>
          </div>

          {/* ACKNOWLEDGEMENT */}

          <div className="registration-warning">
            <div className="warning-icon">
              !
            </div>

            <div>
              <strong>
                Least-privilege requirement
              </strong>

              <p>
                Registering an agent does not
                automatically give it access to
                protected resources. Permissions must
                be explicitly approved through
                AgentPassport policies.
              </p>
            </div>
          </div>

          <label className="acknowledgement">
            <input
              type="checkbox"
              checked={form.acknowledgement}
              onChange={(e) =>
                updateField(
                  "acknowledgement",
                  e.target.checked
                )
              }
            />

            <span className="fake-checkbox">
              ✓
            </span>

            <span>
              I confirm that this agent is authorized
              by the stated owner and that its
              requested capabilities are required for
              its intended business purpose.
            </span>
          </label>

          {errors.acknowledgement && (
            <small className="field-error">
              {errors.acknowledgement}
            </small>
          )}

          <div className="registration-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
            >
              Register Agent →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   FORM FIELD
   ========================================================= */

function FormField({
  label,
  required,
  error,
  children,
}) {
  return (
    <div className="form-field">
      <label>
        {label}

        {required && <span>*</span>}
      </label>

      {children}

      {error && (
        <small className="field-error">
          {error}
        </small>
      )}
    </div>
  );
}

/* =========================================================
   SECURITY TOGGLE
   ========================================================= */

function SecurityToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <label className="security-toggle">
      <div>
        <strong>{title}</strong>

        <span>{description}</span>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
      />

      <span className="toggle-slider"></span>
    </label>
  );
}

/* =========================================================
   AI SECURITY COPILOT
   ========================================================= */

function Copilot() {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const questions = [
    "Why was an agent blocked?",
    "Which agents are risky?",
    "Analyze today's incidents",
    "Explain my security score",
  ];

  const askCopilot = () => {
    if (!question.trim()) {
      return;
    }

    setAnswer(
      "Copilot will analyze AgentPassport security data, agent trust, policies and audit activity here. The AI provider connection will be added in the backend phase."
    );
  };

  return (
    <div className="page">
      <div className="copilot-page">

        <div className="copilot-intro">
          <div className="copilot-logo">
            ✦
          </div>

          <div className="hero-pill">
            <span></span>
            AI SECURITY COPILOT
          </div>

          <h2>
            Security answers,
            <br />
            <em>without the searching.</em>
          </h2>

          <p>
            Ask AgentPassport about your agents,
            permissions, incidents, risks or audit
            activity in plain language.
          </p>
        </div>

        <div className="copilot-card">

          <div className="copilot-header">

            <div className="copilot-avatar">
              ✦
            </div>

            <div>
              <strong>
                AgentPassport Copilot
              </strong>

              <span>
                Security intelligence assistant
              </span>
            </div>

            <div className="copilot-ready">
              <span></span>
              Ready
            </div>
          </div>

          <div className="question-chips">
            {questions.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setQuestion(item)
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="copilot-input">

            <input
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askCopilot();
                }
              }}
              placeholder="Ask your security question..."
            />

            <button
              onClick={askCopilot}
            >
              Send ↗
            </button>
          </div>

          {answer && (
            <div className="copilot-answer">
              <strong>Copilot</strong>

              <p>{answer}</p>
            </div>
          )}

          <div className="copilot-info">
            <span>●</span>

            Copilot will use AgentPassport
            security data to answer.
          </div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   USER GUIDE
   ========================================================= */

function UserGuide() {

  const steps = [
    {
      number: "01",
      title: "Start from the Dashboard",
      description:
        "The Overview page gives you the health of your AI environment.",
    },

    {
      number: "02",
      title: "Register your AI Agent",
      description:
        "Create a digital Agent Passport with identity, ownership, capabilities and security controls before protected access is granted.",
    },

    {
      number: "03",
      title: "Give only required permissions",
      description:
        "Create least-privilege policies. Registering an agent does not automatically give it access.",
    },

    {
      number: "04",
      title: "Let Zero Trust check every action",
      description:
        "Identity, permission, intent and risk are checked before sensitive execution.",
    },

    {
      number: "05",
      title: "Investigate blocked actions",
      description:
        "Review why an action was denied and what security control stopped it.",
    },

    {
      number: "06",
      title: "Handle security incidents",
      description:
        "Investigate suspicious behavior and use emergency controls when necessary.",
    },

    {
      number: "07",
      title: "Review the Audit Trail",
      description:
        "Review important agent actions and security decisions.",
    },

    {
      number: "08",
      title: "Verify blockchain records",
      description:
        "Important audit records can later be anchored to blockchain for tamper-evidence.",
    },

    {
      number: "09",
      title: "Ask the AI Security Copilot",
      description:
        "Ask security questions in plain language instead of manually searching through records.",
    },
  ];

  const [activeStep, setActiveStep] =
    useState(0);

  const step = steps[activeStep];

  return (
    <div className="page">

      <div className="guide-page">

        <div className="guide-intro">

          <div className="guide-logo">
            ?
          </div>

          <div className="hero-pill">
            <span></span>
            QUICK START
          </div>

          <h2>
            Learn AgentPassport
            <br />
            <em>step by step.</em>
          </h2>

          <p>
            New to AgentPassport? Follow this
            guided walkthrough.
          </p>

        </div>

        <div className="guide-progress">

          <div className="progress-top">

            <span>
              Step {activeStep + 1} of{" "}
              {steps.length}
            </span>

            <strong>
              {Math.round(
                ((activeStep + 1) /
                  steps.length) *
                  100
              )}
              %
            </strong>

          </div>

          <div className="progress-bar">
            <span
              style={{
                width: `${
                  ((activeStep + 1) /
                    steps.length) *
                  100
                }%`,
              }}
            ></span>
          </div>

        </div>

        <div className="guide-layout">

          <div className="guide-navigation">

            {steps.map((item, index) => (
              <button
                key={item.number}
                className={
                  index === activeStep
                    ? "guide-nav active"
                    : "guide-nav"
                }
                onClick={() =>
                  setActiveStep(index)
                }
              >
                <span>
                  {item.number}
                </span>

                <div>
                  <strong>
                    {item.title}
                  </strong>

                  {index === activeStep && (
                    <small>
                      Current step
                    </small>
                  )}
                </div>
              </button>
            ))}

          </div>

          <div className="guide-content-card">

            <div className="guide-step-number">
              {step.number}
            </div>

            <div className="guide-content">

              <span className="guide-kicker">
                STEP {activeStep + 1}
              </span>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.description}
              </p>

              <div className="guide-buttons">

                <button
                  className="guide-prev"
                  disabled={
                    activeStep === 0
                  }
                  onClick={() =>
                    setActiveStep(
                      (current) =>
                        Math.max(
                          0,
                          current - 1
                        )
                    )
                  }
                >
                  ← Previous
                </button>

                {activeStep <
                steps.length - 1 ? (
                  <button
                    className="guide-next"
                    onClick={() =>
                      setActiveStep(
                        (current) =>
                          Math.min(
                            steps.length - 1,
                            current + 1
                          )
                      )
                    }
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    className="guide-next"
                    onClick={() =>
                      setActiveStep(0)
                    }
                  >
                    Restart Guide ↻
                  </button>
                )}

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODULE PAGE
   ========================================================= */

function ModulePage({
  icon,
  label,
  title,
  description,
}) {
  return (
    <div className="page">

      <div className="module-page">

        <div className="module-icon">
          {icon}
        </div>

        <div className="hero-pill">
          <span></span>
          {label}
        </div>

        <h2>{title}</h2>

        <p>{description}</p>

        <div className="module-ready">
          <span></span>
          Module foundation ready
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   APP LAYOUT
   ========================================================= */

function AppLayout() {

  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [theme, setTheme] =
    useState(
      () =>
        localStorage.getItem(
          "agentpassport-theme"
        ) || "light"
    );

  const [agents, setAgents] =
    useState(initialAgents);

  const [showRegister, setShowRegister] =
    useState(false);

  const [lastCreatedId, setLastCreatedId] =
    useState("");

  useEffect(() => {

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "agentpassport-theme",
      theme
    );

  }, [theme]);

  const toggleTheme = () => {

    setTheme((current) =>
      current === "light"
        ? "dark"
        : "light"
    );

  };

  const registerAgent = (agent) => {

    setAgents((current) => [
      ...current,
      agent,
    ]);

    setLastCreatedId(agent.id);
  };

  const updateAgent = (
    id,
    changes
  ) => {

    setAgents((current) =>
      current.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              ...changes,
            }
          : agent
      )
    );

  };

  return (
    <div className="app">

      {/* MOBILE OVERLAY */}

      <div
        className={`mobile-overlay ${
          mobileOpen ? "show" : ""
        }`}
        onClick={() =>
          setMobileOpen(false)
        }
      ></div>

      {/* MOBILE SIDEBAR */}

      <div
        className={`mobile-sidebar ${
          mobileOpen ? "open" : ""
        }`}
      >
        <Sidebar
          collapsed={false}
          setCollapsed={() =>
            setMobileOpen(false)
          }
        />
      </div>

      {/* DESKTOP SIDEBAR */}

      <div className="desktop-sidebar">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      <main
        className={`main ${
          collapsed ? "expanded" : ""
        }`}
      >

        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          onMobileMenu={() =>
            setMobileOpen(true)
          }
        />

        <Routes>

          {/* DASHBOARD */}

          <Route
            path="/"
            element={
              <Dashboard
                agents={agents}
                onRegister={() =>
                  setShowRegister(true)
                }
              />
            }
          />

          {/* AGENTS */}

          <Route
            path="/agents"
            element={
              <AgentFleet
                agents={agents}
                onRegister={() =>
                  setShowRegister(true)
                }
                onUpdateAgent={
                  updateAgent
                }
              />
            }
          />

          {/* SECURITY */}

          <Route
            path="/security"
            element={
              <ModulePage
                icon="◉"
                label="ZERO-TRUST SECURITY"
                title="Security Center"
                description="Identity verification, intent validation, risk analysis, prompt injection protection and emergency controls."
              />
            }
          />

          {/* POLICIES */}

          <Route
            path="/policies"
            element={
              <ModulePage
                icon="◇"
                label="ACCESS CONTROL"
                title="Security Policies"
                description="Create permission and deny rules that define exactly what every AI agent can access."
              />
            }
          />

          {/* AUDIT */}

          <Route
            path="/audit"
            element={
              <ModulePage
                icon="▤"
                label="SECURITY AUDIT"
                title="Audit Trail"
                description="Review agent actions, security decisions, incidents and blockchain verification records."
              />
            }
          />

          {/* COPILOT */}

          <Route
            path="/copilot"
            element={<Copilot />}
          />

          {/* SETTINGS */}

          <Route
            path="/settings"
            element={
              <ModulePage
                icon="⚙"
                label="CONFIGURATION"
                title="Settings"
                description="Configure application, security and AI provider settings."
              />
            }
          />

          {/* HELP */}

          <Route
            path="/help"
            element={<UserGuide />}
          />

        </Routes>

      </main>

      {/* REGISTER AGENT MODAL */}

      {showRegister && (
        <RegisterAgent
          onClose={() =>
            setShowRegister(false)
          }
          onRegistered={
            registerAgent
          }
        />
      )}

    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;