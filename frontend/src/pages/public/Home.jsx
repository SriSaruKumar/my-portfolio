import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../services/api';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowRight,
  ExternalLink,
  Code2,
  Database,
  Terminal,
  Cpu,
  GraduationCap,
  Briefcase,
  Award,
  Trophy,
  Send,
  CheckCircle2,
  Star,
  GitFork,
  BookOpen,
  CheckSquare,
  Sparkles,
  Layers,
  Wrench,
  BarChart3,
  Cloud,
  Brain,
} from 'lucide-react';

const Home = () => {
  const { settings } = useOutletContext();
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Contact Form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          skillsRes,
          projectsRes,
          expRes,
          eduRes,
          certRes,
          achRes,
          githubRes,
          leetcodeRes,
        ] = await Promise.allSettled([
          API.get('/skills'),
          API.get('/projects'),
          API.get('/experience'),
          API.get('/education'),
          API.get('/certifications'),
          API.get('/achievements'),
          API.get('/github'),
          API.get('/leetcode'),
        ]);

        if (skillsRes.status === 'fulfilled' && skillsRes.value.data.success) setSkills(skillsRes.value.data.data);
        if (projectsRes.status === 'fulfilled' && projectsRes.value.data.success) setProjects(projectsRes.value.data.data);
        if (expRes.status === 'fulfilled' && expRes.value.data.success) setExperience(expRes.value.data.data);
        if (eduRes.status === 'fulfilled' && eduRes.value.data.success) setEducation(eduRes.value.data.data);
        if (certRes.status === 'fulfilled' && certRes.value.data.success) setCertifications(certRes.value.data.data);
        if (achRes.status === 'fulfilled' && achRes.value.data.success) setAchievements(achRes.value.data.data);
        if (githubRes.status === 'fulfilled' && githubRes.value.data.success) setGithubStats(githubRes.value.data.data);
        if (leetcodeRes.status === 'fulfilled' && leetcodeRes.value.data.success) setLeetcodeStats(leetcodeRes.value.data.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormSuccess('');
    setFormError('');

    try {
      const res = await API.post('/contact', contactForm);
      if (res.data.success) {
        setFormSuccess(res.data.message || 'Thank you! Your message has been sent successfully.');
        setContactForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormError(res.data.message || 'Failed to send message.');
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error submitting message. Please check input fields.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming': return Terminal;
      case 'Frontend': return Code2;
      case 'Backend': return Layers;
      case 'Database': return Database;
      case 'AI/ML': return Brain;
      case 'Cloud': return Cloud;
      case 'Tools': return Wrench;
      case 'Data & Analytics': return BarChart3;
      default: return Cpu;
    }
  };

  return (
    <div className="space-y-28 pb-24">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-500/10 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Available for Full Stack & Engineering Opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            Hi, I'm{' '}
            <span className="gradient-text">
              {settings?.heroTitle || 'Sri Saru Kumar S'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 max-w-3xl mx-auto"
          >
            {settings?.heroSubtitle || 'Full Stack Developer & AI/ML Enthusiast'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Building end-to-end web applications with Node.js, Next.js, React, and TypeScript. Backed by solid database fundamentals in SQL Server, MongoDB, and PostgreSQL with Python data pipeline integration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="#projects"
              className="min-h-[44px] px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 flex items-center gap-2 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {settings?.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-7 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/80 text-gray-900 dark:text-gray-100 font-bold text-sm sm:text-base flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                <span>Download Resume</span>
              </a>
            )}

            <a
              href="#contact"
              className="min-h-[44px] px-7 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-sm sm:text-base flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center justify-center gap-4 pt-6 text-gray-500 dark:text-gray-400"
          >
            {settings?.githubUrl && (
              <a
                href={settings.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="min-w-[44px] min-h-[44px] p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-500 hover:border-blue-500 transition shadow-sm flex items-center justify-center"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {settings?.linkedinUrl && (
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="min-w-[44px] min-h-[44px] p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-500 hover:border-blue-500 transition shadow-sm flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                aria-label="Email Sri Saru Kumar"
                className="min-w-[44px] min-h-[44px] p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-500 hover:border-blue-500 transition shadow-sm flex items-center justify-center"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 flex flex-col items-center text-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 shadow-2xl">
                <img
                  src={settings?.profileImageUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=SriSaruKumar'}
                  alt="Sri Saru Kumar S"
                  className="w-full h-full rounded-full object-cover bg-gray-900"
                />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {settings?.name || 'Sri Saru Kumar S'}
              </h3>
              <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mt-1">
                {settings?.location || 'Rajapalayam, Tamil Nadu, India'}
              </p>
            </div>

            <div className="lg:col-span-2 space-y-5 text-gray-600 dark:text-gray-300 leading-relaxed">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">About Me</h2>
              <p className="text-base">
                {settings?.bio ||
                  'Full Stack Developer with hands-on experience building end-to-end web applications using Node.js, Next.js, React, and TypeScript. Comfortable owning features from database schema design to responsive frontend interfaces.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800 text-sm">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white block">Email:</span>
                  <a href={`mailto:${settings?.email}`} className="text-blue-500 hover:underline">
                    {settings?.email || 'srisarukumar@gmail.com'}
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white block">Phone:</span>
                  <span>{settings?.phone || '+91 7871217677'}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white block">Education:</span>
                  <span>B.Tech in IT (2022 - 2026)</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white block">Core Focus:</span>
                  <span>MERN Stack, Next.js & AI/ML</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Technical Skills</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Languages, frameworks, databases, and development tools I leverage for scalable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([category, items]) => {
            const CategoryIcon = getCategoryIcon(category);
            return (
              <div
                key={category}
                className="glass-card glass-card-hover p-6 rounded-2xl space-y-4"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2.5 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <span>{category}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill._id || skill.name}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-700/80"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Featured Projects</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
              Key applications designed and developed end-to-end.
            </p>
          </div>
          <Link
            to="/projects"
            className="text-blue-500 hover:text-blue-600 font-bold text-sm flex items-center gap-1 min-h-[44px] px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id || project.slug}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:shadow-2xl hover:border-blue-500/50 transition duration-300"
            >
              <div className="h-48 overflow-hidden relative bg-gray-800">
                <img
                  src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {project.featured && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition">
                    <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {project.shortDescription || project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800 text-xs font-bold">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    ) : <div></div>}

                    <Link
                      to={`/projects/${project.slug}`}
                      className="min-h-[36px] flex items-center gap-1 px-3 py-1.5 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Experience & Internships</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Professional development history across engineering team roles.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {experience.map((exp) => (
            <div key={exp._id || exp.company} className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                  <p className="text-base font-semibold text-blue-500">{exp.company}</p>
                </div>
                <div className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 w-fit">
                  {exp.startDate} – {exp.endDate || 'Present'}
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside leading-relaxed">
                {Array.isArray(exp.description)
                  ? exp.description.map((bullet, idx) => <li key={idx}>{bullet}</li>)
                  : <li>{exp.description}</li>}
              </ul>

              {exp.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CODING PROFILES SECTION */}
      <section id="coding-profiles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Coding Profiles & Statistics</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Synchronized activity metrics from GitHub and LeetCode.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GitHub Card */}
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gray-800 text-white">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">GitHub Profile</h3>
                  <p className="text-xs text-gray-400">@{githubStats?.username || 'srisarukumar'}</p>
                </div>
              </div>
              <a
                href={`https://github.com/${githubStats?.username || 'srisarukumar'}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub Profile"
                className="text-xs font-bold text-blue-500 flex items-center gap-1 hover:underline min-h-[36px] px-2"
              >
                <span>Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60">
                <BookOpen className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <span className="block text-2xl font-extrabold text-gray-900 dark:text-white">
                  {githubStats?.totalRepos || 0}
                </span>
                <span className="text-xs text-gray-500">Public Repos</span>
              </div>
              <div className="p-4 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60">
                <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="block text-2xl font-extrabold text-gray-900 dark:text-white">
                  {githubStats?.totalStars || 0}
                </span>
                <span className="text-xs text-gray-500">Stars</span>
              </div>
              <div className="p-4 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60">
                <GitFork className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <span className="block text-2xl font-extrabold text-gray-900 dark:text-white">
                  {githubStats?.totalForks || 0}
                </span>
                <span className="text-xs text-gray-500">Forks</span>
              </div>
            </div>

            {githubStats?.topRepos?.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Top Repositories</h4>
                <div className="space-y-2">
                  {githubStats.topRepos.slice(0, 3).map((repo) => (
                    <div key={repo.name} className="flex items-center justify-between text-xs p-3 rounded-xl bg-gray-100 dark:bg-gray-800/40">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{repo.name}</span>
                      <span className="text-gray-400">{repo.language}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* LeetCode Card */}
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">LeetCode Metrics</h3>
                  <p className="text-xs text-gray-400">@{leetcodeStats?.username || 'srisarukumar'}</p>
                </div>
              </div>
              <a
                href={`https://leetcode.com/${leetcodeStats?.username || 'srisarukumar'}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View LeetCode Profile"
                className="text-xs font-bold text-amber-500 flex items-center gap-1 hover:underline min-h-[36px] px-2"
              >
                <span>Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 text-center">
              <span className="block text-4xl font-black text-amber-500">
                {leetcodeStats?.totalSolved || 0}
              </span>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Total Solved Problems
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="block text-xl font-extrabold text-emerald-500">
                  {leetcodeStats?.easySolved || 0}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Easy</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <span className="block text-xl font-extrabold text-amber-500">
                  {leetcodeStats?.mediumSolved || 0}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Medium</span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <span className="block text-xl font-extrabold text-rose-500">
                  {leetcodeStats?.hardSolved || 0}
                </span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">Hard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Get In Touch</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Interested in collaboration or open positions? Send a direct message below.
          </p>
        </div>

        <div className="glass-card max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl shadow-xl">
          {formSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          {formError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold text-sm">
              {formError}
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="Project Inquiry / Job Opportunity"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={formSubmitting}
              className="w-full min-h-[48px] py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {formSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
