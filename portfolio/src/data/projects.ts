export interface Project {
  slug: string
  title: string
  subtitle: string
  year: string
  role: string
  client?: string
  stack: string[]
  shortDesc: string
  description: string
  highlights: string[]
  architecture: string
  liveUrl: string
  githubUrl: string
  image: string
  accentColor: string
  category: 'Full Stack' | 'Distributed Systems' | 'Mobile & Cloud' | 'Creative Web'
}

export const PROJECTS: Project[] = [
  {
    slug: 'aether-os',
    title: 'AetherOS',
    subtitle: 'Neural Canvas & AI Collaborative Workspace',
    year: '2025',
    role: 'Lead Architect & Full Stack Engineer',
    client: 'Autonomous Labs',
    category: 'Full Stack',
    stack: ['MERN', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'WebSockets', 'GSAP'],
    shortDesc: 'Infinite spatial canvas unifying multi-agent neural graph reasoning with low-latency multiplayer syncing.',
    description: 'AetherOS bridges generative neural computation with infinite canvas interaction. Engineered a zero-latency bidirectional state synchronizer over WebSockets, custom vector similarity search querying over 10M token embeddings in <40ms, and reactive node graph rendering delivering silky 60fps canvas panning.',
    highlights: [
      'Sub-40ms vector similarity querying on high-dimensional embeddings',
      'Real-time CRDT multiplayer syncing supporting 150+ concurrent nodes',
      'Custom GPU-accelerated node graph layout engine with dynamic LOD'
    ],
    architecture: 'MERN stack backend orchestrated via Node.js cluster workers, PostgreSQL with pgvector for neural memory retention, Python microservices executing graph tensor operations, and a bespoke WebGL-accelerated React frontend.',
    liveUrl: 'https://aether-os.demo',
    githubUrl: 'https://github.com/jevinparmar/aether-os',
    image: '/projects/aether.jpg',
    accentColor: '#a855f7'
  },
  {
    slug: 'hyperscale-engine',
    title: 'HyperScale Engine',
    subtitle: 'Real-Time Distributed Telemetry & Analytics Platform',
    year: '2024',
    role: 'Backend & Systems Engineer',
    client: 'DataVortex Cloud',
    category: 'Distributed Systems',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'React', 'Docker'],
    shortDesc: 'High-throughput event streaming platform processing 800,000+ events per second with sub-20ms cluster latency.',
    description: 'Constructed an enterprise-grade operational telemetry backbone capable of ingesting volatile metric bursts. Implemented parallel worker pools in Java with lock-free ring buffers, real-time aggregation partitions in Redis, and persistent write-behind pipelines to PostgreSQL.',
    highlights: [
      'Sustained 800k events/sec throughput with 99.99% fault tolerance',
      'Sub-20ms P99 cluster query latency across distributed nodes',
      'Automated memory self-healing and zero-downtime rolling upgrades'
    ],
    architecture: 'Multi-threaded Java Spring Boot microservice mesh backed by Redis in-memory ring buffers, PostgreSQL time-series partitions, and a reactive dashboard with WebSockets.',
    liveUrl: 'https://hyperscale-engine.demo',
    githubUrl: 'https://github.com/jevinparmar/hyperscale-engine',
    image: '/projects/hyperscale.jpg',
    accentColor: '#c084fc'
  },
  {
    slug: 'nexus-pay',
    title: 'Nexus Pay',
    subtitle: 'Next-Gen Cross-Platform Mobile FinTech Suite',
    year: '2024',
    role: 'Mobile Lead & Full Stack Developer',
    client: 'Nexus Financial Global',
    category: 'Mobile & Cloud',
    stack: ['Flutter', 'Firebase', 'Python', 'PostgreSQL', 'Dart', 'FastAPI'],
    shortDesc: 'Multi-currency digital banking and portfolio telemetry mobile experience with zero-knowledge biometric verification.',
    description: 'Designed and deployed a flagship iOS and Android application with Flutter. Integrated hardware-backed biometric security, offline-first transaction ledgers with Firebase sync, and Python microservices executing real-time fraud scoring.',
    highlights: [
      '4.9★ rating across 35,000+ active mobile beta users',
      'Zero-knowledge hardware enclave biometric authentication',
      'Instantaneous multi-currency fiat & crypto portfolio settlement'
    ],
    architecture: 'Clean Architecture Flutter client consuming secure FastAPI endpoints, backed by Firebase Cloud Messaging & PostgreSQL transaction vaults.',
    liveUrl: 'https://nexus-pay.demo',
    githubUrl: 'https://github.com/jevinparmar/nexus-pay',
    image: '/projects/nexus.jpg',
    accentColor: '#d946ef'
  },
  {
    slug: 'pulse-studio',
    title: 'Pulse Studio',
    subtitle: 'Headless 3D Commerce & Interactive Fashion Visualizer',
    year: '2024',
    role: 'Creative Developer & Frontend Lead',
    client: 'Pulse Atelier',
    category: 'Creative Web',
    stack: ['MERN', 'React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Stripe'],
    shortDesc: 'Award-winning luxury commerce experience combining interactive 3D product inspection with sub-second page loads.',
    description: 'An editorial e-commerce platform blending cinematic product showcases with rock-solid shopping infrastructure. Features custom shaders, kinetic typography, smooth page-wipe transitions, and a headless MERN backend with Stripe checkout.',
    highlights: [
      'Sub-second first contentful paint (0.7s) on luxury catalog pages',
      'Fluid 60fps orbital 3D wireframe and reflectance previews',
      'Recognized on Awwwards Site of the Day for e-commerce design'
    ],
    architecture: 'Headless Node.js / Express catalog API, MongoDB cluster for inventory persistence, React + GSAP frontend with WebGL canvas shader modules.',
    liveUrl: 'https://pulse-studio.demo',
    githubUrl: 'https://github.com/jevinparmar/pulse-studio',
    image: '/projects/pulse.jpg',
    accentColor: '#9333ea'
  }
]
