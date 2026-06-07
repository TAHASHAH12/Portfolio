import React, { useState, useEffect } from 'react';
import {
  ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Code, Database,
  Brain, TrendingUp, Calendar, ExternalLink, Download,
  Star, GitFork, AlertCircle, RefreshCw, Award, Cpu
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [projectFilter, setProjectFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [apiStats, setApiStats] = useState({ remaining: null, limit: null });
  const [cursorVisible, setCursorVisible] = useState(true);

  const roles = [
    'AI Solutions Engineer',
    'Data Scientist',
    'Machine Learning Engineer',
    'AI / ML Consultant',
    'Business Intelligence Developer',
  ];

  const skills = {
    'AI & Machine Learning': {
      items: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'XGBoost', 'NLP', 'Computer Vision'],
      icon: Brain,
      accent: '#00d4ff',
    },
    'Languages & APIs': {
      items: ['Python', 'JavaScript', 'TypeScript', 'React', 'REST APIs', 'SQL', 'R', 'C++'],
      icon: Code,
      accent: '#00ff88',
    },
    'Data & Databases': {
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Snowflake', 'ETL Pipelines', 'Feature Engineering'],
      icon: Database,
      accent: '#a855f7',
    },
    'Cloud & DevOps': {
      items: ['AWS', 'Google Cloud Platform', 'Docker', 'Git', 'Data Pipelines', 'Automation'],
      icon: Cpu,
      accent: '#f59e0b',
    },
    'Visualization & BI': {
      items: ['Power BI', 'Tableau', 'Plotly', 'Matplotlib', 'Seaborn'],
      icon: TrendingUp,
      accent: '#ec4899',
    },
  };

  const experiences = [
    {
      title: 'Data Analyst',
      company: 'Motive (GoMotive.com)',
      location: 'Karachi, Pakistan',
      period: 'March 2025 – Present',
      type: 'ML & Analytics',
      achievements: [
        'Validated and tested ML models for fleet management using Python and TensorFlow, improving AI violation-detection accuracy by 25% through curated high-quality labeled datasets.',
        'Built automated annotation pipelines for large-scale video data processing, cutting manual labeling time by 30% while sustaining 95%+ accuracy.',
        'Analyzed fleet telematics data using SQL and statistical analysis to surface actionable insights on driver behavior and vehicle tracking.',
        'Designed A/B testing frameworks and performance dashboards to measure iterative AI model improvements.',
      ],
    },
    {
      title: 'Data Analyst',
      company: 'IAL Saatchi & Saatchi',
      location: 'Karachi, Pakistan',
      period: 'October 2024 – March 2025',
      type: 'Analytics',
      achievements: [
        'Analyzed advertising campaign performance using statistical analysis and data mining, contributing to a 15% improvement in campaign efficiency.',
        'Created real-time dashboards and automated reports in Power BI and Tableau, reducing manual reporting overhead for stakeholders.',
        'Applied customer segmentation and predictive analytics using SQL queries and feature engineering to support strategic business decisions.',
      ],
    },
    {
      title: 'Data Scientist Researcher (Contract)',
      company: 'WLDM.IO',
      location: 'Remote',
      period: 'March 2024 – March 2025',
      type: 'Research',
      achievements: [
        'Developed predictive models with TensorFlow and statistical modeling for e-commerce workflow optimization, achieving 20% performance improvement.',
        'Integrated NLP techniques into business intelligence workflows for automated SEO analysis, increasing organic traffic by 35%.',
        'Built automated multi-channel reporting systems using Power BI and Tableau, replacing manual processes for campaign performance tracking.',
        'Operated in a fully remote consulting environment, delivering solutions end-to-end across research, prototyping, and deployment phases.',
      ],
    },
    {
      title: 'Data Analyst Intern',
      company: 'ACM',
      location: 'Seattle, USA (Remote)',
      period: 'April 2024 – September 2024',
      type: 'Internship',
      achievements: [
        'Applied supervised ML models (random forest, regression) to real-world datasets, achieving 15% accuracy improvement over baseline.',
        'Built stakeholder-facing visualizations in Python and Tableau that increased insight comprehension by 25%.',
        'Optimized ETL pipelines and data processing workflows, reducing processing time by 20%.',
      ],
    },
  ];

  const certifications = [
    { name: 'TensorFlow Developer Certificate', issuer: 'Google' },
    { name: 'Supervised Machine Learning', issuer: 'Coursera / Stanford' },
    { name: 'Certified Data Visualization Specialist', issuer: 'Professional Certification' },
    { name: 'Python Programming (Intermediate)', issuer: 'HackerRank' },
  ];

  const keyProjects = [
    {
      id: 'proj-1',
      title: 'AI Dashcam Analytics System',
      description: 'Computer vision pipeline for real-time traffic violation detection achieving 90%+ accuracy. Built end-to-end from data ingestion and model training through deployment — directly applicable to AI-enabled business automation.',
      html_url: 'https://github.com/taha-shah123',
      homepage: null,
      language: 'Python',
      stars: 0,
      forks: 0,
      topics: ['computer-vision', 'tensorflow', 'opencv', 'deep-learning'],
      updated_at: '2025-03-01T00:00:00Z',
      category: 'ml',
    },
    {
      id: 'proj-2',
      title: 'SEO ML Analytics Dashboard',
      description: 'ML-powered analytics dashboard integrating multiple data sources to track and optimize digital marketing performance across channels. Translates business KPIs into automated, actionable tooling.',
      html_url: 'https://github.com/taha-shah123',
      homepage: null,
      language: 'Python',
      stars: 0,
      forks: 0,
      topics: ['machine-learning', 'power-bi', 'nlp', 'seo'],
      updated_at: '2024-12-01T00:00:00Z',
      category: 'data-science',
    },
  ];

  const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'taha-shah123';
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  const categorizeProject = (name, description, topics, language) => {
    const searchText = `${name} ${description} ${topics.join(' ')}`.toLowerCase();
    if (searchText.match(/machine.learning|ml|neural.network|deep.learning|tensorflow|pytorch|sklearn|ai|computer.vision|nlp/)) return 'ml';
    if (searchText.match(/data.science|analytics|visualization|pandas|numpy|statistics|predictive/)) return 'data-science';
    if (searchText.match(/web|react|javascript|html|css|frontend|backend|api|website/) || language?.toLowerCase().match(/javascript|typescript|html|css/)) return 'web-dev';
    if (language?.toLowerCase() === 'python') return 'python';
    return 'other';
  };

  const fetchGithubProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      setApiStats({ remaining: null, limit: null });

      if (!GITHUB_TOKEN) {
        setGithubProjects(keyProjects);
        setError('GitHub token not configured – showing key projects');
        setLoading(false);
        return;
      }

      const query = `
        query {
          user(login: "${GITHUB_USERNAME}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id name description url homepageUrl stargazerCount forkCount
                  primaryLanguage { name color }
                  repositoryTopics(first: 10) { nodes { topic { name } } }
                  updatedAt
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);

      const result = await response.json();
      if (result.errors?.length > 0) throw new Error(result.errors[0].message);

      const pinnedRepos = result.data?.user?.pinnedItems?.nodes || [];
      if (!pinnedRepos.length) {
        setGithubProjects(keyProjects);
        setError('No pinned repos found – showing key projects');
        setLoading(false);
        return;
      }

      const processedProjects = pinnedRepos
        .map(repo => {
          const topics = (repo.repositoryTopics?.nodes || []).map(n => n.topic?.name || '').filter(Boolean);
          return {
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            name: repo.name,
            description: repo.description,
            html_url: repo.url,
            homepage: repo.homepageUrl,
            language: repo.primaryLanguage?.name || null,
            languageColor: repo.primaryLanguage?.color || null,
            stars: repo.stargazerCount,
            forks: repo.forkCount,
            topics,
            updated_at: repo.updatedAt,
            category: categorizeProject(repo.name, repo.description || '', topics, repo.primaryLanguage?.name || ''),
          };
        })
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      setGithubProjects(processedProjects);
    } catch (err) {
      setGithubProjects(keyProjects);
      setError(err.message || 'Failed to load repos – showing key projects');
    } finally {
      setLoading(false);
    }
  };

  const getProjectCategories = () => {
    const unique = [...new Set(githubProjects.map(p => p.category))];
    return ['all', ...unique.sort()];
  };

  const filteredProjects = githubProjects.filter(p => projectFilter === 'all' || p.category === projectFilter);

  useEffect(() => { fetchGithubProjects(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
      const current = sections.find(s => {
        const el = document.getElementById(s);
        if (el) { const r = el.getBoundingClientRect(); return r.top <= 100 && r.bottom >= 100; }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => { setCurrentRole(p => (p + 1) % roles.length); setIsTyping(true); }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, [roles.length]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const formatDate = str => new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

  const langColor = (lang, color) => {
    if (color) return color;
    return { JavaScript: '#f1e05a', TypeScript: '#2b7489', Python: '#3572A5', 'C++': '#f34b7d', R: '#198CE7' }[lang] || '#8b949e';
  };

  const bg = darkMode ? '#050b14' : '#f8fafc';
  const bgCard = darkMode ? '#0b1628' : '#ffffff';
  const bgAlt = darkMode ? '#070d1a' : '#ffffff';
  const textMain = darkMode ? '#cdd9e5' : '#1e293b';
  const textMuted = darkMode ? '#8b949e' : '#64748b';
  const textDim = darkMode ? '#4b5563' : '#94a3b8';
  const borderBase = darkMode ? 'rgba(0,212,255,0.12)' : 'rgba(0,0,0,0.1)';
  const cyan = '#00d4ff';
  const green = '#00ff88';

  const SectionHeader = ({ num, title }) => (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-mono text-2xl font-bold" style={{ color: cyan }}>{num}.</span>
      <h2 className="text-3xl font-bold" style={{ color: textMain }}>{title}</h2>
      <div className="flex-1 h-px" style={{ background: borderBase }} />
    </div>
  );

  const navItems = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];

  return (
    <div style={{ background: bg, color: textMain, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>

      {/* ── NAV ────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: isScrolled ? (darkMode ? 'rgba(5,11,20,0.95)' : 'rgba(248,250,252,0.95)') : 'transparent',
        borderBottom: isScrolled ? `1px solid ${borderBase}` : 'none',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s',
      }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-mono text-lg font-bold" style={{ color: cyan }}>
            <span style={{ color: textDim }}>~/</span>taha-shah
          </span>

          <div className="hidden md:flex space-x-6">
            {navItems.map(item => (
              <button key={item} onClick={() => scrollTo(item)}
                className="capitalize font-mono text-sm transition-all duration-200"
                style={{
                  color: activeSection === item ? cyan : textMuted,
                  borderBottom: `1px solid ${activeSection === item ? cyan : 'transparent'}`,
                  paddingBottom: '2px',
                }}>
                {item}
              </button>
            ))}
          </div>

          <button onClick={() => setDarkMode(!darkMode)}
            className="font-mono text-xs px-3 py-1.5 rounded transition-all duration-200"
            style={{ border: `1px solid ${borderBase}`, color: textMuted }}>
            {darkMode ? '[ light ]' : '[ dark ]'}
          </button>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────── */}
      <section id="home" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: darkMode
          ? `radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.06) 0%, transparent 55%),
             radial-gradient(ellipse at 80% 20%, rgba(0,255,136,0.04) 0%, transparent 45%),
             #050b14`
          : `radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 55%), #f8fafc`,
      }}>
        {/* dot grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.35,
          backgroundImage: `radial-gradient(${darkMode ? 'rgba(0,212,255,0.4)' : 'rgba(0,0,0,0.25)'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '860px', margin: '0 auto' }}>
          {/* terminal prompt */}
          <div className="font-mono text-sm mb-6 flex justify-center items-center gap-2">
            <span style={{ color: cyan }}>$</span>
            <span style={{ color: green }}>whoami</span>
          </div>

          <h1 className="font-bold mb-4" style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)', letterSpacing: '-2px', lineHeight: 1.1 }}>
            <span style={{ color: textMain }}>Taha </span>
            <span style={{
              background: `linear-gradient(135deg, ${cyan}, ${green})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Shah</span>
          </h1>

          <div className="font-mono font-semibold mb-6 flex items-center justify-center"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', height: '2.2rem', color: cyan }}>
            <span style={{ opacity: isTyping ? 1 : 0, transition: 'opacity 0.4s' }}>{roles[currentRole]}</span>
            <span style={{
              display: 'inline-block', width: '2px', height: '1.2em', marginLeft: '4px',
              background: cyan, opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.08s', verticalAlign: 'middle',
            }} />
          </div>

          <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: textMuted }}>
            AI &amp; software engineer with 3+ years building ML systems, automation pipelines, and
            data-driven applications across multiple industries. BS Computer Science, FAST-NUCES (GPA 3.7/4.0).
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            {[
              { label: '> view_projects()', action: () => scrollTo('projects'), primary: true },
              { label: '> get_in_touch()', action: () => scrollTo('contact'), primary: false },
            ].map(({ label, action, primary }) => (
              <button key={label} onClick={action}
                className="px-8 py-3 rounded font-mono font-semibold text-sm transition-all duration-300"
                style={{
                  border: `1px solid ${primary ? cyan : (darkMode ? 'rgba(0,255,136,0.45)' : 'rgba(59,130,246,0.45)')}`,
                  color: primary ? cyan : (darkMode ? green : '#3b82f6'),
                  background: primary ? `rgba(0,212,255,0.07)` : 'transparent',
                  boxShadow: primary ? `0 0 18px rgba(0,212,255,0.12)` : 'none',
                }}>
                {label}
              </button>
            ))}
            <a href="https://drive.google.com/file/d/1leTK4WXWysR-9Ga2anYLPydbYDaFscHE/view?usp=sharing"
              target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3 rounded font-mono text-sm flex items-center gap-2 transition-all duration-200"
                style={{ border: `1px solid ${borderBase}`, color: textMuted }}>
                <Download className="h-4 w-4" /> download_cv
              </button>
            </a>
          </div>

          <div className="flex justify-center gap-3">
            {[
              { href: 'mailto:tahashah366@gmail.com', Icon: Mail, label: 'email' },
              { href: 'https://linkedin.com/in/TAHASHAH12', Icon: Linkedin, label: 'linkedin' },
              { href: 'https://github.com/taha-shah123', Icon: Github, label: 'github' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 px-4 py-3 rounded font-mono text-xs transition-all duration-200"
                style={{ border: `1px solid ${borderBase}`, color: textMuted }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cyan; e.currentTarget.style.color = cyan; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = borderBase; e.currentTarget.style.color = textMuted; }}>
                <Icon className="h-5 w-5" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}
          className="animate-bounce">
          <ChevronDown className="h-6 w-6" style={{ color: cyan }} />
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────── */}
      <section id="about" className="py-20 px-6" style={{ background: bgAlt }}>
        <div className="container mx-auto max-w-6xl">
          <SectionHeader num="01" title="About Me" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <p className="leading-relaxed" style={{ color: textMuted }}>
                Results-driven AI and software engineer with{' '}
                <strong style={{ color: textMain }}>3+ years of experience</strong> building ML systems,
                automation pipelines, and data-driven applications across multiple industries.
              </p>
              <p className="leading-relaxed" style={{ color: textMuted }}>
                Proven ability to translate business problems into practical technical solutions and deliver{' '}
                <strong style={{ color: textMain }}>end-to-end AI integrations</strong>. Strong background
                in Python, SQL, cloud platforms, and applied ML with hands-on experience deploying systems
                that reduce manual effort and improve decision-making.
              </p>
              <p className="leading-relaxed" style={{ color: textMuted }}>
                BS Computer Science from <strong style={{ color: cyan }}>FAST-NUCES</strong>, graduating
                June 2025 with a GPA of <strong style={{ color: green }}>3.7 / 4.0</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { value: '3+', label: 'Years Experience', color: cyan },
                  { value: '4', label: 'Companies Worked', color: green },
                  { value: '25%', label: 'Avg. Model Uplift', color: '#a855f7' },
                  { value: '3.7', label: 'GPA / 4.0', color: '#f59e0b' },
                ].map(({ value, label, color }) => (
                  <div key={label} className="p-4 rounded-lg text-center"
                    style={{ background: `${color}08`, border: `1px solid ${color}28` }}>
                    <div className="text-3xl font-bold font-mono mb-1" style={{ color }}>{value}</div>
                    <div className="text-xs" style={{ color: textDim }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code block */}
            <div className="p-6 rounded-xl font-mono text-sm"
              style={{ background: darkMode ? '#0b1628' : '#1e293b', border: `1px solid ${borderBase}` }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                <span className="ml-2 text-xs" style={{ color: '#4b5563' }}>taha@portfolio ~ profile.ts</span>
              </div>
              <div className="space-y-1 text-xs leading-relaxed">
                <div><span style={{ color: '#569cd6' }}>const</span> <span style={{ color: green }}>engineer</span><span style={{ color: '#cdd9e5' }}> = {'{'}</span></div>
                <div className="pl-4"><span style={{ color: '#9cdcfe' }}>name</span><span style={{ color: '#cdd9e5' }}>: </span><span style={{ color: '#ce9178' }}>"Taha Shah"</span><span style={{ color: '#cdd9e5' }}>,</span></div>
                <div className="pl-4"><span style={{ color: '#9cdcfe' }}>role</span><span style={{ color: '#cdd9e5' }}>: </span><span style={{ color: '#ce9178' }}>"AI Solutions Engineer &amp; Consultant"</span><span style={{ color: '#cdd9e5' }}>,</span></div>
                <div className="pl-4"><span style={{ color: '#9cdcfe' }}>location</span><span style={{ color: '#cdd9e5' }}>: </span><span style={{ color: '#ce9178' }}>"Karachi, Pakistan"</span><span style={{ color: '#cdd9e5' }}>,</span></div>
                <div className="pl-4"><span style={{ color: '#9cdcfe' }}>experience</span><span style={{ color: '#cdd9e5' }}>: </span><span style={{ color: cyan }}>3</span><span style={{ color: '#6a9955' }}>, // years</span></div>
                <div className="pl-4"><span style={{ color: '#9cdcfe' }}>stack</span><span style={{ color: '#cdd9e5' }}>: [</span></div>
                <div className="pl-8"><span style={{ color: '#ce9178' }}>"Python"</span><span style={{ color: '#cdd9e5' }}>, </span><span style={{ color: '#ce9178' }}>"TensorFlow"</span><span style={{ color: '#cdd9e5' }}>, </span><span style={{ color: '#ce9178' }}>"SQL"</span><span style={{ color: '#cdd9e5' }}>,</span></div>
                <div className="pl-8"><span style={{ color: '#ce9178' }}>"PyTorch"</span><span style={{ color: '#cdd9e5' }}>, </span><span style={{ color: '#ce9178' }}>"AWS"</span><span style={{ color: '#cdd9e5' }}>, </span><span style={{ color: '#ce9178' }}>"Power BI"</span></div>
                <div className="pl-4"><span style={{ color: '#cdd9e5' }}>],</span></div>
                <div className="pl-4"><span style={{ color: '#9cdcfe' }}>openToWork</span><span style={{ color: '#cdd9e5' }}>: </span><span style={{ color: green }}>true</span></div>
                <div><span style={{ color: '#cdd9e5' }}>{'}'}</span><span style={{ color: cyan }}>;</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────── */}
      <section id="experience" className="py-20 px-6" style={{ background: bg }}>
        <div className="container mx-auto max-w-5xl">
          <SectionHeader num="02" title="Experience" />

          <div style={{ position: 'relative' }}>
            {/* timeline line */}
            <div style={{
              position: 'absolute', left: '15px', top: 0, bottom: 0, width: '1px',
              background: `linear-gradient(to bottom, ${cyan}50, transparent)`,
            }} />

            <div className="space-y-8 pl-12">
              {experiences.map((exp, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  {/* dot */}
                  <div style={{
                    position: 'absolute', left: '-37px', top: '24px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: cyan, border: `2px solid ${bg}`,
                    boxShadow: `0 0 10px ${cyan}70`,
                  }} />

                  <div className="p-6 rounded-xl transition-all duration-300"
                    style={{ background: bgCard, border: `1px solid ${borderBase}` }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${cyan}40`; e.currentTarget.style.boxShadow = `0 0 20px rgba(0,212,255,0.07)`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = borderBase; e.currentTarget.style.boxShadow = 'none'; }}>

                    <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1" style={{ color: textMain }}>{exp.title}</h3>
                        <p className="font-semibold" style={{ color: cyan }}>{exp.company}</p>
                        <p className="text-xs flex items-center gap-1 mt-1" style={{ color: textDim }}>
                          <MapPin className="h-3 w-3" /> {exp.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 rounded text-xs font-mono"
                          style={{ border: `1px solid ${cyan}35`, color: cyan, background: `${cyan}0a` }}>
                          {exp.type}
                        </span>
                        <p className="text-xs mt-2 flex items-center gap-1 justify-end" style={{ color: textDim }}>
                          <Calendar className="h-3 w-3" /> {exp.period}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {exp.achievements.map((a, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="font-mono text-sm mt-0.5 flex-shrink-0" style={{ color: green }}>›</span>
                          <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────── */}
      <section id="skills" className="py-20 px-6" style={{ background: bgAlt }}>
        <div className="container mx-auto max-w-6xl">
          <SectionHeader num="03" title="Technical Skills" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(skills).map(([category, data]) => {
              const Icon = data.icon;
              return (
                <div key={category} className="p-6 rounded-xl transition-all duration-300"
                  style={{ background: bgCard, border: `1px solid ${data.accent}22` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${data.accent}50`; e.currentTarget.style.boxShadow = `0 0 22px ${data.accent}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${data.accent}22`; e.currentTarget.style.boxShadow = 'none'; }}>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded" style={{ background: `${data.accent}12`, border: `1px solid ${data.accent}28` }}>
                      <Icon className="h-5 w-5" style={{ color: data.accent }} />
                    </div>
                    <h3 className="font-mono text-sm font-semibold" style={{ color: data.accent }}>{category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {data.items.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 rounded text-xs font-mono"
                        style={{ background: `${data.accent}0c`, border: `1px solid ${data.accent}22`, color: textMuted }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────── */}
      <section id="projects" className="py-20 px-6" style={{ background: bg }}>
        <div className="container mx-auto max-w-6xl">
          <SectionHeader num="04" title="Projects" />

          {error && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.28)', color: '#f59e0b' }}>
                <AlertCircle className="h-3 w-3" /> {error}
              </div>
            </div>
          )}

          <div className="flex gap-2 flex-wrap mb-8">
            {getProjectCategories().map(filter => (
              <button key={filter} onClick={() => setProjectFilter(filter)}
                className="px-3 py-1 rounded text-xs font-mono transition-all duration-200"
                style={{
                  background: projectFilter === filter ? `${cyan}12` : 'transparent',
                  border: `1px solid ${projectFilter === filter ? cyan : borderBase}`,
                  color: projectFilter === filter ? cyan : textMuted,
                }}>
                {filter === 'all' ? '[ all ]' : `[ ${filter.replace('-', '_')} ]`}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-6 rounded-xl animate-pulse"
                  style={{ background: bgCard, border: `1px solid ${borderBase}` }}>
                  <div className="h-5 rounded mb-3" style={{ background: darkMode ? '#1e3a5f' : '#e2e8f0' }} />
                  <div className="h-4 rounded mb-2 w-3/4" style={{ background: darkMode ? '#1e3a5f' : '#e2e8f0' }} />
                  <div className="h-4 rounded w-1/2" style={{ background: darkMode ? '#1e3a5f' : '#e2e8f0' }} />
                </div>
              ))
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <div key={project.id} className="p-6 rounded-xl transition-all duration-300 group"
                  style={{
                    background: bgCard,
                    border: `1px solid ${borderBase}`,
                    borderTop: `2px solid ${cyan}`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 22px rgba(0,212,255,0.09)`; e.currentTarget.style.borderColor = `${cyan}40`; e.currentTarget.style.borderTopColor = cyan; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = borderBase; e.currentTarget.style.borderTopColor = cyan; }}>

                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-sm leading-snug pr-2" style={{ color: textMain }}>{project.title}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.homepage && (
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" style={{ color: textDim }}
                            onMouseEnter={e => e.target.style.color = cyan}
                            onMouseLeave={e => e.target.style.color = textDim} />
                        </a>
                      )}
                      <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" style={{ color: textDim }}
                          onMouseEnter={e => e.target.style.color = cyan}
                          onMouseLeave={e => e.target.style.color = textDim} />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed mb-4" style={{ color: textMuted }}>{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.language && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono flex items-center gap-1"
                        style={{
                          background: `${langColor(project.language, project.languageColor)}18`,
                          border: `1px solid ${langColor(project.language, project.languageColor)}38`,
                          color: langColor(project.language, project.languageColor),
                        }}>
                        <span className="w-1.5 h-1.5 rounded-full"
                          style={{ background: langColor(project.language, project.languageColor) }} />
                        {project.language}
                      </span>
                    )}
                    {project.topics.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{ background: `${cyan}0a`, border: `1px solid ${cyan}22`, color: `${cyan}99` }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs font-mono" style={{ color: textDim }}>
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {project.stars}</span>
                      <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {project.forks}</span>
                    </div>
                    <span>{formatDate(project.updated_at)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="font-mono text-sm" style={{ color: textDim }}>{'// no projects in this category'}</p>
                <button onClick={fetchGithubProjects}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-mono"
                  style={{ border: `1px solid ${cyan}40`, color: cyan }}>
                  <RefreshCw className="h-4 w-4" /> retry()
                </button>
              </div>
            )}
          </div>

          {!loading && githubProjects.length > 0 && (
            <div className="text-center mt-10">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono text-sm transition-all duration-200"
                style={{ border: `1px solid ${cyan}35`, color: cyan }}
                onMouseEnter={e => { e.currentTarget.style.background = `${cyan}0a`; e.currentTarget.style.boxShadow = `0 0 18px ${cyan}18`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
                <Github className="h-4 w-4" /> view_all_repos →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────── */}
      <section id="certifications" className="py-20 px-6" style={{ background: bgAlt }}>
        <div className="container mx-auto max-w-6xl">
          <SectionHeader num="05" title="Certifications" />

          <div className="grid md:grid-cols-2 gap-5">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-xl transition-all duration-300"
                style={{ background: bgCard, border: `1px solid ${borderBase}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${cyan}40`; e.currentTarget.style.boxShadow = `0 0 16px rgba(0,212,255,0.07)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = borderBase; e.currentTarget.style.boxShadow = 'none'; }}>
                <div className="flex-shrink-0 p-3 rounded-lg"
                  style={{ background: `${cyan}10`, border: `1px solid ${cyan}28` }}>
                  <Award className="h-6 w-6" style={{ color: cyan }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: textMain }}>{cert.name}</h3>
                  <p className="text-xs font-mono" style={{ color: textDim }}>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────── */}
      <section id="contact" className="py-20 px-6"
        style={{ background: bg, borderTop: `1px solid ${borderBase}` }}>
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="font-mono text-2xl font-bold" style={{ color: cyan }}>06.</span>
            <h2 className="text-3xl font-bold" style={{ color: textMain }}>Get In Touch</h2>
          </div>

          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: textMuted }}>
            Ready to transform your data into actionable insights? Let's discuss how we can leverage
            machine learning and AI to solve your business challenges.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {[
              { Icon: Mail, label: 'Email', value: 'tahashah366@gmail.com', href: 'mailto:tahashah366@gmail.com' },
              { Icon: Phone, label: 'Phone', value: '+92 341 2188932', href: 'tel:+923412188932' },
              { Icon: Linkedin, label: 'LinkedIn', value: 'TAHASHAH12', href: 'https://linkedin.com/in/TAHASHAH12' },
              { Icon: MapPin, label: 'Location', value: 'Karachi, Pakistan', href: null },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="p-5 rounded-xl transition-all duration-300"
                style={{ background: bgCard, border: `1px solid ${borderBase}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${cyan}40`; e.currentTarget.style.boxShadow = `0 0 16px rgba(0,212,255,0.06)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = borderBase; e.currentTarget.style.boxShadow = 'none'; }}>
                <Icon className="h-6 w-6 mx-auto mb-3" style={{ color: cyan }} />
                <p className="font-mono text-xs mb-1" style={{ color: textDim }}>{label}</p>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                    className="text-xs font-semibold transition-colors" style={{ color: textMain }}
                    onMouseEnter={e => e.target.style.color = cyan}
                    onMouseLeave={e => e.target.style.color = textMain}>
                    {value}
                  </a>
                ) : (
                  <p className="text-xs font-semibold" style={{ color: textMain }}>{value}</p>
                )}
              </div>
            ))}
          </div>

          <a href="mailto:tahashah366@gmail.com"
            className="inline-flex items-center gap-2 px-10 py-4 rounded font-mono font-semibold text-sm transition-all duration-300"
            style={{
              background: `rgba(0,212,255,0.07)`,
              border: `1px solid ${cyan}`,
              color: cyan,
              boxShadow: `0 0 20px rgba(0,212,255,0.12)`,
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 35px rgba(0,212,255,0.28)`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 20px rgba(0,212,255,0.12)`}>
            <Mail className="h-4 w-4" /> send_message()
          </a>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer className="py-5 px-6 text-center font-mono text-xs"
        style={{
          background: darkMode ? '#030810' : '#1e293b',
          color: darkMode ? '#374151' : '#94a3b8',
          borderTop: `1px solid ${darkMode ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.08)'}`,
        }}>
        <span style={{ color: cyan }}>©</span> 2025 Taha Shah
        <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
        <span>Built with React &amp; Tailwind</span>
      </footer>
    </div>
  );
};

export default Portfolio;
