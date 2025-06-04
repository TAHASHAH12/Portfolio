import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Code, Database, Brain, TrendingUp, Award, Calendar, ArrowRight, ExternalLink, Download, Play, Pause } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [skillAnimations, setSkillAnimations] = useState({});
  const [projectFilter, setProjectFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  
  const roles = [
    'Data Scientist',
    'Machine Learning Engineer', 
    'AI/ML Specialist',
    'Data Analytics Expert',
    'Business Intelligence Developer'
  ];

  const skills = {
    'Machine Learning': {
      items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
      color: 'from-blue-500 to-purple-600',
      icon: Brain
    },
    'Data Science': {
      items: ['Python', 'R', 'Statistics', 'Predictive Modeling', 'Feature Engineering', 'Data Mining'],
      color: 'from-green-500 to-teal-600', 
      icon: TrendingUp
    },
    'Data Engineering': {
      items: ['SQL', 'NoSQL', 'Apache Spark', 'Hadoop', 'ETL', 'Data Pipelines'],
      color: 'from-orange-500 to-red-600',
      icon: Database
    },
    'Visualization & BI': {
      items: ['Power BI', 'Tableau', 'D3.js', 'Plotly', 'Matplotlib', 'Seaborn'],
      color: 'from-pink-500 to-rose-600',
      icon: Code
    }
  };

  const experiences = [
    {
      title: 'Co-Founder',
      company: 'CGWS (Come Grow With Us)',
      location: 'Pakistan',
      period: 'Present',
      type: 'Leadership',
      achievements: [
        'Led data-driven growth strategies achieving 35% revenue increase',
        'Implemented ML models for market analysis and customer segmentation',
        'Built automated reporting systems reducing manual work by 60%',
        'Established data governance framework improving decision-making by 40%'
      ]
    },
    {
      title: 'Data Analyst',
      company: 'IAL Saatchi & Saatchi',
      location: 'Karachi',
      period: 'Oct 2024 - Mar 2025',
      type: 'Analytics',
      achievements: [
        'Developed ML models for campaign performance optimization',
        'Created real-time dashboards processing 10M+ data points daily',
        'Implemented A/B testing frameworks improving conversion by 25%',
        'Built predictive models for customer lifetime value estimation'
      ]
    },
    {
      title: 'Data Analyst Intern',
      company: 'ACM - Association For Computing Machinery',
      location: 'Seattle, USA',
      period: 'Apr - Sep 2024',
      type: 'Research',
      achievements: [
        'Developed advanced ML algorithms improving accuracy by 15%',
        'Optimized data preprocessing pipelines reducing processing time by 20%',
        'Created interactive visualizations increasing stakeholder engagement by 25%',
        'Published research on machine learning optimization techniques'
      ]
    },
    {
      title: 'Operations Intern',
      company: 'PowerHouse.so',
      location: 'California, USA',
      period: 'Jun - Sep 2024',
      type: 'Operations',
      achievements: [
        'Applied data analytics to optimize operational processes',
        'Developed predictive maintenance models reducing costs by 10%',
        'Created automated inventory management system using ML',
        'Implemented process mining techniques for workflow optimization'
      ]
    }
  ];

  const projects = [
    {
      title: 'Predictive Analytics Dashboard',
      category: 'ml',
      tech: ['Python', 'TensorFlow', 'React', 'D3.js'],
      description: 'Real-time ML dashboard for business forecasting with 95% accuracy',
      metrics: ['95% Accuracy', '10M+ Data Points', 'Real-time Processing']
    },
    {
      title: 'Customer Segmentation Engine',
      category: 'data-science',
      tech: ['Python', 'Scikit-learn', 'Clustering', 'SQL'],
      description: 'ML-powered customer segmentation increasing conversion by 35%',
      metrics: ['35% Conversion Increase', '50K+ Customers', 'Auto-Segmentation']
    },
    {
      title: 'Neural Network Optimizer',
      category: 'ml',
      tech: ['PyTorch', 'CUDA', 'Python', 'Docker'],
      description: 'Custom neural network architecture with 20% performance improvement',
      metrics: ['20% Performance Boost', 'GPU Optimized', 'Production Ready']
    }
  ];

  // Scroll and animation effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Role rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Particle animation
  useEffect(() => {
    if (!particlesEnabled) return;
    
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(102, 126, 234, 0.1)';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [particlesEnabled, darkMode]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const SkillCard = ({ category, data, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = data.icon;
    
    return (
      <div 
        className={`group relative p-6 rounded-2xl bg-gradient-to-br ${data.color} transform transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer`}
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Icon className="h-8 w-8 text-white mr-3" />
            <h3 className="text-xl font-bold text-white">{category}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.items.map((skill, idx) => (
              <span 
                key={idx}
                className={`px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white font-medium transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ExperienceCard = ({ exp, index }) => (
    <div className={`relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-l-4 border-gradient-to-b from-blue-500 to-purple-600`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{exp.company}</p>
          <p className="text-gray-600 dark:text-gray-300 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {exp.location}
          </p>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            {exp.type}
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {exp.period}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {exp.achievements.map((achievement, idx) => (
          <div key={idx} className="flex items-start">
            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ProjectCard = ({ project, index }) => (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors cursor-pointer" />
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs font-medium text-gray-900 dark:text-white">{metric}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Taha Shah
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize font-medium transition-all duration-300 hover:text-blue-600 ${activeSection === item ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setParticlesEnabled(!particlesEnabled)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {particlesEnabled ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Particle Background */}
      <canvas
        id="particles"
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: particlesEnabled ? 1 : 0 }}
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Taha Shah</span>
            </h1>
            
            <div className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 h-12 flex items-center justify-center">
              <span className={`transition-all duration-500 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
                {roles[currentRole]}
              </span>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Passionate about transforming data into actionable insights through advanced machine learning, 
              statistical analysis, and innovative AI solutions. Bachelor's Degree in Computer Science from FAST NUCES 
              while building the future of data-driven decision making.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
  <button
    onClick={() => scrollToSection('projects')}
    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    View My Work
  </button>

  <button
    onClick={() => scrollToSection('contact')}
    className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    Get In Touch
  </button>

  <a
    href="https://drive.google.com/file/d/1eQ_uho2TXx3YY9FO_citMuuCTXQJtYsO/view?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center">
      <Download className="h-5 w-5 mr-2" />
      Download CV
    </button>
  </a>
</div>

          
          <div className="flex justify-center space-x-6">
            <a href="mailto:tahashah366@gmail.com" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Mail className="h-6 w-6 text-blue-600" />
            </a>
            <a href="https://linkedin.com/in/taha-shah123" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Linkedin className="h-6 w-6 text-blue-600" />
            </a>
            <a href="https://github.com/TAHASHAH12/" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Github className="h-6 w-6 text-blue-600" />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-blue-600" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a passionate Data Scientist and Machine Learning Engineer with a strong foundation in 
                computer science and hands-on experience in building scalable ML solutions. My expertise 
                spans from data preprocessing and feature engineering to deploying production-ready models.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Currently pursuing my Bachelor's in Computer Science at NUCES, I've worked with leading 
                organizations like IAL Saatchi & Saatchi and ACM, where I've consistently delivered 
                measurable improvements through innovative data science approaches.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">35+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ML Models Built</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Model Accuracy</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">10M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Data Points Processed</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">3+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Brain className="h-24 w-24 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">AI/ML Focused</h3>
                    <p className="text-lg opacity-90">Building intelligent solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, data], index) => (
              <SkillCard key={category} category={category} data={data} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
              {['all', 'ml', 'data-science'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  className={`px-6 py-2 rounded-full capitalize font-medium transition-all duration-300 ${
                    projectFilter === filter 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  {filter === 'all' ? 'All Projects' : filter.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter(project => projectFilter === 'all' || project.category === projectFilter)
              .map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Build Something Amazing Together</h2>
          <p className="text-xl mb-12 opacity-90">
            Ready to transform your data into actionable insights? Let's discuss how we can leverage 
            machine learning and data science to solve your business challenges.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm opacity-90">tahashah366@gmail.com</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-sm opacity-90">+92 341 2188932</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
              <Linkedin className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm opacity-90">taha-shah123</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300">
              <MapPin className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm opacity-90">Karachi, Pakistan</p>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = 'mailto:tahashah366@gmail.com'}
            className="px-12 py-4 bg-white text-blue-900 font-bold rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start a Conversation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white text-center">
        <p>&copy; 2025 Taha Shah. Built with React.js & Machine Learning in mind.</p>
      </footer>
    </div>
  );
};

export default Portfolio;