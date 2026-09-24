const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
dotenv.config();

const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certification = require('../models/Certification');
const Achievement = require('../models/Achievement');
const SiteSettings = require('../models/SiteSettings');

const seedData = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    await mongoose.connect(connStr);
    console.log(`[Seed] Connected to MongoDB: ${connStr}`);

    // Clear existing collections
    await User.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Certification.deleteMany({});
    await Achievement.deleteMany({});
    await SiteSettings.deleteMany({});

    console.log('[Seed] Cleared existing data.');

    // 1. Create Admin User
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Srisarukumar@2004';
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const admin = await User.create({
      name: 'Sri Saru Kumar S',
      email: 'srisarukumar@gmail.com',
      passwordHash,
      role: 'admin',
    });
    console.log(`[Seed] Admin created: ${admin.email} / Password: ${adminPassword}`);

    // 2. Create Site Settings
    await SiteSettings.create({
      name: 'Sri Saru Kumar S',
      headline: 'Full Stack Developer',
      bio: 'Full Stack Developer with hands-on experience building end-to-end web applications using Node.js, Next.js, React, and TypeScript, backed by strong database fundamentals across SQL Server, MongoDB, and PostgreSQL. Comfortable owning a feature from database schema through backend APIs to a polished frontend, with a working knowledge of query optimization and agile team practices. Additional background in Python and data pipelines adds versatility for backend, data-adjacent, and integration work.',
      email: 'srisarukumar@gmail.com',
      phone: '+91 7871217677',
      location: 'Rajapalayam, Tamil Nadu, India',
      githubUrl: 'https://github.com/srisarukumar',
      linkedinUrl: 'https://linkedin.com/in/sri-saru-kumar-s-3a3781258/',
      leetcodeUsername: 'srisarukumar',
      resumeUrl: 'https://github.com/srisarukumar',
      profileImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SriSaruKumar',
      heroTitle: 'Sri Saru Kumar',
      heroSubtitle: 'Full Stack Developer & AI/ML Enthusiast',
    });
    console.log('[Seed] Site settings created.');

    // 3. Create Skills
    const skillsData = [
      // Languages & Frameworks
      { name: 'JavaScript', category: 'Programming', level: 'Advanced', order: 1 },
      { name: 'TypeScript', category: 'Programming', level: 'Advanced', order: 2 },
      { name: 'Node.js', category: 'Backend', level: 'Advanced', order: 3 },
      { name: 'Next.js', category: 'Frontend', level: 'Advanced', order: 4 },
      { name: 'React', category: 'Frontend', level: 'Advanced', order: 5 },
      { name: 'Flutter', category: 'Frontend', level: 'Intermediate', order: 6 },
      { name: 'Java', category: 'Programming', level: 'Intermediate', order: 7 },
      { name: 'Python', category: 'Programming', level: 'Advanced', order: 8 },

      // Databases
      { name: 'Microsoft SQL Server (SSMS)', category: 'Database', level: 'Advanced', order: 9 },
      { name: 'SQL Profiler', category: 'Database', level: 'Intermediate', order: 10 },
      { name: 'MongoDB', category: 'Database', level: 'Advanced', order: 11 },
      { name: 'PostgreSQL', category: 'Database', level: 'Intermediate', order: 12 },
      { name: 'SQL Query Optimization', category: 'Database', level: 'Advanced', order: 13 },

      // Backend & APIs
      { name: 'REST APIs', category: 'Backend', level: 'Expert', order: 14 },
      { name: 'Server-Side Rendering (Next.js)', category: 'Backend', level: 'Advanced', order: 15 },
      { name: 'Schema Design', category: 'Backend', level: 'Advanced', order: 16 },
      { name: 'Firebase', category: 'Backend', level: 'Intermediate', order: 17 },

      // Tools & Practices
      { name: 'Git & GitHub', category: 'Tools', level: 'Advanced', order: 18 },
      { name: 'Agile Teamwork', category: 'Tools', level: 'Advanced', order: 19 },
      { name: 'Code Reviews', category: 'Tools', level: 'Advanced', order: 20 },
      { name: 'Documentation', category: 'Tools', level: 'Advanced', order: 21 },

      // Data & Analytics
      { name: 'Pandas', category: 'Data & Analytics', level: 'Intermediate', order: 22 },
      { name: 'NumPy', category: 'Data & Analytics', level: 'Intermediate', order: 23 },
      { name: 'ETL/ELT Concepts', category: 'Data & Analytics', level: 'Intermediate', order: 24 },
      { name: 'Power BI', category: 'Data & Analytics', level: 'Intermediate', order: 25 },
      { name: 'Excel & Jupyter', category: 'Data & Analytics', level: 'Advanced', order: 26 },

      // Cloud & ML
      { name: 'AWS Awareness', category: 'Cloud', level: 'Beginner', order: 27 },
      { name: 'Scikit-learn', category: 'AI/ML', level: 'Intermediate', order: 28 },
      { name: 'TensorFlow', category: 'AI/ML', level: 'Intermediate', order: 29 },
      { name: 'Feature Engineering', category: 'AI/ML', level: 'Intermediate', order: 30 },
    ];
    await Skill.insertMany(skillsData);
    console.log(`[Seed] ${skillsData.length} Skills created.`);

    // 4. Create Experience
    const expData = [
      {
        company: 'Acadtours Global',
        role: 'Full Stack Development Intern',
        location: 'Remote / Hybrid',
        startDate: 'Mar 2026',
        endDate: 'Aug 2026',
        description: [
          'Built the frontend, backend, and database layer for a Skill Intelligence Platform using Next.js, React, TypeScript, and Node.js, owning features end-to-end from schema to UI.',
          'Designed and managed relational data in Microsoft SQL Server (SSMS), using SQL Profiler to diagnose and optimize slow queries, and integrated MongoDB for flexible, semi-structured data.',
          'Built and consumed REST APIs connecting the frontend to backend services, and collaborated in an agile workflow applying code review and version control practices.',
        ],
        technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'SQL Server', 'MongoDB', 'REST APIs'],
        order: 1,
      },
      {
        company: 'Jupiter Brothers',
        role: 'Data Science Intern',
        location: 'Remote',
        startDate: 'Mar 2024',
        endDate: 'Jul 2024',
        description: [
          'Wrote Python scripts to clean, transform, and process large datasets, improving downstream processing efficiency by 20%.',
          'Built repeatable data pipelines to structure raw data for reporting and forecasting use cases.',
        ],
        technologies: ['Python', 'Pandas', 'NumPy', 'Data Pipelines', 'ETL'],
        order: 2,
      },
      {
        company: 'Geons Logix',
        role: 'Python & ML Intern',
        location: 'Remote',
        startDate: 'Apr 2023',
        endDate: 'May 2023',
        description: [
          'Built and evaluated Python-based ML prototypes, applying feature engineering and documenting technical findings for the team.',
        ],
        technologies: ['Python', 'Machine Learning', 'Feature Engineering', 'Scikit-learn'],
        order: 3,
      },
    ];
    await Experience.insertMany(expData);
    console.log(`[Seed] ${expData.length} Experience entries created.`);

    // 5. Create Projects
    const projectsData = [
      {
        title: 'Adaptive Retail Demand Forecasting',
        slug: 'adaptive-retail-demand-forecasting',
        shortDescription: 'AI-driven forecasting system with Python model, Node.js API server, and React dashboard.',
        description: 'Built a comprehensive forecasting system with a Python-based machine learning model for demand prediction, a Node.js backend serving prediction results via REST APIs, and a sleek React/TypeScript dashboard to present dynamic analytics, trend visualizations, and inventory recommendations.',
        technologies: ['Python', 'React', 'TypeScript', 'Node.js', 'Machine Learning', 'REST APIs'],
        githubUrl: 'https://github.com/srisarukumar/retail-demand-forecasting',
        liveUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        featured: true,
        startDate: 'Jan 2024',
        endDate: 'Apr 2024',
        status: 'Completed',
        order: 1,
      },
      {
        title: 'Job Recruitment Portal',
        slug: 'job-recruitment-portal',
        shortDescription: 'Full-stack MERN web app supporting candidate matching and application workflows.',
        description: 'Built a MERN-stack web application with database schema design and backend data flow to support candidate-matching features, employer job postings, applicant tracking, and interactive resume evaluations.',
        technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS'],
        githubUrl: 'https://github.com/srisarukumar/job-recruitment-portal',
        liveUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
        featured: true,
        startDate: 'Sep 2023',
        endDate: 'Dec 2023',
        status: 'Completed',
        order: 2,
      },
      {
        title: 'Finance Management App',
        slug: 'finance-management-app',
        shortDescription: 'Full-stack mobile app with real-time financial dashboards and Firebase database.',
        description: 'Built a full-stack mobile app with real-time dashboards and a structured Firebase database schema for tracking, categorizing, and summarizing user transactions, income streams, and personal budget goals.',
        technologies: ['Flutter', 'Node.js', 'Firebase', 'REST APIs'],
        githubUrl: 'https://github.com/srisarukumar/finance-management-app',
        liveUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
        featured: true,
        startDate: 'May 2023',
        endDate: 'Aug 2023',
        status: 'Completed',
        order: 3,
      },
    ];
    await Project.insertMany(projectsData);
    console.log(`[Seed] ${projectsData.length} Projects created.`);

    // 6. Create Education
    const eduData = [
      {
        institution: 'Ramco Institute of Technology',
        degree: 'B.Tech',
        field: 'Information Technology',
        startYear: '2022',
        endYear: '2026',
        description: 'Comprehensive study of Information Technology, Data Structures, Web Development, Database Management, and Machine Learning concepts.',
        cgpa: '8.05',
        order: 1,
      },
    ];
    await Education.insertMany(eduData);
    console.log(`[Seed] ${eduData.length} Education entries created.`);

    // 7. Create Certifications
    const certsData = [
      {
        name: 'NPTEL – Data Science using Python',
        issuer: 'NPTEL / IIT',
        issueDate: '2023',
        credentialId: 'NPTEL-DS-PY-2023',
        credentialUrl: 'https://nptel.ac.in',
        order: 1,
      },
      {
        name: 'NPTEL – Business Intelligence and Analytics',
        issuer: 'NPTEL / IIT',
        issueDate: '2023',
        credentialId: 'NPTEL-BI-AN-2023',
        credentialUrl: 'https://nptel.ac.in',
        order: 2,
      },
    ];
    await Certification.insertMany(certsData);
    console.log(`[Seed] ${certsData.length} Certifications created.`);

    // 8. Create Achievements
    const achData = [
      {
        title: 'UI/UX Lead & ACM Secretary',
        description: 'Serving as UI/UX Lead at Google Developer Group (GDG), Ramco Institute of Technology, and Secretary for the ACM Student Chapter.',
        organization: 'GDG & ACM Student Chapter',
        date: '2023 - 2026',
        position: 'Leadership',
        proofUrl: '',
        order: 1,
      },
      {
        title: 'Finalist – Prodalytics Data Visualization Challenge',
        description: 'Selected as a national finalist in the Prodalytics Data Visualization Challenge for outstanding dashboard design and business insight delivery.',
        organization: 'Prodalytics',
        date: '2024',
        position: 'Finalist',
        proofUrl: '',
        order: 2,
      },
    ];
    await Achievement.insertMany(achData);
    console.log(`[Seed] ${achData.length} Achievements created.`);

    console.log('--- SEED COMPLETED SUCCESSFULLY ---');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedData();
