import { useState, useEffect } from "react";

const FONTS_URL = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Syne:wght@400;500;600;700;800&display=swap";

// --- YOUR DATA (swap in your own images!) ---
const PROJECTS = [
  {
    id: "what-remains-of-me",
    title: "What Remains of Me",
    role: "Project Manager, Character Artist & Animator",
    tools: "Unity, Aseprite, Photoshop",
    year: "2025",
    tags: ["Narrative", "2D", "Team Project"],
    summary: "Collaborative student game at Northeastern. Led the team as project manager while designing and animating characters to guide player progression.",
    description: "What Remains of Me is a collaborative multi-semester game project developed by a student team at Northeastern University. I served as project manager, coordinating level design and asset implementation across the team.\n\nOn the art side, I designed and animated characters in Aseprite and Photoshop, creating narrative-driven art assets that were implemented into Unity to guide player progression through the story.",
    images: [
      { src: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=450&fit=crop", alt: "What Remains of Me - Screenshot 1" },
      { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop", alt: "What Remains of Me - Screenshot 2" },
    ],
  },
  {
    id: "pigeon-coo-lette",
    title: "Pigeon Coo-lette",
    role: "Sound Designer",
    tools: "Audacity, Unity",
    year: "2025",
    tags: ["Steam Release", "Audio", "Team Project"],
    summary: "Sole sound designer for a Steam-released student game. Created the full soundscape including character interactions, ambience, UI feedback, and gameplay mechanics.",
    description: "Pigeon Coo-lette is a collaborative student-developed game released on Steam. As the sole sound designer, I was responsible for the complete audio experience.\n\nI designed and implemented the full soundscape using Audacity and curated sound assets — covering character interactions, environmental ambience, UI feedback sounds, and gameplay mechanic audio. The goal was to create a cohesive audio identity that supported the game's tone and feel.",
    images: [
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop", alt: "Pigeon Coo-lette - Screenshot 1" },
      { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=450&fit=crop", alt: "Pigeon Coo-lette - Screenshot 2" },
    ],
  },
  {
    id: "cougar-guesser",
    title: "CougarGuesser",
    role: "Art & UI Designer",
    tools: "HTML, CSS, JavaScript",
    year: "2023",
    tags: ["Browser Game", "UI/UX", "Team Project"],
    summary: "Art and UI designer for a GeoGuessr-inspired browser game. Designed a custom architectural map and the full visual interface.",
    description: "CougarGuesser is a browser-based location guessing game inspired by GeoGuessr, developed collaboratively using HTML, CSS, and JavaScript.\n\nI designed a custom architectural map using a line-art style based on floor plans and aerial imagery, created the start menu interface, and built out the visual layout for the interactive gameplay experience.",
    images: [
      { src: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&h=450&fit=crop", alt: "CougarGuesser - Screenshot 1" },
      { src: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=450&fit=crop", alt: "CougarGuesser - Screenshot 2" },
    ],
  },
];

const EXPERIENCE = [
  {
    title: "Games Staff",
    org: "The Huntington News",
    period: "2026 – Present",
    description: "Construct and develop crossword puzzles for Northeastern's official student newspaper. Launched and manage a new weekend crossword format.",
  },
  {
    title: "Intern",
    org: "MichaStocks — MASYZ Media Group",
    period: "2023 – Present",
    description: "Provide technical support for YouTube channel, moderate Discord server (10k+ users), manage subscriptions, and support course website design and launch.",
  },
  {
    title: "STEM Instructor",
    org: "Little Ivy Academy",
    period: "Summer 2024 & 2025",
    description: "Lead instructor for students aged 8–13, teaching game development, robotics programming, and digital design. Adapted curriculum for diverse skill levels.",
  },
];

// --- CROSSWORD DATA ---
const HUNTINGTON_CROSSWORDS = [
  { date: "Feb 27, 2026", url: "https://huntnewsnu.com/91727/crossword/mini-crossword-february-28th-2026/" },
  { date: "Feb 20, 2026", url: "https://huntnewsnu.com/91486/crossword/mini-crossword-february-20th-2026/" },
  { date: "Feb 13, 2026", url: "https://huntnewsnu.com/91289/crossword/mini-crossword-february-13th-2026/" },
  { date: "Jan 30, 2026", url: "https://huntnewsnu.com/90988/crossword/mini-crossword-january-30th-2026/" },
  { date: "Jan 23, 2026", url: "https://huntnewsnu.com/90859/crossword/mini-crossword-january-23rd-2026/" },
];
const HUNTINGTON_ARCHIVE_URL = "https://huntnewsnu.com/staff_name/yonatan-catran/";

const FAVORITE_CROSSWORDS = [
  { title: "🤔 😕 🙂", url: "https://crosshare.org/crosswords/oJryJd7VOZ6ANfU92yCK" },
  { title: "2nd Cryptic ✌️", url: "https://crosshare.org/crosswords/oNsGnoBl7AGllf1ptlLf/2nd-cryptic" },
  { title: "A Little Off-Putting 😬", url: "https://crosshare.org/crosswords/fqPxwVPAfJ6bXDerg7Z4/a-little-off-putting" },
];

const PROFILE = {
  name: "Yonatan Catran",
  title: "Computer Science & Game Development",
  school: "Northeastern University",
  bio: "I'm a Computer Science and Game Development student at Northeastern University with a passion for building interactive experiences. My work spans game design, character art and animation, sound design, and UI/UX — I love being involved in every layer of what makes a game feel right.\n\nI'm driven by the details: the weight of a character's movement, the timing of a sound effect, the flow of a menu. I believe great games are built at the intersection of technical skill and creative intent.",
  skills: {
    languages: ["Java", "C++", "Python", "Swift", "JavaScript", "HTML/CSS"],
    programs: ["Unity", "Git", "VS Code", "IntelliJ", "Trello", "Jira"],
    art: ["Photoshop", "Aseprite", "Illustrator", "InDesign", "Figma", "Animate"],
  },
  email: "Yonatan.catran@gmail.com",
  phone: "(201) 755-5271",
  location: "Boston, MA",
  availability: "July – December 2026",
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/yonatan-catran" },
    { label: "GitHub", url: "#" },
    { label: "itch.io", url: "#" },
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
    --max-width: 100%;
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
  .nav-links { display: flex; gap: 6px; }
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
  .stagger-7 { animation-delay: 0.35s; }
  .stagger-8 { animation-delay: 0.4s; }

  /* --- HOME --- */
  .hero { padding: 80px 0 64px; }
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

  /* --- SECTION --- */
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

  /* --- PROJECT GRID --- */
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

  /* --- EXPERIENCE CARDS --- */
  .exp-list { display: flex; flex-direction: column; gap: 16px; }
  .exp-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px 28px;
    transition: var(--transition);
  }
  .exp-card:hover {
    border-color: #D0CEC9;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  }
  .exp-card-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
    flex-wrap: wrap;
    gap: 8px;
  }
  .exp-card h3 {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .exp-card-period {
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 400;
  }
  .exp-card-org {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 10px;
    font-weight: 400;
  }
  .exp-card p {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    font-weight: 300;
  }

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
  .about-sidebar-section { margin-bottom: 32px; }
  .about-sidebar-title {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }
  .skills-list { display: flex; flex-wrap: wrap; gap: 6px; }

  /* --- CROSSWORD PAGE --- */
  .crossword-list { display: flex; flex-direction: column; gap: 0; }
  .crossword-row {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
  }
  .crossword-row:first-child { border-top: 1px solid var(--border); }
  .crossword-date {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    min-width: 140px;
    flex-shrink: 0;
  }
  .crossword-divider {
    width: 1px;
    height: 20px;
    background: var(--border);
    margin: 0 20px;
    flex-shrink: 0;
  }
  .crossword-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-secondary);
    text-decoration: none;
    transition: var(--transition);
  }
  .crossword-link:hover { color: var(--text); }
  .crossword-older {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 16px 0;
    transition: var(--transition);
  }
  .crossword-older:hover { color: var(--text); }
  .crossword-older svg { transition: transform 0.2s; }
  .crossword-older:hover svg { transform: translateX(3px); }
  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
  .favorite-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px 24px;
    transition: var(--transition);
    text-decoration: none;
    color: var(--text);
    display: block;
  }
  .favorite-card:hover {
    border-color: #D0CEC9;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    transform: translateY(-2px);
  }
  .favorite-card h3 {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }
  .favorite-card span {
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 400;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  /* --- RESUME & CONTACT --- */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }
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
  .contact-detail {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 8px;
    font-weight: 300;
  }
  .contact-detail strong {
    font-weight: 500;
    color: var(--text);
    margin-right: 8px;
  }
  .resume-btn {
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
    text-decoration: none;
    margin-top: 8px;
  }
  .resume-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

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
    .nav-inner { padding: 0 16px; }
    .nav-links { gap: 2px; }
    .nav-link { padding: 8px 10px; font-size: 12px; }
    .page { padding: 32px 20px 64px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .project-grid { grid-template-columns: 1fr; }
    .hero { padding: 48px 0 40px; }
    .crossword-date { min-width: 100px; font-size: 13px; }
    .crossword-divider { margin: 0 12px; }
    .favorites-grid { grid-template-columns: 1fr; }
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
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);
const ExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
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
    <div className="page" key="home">
      <div className="hero">
        <div className="hero-label fade-in stagger-1">{PROFILE.title}</div>
        <h1 className="fade-in stagger-2">{PROFILE.name}</h1>
        <p className="fade-in stagger-3">
          Building interactive experiences at the intersection of code, design, and play. CS & Game Development at Northeastern University.
        </p>
        <button className="hero-cta fade-in stagger-4" onClick={() => onNavigate("projects")}>
          View My Work <ArrowRight />
        </button>
      </div>

      <div className="section-header fade-in stagger-5">
        <span className="section-title">Featured Projects</span>
      </div>
      <div className="project-grid">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className={`project-card fade-in stagger-${Math.min(i + 5, 8)}`}
            onClick={() => onNavigate("project", p.id)}
          >
            <img src={p.images[0].src} alt={p.images[0].alt} className="project-card-img" />
            <div className="project-card-body">
              <div className="project-card-meta">
                <span className="project-card-year">{p.year}</span>
                <span className="project-card-dot" />
                <span className="project-card-engine">{p.tools}</span>
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
    <div className="page" key="projects">
      <div className="hero" style={{ padding: "48px 0 40px" }}>
        <div className="hero-label fade-in stagger-1">Portfolio</div>
        <h1 className="fade-in stagger-2" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>Projects & Experience</h1>
        <p className="fade-in stagger-3">Games, prototypes, and professional work.</p>
      </div>

      <div className="section-header fade-in stagger-4">
        <span className="section-title">Projects</span>
      </div>
      <div className="project-grid" style={{ marginBottom: 64 }}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className={`project-card fade-in stagger-${Math.min(i + 4, 8)}`}
            onClick={() => onNavigate("project", p.id)}
          >
            <img src={p.images[0].src} alt={p.images[0].alt} className="project-card-img" />
            <div className="project-card-body">
              <div className="project-card-meta">
                <span className="project-card-year">{p.year}</span>
                <span className="project-card-dot" />
                <span className="project-card-engine">{p.tools}</span>
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

      <div className="section-header fade-in stagger-5">
        <span className="section-title">Experience</span>
      </div>
      <div className="exp-list">
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className={`exp-card fade-in stagger-${Math.min(i + 5, 8)}`}>
            <div className="exp-card-top">
              <h3>{exp.title}</h3>
              <span className="exp-card-period">{exp.period}</span>
            </div>
            <div className="exp-card-org">{exp.org}</div>
            <p>{exp.description}</p>
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
    <div className="page" key={`project-${projectId}`}>
      <button className="back-btn fade-in" onClick={() => onNavigate("projects")}>
        <ArrowLeft /> Back to Projects & Experience
      </button>
      <div className="detail-header fade-in stagger-1">
        <h1>{project.title}</h1>
        <div className="detail-meta">
          <span>{project.role}</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>{project.tools}</span>
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

function CrosswordsPage() {
  return (
    <div className="page" key="crosswords">
      <div className="hero" style={{ padding: "48px 0 40px" }}>
        <div className="hero-label fade-in stagger-1">Puzzles</div>
        <h1 className="fade-in stagger-2" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>My Crosswords</h1>
        <p className="fade-in stagger-3">
          I love making crosswords. Here are some of my favorites, and the ones I've made for The Huntington News.
        </p>
      </div>

      {/* --- Huntington News Minis --- */}
      <div className="section-header fade-in stagger-4">
        <span className="section-title">Huntington News Minis</span>
      </div>
      <div className="crossword-list fade-in stagger-5">
        {HUNTINGTON_CROSSWORDS.map((cw, i) => (
          <div key={i} className="crossword-row">
            <span className="crossword-date">{cw.date}</span>
            <div className="crossword-divider" />
            <a href={cw.url} className="crossword-link" target="_blank" rel="noopener noreferrer">
              Play this puzzle <ExternalLink />
            </a>
          </div>
        ))}
      </div>
      <a href={HUNTINGTON_ARCHIVE_URL} className="crossword-older fade-in stagger-6" target="_blank" rel="noopener noreferrer">
        Older… <ArrowRight />
      </a>

      {/* --- Favorites from Crosshare --- */}
      <div className="section-header fade-in stagger-7" style={{ marginTop: 64 }}>
        <span className="section-title">My Favorites (from Crosshare)</span>
      </div>
      <div className="favorites-grid fade-in stagger-8">
        {FAVORITE_CROSSWORDS.map((cw, i) => (
          <a key={i} href={cw.url} className="favorite-card" target="_blank" rel="noopener noreferrer">
            <h3>{cw.title}</h3>
            <span>Play on Crosshare <ExternalLink /></span>
          </a>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page" key="about">
      <div className="about-grid">
        <div className="about-bio">
          <h1 className="fade-in stagger-1">About Me</h1>
          <p className="fade-in stagger-2">{PROFILE.bio}</p>
        </div>
        <div>
          <div className="about-sidebar-section fade-in stagger-3">
            <div className="about-sidebar-title">Languages</div>
            <div className="skills-list">
              {PROFILE.skills.languages.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
          <div className="about-sidebar-section fade-in stagger-4">
            <div className="about-sidebar-title">Programs & Engines</div>
            <div className="skills-list">
              {PROFILE.skills.programs.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
          <div className="about-sidebar-section fade-in stagger-5">
            <div className="about-sidebar-title">Art & Design</div>
            <div className="skills-list">
              {PROFILE.skills.art.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
          <div className="about-sidebar-section fade-in stagger-6">
            <div className="about-sidebar-title">Education</div>
            <div className="contact-detail"><strong>Northeastern University</strong></div>
            <div className="contact-detail">CS & Game Development — GPA: 3.789</div>
            <div className="contact-detail" style={{ marginTop: 4 }}>2025 Dean's List</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumeContactPage() {
  return (
    <div className="page" key="contact">
      <div className="contact-grid">
        <div className="contact-section">
          <h1 className="fade-in stagger-1">Resume & Contact</h1>
          <p className="fade-in stagger-2">
            I'm available {PROFILE.availability} and open to game design, level design, systems design, and development roles. Let's talk.
          </p>

          <div className="fade-in stagger-3" style={{ marginBottom: 32 }}>
            <div className="about-sidebar-title" style={{ marginBottom: 14 }}>Download Resume</div>
            <a href="#" className="resume-btn" target="_blank" rel="noopener noreferrer">
              <DownloadIcon /> Resume (PDF)
            </a>
          </div>

          <div className="fade-in stagger-4" style={{ marginBottom: 32 }}>
            <div className="about-sidebar-title" style={{ marginBottom: 14 }}>Email</div>
            <a href={`mailto:${PROFILE.email}`} className="contact-email">
              {PROFILE.email}
            </a>
          </div>

          <div className="fade-in stagger-5">
            <div className="about-sidebar-title" style={{ marginBottom: 14 }}>Links</div>
            <div className="contact-links">
              {PROFILE.links.map((l) => (
                <a key={l.label} href={l.url} className="contact-link" target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-in stagger-6">
          <div className="about-sidebar-section">
            <div className="about-sidebar-title">Details</div>
            <div className="contact-detail"><strong>Location</strong> {PROFILE.location}</div>
            <div className="contact-detail"><strong>Availability</strong> {PROFILE.availability}</div>
            <div className="contact-detail"><strong>Phone</strong> {PROFILE.phone}</div>
          </div>
          <div className="about-sidebar-section">
            <div className="about-sidebar-title">Open To</div>
            <div className="skills-list">
              {["Game Design", "Level Design", "Systems Design", "Sound Design", "UI/UX", "Development"].map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
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

  const NAV_ITEMS = [
    ["home", "Home"],
    ["projects", "Projects & Experience"],
    ["crosswords", "My Crosswords"],
    ["about", "About Me"],
    ["contact", "Resume & Contact"],
  ];

  return (
    <>
      <style>{styles}</style>
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo" onClick={() => navigate("home")}>{PROFILE.name}</span>
          <div className="nav-links">
            {NAV_ITEMS.map(([key, label]) => (
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
      {page === "crosswords" && <CrosswordsPage />}
      {page === "about" && <AboutPage />}
      {page === "contact" && <ResumeContactPage />}

      <footer className="footer">
        &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </footer>
    </>
  );
}