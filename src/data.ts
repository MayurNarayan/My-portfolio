export const PROFILE = {
  name: "Mayur Narayan",
  role: "Cybersecurity Specialist",
  role2: "AI-Accelerated Developer",
  location: "Kolkata, West Bengal, IN",
  email: "mknarayan1243@gmail.com",
  github: "https://github.com/MayurNarayan",
  githubLabel: "github.com/MayurNarayan",
  linkedin: "https://linkedin.com/in/mayur-narayan",
  linkedinLabel: "linkedin.com/in/mayur-narayan",
  availability: "OPEN TO WORK",
  university: "Swami Vivekananda University",
  /** Public Google Drive link to the resume. Opens in a new tab. */
  resumeUrl:
    "https://drive.google.com/file/d/1gZvygIk2bB58UPFhjnwKgya88N8nBPG7/view?usp=sharing",
};

/* Status ticker — only verifiable, resume-backed facts */
export const TICKER_ITEMS = [
  { label: "SYSTEM: SECURE", color: "emerald" },
  { label: "TRYHACKME: VERIFIED", color: "cyan" },
  { label: "EMBRIZON TECHNOLOGIES: VERIFIED", color: "emerald" },
  { label: "STATUS: OPEN TO WORK", color: "cyan" },
  { label: "CREDENTIALS: 4/4 VERIFIED", color: "emerald" },
] as const;

export const ARSENAL = {
  security: {
    title: "Cybersecurity & Networking",
    icon: "shield",
    color: "emerald",
    items: [
      { name: "Vulnerability Assessment", desc: "End-to-end VA lifecycle, scanning & triage" },
      { name: "Network Protocols", desc: "TCP/IP · OSI · DNS · HTTP/S" },
      { name: "Linux CLI", desc: "Command-line operations & system fundamentals" },
      { name: "Cryptography Basics", desc: "Symmetric / Asymmetric encryption · Hashing" },
      { name: "Penetration Testing Methodologies", desc: "Structured recon → exploit → report approach" },
    ],
  },
  code: {
    title: "Programming & AI",
    icon: "code",
    color: "cyan",
    items: [
      { name: "Python (AI-Assisted)", desc: "Scripting · Data visualization · AI-assisted debugging" },
      { name: "Prompt Engineering", desc: "LLM workflows & generative AI techniques" },
      { name: "JavaScript", desc: "Core language fundamentals & tooling" },
      { name: "Java", desc: "Object-oriented programming foundations" },
      { name: "HTML5 / CSS3", desc: "Semantic markup & responsive styling" },
    ],
  },
  tools: [
    { name: "Linux", icon: "terminal" },
    { name: "Windows", icon: "monitor" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "TryHackMe", icon: "flag" },
    { name: "VS Code", icon: "code" },
    { name: "IntelliJ IDEA", icon: "cpu" },
  ],
  focus: [
    "Vulnerability Assessment & Reporting",
    "Network Fundamentals (TCP/IP, OSI, DNS)",
    "Risk Classification & Triage",
    "AI-Assisted Development Workflows",
  ],
};

export const EXPERIENCE = {
  company: "Embrizon Technologies",
  role: "Cyber Security Intern",
  period: "2025 · Industrial Training",
  credential: "ET2025IC1632",
  location: "Remote / India",
  summary:
    "Industrial training covering the full vulnerability assessment lifecycle — from asset discovery and security scanning to threat triage, remediation guidance, and executive risk-classification reporting.",
  bullets: [
    {
      title: "Vulnerability Assessment Lifecycle",
      desc: "Participated in scoping targets, running scans, validating findings, and reducing false positives across the assessment lifecycle.",
    },
    {
      title: "Threat Triage & Classification",
      desc: "Classified identified exposures by severity and impact into Critical / High / Medium / Low tiers for reporting.",
    },
    {
      title: "Security Scanning & Enumeration",
      desc: "Performed service enumeration, misconfiguration checks, and identification of common patch and configuration gaps.",
    },
    {
      title: "Remediation Guidance",
      desc: "Documented recommended fixes and hardening steps for identified issues as part of the training deliverables.",
    },
    {
      title: "Executive Risk Reporting",
      desc: "Contributed to summarizing technical findings into risk-classified reports intended for non-technical stakeholders.",
    },
  ],
  stack: ["Vulnerability Assessment", "Risk Classification", "Linux", "Networking", "Reporting", "Threat Triage"],
};

