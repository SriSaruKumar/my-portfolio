const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Sri Saru Kumar S',
    },
    headline: {
      type: String,
      default: 'Full Stack Developer',
    },
    bio: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: 'srisarukumar@gmail.com',
    },
    phone: {
      type: String,
      default: '+91 7871217677',
    },
    location: {
      type: String,
      default: 'Rajapalayam, Tamil Nadu, India',
    },
    githubUrl: {
      type: String,
      default: 'https://github.com/srisarukumar',
    },
    githubUsername: {
      type: String,
      default: 'srisarukumar',
    },
    linkedinUrl: {
      type: String,
      default: 'https://linkedin.com/in/sri-saru-kumar-s-3a3781258/',
    },
    leetcodeUsername: {
      type: String,
      default: 'srisarukumar',
    },
    resumeUrl: {
      type: String,
      default: 'https://drive.google.com',
    },
    profileImageUrl: {
      type: String,
      default: '',
    },
    heroTitle: {
      type: String,
      default: 'Sri Saru Kumar',
    },
    heroSubtitle: {
      type: String,
      default: 'Full Stack Developer & AI/ML Enthusiast',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
