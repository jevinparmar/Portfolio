export interface SkillCategory {
  category: string
  tagline: string
  skills: {
    name: string
    level: string
    description: string
  }[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Full-Stack Core & Web',
    tagline: 'High-availability architectures & scalable web applications',
    skills: [
      { name: 'MERN Stack', level: 'Mastery', description: 'MongoDB, Express.js, React, Node.js production ecosystem' },
      { name: 'React 18/19 & Next.js', level: 'Expert', description: 'Server components, reactive state patterns, custom hooks' },
      { name: 'TypeScript', level: 'Expert', description: 'Strict type safety, generics, enterprise-grade codebase rigor' },
      { name: 'Node.js & Express', level: 'Mastery', description: 'RESTful architectures, WebSockets, event-driven microservices' },
      { name: 'Tailwind CSS', level: 'Expert', description: 'Design tokens, fluid typography, responsive layout systems' }
    ]
  },
  {
    category: 'Systems & Backend Languages',
    tagline: 'Robust multi-threaded computation & distributed data pipelines',
    skills: [
      { name: 'Java', level: 'Advanced', description: 'Spring Boot, concurrency, enterprise system design, OOP design patterns' },
      { name: 'Python', level: 'Advanced', description: 'FastAPI, automated data pipelines, machine learning integration, scripting' },
      { name: 'PostgreSQL', level: 'Advanced', description: 'Relational schema modeling, index optimization, complex joins, pgvector' },
      { name: 'MongoDB', level: 'Mastery', description: 'Aggregation pipelines, document design, replication & sharding' }
    ]
  },
  {
    category: 'Mobile & Cloud Infrastructure',
    tagline: 'Cross-platform native applications and modern cloud hosting',
    skills: [
      { name: 'Flutter & Dart', level: 'Advanced', description: 'Cross-platform native mobile UI, state management, offline-first sync' },
      { name: 'Firebase', level: 'Advanced', description: 'Auth, Firestore, Cloud Functions, real-time sync, push notifications' },
      { name: 'Git & GitHub', level: 'Mastery', description: 'Advanced branching workflows, CI/CD actions, open-source governance' },
      { name: 'Docker', level: 'Proficient', description: 'Multi-stage containerization, local microservice orchestration' }
    ]
  },
  {
    category: 'Creative Motion & Interaction',
    tagline: 'Award-winning digital craft, 60fps animations & micro-interactions',
    skills: [
      { name: 'GSAP & ScrollTrigger', level: 'Expert', description: 'Timeline orchestration, scroll-bound pinning, scrub kinematics' },
      { name: 'Lenis', level: 'Expert', description: 'Inertial smooth scrolling synchronization with GSAP ticker' },
      { name: 'Motion (motion/react)', level: 'Expert', description: 'LayoutId shared transitions, spring physics, route transitions' },
      { name: 'WebGL & Canvas', level: 'Proficient', description: 'Custom shaders, particle fields, generative visual experiences' }
    ]
  }
]

export const MARQUEE_SKILLS = [
  'MERN STACK',
  'JAVA',
  'PYTHON',
  'FLUTTER',
  'POSTGRESQL',
  'FIREBASE',
  'TYPESCRIPT',
  'REACT',
  'NODE.JS',
  'GSAP / SCROLLTRIGGER',
  'GIT & GITHUB',
  'DOCKER',
  'FASTAPI',
  'SPRING BOOT'
]