export const CREDENTIALS = [
  {
    id: "embrizon",
    org: "Embrizon Technologies",
    title: "Cyber Security Internship, Project & Training Suite",
    meta: "ISO 9001:2015 · APSCHE · Skill India",
    ids: ["ET2025IC1632", "ET2025PC1632", "ET2025TC1632"],
    accent: "emerald" as const,
    icon: "building",
    desc: "Completion of internship, project, and training components covering vulnerability assessment and security operations fundamentals.",
    skills: ["VA Lifecycle", "Threat Triage", "Risk Reporting"],
    verified: true,
  },
  {
    id: "thm",
    org: "TryHackMe",
    title: "Pre Security Learning Path",
    meta: "19h 10m completed · Network Fundamentals · Web Security · Linux CLI · Cryptography",
    ids: ["THM-J9KROW03JP"],
    accent: "cyan" as const,
    icon: "flag",
    desc: "Guided, hands-on labs covering networking fundamentals, introductory web security, the Linux command line, and basic cryptography.",
    skills: ["TCP/IP", "Linux", "Web Security", "Cryptography"],
    verified: true,
  },
  {
    id: "simplilearn",
    org: "Simplilearn SkillUp",
    title: "Introduction to Prompt Engineering",
    meta: "Generative AI · LLM Workflows",
    ids: ["10717359"],
    accent: "emerald" as const,
    icon: "sparkles",
    desc: "Course covering structured prompting techniques, context design, and evaluation patterns for working with large language models.",
    skills: ["LLMs", "Prompt Design", "Workflows"],
    verified: true,
  },
  {
    id: "aitech",
    org: "AI for Techies",
    title: "Python Using AI Workshop",
    meta: "Data Visualization · AI Debugging · Automated Code Generation",
    ids: ["AIFT-PYAI-2025"],
    accent: "cyan" as const,
    icon: "bot",
    desc: "Applied workshop on AI-accelerated Python development, covering data visualization, AI-assisted debugging, and automated code generation.",
    skills: ["Python", "Visualization", "AI-Assisted Debugging"],
    verified: true,
  },
];

export const EDUCATION = [
  {
    school: "Swami Vivekananda University",
    degree: "BSc (Hons.) in Cyber Security and Advanced Networking",
    period: "2023 — Present",
    location: "Barrackpore, Kolkata",
    desc: "Core coursework in network security, operating systems, cryptography, and secure infrastructure, supplemented by independent lab work and industrial training.",
    tags: ["Network Security", "Linux", "Cryptography", "OS Fundamentals"],
    current: true,
  },
  {
    school: "CBSE Curriculum",
    degree: "Higher Secondary Education (Science)",
    period: "Completed",

    desc: "Foundational studies in mathematics and computer science that preceded specialization in cybersecurity and networking.",
    tags: ["Physics", "Chemistry", "Biology", "Physical Education", "English"],
    current: false,
  },
];

export const TERMINAL_HELP = [
  ["help", "Show available commands"],
  ["whoami", "Identity & current focus"],
  ["skills", "Technical arsenal overview"],
  ["certifications", "Verified credentials & IDs"],
  ["experience", "Embrizon internship summary"],
  ["education", "Academic background"],
  ["contact", "Email & social links"],
  ["resume", "Open the resume / CV link"],
  ["clear", "Clear terminal"],
];

export const RESUME = {
  summary:
    "Entry-level Cybersecurity Specialist and AI-Accelerated Developer with hands-on training in vulnerability assessment, network security fundamentals, and AI-assisted software development. Currently pursuing a BSc (Hons.) in Cyber Security and Advanced Networking.",
};
