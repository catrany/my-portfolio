import { useState, useEffect, useRef } from "react";

const FONTS_URL = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Syne:wght@400;500;600;700;800&display=swap";

// --- SAMPLE DATA (replace with your own) ---
const PROJECTS = [
  {
    id: "eclipse-protocol",
    title: "Eclipse Protocol",
    role: "Game Designer & Developer",
    engine: "Unreal Engine 5",
    year: "2025",
    tags: ["Action RPG", "3D", "Multiplayer"],
    summary: "A cooperative action RPG set in a fractured solar system. Designed core combat loop, progression systems, and boss encounter mechanics.",
    description: "Eclipse Protocol is a 4-player cooperative action RPG where players navigate procedurally connected space stations in a dying solar system. I was responsible for the core combat feel, enemy AI behavior trees, the loot/progression economy, and all boss encounter designs.\n\nThe combat system uses a stamina-based melee foundation with modular ranged attachments, giving players freedom to build hybrid loadouts. Boss encounters were designed around phase-based mechanics that require team coordination.",
    images: [
      { src: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=450&fit=crop", alt: "Eclipse Protocol - Space Station Hub" },
      { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop", alt: "Eclipse Protocol - Combat System" },
      { src: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&h=450&fit=crop", alt: "Eclipse Protocol - Boss Encounter" },
    ],
  },
  {
    id: "paper-towns",
    title: "Paper Towns",
    role: "Solo Developer",
    engine: "Unity",
    year: "2024",
    tags: ["Puzzle", "2D", "Narrative"],
    summary: "A hand-drawn puzzle game about rebuilding a town from origami memories. Designed all puzzles, narrative structure, and paper-fold mechanic.",
    description: "Paper Towns is a contemplative puzzle game where players unfold paper dioramas to reconstruct a grandmother's memories of her hometown. Each level is a single sheet that folds and unfolds to reveal hidden paths, characters, and story fragments.\n\nI handled all aspects of development: puzzle design, narrative scripting, the core fold/unfold mechanic, and art direction. The fold system uses a custom shader that simulates paper creasing and shadow casting in real-time.",
    images: [
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop", alt: "Paper Towns - Village Scene" },
      { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=450&fit=crop", alt: "Paper Towns - Fold Mechanic" },
      { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=450&fit=crop", alt: "Paper Towns - Story Moment" },
    ],
  },
  {
    id: "signal-lost",
    title: "Signal Lost",
    role: "Level Designer",
    engine: "Godot",
    year: "2024",
    tags: ["Horror", "2D", "Game Jam"],
    summary: "48-hour game jam entry. A lo-fi horror game about intercepting corrupted radio signals. Designed all levels and audio-reactive mechanics.",
    description: "Signal Lost was built in 48 hours for Ludum Dare 54. Players tune a radio dial to intercept distorted transmissions, each revealing a fragment of a missing person's last broadcast. The game world distorts based on the frequency you're tuned to.\n\nI designed the level progression, the radio-tuning mechanic, and the audio-reactive environment system where static and signal clarity affect visibility and enemy behavior. The game placed in the top 5% for atmosphere.",
    images: [
      { src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop", alt: "Signal Lost - Radio Interface" },
      { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=450&fit=crop", alt: "Signal Lost - Distorted World" },
    ],
  },
  {
    id: "gridlock",
    title: "Gridlock",
    role: "Systems Designer",
    engine: "Unity",
    year: "2023",
    tags: ["Strategy", "Multiplayer", "Prototype"],
    summary: "A real-time tactics prototype exploring asymmetric multiplayer on a shared grid. Designed faction abilities, map layouts, and balance framework.",
    description: "Gridlock is a 1v1 real-time tactics game where two players share a hex grid but see different information based on their faction. One faction operates through direct vision, the other through sonar-like pulses.\n\nI designed the asymmetric information systems, faction ability kits, map layouts that support both playstyles, and built the initial balance spreadsheet framework. The prototype was used to validate the core asymmetry concept before a planned full production.",
    images: [
      { src: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&h=450&fit=crop", alt: "Gridlock - Hex Grid Overview" },
      { src: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=450&fit=crop", alt: "Gridlock - Faction View" },
      { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop", alt: "Gridlock - Multiplayer Match" },
    ],
  },
];

const PROFILE = {
  name: "Your Name",
  title: "Game Designer & Developer",
  bio: "I design systems that feel good to play. My work focuses on combat feel, puzzle mechanics, and player-driven narratives. I care deeply about the space between intention and interaction — the moments where a player's choice becomes meaningful.\n\nCurrently seeking opportunities in game design, level design, or systems design roles.",
  skills: ["Game Design", "Level Design", "Systems Design", "Prototyping", "Unity", "Unreal Engine", "Godot", "C#", "Blueprints", "GDScript"],
  email: "your.email@example.com",
  links: [
    { label: "itch.io", url: "#" },
    { label: "GitHub", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "Twitter / X", url: "#" },
  ],
};

// --- STYLES ---
const styles = `
  @import url('${FONTS_URL}');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #FAFAF9;
    --surface: #FFFFFF;
    --border: #E8E6E3;
    --text: #1A1A1A;
    --text-secondary: #6B6560;
    --accent: #2A2A2A;
    --accent-hover: #444;
    --tag-bg: #F0EFED;
    --tag-text: #5C5853;
    --radius: 10px;
    --radius-lg: 16px;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --max-width: 1120px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* --- NAV --- */
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(250, 250, 249, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 32px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.03em;
    cursor: pointer;
    color: var(--text);
  }
  .nav-links { display: flex; gap: 8px; }
  .nav-link {
    background: none;
    border: none;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 400;
    color: var(--text-secondary);
    padding: 8px 16px;
    border-radius: 99px;
    cursor: pointer;
    transition: var(--transition);
    letter-spacing: 0.01em;
  }
  .nav-link:hover { color: var(--text); background: var(--tag-bg); }
  .nav-link.active {
    color: var(--text);
    font-weight: 500;
    background: var(--tag-bg);
  }

  /* --- PAGE WRAPPER --- */
  .page {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 48px 32px 96px;
    min-height: calc(100vh - 64px);
  }

  /* --- FADE IN --- */
  .fade-in {
    animation: fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    opacity: 0;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .stagger-1 { animation-delay: 0.05s; }
  .stagger-2 { animation-delay: 0.1s; }
  .stagger-3 { animation-delay: 0.15s; }
  .stagger-4 { animation-delay: 0.2s; }
  .stagger-5 { animation-delay: 0.25s; }
  .stagger-6 { animation-delay: 0.3s; }

  /* --- HOME --- */
  .hero {
    padding: 80px 0 64px;
  }
  .hero-label {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 16px;
  }
  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(40px, 6vw, 64px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.035em;
    color: var(--text);
    max-width: 700px;
  }
  .hero p {
    margin-top: 24px;
    font-size: 17px;
    color: var(--text-secondary);
    max-width: 520px;
    line-height: 1.7;
    font-weight: 300;
  }
  .hero-cta {
    margin-top: 36px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: var(--surface);
    background: var(--accent);
    border: none;
    padding: 12px 28px;
    border-radius: 99px;
    cursor: pointer;
    transition: var(--transition);
    letter-spacing: 0.01em;
  }
  .hero-cta:hover { background: var(--accent-hover); transform: translateY(-1px); }
  .hero-cta svg { transition: transform 0.2s; }
  .hero-cta:hover svg { transform: translateX(3px); }

  /* --- PROJECT GRID --- */
  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }
  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
  }
  .project-card:hover {
    border-color: #D0CEC9;
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
    transform: translateY(-3px);
  }
  .project-card-img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    display: block;
    background: var(--tag-bg);
  }
  .project-card-body { padding: 20px 22px 22px; }
  .project-card-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .project-card-year {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 400;
  }
  .project-card-dot {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: var(--border);
  }
  .project-card-engine {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 400;
  }
  .project-card h3 {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }
  .project-card-role {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 12px;
    font-weight: 400;
  }
  .project-card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag {
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 99px;
    background: var(--tag-bg);
    color: var(--tag-text);
    letter-spacing: 0.01em;
  }

  /* --- PROJECT DETAIL --- */
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 8px 0;
    margin-bottom: 32px;
    transition: var(--transition);
  }
  .back-btn:hover { color: var(--text); }
  .back-btn svg { transition: transform 0.2s; }
  .back-btn:hover svg { transform: translateX(-3px); }

  .detail-header { margin-bottom: 40px; }
  .detail-header h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 12px;
  }
  .detail-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    color: var(--text-secondary);
    font-size: 14px;
    margin-bottom: 16px;
  }
  .detail-meta span { display: flex; align-items: center; gap: 4px; }
  .detail-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .detail-summary {
    font-size: 17px;
    color: var(--text-secondary);
    line-height: 1.7;
    font-weight: 300;
    max-width: 640px;
    margin-top: 20px;
  }

  /* --- IMAGE GALLERY --- */
  .gallery { margin-bottom: 48px; }
  .gallery-main {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: var(--radius-lg);
    display: block;
    background: var(--tag-bg);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: var(--transition);
  }
  .gallery-main:hover { border-color: #D0CEC9; }
  .gallery-thumbs {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
  .gallery-thumb {
    width: 80px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid transparent;
    cursor: pointer;
    opacity: 0.5;
    transition: var(--transition);
    background: var(--tag-bg);
  }
  .gallery-thumb:hover { opacity: 0.8; }
  .gallery-thumb.active {
    opacity: 1;
    border-color: var(--accent);
  }

  .detail-description {
    max-width: 640px;
    font-size: 15px;
    line-height: 1.8;
    color: var(--text);
    white-space: pre-line;
  }

  /* --- LIGHTBOX --- */
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    animation: fadeIn 0.2s;
    padding: 40px;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .lightbox-img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
  }
  .lightbox-close {
    position: fixed;
    top: 20px;
    right: 24px;
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    z-index: 201;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .lightbox-close:hover { opacity: 1; }
  .lightbox-nav {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.15);
    border: none;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 201;
    transition: background 0.2s;
  }
  .lightbox-nav:hover { background: rgba(255,255,255,0.3); }
  .lightbox-prev { left: 20px; }
  .lightbox-next { right: 20px; }

  /* --- ABOUT --- */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }
  .about-bio h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 24px;
  }
  .about-bio p {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-secondary);
    white-space: pre-line;
    font-weight: 300;
  }
  .about-sidebar-section { margin-bottom: 36px; }
  .about-sidebar-title {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 14px;
  }
  .skills-list { display: flex; flex-wrap: wrap; gap: 6px; }

  /* --- CONTACT --- */
  .contact-section { max-width: 520px; }
  .contact-section h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .contact-section p {
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 32px;
    font-weight: 300;
  }
  .contact-email {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
    padding: 14px 28px;
    border: 1px solid var(--border);
    border-radius: 99px;
    transition: var(--transition);
    margin-bottom: 32px;
  }
  .contact-email:hover {
    border-color: var(--accent);
    background: var(--tag-bg);
  }
  .contact-links { display: flex; gap: 12px; flex-wrap: wrap; }
  .contact-link {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 99px;
    background: var(--tag-bg);
    transition: var(--transition);
  }
  .contact-link:hover { color: var(--text); background: #E8E6E3; }

  /* --- FOOTER --- */
  .footer {
    border-top: 1px solid var(--border);
    padding: 24px 32px;
    text-align: center;
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 300;
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 768px) {
    .nav-inner { padding: 0 20px; }
    .page { padding: 32px 20px 64px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .project-grid { grid-template-columns: 1fr; }
    .nav-link { padding: 8px 12px; font-size: 13px; }
    .hero { padding: 48px 0 40px; }
  }
`;

// --- ICONS ---
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// --- LIGHTBOX ---
function Lightbox({ images, index, onClose, onNav }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNav]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>&times;</button>
      {images.length > 1 && (
        <>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }}><ChevronLeft /></button>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); onNav(1); }}><ChevronRight /></button>
        </>
      )}
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// --- GALLERY ---
function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const navLightbox = (dir) => {
    setActiveIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div className="gallery">
      <img
        src={images[activeIndex].src}
        alt={images[activeIndex].alt}
        className="gallery-main"
        onClick={() => setLightbox(true)}
      />
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className={`gallery-thumb ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      {lightbox && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setLightbox(false)}
          onNav={navLightbox}
        />
      )}
    </div>
  );
}

// --- PAGES ---
function HomePage({ onNavigate }) {
  return (
    <div className="page fade-in" key="home">
      <div className="hero">
        <div className="hero-label fade-in stagger-1">Game Designer & Developer</div>
        <h1 className="fade-in stagger-2">{PROFILE.name}</h1>
        <p className="fade-in stagger-3">
          I design systems, mechanics, and experiences for games. Explore my projects below.
        </p>
        <button className="hero-cta fade-in stagger-4" onClick={() => onNavigate("projects")}>
          View Projects <ArrowRight />
        </button>
      </div>

      <div className="section-header fade-in stagger-5">
        <span className="section-title">Featured Projects</span>
      </div>
      <div className="project-grid">
        {PROJECTS.slice(0, 3).map((p, i) => (
          <div
            key={p.id}
            className={`project-card fade-in stagger-${i + 3}`}
            onClick={() => onNavigate("project", p.id)}
          >
            <img src={p.images[0].src} alt={p.images[0].alt} className="project-card-img" />
            <div className="project-card-body">
              <div className="project-card-meta">
                <span className="project-card-year">{p.year}</span>
                <span className="project-card-dot" />
                <span className="project-card-engine">{p.engine}</span>
              </div>
              <h3>{p.title}</h3>
              <div className="project-card-role">{p.role}</div>
              <div className="project-card-tags">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPage({ onNavigate }) {
  return (
    <div className="page fade-in" key="projects">
      <div className="hero" style={{ padding: "48px 0 40px" }}>
        <div className="hero-label fade-in stagger-1">Portfolio</div>
        <h1 className="fade-in stagger-2" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>All Projects</h1>
        <p className="fade-in stagger-3">A collection of games, prototypes, and jam entries I've worked on.</p>
      </div>
      <div className="project-grid">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className={`project-card fade-in stagger-${Math.min(i + 2, 6)}`}
            onClick={() => onNavigate("project", p.id)}
          >
            <img src={p.images[0].src} alt={p.images[0].alt} className="project-card-img" />
            <div className="project-card-body">
              <div className="project-card-meta">
                <span className="project-card-year">{p.year}</span>
                <span className="project-card-dot" />
                <span className="project-card-engine">{p.engine}</span>
              </div>
              <h3>{p.title}</h3>
              <div className="project-card-role">{p.role}</div>
              <div className="project-card-tags">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailPage({ projectId, onNavigate }) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return <div className="page"><p>Project not found.</p></div>;

  return (
    <div className="page fade-in" key={`project-${projectId}`}>
      <button className="back-btn" onClick={() => onNavigate("projects")}>
        <ArrowLeft /> Back to Projects
      </button>
      <div className="detail-header fade-in stagger-1">
        <h1>{project.title}</h1>
        <div className="detail-meta">
          <span>{project.role}</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>{project.engine}</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>{project.year}</span>
        </div>
        <div className="detail-tags">
          {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>

      <div className="fade-in stagger-2">
        <ImageGallery images={project.images} />
      </div>

      <div className="fade-in stagger-3">
        <div className="section-header" style={{ marginBottom: 16 }}>
          <span className="section-title">About This Project</span>
        </div>
        <div className="detail-description">{project.description}</div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page fade-in" key="about">
      <div className="about-grid">
        <div className="about-bio fade-in stagger-1">
          <h1>About Me</h1>
          <p>{PROFILE.bio}</p>
        </div>
        <div className="fade-in stagger-3">
          <div className="about-sidebar-section">
            <div className="about-sidebar-title">Skills & Tools</div>
            <div className="skills-list">
              {PROFILE.skills.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
          <div className="about-sidebar-section">
            <div className="about-sidebar-title">Links</div>
            <div className="contact-links">
              {PROFILE.links.map((l) => (
                <a key={l.label} href={l.url} className="contact-link" target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page fade-in" key="contact">
      <div className="contact-section">
        <h1 className="fade-in stagger-1">Get in Touch</h1>
        <p className="fade-in stagger-2">
          I'm currently open to game design, level design, and systems design roles. Feel free to reach out — I'd love to chat about games.
        </p>
        <div className="fade-in stagger-3">
          <a href={`mailto:${PROFILE.email}`} className="contact-email">
            {PROFILE.email}
          </a>
        </div>
        <div className="fade-in stagger-4" style={{ marginTop: 24 }}>
          <div className="about-sidebar-title" style={{ marginBottom: 14 }}>Elsewhere</div>
          <div className="contact-links">
            {PROFILE.links.map((l) => (
              <a key={l.label} href={l.url} className="contact-link" target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- APP ---
export default function App() {
  const [page, setPage] = useState("home");
  const [projectId, setProjectId] = useState(null);

  const navigate = (target, id) => {
    if (target === "project") {
      setPage("project");
      setProjectId(id);
    } else {
      setPage(target);
      setProjectId(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activePage = page === "project" ? "projects" : page;

  return (
    <>
      <style>{styles}</style>
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo" onClick={() => navigate("home")}>{PROFILE.name}</span>
          <div className="nav-links">
            {[
              ["home", "Home"],
              ["projects", "Projects"],
              ["about", "About"],
              ["contact", "Contact"],
            ].map(([key, label]) => (
              <button
                key={key}
                className={`nav-link ${activePage === key ? "active" : ""}`}
                onClick={() => navigate(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "projects" && <ProjectsPage onNavigate={navigate} />}
      {page === "project" && <ProjectDetailPage projectId={projectId} onNavigate={navigate} />}
      {page === "about" && <AboutPage />}
      {page === "contact" && <ContactPage />}

      <footer className="footer">
        &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </footer>
    </>
  );
}