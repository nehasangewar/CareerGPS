import { useState, useEffect, useCallback } from "react"

// ─────────────────────────────────────────────────────────────────────────────
// API CONFIG — points to your Spring Boot backend
// ─────────────────────────────────────────────────────────────────────────────
const API = "http://localhost:8080/api"

async function apiCall(path, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" }
  if (token) headers["Authorization"] = `Bearer ${token}`
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || "Request failed")
  }
  return res.json()
}

// ─────────────────────────────────────────────────────────────────────────────
// ROADMAP DATA — full 16-week plans from all 5 career documents
// ─────────────────────────────────────────────────────────────────────────────
const GOALS = {
  "Software Development": {
    emoji: "💻", color: "#3B82F6",
    tagline: "Build systems that power the world",
    what: "Software developers design, build, and maintain applications — from logic-heavy backend systems to full-stack products used by millions.",
    outcomes: ["Software Developer (Generalist)", "Backend Developer", "Full-Stack Developer", "Application Engineer"],
    learn: ["Programming Fundamentals & Logic", "Data Structures & Algorithms", "OOP & Clean Architecture", "Backend APIs (Spring Boot / Node)", "Databases & System Design"],
    domains: ["Product Companies", "Startups", "Freelancing", "Open Source"],
    mindset: "Logical thinker who loves breaking big problems into small solvable pieces. Can sit and think for hours.",
    validation: ["100+ DSA problems solved", "1 DB-integrated backend project", "1 Capstone project built", "Strong OOP understanding", "System design basics", "Placement-ready problem solving"],
    phases: [
      { label: "Phase 1 — Introduction to C", weeks: [1,2,3,4], color: "#22C55E" },
      { label: "Phase 2 — Introduction to Java & OOP", weeks: [5,6,7,8], color: "#F59E0B" },
      { label: "Phase 3 — OOP Deep Dive", weeks: [9,10,11,12], color: "#3B82F6" },
      { label: "Phase 4 — Logic Practice & Mini Project", weeks: [13,14,15,16], color: "#EF4444" }
    ],
weeks: {
      1: { title: "Introduction to C", difficulty: "Easy", tasks: ["Programming basics, C structure & IDE setup", "Variables & Data Types", "Write 10 basic programs (sum, area, swap, etc.)", "☐ 10 programs completed  ☐ Concepts understood"] },
      2: { title: "Operators & Input/Output", difficulty: "Easy", tasks: ["Arithmetic, Relational & Logical operators", "scanf() & printf() usage", "Solve 15 basic logic problems", "☐ Concept Understood  ☐ 15 Coding Problems Completed"] },
      3: { title: "Conditional Statements", difficulty: "Easy", tasks: ["if, if-else, nested if, switch", "Grade calculator program", "Largest of 3 numbers program", "Calculator program  ☐ All 3 programs working  ☐ Switch implemented properly"] },
      4: { title: "Loops", difficulty: "Easy", tasks: ["for, while, do-while loops — break & continue", "Pattern printing program", "Prime number check", "Factorial calculation & Fibonacci series  ☐ All 4 programs working"] },
      5: { title: "Functions", difficulty: "Medium", tasks: ["Function declaration, Call by value, Return types", "Scope of variables", "Solve 10 function-based problems", "☐ 10 problems completed  ☐ Functions working  ☐ Scope errors resolved"] },
      6: { title: "Arrays in C", difficulty: "Medium", tasks: ["1D arrays & 2D arrays, basic operations", "Reverse array program", "Max/Min finder program", "Matrix addition  ☐ Reverse array working  ☐ Max/Min correct  ☐ Matrix addition working"] },
      7: { title: "Introduction to Java", difficulty: "Medium", tasks: ["JVM, JDK, JRE — Java syntax & Data types", "Main method structure", "Write 10 basic Java programs", "☐ 10 programs executed  ☐ No compilation errors  ☐ Syntax understood"] },
      8: { title: "OOP Basics — Classes & Objects", difficulty: "Medium", tasks: ["Class, Object, Methods, Constructors", "Write 3 class-based programs", "☐ 3 programs completed  ☐ Constructors working  ☐ Object usage correct"] },
      9: { title: "Encapsulation", difficulty: "Medium", tasks: ["Private variables, Getters/Setters", "Student class system", "☐ Getters/Setters working  ☐ Data secured  ☐ Program tested"] },
      10: { title: "Inheritance", difficulty: "Medium", tasks: ["Parent-child class, super keyword, Method overriding", "Banking system example", "☐ Inheritance working  ☐ Overriding verified  ☐ Banking example functional"] },
      11: { title: "Polymorphism", difficulty: "Hard", tasks: ["Method overloading & overriding", "Differentiate compile vs runtime polymorphism", "5 OOP examples", "☐ 5 examples completed  ☐ Output verified  ☐ Concepts clear"] },
      12: { title: "Java Arrays & Strings", difficulty: "Hard", tasks: ["Arrays in Java, String methods, Problem solving", "Solve 15 problems", "☐ 15 problems solved  ☐ Correct outputs produced  ☐ Programs tested"] },
      13: { title: "Logic Practice", difficulty: "Hard", tasks: ["Mixed problems — loops, conditions, arrays", "Solve 15 mixed problems", "☐ 15 problems completed  ☐ Independent solutions  ☐ Code tested"] },
      14: { title: "Advanced Practice", difficulty: "Hard", tasks: ["Time-based solving & Optimization", "Solve 20 problems", "☐ 20 problems solved  ☐ Time tracked  ☐ Optimized solutions written"] },
      15: { title: "Mini Project", difficulty: "Hard", tasks: ["Project planning & development", "Build console-based project", "☐ Project completed  ☐ Features working  ☐ Code structured properly"] },
      16: { title: "Finalization & GitHub", difficulty: "Hard", tasks: ["Code cleanup, Documentation, GitHub usage", "Upload project with README", "☐ Code cleaned  ☐ GitHub repo created  ☐ README written"] }
    }
  },
  "Web Development": {
    emoji: "🌐", color: "#8B5CF6",
    tagline: "Craft experiences the world interacts with",
    what: "Web developers build websites and web apps used by billions — combining design sensibility with frontend and backend engineering.",
    outcomes: ["Frontend Developer", "Full Stack Developer", "Web Application Developer"],
    learn: ["HTML5 & CSS3", "JavaScript (ES6+)", "React.js", "Node.js + Express APIs", "Database + Deployment"],
    domains: ["Agencies", "SaaS Products", "E-commerce", "Freelancing"],
    mindset: "Visual thinker who loves the intersection of design and code. Detail-oriented with a sense for user experience.",
    validation: ["3 Static Websites", "2 JavaScript Projects", "2 React Projects", "1 Full Stack Project", "1 Deployed Production App", "Portfolio Website live"],
    phases: [
      { label: "Phase 1 — HTML & CSS Basics", weeks: [1,2,3,4], color: "#22C55E" },
      { label: "Phase 2 — Layouts & Responsive Design", weeks: [5,6,7,8], color: "#F59E0B" },
      { label: "Phase 3 — Bootstrap & Portfolio", weeks: [9,10,11,12], color: "#3B82F6" },
      { label: "Phase 4 — Hosting & Finalization", weeks: [13,14,15,16], color: "#EF4444" }
    ],
weeks: {
      1: { title: "HTML Basics", difficulty: "Easy", tasks: ["HTML structure, tags, headings, paragraphs, lists", "Create basic webpage layout", "☐ Page created  ☐ Tags correct  ☐ No syntax errors"] },
      2: { title: "Forms & Tables", difficulty: "Easy", tasks: ["Form elements, input types, tables", "Build registration form & data table", "☐ Form working  ☐ Table displayed  ☐ Data aligned"] },
      3: { title: "Semantic HTML", difficulty: "Easy", tasks: ["Header, footer, section, article tags", "Convert page to semantic layout — follow accessibility basics", "☐ Semantic tags used  ☐ Structure improved  ☐ Code validated"] },
      4: { title: "CSS Basics", difficulty: "Easy", tasks: ["Selectors, properties, colors, fonts", "Style webpage properly", "☐ Styling applied  ☐ Layout readable  ☐ No CSS errors"] },
      5: { title: "Box Model", difficulty: "Medium", tasks: ["Margin, padding, border", "Create structured layout", "☐ Spacing correct  ☐ Layout aligned  ☐ Borders applied"] },
      6: { title: "Positioning", difficulty: "Medium", tasks: ["Relative, absolute, fixed positioning", "Create positioned elements layout", "☐ Positioning working  ☐ Overlap handled  ☐ Layout stable"] },
      7: { title: "Flexbox", difficulty: "Medium", tasks: ["Flex container, alignment properties", "Build responsive navbar layout", "☐ Navbar responsive  ☐ Elements aligned  ☐ No overflow"] },
      8: { title: "CSS Grid", difficulty: "Medium", tasks: ["Grid layout system", "Build grid-based homepage", "☐ Grid working  ☐ Items aligned  ☐ Responsive behavior correct"] },
      9: { title: "Responsive Design", difficulty: "Medium", tasks: ["Media queries", "Make website mobile-friendly — test on multiple sizes", "☐ Mobile layout correct  ☐ No overflow issues  ☐ Tested on multiple sizes"] },
      10: { title: "Mini Project 1 — Landing Page", difficulty: "Medium", tasks: ["Apply HTML + CSS fully", "Build landing page", "☐ Landing page built  ☐ Responsive working  ☐ Code clean"] },
      11: { title: "Multi-Page Website", difficulty: "Hard", tasks: ["Navigation & linking pages", "Build 3-page website", "☐ Pages connected  ☐ Navigation correct  ☐ Design consistent"] },
      12: { title: "UI/UX Basics", difficulty: "Hard", tasks: ["Design principles — color harmony, readability", "Improve overall design", "☐ UI improved  ☐ Readability better  ☐ Layout balanced"] },
      13: { title: "Bootstrap Basics", difficulty: "Hard", tasks: ["Bootstrap grid & components", "Build responsive page using Bootstrap", "☐ Bootstrap applied  ☐ Layout responsive  ☐ Components working"] },
      14: { title: "Portfolio Website", difficulty: "Hard", tasks: ["Personal website creation", "Build portfolio website — add projects & make responsive", "☐ Portfolio built  ☐ Projects added  ☐ Responsive tested"] },
      15: { title: "Hosting — GitHub Pages / Netlify", difficulty: "Hard", tasks: ["GitHub Pages & Netlify deployment", "Deploy website", "☐ Site live  ☐ URL working  ☐ No deployment errors"] },
      16: { title: "Finalization & GitHub", difficulty: "Hard", tasks: ["Code optimization & GitHub", "Clean code & update repo", "☐ Code cleaned  ☐ README added  ☐ Repo updated"] }
    }
  },
  "Data Analytics": {
    emoji: "📊", color: "#10B981",
    tagline: "Turn raw numbers into world-changing insights",
    what: "Data analysts extract meaning from datasets to drive decisions in business, finance, and technology. You become the person who tells a company what's actually happening.",
    outcomes: ["Data Analyst", "Business Analyst (Data-focused)", "BI Developer", "Entry-level Data Engineer"],
    learn: ["Python & Excel Basics", "Pandas & NumPy", "Statistics & EDA", "SQL & Database Querying", "Power BI / Tableau Dashboards"],
    domains: ["Finance", "Healthcare", "E-commerce", "Research & Consulting"],
    mindset: "Curious pattern-finder who asks 'why' before 'how'. Comfortable with ambiguity and loves telling stories with data.",
    validation: ["2 Cleaned datasets", "5+ visual reports", "50+ SQL queries solved", "1 BI dashboard built", "2 complete analytics projects", "Kaggle participation", "Resume-ready portfolio"],
    phases: [
      { label: "Phase 1 — Introduction to Data & Excel", weeks: [1,2,3,4], color: "#22C55E" },
      { label: "Phase 2 — Python Basics & Conditions", weeks: [5,6,7,8], color: "#F59E0B" },
      { label: "Phase 3 — NumPy, Pandas & Data Cleaning", weeks: [9,10,11,12], color: "#3B82F6" },
      { label: "Phase 4 — Visualization, Statistics & Project", weeks: [13,14,15,16], color: "#EF4444" }
    ],
weeks: {
      1: { title: "Introduction to Data", difficulty: "Easy", tasks: ["What is data, types of data, data lifecycle", "Identify real-world datasets", "☐ Dataset identified  ☐ Data types explained  ☐ Concepts clear"] },
      2: { title: "Excel Basics", difficulty: "Easy", tasks: ["Rows, columns, formatting, formulas", "Create formatted spreadsheet", "☐ Spreadsheet created  ☐ Formulas working  ☐ Data formatted"] },
      3: { title: "Excel Functions", difficulty: "Easy", tasks: ["SUM, AVERAGE, COUNT, IF functions", "Solve 10 Excel problems", "☐ 10 problems solved  ☐ Correct outputs  ☐ No formula errors"] },
      4: { title: "Data Cleaning in Excel", difficulty: "Easy", tasks: ["Remove duplicates, handle blanks", "Clean sample dataset", "☐ Dataset cleaned  ☐ No duplicates  ☐ Clean copy saved"] },
      5: { title: "Charts in Excel", difficulty: "Medium", tasks: ["Bar, line, pie charts", "Create dashboard-style sheet", "☐ Charts created  ☐ Labels correct  ☐ Insights written"] },
      6: { title: "Introduction to Python", difficulty: "Medium", tasks: ["Python syntax, variables", "Write 15 basic Python programs", "☐ 15 programs done  ☐ No syntax errors  ☐ Output verified"] },
      7: { title: "Python Conditions", difficulty: "Medium", tasks: ["if, elif, else statements", "Solve 10 logic problems", "☐ 10 problems solved  ☐ Cases tested  ☐ Output correct"] },
      8: { title: "Loops in Python", difficulty: "Medium", tasks: ["for, while loops", "Solve pattern & numeric problems", "☐ Loop problems solved  ☐ No infinite loops  ☐ Results verified"] },
      9: { title: "Lists & Dictionaries", difficulty: "Medium", tasks: ["Data structures in Python", "Build student record system", "☐ Record system working  ☐ Data stored properly  ☐ No key errors"] },
      10: { title: "NumPy Basics", difficulty: "Medium", tasks: ["Arrays, mathematical operations", "Perform numerical calculations", "☐ Arrays created  ☐ Operations correct  ☐ Results verified"] },
      11: { title: "Pandas Basics", difficulty: "Hard", tasks: ["DataFrames, CSV import", "Load and explore dataset", "☐ Dataset loaded  ☐ Summary generated  ☐ Columns analyzed"] },
      12: { title: "Data Cleaning in Python", difficulty: "Hard", tasks: ["Handling nulls, filtering", "Clean real dataset", "☐ Data cleaned  ☐ Missing handled  ☐ Clean file saved"] },
      13: { title: "Data Visualization — Matplotlib", difficulty: "Hard", tasks: ["Matplotlib basics, basic plots", "Create graphs from dataset", "☐ Graphs created  ☐ Labels correct  ☐ Patterns explained"] },
      14: { title: "Basic Statistics", difficulty: "Hard", tasks: ["Mean, median, variance", "Analyze dataset metrics", "☐ Metrics calculated  ☐ Comparison done  ☐ Insights written"] },
      15: { title: "Mini Project Planning", difficulty: "Hard", tasks: ["Define analysis project — select dataset & define goal", "☐ Plan documented  ☐ Dataset chosen  ☐ Approach clear"] },
      16: { title: "Mini Project — Data Analysis", difficulty: "Hard", tasks: ["Perform basic data analysis", "Submit data analysis report", "☐ Analysis completed  ☐ Visualizations created  ☐ Report submitted"] }
    }
  },
  "AI/ML": {
    emoji: "🤖", color: "#F59E0B",
    tagline: "Build the intelligence that defines tomorrow",
    what: "AI/ML engineers design and train models that see, speak, decide, and create — powering the next wave of technology.",
    outcomes: ["Machine Learning Engineer (Entry Level)", "AI Developer", "ML-Focused Data Analyst"],
    learn: ["Python & OOP", "Linear Algebra & Calculus", "Statistics & Probability", "ML Algorithms (Scikit-learn)", "Deep Learning (TensorFlow / PyTorch)"],
    domains: ["Big Tech", "AI Startups", "Research Labs", "Autonomous Systems"],
    mindset: "Experimentalist who treats every model as a hypothesis to test. Comfortable with failure — because every failed experiment teaches you something.",
    validation: ["2 ML models built", "1 Deep Learning project", "1 NLP project", "Model deployed locally", "Kaggle competition participated", "GitHub portfolio ready"],
    phases: [
      { label: "Phase 1 — Python Basics & Functions", weeks: [1,2,3,4], color: "#22C55E" },
      { label: "Phase 2 — NumPy & Linear Algebra", weeks: [5,6,7,8], color: "#F59E0B" },
      { label: "Phase 3 — Statistics, Probability & Visualization", weeks: [9,10,11,12], color: "#3B82F6" },
      { label: "Phase 4 — Pandas, Data Cleaning & Mini Project", weeks: [13,14,15,16], color: "#EF4444" }
    ],
weeks: {
      1: { title: "Python Basics", difficulty: "Easy", tasks: ["Variables, data types, input/output", "Write 15 basic Python programs", "☐ 15 programs completed  ☐ No syntax errors  ☐ Output verified"] },
      2: { title: "Operators & Conditions", difficulty: "Easy", tasks: ["Arithmetic & logical operators, if-else", "Solve 10 logic problems", "☐ 10 problems solved  ☐ All cases tested  ☐ Output correct"] },
      3: { title: "Loops", difficulty: "Easy", tasks: ["for, while, nested loops", "Prime, factorial, patterns programs", "☐ Loop problems solved  ☐ Edge cases tested  ☐ No infinite loops"] },
      4: { title: "Functions", difficulty: "Easy", tasks: ["Function definition, parameters, return types", "Solve 10 function-based programs", "☐ Functions working  ☐ Outputs verified  ☐ Scope understood"] },
      5: { title: "Lists & Tuples", difficulty: "Medium", tasks: ["List methods, slicing techniques", "Solve 12 list problems", "☐ 12 problems solved  ☐ Methods used correctly  ☐ Results verified"] },
      6: { title: "Dictionaries", difficulty: "Medium", tasks: ["Key-value pairs, iteration", "Build student record system", "☐ Record system working  ☐ Data stored correctly  ☐ No key errors"] },
      7: { title: "NumPy Basics", difficulty: "Medium", tasks: ["Arrays, matrix operations", "Perform vector operations", "☐ Arrays created  ☐ Operations correct  ☐ No shape mismatch"] },
      8: { title: "Linear Algebra Basics", difficulty: "Medium", tasks: ["Vectors, matrices", "Matrix addition & multiplication", "☐ Matrix operations correct  ☐ Concepts clear  ☐ Solutions verified"] },
      9: { title: "Advanced Linear Algebra", difficulty: "Hard", tasks: ["Determinant, inverse, transpose", "Solve 8 matrix problems", "☐ 8 problems solved  ☐ No computational errors  ☐ Results validated"] },
      10: { title: "Statistics Basics", difficulty: "Hard", tasks: ["Mean, median, variance", "Analyze sample dataset", "☐ Dataset analyzed  ☐ Measures calculated  ☐ Insights written"] },
      11: { title: "Probability Basics", difficulty: "Hard", tasks: ["Probability rules, conditional probability", "Solve 10 probability problems", "☐ 10 problems solved  ☐ Logic correct  ☐ Verified answers"] },
      12: { title: "Data Visualization — Matplotlib", difficulty: "Hard", tasks: ["Matplotlib basics", "Plot graphs from dataset", "☐ Graphs plotted  ☐ Labels correct  ☐ Clear interpretation"] },
      13: { title: "Pandas Basics", difficulty: "Hard", tasks: ["DataFrames, CSV handling", "Load & explore dataset — basic data cleaning", "☐ Dataset loaded  ☐ Missing values handled  ☐ Summary generated"] },
      14: { title: "Data Cleaning", difficulty: "Hard", tasks: ["Handling nulls, duplicates", "Clean real-world dataset", "☐ Data cleaned  ☐ No duplicates  ☐ Clean dataset saved"] },
      15: { title: "Mini Project Planning", difficulty: "Hard", tasks: ["Plan ML-ready dataset project — define simple analytics project", "☐ Plan documented  ☐ Dataset chosen  ☐ Approach clear"] },
      16: { title: "Mini Project — Data Analysis", difficulty: "Hard", tasks: ["Perform data analysis", "Submit basic data analysis report", "☐ Analysis completed  ☐ Visualizations created  ☐ Report submitted"] }
    }
  },
  "Cyber Security": {
    emoji: "🔒", color: "#EF4444",
    tagline: "Defend the systems the world depends on",
    what: "Cybersecurity professionals protect networks, systems, and data from attackers — a field growing faster than any other in tech.",
    outcomes: ["Security Analyst", "SOC Analyst", "Ethical Hacker (Entry Level)", "Security Operations Role"],
    learn: ["Networking & TCP/IP", "Linux & Command Line", "Ethical Hacking (Kali, Nmap)", "Web Security (OWASP)", "Pen Testing & Incident Response"],
    domains: ["Government", "Banking & Finance", "Consulting", "Bug Bounty Hunting"],
    mindset: "Paranoid problem-solver who thinks like both attacker and defender. Finds satisfaction in finding things others miss.",
    validation: ["10+ documented lab practices", "1 vulnerability assessment report", "1 penetration testing project", "Virtual lab setup complete", "Structured security audit", "Resume-ready portfolio"],
    phases: [
      { label: "Phase 1 — Security Basics & Linux", weeks: [1,2,3,4], color: "#22C55E" },
      { label: "Phase 2 — Linux Commands & Networking Tools", weeks: [5,6,7,8], color: "#F59E0B" },
      { label: "Phase 3 — Ethical Hacking & Kali Linux", weeks: [9,10,11,12], color: "#3B82F6" },
      { label: "Phase 4 — Firewall, Policies & Security Lab", weeks: [13,14,15,16], color: "#EF4444" }
    ],
weeks: {
      1: { title: "Introduction to Cyber Security", difficulty: "Easy", tasks: ["CIA triad, types of threats, security basics", "Research common cyber attacks", "☐ Threat types listed  ☐ CIA explained  ☐ Notes prepared"] },
      2: { title: "Computer Networking Basics", difficulty: "Easy", tasks: ["Network types, IP address, MAC address", "Identify IP details of your system", "☐ IP identified  ☐ Network types explained  ☐ Practical verified"] },
      3: { title: "OSI & TCP/IP Model", difficulty: "Easy", tasks: ["Layers and protocols", "Map protocols to OSI layers", "☐ Layers memorized  ☐ Differences explained  ☐ Diagram drawn"] },
      4: { title: "Linux Introduction", difficulty: "Easy", tasks: ["Linux installation, terminal basics", "Install Linux in VM (VirtualBox)", "☐ Linux installed  ☐ Commands executed  ☐ File system explored"] },
      5: { title: "Linux Commands I", difficulty: "Medium", tasks: ["File operations, permissions — chmod & chown", "Practice 20 Linux commands", "☐ 20 commands practiced  ☐ Permissions changed  ☐ No errors"] },
      6: { title: "Linux Commands II", difficulty: "Medium", tasks: ["Process management, package manager (apt)", "Install & manage software", "☐ Packages installed  ☐ Processes viewed  ☐ Commands verified"] },
      7: { title: "Networking Tools", difficulty: "Medium", tasks: ["ping, traceroute, netstat commands", "Perform network diagnostics", "☐ Tools executed  ☐ Output understood  ☐ Issues identified"] },
      8: { title: "Wireshark Basics", difficulty: "Medium", tasks: ["Packet capturing and analysis", "Capture sample packets — apply filters", "☐ Packets captured  ☐ Filters applied  ☐ Analysis documented"] },
      9: { title: "Introduction to Ethical Hacking", difficulty: "Hard", tasks: ["Types of hackers, 5 attack phases", "Research hacking methodologies", "☐ Notes prepared  ☐ Phases explained  ☐ Concepts clear"] },
      10: { title: "Kali Linux Setup", difficulty: "Hard", tasks: ["Install Kali Linux in VM", "Navigate tools — configure environment", "☐ Kali installed  ☐ Tools explored  ☐ System updated"] },
      11: { title: "Basic Scanning — Nmap", difficulty: "Hard", tasks: ["Nmap basics — scan local network", "Interpret scan results — identify open ports", "☐ Scan completed  ☐ Ports identified  ☐ Results documented"] },
      12: { title: "Password Security", difficulty: "Hard", tasks: ["Hashing basics (MD5, SHA), password policies", "Test password strength tools", "☐ Hashing concept clear  ☐ Password tested  ☐ Notes prepared"] },
      13: { title: "Firewall Basics", difficulty: "Hard", tasks: ["Firewall types and configuration", "Configure basic firewall rule — test behavior", "☐ Rule configured  ☐ Traffic tested  ☐ Behavior verified"] },
      14: { title: "Security Policies", difficulty: "Hard", tasks: ["Organizational security policies", "Draft simple security policy document", "☐ Policy drafted  ☐ Components included  ☐ Reviewed"] },
      15: { title: "Mini Project Planning", difficulty: "Hard", tasks: ["Design security lab setup — select tools", "Plan small security lab", "☐ Plan documented  ☐ Tools selected  ☐ Objective clear"] },
      16: { title: "Mini Project — Security Lab", difficulty: "Hard", tasks: ["Implement basic security lab in VM", "Submit lab documentation", "☐ Lab setup complete  ☐ Scan performed  ☐ Report submitted"] }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ — Branching logic from PDF (6 steps)
// ─────────────────────────────────────────────────────────────────────────────
const QUIZ = [
  { id: "q1", step: 1, label: "Clarity Check", question: "Do you already have a clear career goal in mind?",
    options: [
      { text: "Yes — I already know what I want to pursue", next: "skip" },
      { text: "No — help me find the right fit", next: "q2" }
    ]
  },
  { id: "q2", step: 2, label: "Learning Style", question: "Do you enjoy theory-heavy, conceptual learning?",
    options: [
      { text: "Yes — I like deep concepts and understanding foundations", next: "q3", tag: "theory" },
      { text: "No — I prefer building practical things and seeing results", next: "q3", tag: "practical" }
    ]
  },
  { id: "q3", step: 3, label: "Work Domain", question: "Which environment do you prefer working in?",
    options: [
      { text: "Code and systems — logic, algorithms, architecture", next: "q4", tag: "code" },
      { text: "Numbers and patterns — data, analysis, models", next: "q5", tag: "data" }
    ]
  },
  { id: "q4", step: 4, label: "Code Side", question: "Within code/systems, what excites you most?",
    options: [
      { text: "Building applications and websites", next: "q6" },
      { text: "Securing systems and finding vulnerabilities", next: "Cyber Security" }
    ]
  },
  { id: "q5", step: 5, label: "Data Side", question: "When working with data, what attracts you more?",
    options: [
      { text: "Extracting insights from business data", next: "Data Analytics" },
      { text: "Building intelligent models that learn on their own", next: "AI/ML" }
    ]
  },
  { id: "q6", step: 6, label: "Building Style", question: "When building something, what do you prefer?",
    options: [
      { text: "Logic-heavy backend systems and APIs", next: "Software Development" },
      { text: "User-facing websites and beautiful interfaces", next: "Web Development" }
    ]
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// STYLES & UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
const G = {
  page: { minHeight: "100vh", padding: "44px 20px", maxWidth: 700, margin: "0 auto" },
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16 },
  input: { width: "100%", padding: "12px 16px", borderRadius: 11, background: "#13162b", border: "1px solid rgba(255,255,255,0.15)", color: "#ffffff", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", WebkitTextFillColor: "#ffffff", colorScheme: "dark" },
  btn: (color = "#6366F1") => ({ padding: "13px 28px", borderRadius: 12, border: "none", background: color, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }),
}

const dc = d => d === "Easy" ? "#22C55E" : d === "Medium" ? "#F59E0B" : "#EF4444"

function PBar({ v, m, color = "#6366F1", h = 7 }) {
  const p = m ? Math.min(100, Math.round((v / m) * 100)) : 0
  return (
    <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 99, height: h, overflow: "hidden" }}>
      <div style={{ width: `${p}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
    </div>
  )
}

function Chip({ children, color = "#6366F1" }) {
  return <span style={{ background: color + "22", color, border: `1px solid ${color}40`, borderRadius: 99, padding: "3px 11px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", display: "inline-block" }}>{children}</span>
}

function BackBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", borderRadius: 9, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", marginBottom: 26 }}>
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      {label}
    </button>
  )
}

function Spinner() {
  return <div style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.15)", borderTop: "3px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
}

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #060912; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
  input { color-scheme: dark; }
  input::placeholder { color: rgba(255,255,255,0.25) !important; }
  input:focus { border-color: rgba(99,102,241,0.6) !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.12) !important; outline: none !important; }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 999px rgba(10,12,28,1) inset !important;
    box-shadow: 0 0 0 999px rgba(10,12,28,1) inset !important;
    -webkit-text-fill-color: #ffffff !important;
    caret-color: #ffffff !important;
    border-color: rgba(255,255,255,0.15) !important;
    transition: background-color 99999s ease-in-out 0s;
  }
  .cgps-card-hover:hover { border-color: rgba(255,255,255,0.18) !important; background: rgba(255,255,255,0.04) !important; }
  .cgps-btn:hover { opacity: 0.85; }
  .fade-in { animation: fadeIn 0.3s ease forwards; }
`

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN — AUTH (calls POST /api/auth/login & /api/auth/register)
// ─────────────────────────────────────────────────────────────────────────────
function AuthScreen({ onDone }) {
  const [mode, setMode] = useState("login")
  const [form, setForm] = useState({ name: "", college: "", branch: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const s = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    setErr("")
    if (mode === "login" && (!form.email || !form.password)) return setErr("Fill in email and password.")
    if (mode === "register" && Object.values(form).some(v => !v.trim())) return setErr("Please fill in all fields.")
    setLoading(true)
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register"
      const payload = mode === "login"
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, college: form.college, branch: form.branch }
      const data = await apiCall(endpoint, "POST", payload)
      // data = { token, name, email, college, branch, selectedGoal, userId }
      localStorage.setItem("cgps_token", data.token)
      localStorage.setItem("cgps_user", JSON.stringify({ name: data.name, email: data.email, college: data.college, branch: data.branch, userId: data.userId }))
      onDone(data)
    } catch (e) {
      setErr(e.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 410 }} className="fade-in">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", borderRadius: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 14 }}>🧭</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>CareerGPS</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 5 }}>Your semester-by-semester career roadmap</p>
        </div>

        <div style={{ ...G.card, padding: 28 }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 3, marginBottom: 24 }}>
            {["login","register"].map(m => (
              <button key={m} onClick={() => { setMode(m); setErr("") }} style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit", background: mode === m ? "#6366F1" : "transparent", color: mode === m ? "#fff" : "rgba(255,255,255,0.3)", transition: "all 0.2s" }}>
                {m === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          {err && <div style={{ background: "#ef444415", border: "1px solid #ef444430", color: "#fca5a5", borderRadius: 9, padding: "9px 14px", fontSize: 13, marginBottom: 16 }}>{err}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {mode === "register" && <>
              <input placeholder="Full Name" value={form.name} onChange={e => s("name", e.target.value)} style={G.input} />
              <input placeholder="College / University" value={form.college} onChange={e => s("college", e.target.value)} style={G.input} />
              <input placeholder="Branch (CSE, IT, AI...)" value={form.branch} onChange={e => s("branch", e.target.value)} style={G.input} />
            </>}
            <input type="email" placeholder="Email address" value={form.email} onChange={e => s("email", e.target.value)} style={G.input}
              autoComplete="email" onKeyDown={e => e.key === "Enter" && submit()} />
            <input type="password" placeholder="Password" value={form.password} onChange={e => s("password", e.target.value)} style={G.input}
              autoComplete="current-password" onKeyDown={e => e.key === "Enter" && submit()} />
          </div>

          <button onClick={submit} disabled={loading} className="cgps-btn" style={{ ...G.btn(), width: "100%", marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><Spinner /> Processing...</> : mode === "login" ? "Login to CareerGPS →" : "Create My Account →"}
          </button>

          <p style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "rgba(255,255,255,0.2)", cursor: "pointer" }} onClick={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? <>New here? <span style={{ color: "#6366F1" }}>Create account</span></> : <>Already registered? <span style={{ color: "#6366F1" }}>Login</span></>}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN — ONBOARDING
// ─────────────────────────────────────────────────────────────────────────────
function OnboardingScreen({ user, onNext }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 540, width: "100%", textAlign: "center" }} className="fade-in">
        <div style={{ fontSize: 58, marginBottom: 18 }}>👋</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
          Welcome, {user.name}.
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 10 }}>
          Most students spend their first 2 years guessing what to do — watching random videos, following contradicting advice, never building real momentum.
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 32, fontWeight: 600 }}>
          CareerGPS gives you a <span style={{ color: "#6366F1" }}>clear, week-by-week plan</span> built around your goal — so you never waste a semester again.
        </p>
        {[
          { icon: "🎯", t: "Smart branching quiz to find your best-fit career" },
          { icon: "🗺️", t: "Full 16-week structured roadmap tailored to your path" },
          { icon: "✅", t: "Week-by-week tasks with real-time progress tracking" },
          { icon: "🔓", t: "Phases unlock as you complete milestones" }
        ].map(({ icon, t }) => (
          <div key={t} style={{ ...G.card, padding: "13px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 10, textAlign: "left" }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{t}</span>
          </div>
        ))}
        <button onClick={onNext} className="cgps-btn" style={{ ...G.btn(), marginTop: 28, padding: "15px 52px", fontSize: 15 }}>
          Let's Build My Roadmap →
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN — QUIZ (branching from PDF)
// ─────────────────────────────────────────────────────────────────────────────
function QuizScreen({ onComplete, onSkip }) {
  const [currentId, setCurrentId] = useState("q1")
  const [history, setHistory] = useState([])
  const [picked, setPicked] = useState(null)
  const [fading, setFading] = useState(false)

  const cur = QUIZ.find(q => q.id === currentId)

  const pick = (opt) => {
    if (picked) return
    setPicked(opt.text)
    setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        if (opt.next === "skip") { onSkip(); return }
        if (Object.keys(GOALS).includes(opt.next)) { onComplete(opt.next); return }
        setHistory(h => [...h, currentId])
        setCurrentId(opt.next)
        setPicked(null)
        setFading(false)
      }, 260)
    }, 420)
  }

  const back = () => {
    if (!history.length) return
    setCurrentId(history[history.length - 1])
    setHistory(h => h.slice(0, -1))
    setPicked(null)
  }

  if (!cur) return null

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 580 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44 }}>
          <div style={{ flex: 1 }}><PBar v={cur.step - 1} m={6} color="#6366F1" h={5} /></div>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>Step {cur.step} / 6</span>
        </div>

        <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.26s" }} className={!fading ? "fade-in" : ""}>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#6366F1", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>{cur.label}</div>
          <h2 style={{ fontSize: 25, fontWeight: 800, color: "#fff", lineHeight: 1.35, marginBottom: 28, letterSpacing: "-0.01em" }}>{cur.question}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {cur.options.map((opt, i) => (
              <button key={i} onClick={() => pick(opt)}
                style={{ textAlign: "left", padding: "16px 20px", borderRadius: 13, fontFamily: "inherit", cursor: picked ? "default" : "pointer", transition: "all 0.15s", fontSize: 14, fontWeight: picked === opt.text ? 700 : 400, border: picked === opt.text ? "2px solid #6366F1" : "1px solid rgba(255,255,255,0.09)", background: picked === opt.text ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.025)", color: picked === opt.text ? "#fff" : "rgba(255,255,255,0.55)" }}>
                <span style={{ color: "rgba(255,255,255,0.2)", marginRight: 10, fontSize: 12, fontWeight: 700 }}>{String.fromCharCode(65 + i)}.</span>
                {opt.text}
              </button>
            ))}
          </div>
          {history.length > 0 && (
            <button onClick={back} style={{ marginTop: 20, background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>← Previous question</button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN — GOAL SELECTION
// ─────────────────────────────────────────────────────────────────────────────
function GoalSelectionScreen({ recommended, onSelect }) {
  const [hov, setHov] = useState(null)
  return (
    <div style={{ minHeight: "100vh", padding: "56px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }} className="fade-in">
        <div style={{ fontSize: 11, letterSpacing: "0.12em", color: "#6366F1", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
          {recommended ? "Quiz Complete ✨" : "Select Your Path"}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>Choose Your Career Path</h2>
        {recommended && (
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 36 }}>
            Based on your answers, we recommend <span style={{ color: GOALS[recommended].color, fontWeight: 700 }}>{recommended}</span> — but you can choose any path.
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 14, marginTop: recommended ? 0 : 36 }}>
          {Object.entries(GOALS).map(([name, d]) => {
            const isRec = name === recommended
            return (
              <button key={name} onClick={() => onSelect(name)}
                onMouseEnter={() => setHov(name)} onMouseLeave={() => setHov(null)}
                style={{ padding: "22px 16px", borderRadius: 16, border: isRec ? `2px solid ${d.color}` : "1px solid rgba(255,255,255,0.08)", background: hov === name ? `${d.color}18` : isRec ? `${d.color}0D` : "rgba(255,255,255,0.02)", cursor: "pointer", textAlign: "center", position: "relative", fontFamily: "inherit", transition: "all 0.15s" }}>
                {isRec && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: d.color, color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 99, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>RECOMMENDED ✨</div>}
                <div style={{ fontSize: 34, marginBottom: 11 }}>{d.emoji}</div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{name}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.55 }}>{d.tagline}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN — GOAL DETAIL (calls POST /api/user/goal)
// ─────────────────────────────────────────────────────────────────────────────
function GoalDetailScreen({ goalName, onConfirm, onBack, token }) {
  const d = GOALS[goalName]
  const [loading, setLoading] = useState(false)

  const confirm = async () => {
    setLoading(true)
    try {
      await apiCall("/user/goal", "POST", { goal: goalName }, token)
    } catch (e) {
      // continue even if this fails
    } finally {
      setLoading(false)
      onConfirm()
    }
  }

  return (
    <div style={G.page} className="fade-in">
      <BackBtn onClick={onBack} label="Change Goal" />

      <div style={{ background: `linear-gradient(135deg, ${d.color}18, ${d.color}05)`, border: `1px solid ${d.color}28`, borderRadius: 20, padding: 28, marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 50, marginBottom: 12 }}>{d.emoji}</div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>{goalName}</h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>{d.what}</p>
      </div>

      <div style={{ ...G.card, padding: 20, marginBottom: 12 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>🚀 Career Outcomes</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {d.outcomes.map(o => <Chip key={o} color={d.color}>{o}</Chip>)}
        </div>
      </div>

      <div style={{ ...G.card, padding: 20, marginBottom: 12 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>📚 What You'll Learn</div>
        {d.learn.map(item => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ ...G.card, padding: 20, marginBottom: 12 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>📅 4-Phase Structure (16 Weeks)</div>
        {d.phases.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: p.color + "20", border: `1px solid ${p.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: p.color, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{p.label}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>Weeks {p.weeks[0]}–{p.weeks[3]}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: `${d.color}0E`, border: `1px solid ${d.color}22`, borderRadius: 14, padding: 18, marginBottom: 24 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 7 }}>🧠 Required Mindset</div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.65, fontStyle: "italic" }}>"{d.mindset}"</p>
      </div>

      <button onClick={confirm} disabled={loading} className="cgps-btn" style={{ ...G.btn(d.color), width: "100%", padding: "15px 0", fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {loading ? <><Spinner /> Saving...</> : `Confirm — Start My ${goalName} Roadmap →`}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN — DASHBOARD (loads progress from GET /api/progress)
// ─────────────────────────────────────────────────────────────────────────────
function DashboardScreen({ user, goalName, progress, onNavigate, onLogout, token }) {
  const d = GOALS[goalName]
  const weeks = Object.entries(d.weeks)
  const totalTasks = weeks.reduce((s, [, w]) => s + w.tasks.length, 0)
  const doneTasks = weeks.reduce((s, [wk, w]) => s + w.tasks.filter(t => progress[`w${wk}-${t}`]).length, 0)
  const pct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0
  const currentWeek = weeks.find(([wk, w]) => w.tasks.some(t => !progress[`w${wk}-${t}`]))

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 64 }}>
      {/* Sticky Navbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 26px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, background: "rgba(6,9,18,0.96)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ fontSize: 17 }}>🧭</span>
          <span style={{ fontWeight: 900, fontSize: 16, color: "#fff", letterSpacing: "-0.02em" }}>CareerGPS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Chip color={d.color}>{d.emoji} {goalName}</Chip>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>{user.name}</span>
          <button onClick={onLogout} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", borderRadius: 8, padding: "6px 13px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 600 }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 20px" }} className="fade-in">
        {/* Hero card */}
        <div style={{ background: `linear-gradient(135deg, ${d.color}18, ${d.color}05)`, border: `1px solid ${d.color}25`, borderRadius: 20, padding: 28, marginBottom: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 7 }}>Your Roadmap</div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>{d.emoji} {goalName}</h2>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>{user.branch} · {user.college}</p>
            </div>
            <div style={{ textAlign: "center", background: "rgba(0,0,0,0.25)", borderRadius: 14, padding: "13px 22px" }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: d.color, lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", marginTop: 3 }}>{doneTasks}/{totalTasks}</div>
            </div>
          </div>
          <div style={{ marginTop: 18 }}><PBar v={doneTasks} m={totalTasks} color={d.color} h={8} /></div>
        </div>

        {/* Current Focus */}
        {currentWeek && (
          <div style={{ ...G.card, padding: 20, marginBottom: 22 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>⚡ Current Focus</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>Week {currentWeek[0]} — {currentWeek[1].title}</div>
                <div style={{ display: "flex", gap: 7, marginTop: 6 }}>
                  <Chip color={dc(currentWeek[1].difficulty)}>{currentWeek[1].difficulty}</Chip>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, alignSelf: "center" }}>{currentWeek[1].tasks.length} tasks</span>
                </div>
              </div>
              <button onClick={() => onNavigate("week", { weekKey: currentWeek[0] })} className="cgps-btn" style={{ ...G.btn(d.color), padding: "10px 20px", fontSize: 13 }}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Phases */}
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>All 4 Phases</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {d.phases.map((phase, pi) => {
            const phWeeks = phase.weeks.map(n => [String(n), d.weeks[n]]).filter(([, w]) => w)
            const phTotal = phWeeks.reduce((s, [, w]) => s + w.tasks.length, 0)
            const phDone = phWeeks.reduce((s, [wk, w]) => s + w.tasks.filter(t => progress[`w${wk}-${t}`]).length, 0)
            // Locked if previous phase has incomplete tasks
            const locked = pi > 0 && (() => {
              const prevPhase = d.phases[pi - 1]
              return prevPhase.weeks.some(n => {
                const w = d.weeks[n]
                return w && w.tasks.some(t => !progress[`w${n}-${t}`])
              })
            })()

            return (
              <div key={phase.label} style={{ ...G.card, overflow: "hidden", opacity: locked ? 0.5 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: phase.color + "08" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: phase.color + "20", border: `1px solid ${phase.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: phase.color }}>{pi + 1}</div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{phase.label}</div>
                      <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 12 }}>Weeks {phase.weeks[0]}–{phase.weeks[3]}</div>
                    </div>
                  </div>
                  {locked ? <span style={{ fontSize: 18 }}>🔒</span> : <span style={{ color: phase.color, fontWeight: 900, fontSize: 17 }}>{phTotal ? Math.round((phDone/phTotal)*100) : 0}%</span>}
                </div>
                <div style={{ padding: "12px 20px 16px" }}>
                  <PBar v={phDone} m={phTotal} color={phase.color} />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 8, marginTop: 12 }}>
                    {phWeeks.map(([wk, w]) => {
                      const wd = w.tasks.filter(t => progress[`w${wk}-${t}`]).length
                      const wp = Math.round((wd / w.tasks.length) * 100)
                      const done = wd === w.tasks.length
                      return (
                        <button key={wk} onClick={() => !locked && onNavigate("week", { weekKey: wk })} disabled={locked}
                          className={locked ? "" : "cgps-card-hover"}
                          style={{ textAlign: "left", padding: "12px 14px", borderRadius: 11, border: `1px solid ${done ? phase.color + "45" : "rgba(255,255,255,0.07)"}`, background: done ? phase.color + "0E" : "rgba(255,255,255,0.02)", cursor: locked ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                          <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>Week {wk}</div>
                          <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, marginBottom: 7 }}>{w.title}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Chip color={dc(w.difficulty)}>{w.difficulty}</Chip>
                            <span style={{ color: done ? "#22C55E" : "rgba(255,255,255,0.28)", fontSize: 12, fontWeight: 700 }}>{wp}%</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Validation */}
        <div style={{ ...G.card, padding: 20, marginTop: 22 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 14 }}>🏆 Final Validation Criteria</div>
          {d.validation.map(v => (
            <div key={v} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ color: d.color, fontSize: 14, flexShrink: 0 }}>✓</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN — WEEK VIEW (saves progress via POST /api/progress/toggle)
// ─────────────────────────────────────────────────────────────────────────────
function WeekScreen({ goalName, weekKey, progress, setProgress, onBack, onNavigate, token }) {
  const d = GOALS[goalName]
  const wk = parseInt(weekKey)
  const week = d.weeks[wk]
  const total = week.tasks.length
  const done = week.tasks.filter(t => progress[`w${weekKey}-${t}`]).length
  const pct = Math.round((done / total) * 100)
  const phase = d.phases.find(p => p.weeks.includes(wk))

  const toggle = async (task) => {
    const key = `w${weekKey}-${task}`
    // Optimistic update first
    setProgress(p => ({ ...p, [key]: !p[key] }))
    try {
      const data = await apiCall(`/progress/toggle`, "POST", { taskKey: key }, token)
      // Sync from server
      if (data?.progress) setProgress(data.progress)
    } catch (e) {
      // Revert on error
      setProgress(p => ({ ...p, [key]: !p[key] }))
    }
  }

  return (
    <div style={G.page} className="fade-in">
      <BackBtn onClick={onBack} label="Dashboard" />

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${phase?.color}14, ${phase?.color}04)`, border: `1px solid ${phase?.color}22`, borderRadius: 20, padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <Chip color={phase?.color}>{phase?.label}</Chip>
              <Chip color={dc(week.difficulty)}>{week.difficulty}</Chip>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
              Week {weekKey} — {week.title}
            </h2>
          </div>
          <div style={{ textAlign: "center", background: "rgba(0,0,0,0.22)", borderRadius: 12, padding: "11px 16px", flexShrink: 0 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: done === total ? "#22C55E" : d.color, lineHeight: 1 }}>
              {done === total ? "✅" : `${pct}%`}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", marginTop: 2 }}>{done}/{total}</div>
          </div>
        </div>
        <PBar v={done} m={total} color={done === total ? "#22C55E" : d.color} h={7} />
      </div>

      {/* Tasks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 24 }}>
        {week.tasks.map(task => {
          const isDone = !!progress[`w${weekKey}-${task}`]
          return (
            <div key={task} onClick={() => toggle(task)}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 13, background: isDone ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.025)", border: isDone ? "1px solid rgba(34,197,94,0.18)" : "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ width: 21, height: 21, borderRadius: "50%", border: `2px solid ${isDone ? "#22C55E" : "rgba(255,255,255,0.15)"}`, background: isDone ? "#22C55E" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                {isDone && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span style={{ color: isDone ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.78)", fontSize: 14, fontWeight: 500, textDecoration: isDone ? "line-through" : "none", flex: 1 }}>{task}</span>
            </div>
          )
        })}
      </div>

      {/* Completion */}
      {done === total && (
        <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: 20, textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 34, marginBottom: 7 }}>🎉</div>
          <div style={{ color: "#22C55E", fontWeight: 800, fontSize: 15 }}>Week {weekKey} Complete!</div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 4 }}>
            {wk < 16 ? "Head to the next week below." : "You've completed the entire roadmap! 🏆"}
          </div>
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div style={{ display: "flex", gap: 12 }}>
        {wk > 1 && (
          <button onClick={() => onNavigate("week", { weekKey: String(wk - 1) })} className="cgps-card-hover"
            style={{ ...G.card, flex: 1, padding: "13px 16px", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
            <div style={{ color: "rgba(255,255,255,0.22)", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>← Previous</div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Week {wk - 1} — {d.weeks[wk - 1]?.title}</div>
          </button>
        )}
        {wk < 16 && (
          <button onClick={() => onNavigate("week", { weekKey: String(wk + 1) })} className="cgps-card-hover"
            style={{ ...G.card, flex: 1, padding: "13px 16px", cursor: "pointer", fontFamily: "inherit", textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.22)", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>Next →</div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Week {wk + 1} — {d.weeks[wk + 1]?.title}</div>
          </button>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT — manages auth state + API integration
// ─────────────────────────────────────────────────────────────────────────────
export default function CareerGPS() {
  const [stage, setStage] = useState("login")
  const [token, setToken] = useState(() => localStorage.getItem("cgps_token") || null)
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("cgps_user")
    return u ? JSON.parse(u) : null
  })
  const [recommendedGoal, setRecommendedGoal] = useState(null)
  const [goalName, setGoalName] = useState(null)
  const [progress, setProgress] = useState({})
  const [nav, setNav] = useState({})
  const [loadingProgress, setLoadingProgress] = useState(false)

  // Auto-login if token exists
  useEffect(() => {
    if (token && user) {
      setStage("loading")
      apiCall("/user/profile", "GET", null, token)
        .then(data => {
          setUser({ name: data.name, email: data.email, college: data.college, branch: data.branch, userId: data.userId })
          if (data.selectedGoal) {
            setGoalName(data.selectedGoal)
            loadProgress(data.selectedGoal, token)
          } else {
            setStage("onboarding")
          }
        })
        .catch(() => {
          // Token expired
          localStorage.removeItem("cgps_token")
          localStorage.removeItem("cgps_user")
          setToken(null); setUser(null); setStage("login")
        })
    }
  }, [])

  const loadProgress = useCallback((goal, t) => {
    setLoadingProgress(true)
    apiCall("/progress", "GET", null, t || token)
      .then(data => {
        setProgress(data.progress || {})
        setGoalName(goal)
        setStage("dashboard")
      })
      .catch(() => {
        setProgress({})
        setGoalName(goal)
        setStage("dashboard")
      })
      .finally(() => setLoadingProgress(false))
  }, [token])

  const go = (s, params = {}) => { setNav(params); setStage(s) }

  const logout = () => {
    localStorage.removeItem("cgps_token")
    localStorage.removeItem("cgps_user")
    setToken(null); setUser(null); setGoalName(null); setProgress({}); setRecommendedGoal(null); setNav({})
    setStage("login")
  }

  const handleAuthDone = (data) => {
    setToken(data.token)
    setUser({ name: data.name, email: data.email, college: data.college || "—", branch: data.branch || "—", userId: data.userId })
    if (data.selectedGoal) {
      loadProgress(data.selectedGoal, data.token)
    } else {
      setStage("onboarding")
    }
  }

  // Loading screen
  if (stage === "loading" || loadingProgress) {
    return (
      <div style={{ minHeight: "100vh", background: "#060912", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: "#fff" }}>
        <style>{globalCSS}</style>
        <Spinner />
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Loading your roadmap...</span>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#060912", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: "#fff" }}>
      <style>{globalCSS}</style>

      {stage === "login" && (
        <AuthScreen onDone={handleAuthDone} />
      )}
      {stage === "onboarding" && user && (
        <OnboardingScreen user={user} onNext={() => setStage("quiz")} />
      )}
      {stage === "quiz" && (
        <QuizScreen
          onComplete={goal => { setRecommendedGoal(goal); setStage("goalSelection") }}
          onSkip={() => setStage("goalSelection")}
        />
      )}
      {stage === "goalSelection" && (
        <GoalSelectionScreen recommended={recommendedGoal} onSelect={g => { setGoalName(g); setStage("goalDetail") }} />
      )}
      {stage === "goalDetail" && goalName && (
        <GoalDetailScreen goalName={goalName} onConfirm={() => loadProgress(goalName, token)} onBack={() => setStage("goalSelection")} token={token} />
      )}
      {stage === "dashboard" && goalName && user && (
        <DashboardScreen user={user} goalName={goalName} progress={progress} onNavigate={go} onLogout={logout} token={token} />
      )}
      {stage === "week" && goalName && (
        <WeekScreen goalName={goalName} weekKey={nav.weekKey} progress={progress} setProgress={setProgress} onBack={() => setStage("dashboard")} onNavigate={go} token={token} />
      )}
    </div>
  )
}
