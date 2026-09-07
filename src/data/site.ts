export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Why Tevexxo", to: "/why-tevexxo" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Templates", to: "/templates" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export const MEGA_SERVICES = [
  {
    icon: "Globe",
    name: "Website Development",
    desc: "Fast, scalable, conversion-focused websites.",
  },
  { icon: "LayoutDashboard", name: "Web Applications", desc: "Custom platforms and dashboards." },
  { icon: "Smartphone", name: "Mobile Applications", desc: "iOS and Android products people keep." },
  { icon: "PenTool", name: "UI/UX Design", desc: "Interfaces engineered around behaviour." },
  { icon: "BrainCircuit", name: "AI Solutions", desc: "Assistants, automation, intelligent search." },
  { icon: "ShoppingBag", name: "E-Commerce", desc: "Storefronts built to sell at scale." },
  { icon: "Boxes", name: "SaaS Development", desc: "Multi-tenant products, billing, analytics." },
  { icon: "Layers", name: "Website Templates", desc: "Premium templates ready to launch." },
] as const;

export const SERVICES = [
  {
    icon: "Globe",
    title: "Web Development",
    desc: "Production-grade websites engineered for speed, SEO, and scale.",
    points: ["Marketing sites", "Corporate portals", "Headless CMS"],
  },
  {
    icon: "Smartphone",
    title: "App Development",
    desc: "Cross-platform mobile products from prototype to store launch.",
    points: ["iOS & Android", "Offline-first", "Push & analytics"],
  },
  {
    icon: "PenTool",
    title: "UI/UX Design",
    desc: "Design systems, prototypes, and interfaces that feel inevitable.",
    points: ["Design systems", "Prototyping", "Usability testing"],
  },
  {
    icon: "BrainCircuit",
    title: "AI Solutions",
    desc: "Assistants, RAG search, and intelligent workflows on your data.",
    points: ["LLM assistants", "RAG pipelines", "Vision & OCR"],
  },
  {
    icon: "ShoppingBag",
    title: "E-Commerce",
    desc: "Storefronts, checkouts, and catalogues engineered for conversion.",
    points: ["Headless commerce", "Payments", "Subscriptions"],
  },
  {
    icon: "Boxes",
    title: "SaaS Products",
    desc: "Multi-tenant architecture, billing, roles, and analytics built in.",
    points: ["Auth & roles", "Billing", "Usage analytics"],
  },
  {
    icon: "Workflow",
    title: "Business Automation",
    desc: "Remove manual work with integrations and internal tooling.",
    points: ["Integrations", "Internal tools", "Reporting"],
  },
  {
    icon: "Layers",
    title: "Website Templates",
    desc: "Premium, customisable templates for teams that need to move now.",
    points: ["8 categories", "Fully responsive", "Launch in days"],
  },
] as const;

export const WHY = [
  {
    n: "01",
    title: "Custom Solutions",
    desc: "Every project is designed around the unique needs of the client.",
    icon: "Sparkles",
  },
  {
    n: "02",
    title: "Modern Technology",
    desc: "We use modern technologies and scalable architectures.",
    icon: "Cpu",
  },
  {
    n: "03",
    title: "Creative Thinking",
    desc: "We combine creativity with engineering.",
    icon: "Lightbulb",
  },
  {
    n: "04",
    title: "Client Focused",
    desc: "We work closely with clients from idea to launch.",
    icon: "Users",
  },
  {
    n: "05",
    title: "Future Ready",
    desc: "Our solutions are designed to grow with businesses.",
    icon: "Rocket",
  },
  {
    n: "06",
    title: "Quality First",
    desc: "Performance, design, security, and user experience matter.",
    icon: "ShieldCheck",
  },
] as const;

export const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Industries" },
  { value: 100, suffix: "%", label: "Commitment" },
] as const;

export const PROCESS = [
  { n: "01", title: "Discover", desc: "Understanding the client's idea and requirements." },
  { n: "02", title: "Design", desc: "Creating the user experience and visual identity." },
  { n: "03", title: "Develop", desc: "Building powerful and scalable technology." },
  { n: "04", title: "Test", desc: "Testing performance and quality." },
  { n: "05", title: "Launch", desc: "Taking the digital product live." },
] as const;

export const TECH = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "Python"] },
  { group: "Database", items: ["MongoDB", "PostgreSQL"] },
  { group: "AI", items: ["OpenAI", "TensorFlow", "PyTorch"] },
  { group: "Cloud", items: ["AWS", "Vercel", "Docker"] },
] as const;

export const TEMPLATES = [
  { name: "Corporate Website", tag: "Business", hue: "from-blue/30" },
  { name: "Portfolio Website", tag: "Personal", hue: "from-purple/30" },
  { name: "Startup Landing Page", tag: "Startup", hue: "from-cyan/30" },
  { name: "E-Commerce Website", tag: "Commerce", hue: "from-blue/30" },
  { name: "Restaurant Website", tag: "Hospitality", hue: "from-purple/30" },
  { name: "Healthcare Website", tag: "Health", hue: "from-cyan/30" },
  { name: "Education Website", tag: "Learning", hue: "from-blue/30" },
  { name: "Agency Website", tag: "Creative", hue: "from-purple/30" },
] as const;

export const POSTS = [
  {
    title: "The Future of AI-Powered Websites",
    excerpt:
      "Interfaces are becoming conversational, adaptive, and predictive. Here is what that means for your product.",
    tag: "AI",
    read: "6 min read",
    date: "Aug 2026",
  },
  {
    title: "How Businesses Can Build Better Digital Products",
    excerpt:
      "The gap between a good idea and a great product is process. A practical framework for teams of any size.",
    tag: "Strategy",
    read: "8 min read",
    date: "Jul 2026",
  },
  {
    title: "Why UI/UX Matters More Than Ever",
    excerpt:
      "Attention is the scarcest resource online. Design decides whether your product gets a second chance.",
    tag: "Design",
    read: "5 min read",
    date: "Jun 2026",
  },
  {
    title: "Website vs Mobile App: What Does Your Business Need?",
    excerpt:
      "A clear decision guide based on audience, budget, retention goals, and distribution.",
    tag: "Guide",
    read: "7 min read",
    date: "May 2026",
  },
] as const;
