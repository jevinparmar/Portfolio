export interface ExperienceItem {
  period: string
  role: string
  company: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  current?: boolean
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2024 — PRESENT',
    role: 'Senior Full-Stack & Creative Developer',
    company: 'Apex Digital Labs',
    location: 'Remote / India',
    current: true,
    description: 'Leading frontend architecture and full-stack system implementation for high-profile client applications, interactive digital products, and real-time distributed platforms.',
    achievements: [
      'Architected micro-frontend suites reducing initial bundle size by 42% and raising Lighthouse performance scores to 95+',
      'Built reactive data streaming dashboards using Node.js, WebSockets, and GSAP with zero frame drops',
      'Mentored a team of 6 engineers across TypeScript rigor, animations, and CI/CD automated deployments'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GSAP', 'Docker', 'AWS']
  },
  {
    period: '2022 — 2024',
    role: 'Software Engineer (Backend & Web)',
    company: 'Vanguard Systems',
    location: 'India',
    description: 'Designed and deployed enterprise REST and GraphQL backend services in Java and Python, alongside modern React client portals.',
    achievements: [
      'Engineered Java Spring Boot transaction processors handling over 2M daily operations with 99.98% reliability',
      'Optimized PostgreSQL complex queries and database indexes, slashing latency by 65%',
      'Integrated Firebase real-time notifications and telemetry data pipelines'
    ],
    technologies: ['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'Firebase', 'React', 'Git']
  },
  {
    period: '2021 — 2022',
    role: 'Software Developer (Mobile & Web)',
    company: 'NovaCode Studio',
    location: 'India',
    description: 'Developed cross-platform mobile applications using Flutter and interactive web interfaces for startups and digital agencies.',
    achievements: [
      'Delivered 4 production Flutter mobile applications across iOS and Android with 100k+ collective downloads',
      'Spearheaded state management transitions and offline-first data caching architectures',
      'Collaborated closely with art directors to implement pixel-perfect micro-interactions'
    ],
    technologies: ['Flutter', 'Dart', 'MERN Stack', 'Firebase', 'REST APIs', 'Git/GitHub']
  }
]

export const STATS = [
  { label: 'Years of Experience', value: 4, suffix: '+', detail: 'Crafting production software' },
  { label: 'Completed Projects', value: 30, suffix: '+', detail: 'Enterprise & creative builds' },
  { label: 'Code Commits', value: 1800, suffix: '+', detail: 'Consistent GitHub cadence' },
  { label: 'System Uptime', value: 99.9, suffix: '%', detail: 'Resilient architecture record' }
]
