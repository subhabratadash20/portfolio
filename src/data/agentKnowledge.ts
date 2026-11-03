export interface KnowledgeTopic {
  keywords: string[];
  title: string;
  answer: string;
  category: "architecture" | "project" | "skills" | "contact" | "general" | "resume" | "experience" | "education";
}

export const AGENT_KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // 0. Realtime CV / Resume Generator Intent
  {
    category: "resume",
    keywords: ["cv", "resume", "curriculum vitae", "download cv", "get cv", "generate cv", "pdf resume", "biodata", "hire him", "recruit"],
    title: "Subhabrata Das — Realtime ATS Resume & CV",
    answer:
      "# SUBHABRATA DAS\n" +
      "**Flutter Developer | AI-Powered Application Specialist**\n" +
      "📍 Kolkata, India | 📞 [+91 6294321171](tel:+916294321171) | 📧 [subhabratadash1@gmail.com](mailto:subhabratadash1@gmail.com)\n" +
      "[LinkedIn](https://linkedin.com/in/subhabratadash) • [GitHub](https://github.com/subhabratadash20) • [Portfolio](https://subhabratadash20.github.io)\n\n" +
      "### Professional Summary\n" +
      "Results-driven Flutter Developer and AI-Powered Application Specialist with over **3 years** of professional experience in mobile application engineering and distributed backend systems. Specialized in architecting high-performance cross-platform applications, integrating advanced AI models (OpenAI GPT, Gemini 3.8 Flash, Claude, LangGraph), establishing autonomous agentic workflows, and implementing complex geolocation/geofencing systems. Proven track record delivering scalable apps using Flutter, Dart 3, Node.js 22 LTS, PostgreSQL, and Firebase following Clean Architecture principles.\n\n" +
      "### Professional Experience\n" +
      "**Software Developer | Weavers-web Solutions Pvt. Ltd.** (January 2023 – Present | Kolkata, India)\n" +
      "• Engineered and maintained production-grade cross-platform mobile applications for diverse industry sectors.\n" +
      "• Integrated AI features utilizing OpenAI, Gemini, and LangGraph platforms to deliver intelligent, user-aware capabilities.\n" +
      "• Implemented real-time asset tracking and geofencing capabilities for logistics and on-demand dispatch applications.\n" +
      "• Applied Multi-Threading concepts, isolate concurrency, and state management optimizations, reducing overall application load times by 30%.\n\n" +
      "### Technical Competencies\n" +
      "• **Mobile Development**: Flutter, Dart 3 (Sealed Classes, Records, Pattern Matching), Riverpod 3.3, GetX, Provider, Bloc, Clean Architecture, AutoRoute, GoRouter.\n" +
      "• **AI & Agentic Frameworks**: LangGraph Supervisor Agent, Planned Tool Palettes, OpenAI GPT & Realtime WebRTC, Gemini 3.8 Flash, Claude, FastAPI, Prompt Engineering.\n" +
      "• **Backend & Databases**: Node.js 22 LTS, FastAPI, PostgreSQL (Neon / Cloud SQL), Firebase Data Connect (GraphQL), Cloud Firestore, Redis, MongoDB Atlas, Hive (Local-First).\n" +
      "• **Geolocation & Hardware Bridges**: Google Maps API, Geofencing Radar, Real-Time Asset Tracking, iOS AlarmKit & EventKit (DND Bypass), Android AlarmManager Foreground Services.\n" +
      "• **Media & Streaming**: Agora WebRTC, Socket.IO Duplex, Mux RTMP Simulcast, Stripe Connect (Idempotent Split Payouts), Paystack, RevenueCat.\n" +
      "• **Languages & Tools**: Dart, Python, Java, C, PHP, TypeScript, SQL. Cursor, Antigravity, Windsurf, Claude Code, Git, GitHub, CI/CD, Postman.\n\n" +
      "### Production Applications & Architecture\n" +
      "1. **Nora AI (`naipa.ai`)**: Architect & Lead Developer — Autonomous AI executive companion with LangGraph supervisor routing, iOS AlarmKit / Android AlarmManager bridges, and duplex Socket.IO.\n" +
      "2. **BluFix AI (`ai.blufix`)**: Two-stage multimodal acoustic & vision failure analyzer, automated repair cost estimator, and live GPS Provider Radar dispatch.\n" +
      "3. **Etana Oroko (`myetana.com`)**: Dual-identity PostgreSQL + Firestore RTC, Gemini 3.8 Flash moderation, vector recommendation engine, and Agora WebRTC.\n" +
      "4. **Rent Roll Pulse (`com.rentroll.app`)**: Commercial real estate valuation engine calculating AAMI/AMI metrics with on-device vector PDF financial reports.\n" +
      "5. **Konnectax (`com.konnectax.app`)**: Simultaneous 3-platform RTMP live streaming (YouTube, Facebook, TikTok via Mux) with unified comments overlay.\n" +
      "6. **Plugg AI (`plugg.social`)**: Lead Mobile Developer — AI compatibility matchmaking, Socket.IO rich media chat, and RevenueCat in-app subscriptions.\n" +
      "7. **Stylaa**: Dual customer/merchant salon scheduling ecosystem and AI style suggestions.\n" +
      "8. **Flinki**: Sports matchmaking, tournament RSVP tracking, P2P equipment marketplace, and in-app video player.\n" +
      "9. **Groundmetrx**: Sub-meter GPS fleet tracking with automated polygon geofencing entry/exit alerts.\n" +
      "10. **Additional Shipped Apps**: DIY Marketplace (bilingual Arabic RTL commerce with Moyasar), Family Bond, TradeMaza, MOTQAN / Time Piece Gentleman.\n\n" +
      "### Education & Credentials\n" +
      "• **M.C.A. (Master of Computer Applications)** — Swami Vivekananda University (SVU) | 2026 | Completed\n" +
      "• **B.C.A. (Bachelor of Computer Applications)** — Contai College of Learning & Management Science (MAKAUT) | 2023 | **8.99 CGPA**\n" +
      "• **Higher Secondary (10+2 Science)** — Kishorenagar Sachindra Sikhyasadan (WBCHSE) | 2020 | **81.0%**\n" +
      "• **Secondary Examination (10th)** — Kishorenagar Sachindra Sikhyasadan (WBBSE) | 2018 | **86.0%**\n\n" +
      "### Personal Details\n" +
      "• **Languages Known**: Bengali (Native/Fluent), English (Read, Write, Speak), Hindi (Read, Speak)\n" +
      "• **Date of Birth**: October 23, 2002 | **Father's Name**: Rajat Kanti Das\n\n" +
      "[[ACTION:DOWNLOAD_CV]]",
  },

  // 1. Professional Experience & Company
  {
    category: "experience",
    keywords: ["weavers-web", "weavers web", "company", "experience", "work history", "employer", "current role", "job history"],
    title: "Professional Experience: Weavers-web Solutions Pvt. Ltd.",
    answer:
      "**Software Developer | Weavers-web Solutions Pvt. Ltd.**\n" +
      "📅 **January 2023 – Present** | 📍 **Kolkata, India**\n\n" +
      "**Key Engineering Achievements:**\n" +
      "• **Cross-Platform Engineering**: Engineered and maintained production-grade cross-platform mobile applications in Flutter & Dart for international clients.\n" +
      "• **Generative AI Integration**: Integrated advanced AI models (OpenAI GPT, Gemini, Claude, LangGraph) to deliver user-aware capabilities and agentic workflows.\n" +
      "• **Asset Tracking & Geofencing**: Implemented sub-meter GPS telemetry and automated polygon geofencing alerts for logistics-focused and on-demand dispatch applications.\n" +
      "• **Performance & Concurrency**: Applied Multi-Threading isolates and state management optimizations (Riverpod / GetX), reducing application load times by 30% and maintaining 60 FPS GPU frame stability.\n" +
      "• **Full-Lifecycle Collaboration**: Collaborated with UI/UX designers and backend architects to deliver sub-second API latencies and resilient Clean Architecture standards.",
  },

  // 2. Education & Academic Background
  {
    category: "education",
    keywords: ["education", "college", "university", "degree", "mca", "bca", "cgpa", "school", "svu", "makaut", "qualification"],
    title: "Education & Academic Credentials",
    answer:
      "Subhabrata Das holds a strong academic foundation in Computer Applications and Science:\n\n" +
      "1. **M.C.A. (Master of Computer Applications)**\n" +
      "   • *Institution*: Swami Vivekananda University (SVU)\n" +
      "   • *Year*: 2026 | Completed\n\n" +
      "2. **B.C.A. (Bachelor of Computer Applications)**\n" +
      "   • *Institution*: Contai College of Learning & Management Science (MAKAUT)\n" +
      "   • *Year*: 2023 | **8.99 CGPA** (High Honors)\n\n" +
      "3. **Higher Secondary (10+2 Science)**\n" +
      "   • *Institution*: Kishorenagar Sachindra Sikhyasadan (WBCHSE)\n" +
      "   • *Year*: 2020 | **81.0%**\n\n" +
      "4. **Secondary Examination (10th)**\n" +
      "   • *Institution*: Kishorenagar Sachindra Sikhyasadan (WBBSE)\n" +
      "   • *Year*: 2018 | **86.0%**",
  },

  // 3. Personal Details & Languages
  {
    category: "general",
    keywords: ["personal", "languages", "language", "bengali", "hindi", "english", "dob", "birth", "father", "nationality"],
    title: "Personal Information & Languages",
    answer:
      "**Personal Profile of Subhabrata Das:**\n\n" +
      "• **Date of Birth**: October 23, 2002\n" +
      "• **Father's Name**: Rajat Kanti Das\n" +
      "• **Nationality & Gender**: Indian | Male\n" +
      "• **Languages Known**:\n" +
      "  - **Bengali**: Native / Fluent\n" +
      "  - **English**: Professional Working Proficiency (Read, Write, Speak)\n" +
      "  - **Hindi**: Conversational (Read, Speak)\n" +
      "• **Location**: Kolkata, India (Available for Remote / Hybrid worldwide)",
  },

  // 4. All Production Applications Catalog
  {
    category: "project",
    keywords: ["all apps", "apps", "projects", "what apps", "list apps", "how many apps", "portfolio", "built apps", "ten apps", "10 apps"],
    title: "Subhabrata's 10 Production Applications & Additional Projects",
    answer:
      "Subhabrata Das has architected and delivered **10 core production systems** alongside several commercial platforms:\n\n" +
      "1. **Nora AI (`naipa.ai`)**: Autonomous AI executive companion with LangGraph supervisor routing, iOS AlarmKit / Android AlarmManager bridges, and duplex Socket.IO.\n" +
      "2. **BluFix AI (`ai.blufix`)**: On-demand smart home diagnostics with multimodal photo/audio fault analyzer and live GPS Provider Radar dispatch.\n" +
      "3. **Etana Oroko (`myetana.com`)**: Creator social network uniting Firebase Data Connect (PostgreSQL) with Firestore RTC, Gemini 3.8 Flash moderation, and Agora WebRTC.\n" +
      "4. **Rent Roll Pulse (`com.rentroll.app`)**: Real estate FinTech valuation engine calculating AAMI/AMI metrics with on-device vector PDF financial reports.\n" +
      "5. **Konnectax (`com.konnectax.app`)**: Multi-platform RTMP live streaming SaaS broadcasting simultaneously to YouTube, Facebook, and TikTok via Mux.\n" +
      "6. **Plugg AI (`plugg.social`)**: AI compatibility matchmaking network with Socket.IO rich chat, geolocation discovery, and RevenueCat subscriptions.\n" +
      "7. **Flinki**: Sports community platform featuring athlete matchmaking, tournament RSVP scheduling, P2P gear marketplace, and in-app video.\n" +
      "8. **Stylaa**: Dual customer & merchant salon appointment booking system with real-time calendars and AI beauty recommendations.\n" +
      "9. **Groundmetrx**: Enterprise logistics fleet telemetry platform with sub-meter GPS and automated polygon geofencing boundary alerts.\n" +
      "10. **DIY Marketplace**: Bilingual Arabic/English RTL mobile marketplace connecting crafters with buyers via Moyasar payments.\n\n" +
      "**Additional Commercial Projects**: Family Bond (private encrypted family app), TradeMaza (stock trading education platform), MOTQAN / Time Piece Gentleman (luxury watch retail e-commerce).\n\n" +
      "You can ask me to deep-dive into the architectural mechanics of any of these apps!",
  },

  // 5. BluFix AI & Diagnostic Analyzer
  {
    category: "project",
    keywords: ["blufix", "airfix", "diagnostic", "radar", "technician", "hvac", "dispatch", "analyzer", "acoustic", "fault analyzer", "spectrogram", "cost estimate"],
    title: "BluFix AI: Multimodal Fault Analyzer & Dispatch Radar",
    answer:
      "**BluFix AI** is an on-demand marketplace for smart home diagnostics and service dispatch (Live on Google Play Store & iOS: `ai.blufix`).\n\n" +
      "**1. Two-Stage Multi-Agent AI Diagnostic Pipeline:**\n" +
      "• **Multimodal Acoustic & Vision Analysis**: Ingests user-submitted equipment photos and audio recordings. Generates audio spectrograms to detect motor coil humming, compressor failure, or bearing wear, combined with visual fault classification via the OpenAI SDK.\n" +
      "• **Repair Difficulty Scoring & Preliminary Fix Guidance**: Calculates a repair difficulty score and provides instant safety advisories to homeowners before a contractor is dispatched.\n" +
      "• **Automated Cost Estimation**: Predicts required replacement parts and generates automated labor/parts cost breakdowns based on regional pricing indices.\n\n" +
      "**2. Real-Time Geofenced Dispatch Radar:**\n" +
      "• **Provider Radar**: Matches homeowners to verified HVAC, plumbing, and electrical technicians using live GPS proximity calculation and WebSocket telemetry.\n" +
      "• **Lead Expiry & State Machine**: Broadcasts service requests to top-rated nearby providers with automated lead expiry logic and Firestore real-time status streaming.\n\n" +
      "**3. Backend & Payment Architecture:**\n" +
      "• **Tech Stack**: Flutter 3.11+, Riverpod 3.3, AutoRoute, Node.js 22 LTS REST API, Redis caching and concurrency locking, and PostgreSQL.\n" +
      "• **Idempotent Payouts**: Full Stripe Connect integration executing idempotent split payouts to technician wallets and Paystack multi-currency checkout.",
  },

  // 6. Etana Oroko: Recommendation Engine, Moderator & Writing Assistant
  {
    category: "project",
    keywords: [
      "etana",
      "oroko",
      "community",
      "social",
      "webrtc",
      "agora",
      "myetana",
      "moderator",
      "moderation",
      "recommendation engine",
      "writing assistant",
      "gemini 3.8",
      "sentiment",
    ],
    title: "Etana Oroko: Recommendation Engine, Gemini Moderator & Social RTC",
    answer:
      "**Etana Oroko** is a creator-first cultural social platform (Live on App Store & Play Store: `com.etanaoroko.app`, Web: `myetana.com`).\n\n" +
      "**1. Gemini 3.8 Flash Content Moderation & Writing Assistant:**\n" +
      "• **Automated Content Moderation**: Uses Google Gemini 3.8 Flash multimodal API to evaluate user posts, images, and comments in real time for safety violations, hate speech, and harassment, isolating flagged material before it reaches community feeds.\n" +
      "• **AI Writing Assistant**: Helps creators optimize post captions, suggest engaging hashtags, and refine storytelling tone with contextual drafting assistance.\n" +
      "• **Hashtag Sentiment Analysis**: Extracts trending tags and analyzes engagement sentiment across community groups.\n\n" +
      "**2. Vector-Based Community Recommendation Engine:**\n" +
      "• Generates contextual embeddings of user interaction histories, club memberships, and post themes to power a personalized recommendation feed with sub-second retrieval.\n\n" +
      "**3. Dual-Identity Architecture & Agora WebRTC:**\n" +
      "• **Dual Identity**: Combines **Firebase Data Connect (managed Cloud SQL PostgreSQL)** for relational operations (posts, nested comments, clubs, follower graphs) with **Cloud Firestore** for sub-second real-time messaging and presence tracking.\n" +
      "• **Low-Latency Agora WebRTC**: Integrated RTC Engine powering 1-on-1 calls, group voice rooms, and live interactive video broadcasts with dynamic token rotations.",
  },

  // 7. Nora AI Autonomous Ecosystem & Device Bridges
  {
    category: "project",
    keywords: [
      "nora",
      "naipa",
      "supervisor",
      "device bridge",
      "device bridges",
      "handshake",
      "langgraph",
      "alarmkit",
      "alarmmanager",
      "eventkit",
      "fastapi",
      "multi-agent",
      "subagents",
      "tool palette",
      "plannedtool",
    ],
    title: "Nora AI: Multi-Agent Supervisor & Native Mobile Bridges",
    answer:
      "**Nora AI (`naipa.ai`)** is an autonomous executive assistant ecosystem architected by Subhabrata Das, combining multi-agent backend graph orchestration with deep native mobile OS automation.\n\n" +
      "**1. LangGraph Multi-Agent Topology & Supervisor Agent:**\n" +
      "• **Supervisor Intent Router (`graph_routing.py`)**: Classifies user prompts into structured `IntentTaskLiteral` classifications (`alarm.*`, `event.*`, `repeat.*`, `note.*`, `fitness.*`, `search.*`, `route.*`, `image.*`, `organizer.*`).\n" +
      "• **Dynamic Tool Palette Planning (`PlannedToolLiteral`)**: Delivers only relevant tool schemas to LLM context, radically minimizing token bloat and execution latency.\n" +
      "• **Specialist Sub-Agents**: Organizer Agent (calendar, alarms, notes), Creative & Vision Agent (`analyze_image`, `image_edit_tool`), Web Intelligence (Tavily search & Google Maps route planning), and Fitness Biometrics Agent.\n\n" +
      "**2. Frontend-Backend Handshake & Real-Time Duplex:**\n" +
      "• **Duplex Socket.IO & FastAPI Protocol**: Sub-second token-by-token streaming, tool dispatch events, and typing indicators.\n" +
      "• **Authentication Bridge**: Firebase Auth credentials mapped to backend JWTs with automatic refresh (`api_client_v2.dart`) and multi-device FCM synchronization.\n" +
      "• **Low-Latency Audio Pipeline**: Duplex voice streaming via WebRTC directly into OpenAI Realtime API; neural TTS with ElevenLabs emotion-conditioned audio (`elevenlabs_emotion_service_v2.dart`) and OpenAI TTS.\n\n" +
      "**3. Native Mobile Device Bridges:**\n" +
      "• **iOS AlarmKit & EventKit**: Deep integration for critical system alarms (bypassing DND) and bidirectional Apple Calendar synchronization (`ios_alarmkit_service.dart`).\n" +
      "• **Android AlarmManager & Foreground Services**: Exact hardware alarms, full-screen notification wake-lock intents (`alarm_intents_v2.dart`), and action handlers (Snooze, Complete, Reschedule).\n\n" +
      "**4. Hybrid Persistence & Checkpoint Architecture:**\n" +
      "• **PostgreSQL (Neon)**: Persistent LangGraph conversation checkpoints and state history via `AsyncPostgresSaver` & `AsyncPostgresStore`.\n" +
      "• **MongoDB Atlas**: User profiles, relational notes, alarms, and fitness logs via Beanie ODM.\n" +
      "• **Redis & AWS S3**: High-speed cache for session state and secure S3 media bucket storage.",
  },

  // 8. Rent Roll Pulse: FinTech Valuation
  {
    category: "project",
    keywords: ["rent roll", "valuation", "fintech", "real estate", "aami", "ami", "pdf", "property", "audit"],
    title: "Rent Roll Pulse: FinTech Valuation & Health Analytics",
    answer:
      "**Rent Roll Pulse** is a commercial and multifamily real estate valuation SaaS (Live on App Store: `6752246444`, Play Store: `com.rentroll.app`).\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Proprietary Valuation Engines**: Executes automated valuation recalculations (AAMI & AMI algorithms) comparing multi-family properties against regional market baselines.\n" +
      "• **Vector PDF Generation Engine**: Generates instantaneous, high-DPI investor-ready PDF financial audit reports directly on device with custom financial charts.\n" +
      "• **Risk Modeling**: Arrears impact analysis, landlord-to-property exposure ratios, and vacancy loss modeling.\n" +
      "• **Tech Stack**: Flutter, GetX reactive controllers, Firebase Firestore, Cloud Functions, and Stripe subscription tiering.",
  },

  // 9. Konnectax: Multi-Platform RTMP Simulcasting
  {
    category: "project",
    keywords: ["konnectax", "simulcast", "mux", "rtmp", "streaming", "youtube", "facebook", "tiktok", "comments"],
    title: "Konnectax: Multi-Platform RTMP Simulcast Streaming SaaS",
    answer:
      "**Konnectax** is a creator live broadcasting SaaS (Live on App Store: `id6748018179`, Play Store: `com.konnectax.app`).\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Simultaneous 3-Platform Simulcasting**: Broadcasts live video simultaneously to YouTube, Facebook, and TikTok from a single mobile feed via Mux.\n" +
      "• **Unified Live Comments Overlay**: Consolidates YouTube Live Chat and Facebook Comments into a single real-time HUD.\n" +
      "• **OAuth 2.0 Account Linking**: Multi-provider authentication with automatic stream key retrieval and token refresh flows.\n" +
      "• **Tech Stack**: Flutter, GetX, Mux, `rtmp_broadcaster`, Supabase, and Picture-in-Picture (PiP) background streaming.",
  },

  // 10. Plugg AI: AI Matchmaking
  {
    category: "project",
    keywords: ["plugg", "matchmaking", "compatibility", "dating", "lifestyle", "revenuecat", "giphy"],
    title: "Plugg AI: AI Compatibility Matchmaking Platform",
    answer:
      "**Plugg AI (`plugg.social`)** is an intelligent social networking and dating app that uses AI to connect users based on lifestyle compatibility and shared interests.\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Clean Architecture & Hive**: Engineered with Get-it DI, Hive local-first caching, and GetX state management.\n" +
      "• **AI Matchmaking & Compatibility Scoring**: Analyzes user preferences and lifestyle indicators to suggest meaningful connections.\n" +
      "• **Socket.IO Rich Media Chat**: Instant messaging with delivery receipts, typing indicators, GIPHY integration, and voice/video notes.\n" +
      "• **Monetization & Location**: RevenueCat cross-platform in-app subscriptions, geolocation discovery with privacy controls, and Firebase Cloud Messaging.",
  },

  // 11. Additional Commercial Apps (Family Bond, TradeMaza, MOTQAN)
  {
    category: "project",
    keywords: ["family bond", "trademaza", "motqan", "time piece", "watch", "stock", "commercial apps"],
    title: "Additional Commercial Applications",
    answer:
      "Subhabrata has engineered several specialized commercial mobile platforms:\n\n" +
      "• **Family Bond**: Private family connection application featuring end-to-end encrypted group messaging, real-time activity feeds, and AI recommendations.\n" +
      "• **TradeMaza**: Educational stock trading platform featuring real-time market data feeds, interactive learning modules, and simulated portfolios.\n" +
      "• **MOTQAN / Time Piece Gentleman**: E-commerce platform for high-end luxury watch retail with real-time inventory management and secure payment processing.",
  },

  // 12. State Management & Mobile Tech
  {
    category: "skills",
    keywords: ["riverpod", "getx", "state management", "bloc", "flutter", "dart", "gorouter", "autoroute", "clean architecture"],
    title: "Mobile Architecture & State Management",
    answer:
      "Subhabrata specializes in production-tested Flutter architectures:\n\n" +
      "• **Riverpod 3.3**: Used for robust dependency injection, immutable providers, and testable domain logic in enterprise projects (BluFix, Etana Oroko).\n" +
      "• **GetX**: Used for lightweight, reactive state and mathematical recalculations in financial valuation apps (Rent Roll Pulse, Plugg, Flinki).\n" +
      "• **Clean Architecture**: Domain-driven separation of layers (Presentation, Domain, Data) with Get-it service locators and Hive local-first persistence.\n" +
      "• **Routing**: Deep-linking architectures configured with `go_router` and `auto_route`.\n" +
      "• **Dart 3**: Pattern matching, sealed classes, records, and isolate multi-threading.",
  },

  // 13. Databases & Cloud Infrastructure
  {
    category: "skills",
    keywords: ["database", "postgresql", "postgres", "graphql", "redis", "docker", "node", "firebase", "nosql", "hive", "mongodb"],
    title: "Databases, Cloud & Microservices",
    answer:
      "• **PostgreSQL & GraphQL**: Designed relational schemas and complex multi-table join pipelines with Firebase Data Connect and Neon.\n" +
      "• **Redis**: In-memory caching, rate-limiting, and geospatial index lookups.\n" +
      "• **Node.js 22 LTS & Docker**: Containerized microservices, idempotent webhook consumers, and REST APIs.\n" +
      "• **Real-Time Layer**: Cloud Firestore listeners, Socket.IO duplex clusters, and Agora RTC surfaces.\n" +
      "• **Local Storage**: Hive local-first caching, SharedPreferences, and Flutter Secure Storage.",
  },

  // 14. Contact & Hiring
  {
    category: "contact",
    keywords: ["contact", "hire", "email", "phone", "mobile", "number", "job", "salary", "available", "location", "linkedin", "reach out", "call"],
    title: "Contact & Availability",
    answer:
      "Subhabrata Das is open to high-impact Senior Mobile & AI Systems Engineering roles.\n\n" +
      "• **Phone**: [+91 6294321171](tel:+916294321171)\n" +
      "• **Email**: [subhabratadash1@gmail.com](mailto:subhabratadash1@gmail.com)\n" +
      "• **LinkedIn**: [linkedin.com/in/subhabratadash](https://linkedin.com/in/subhabratadash)\n" +
      "• **GitHub**: [github.com/subhabratadash20](https://github.com/subhabratadash20)\n" +
      "• **Location**: Kolkata, India (Available for Remote / Hybrid opportunities worldwide).\n\n" +
      "Ask me to **Generate his Realtime CV** or preview his verified ATS resume anytime!",
  },
];

/**
 * Client-Side Knowledge Base Matcher
 * Instant fuzzy / keyword search for sub-millisecond responses.
 */
export function queryLocalKnowledgeBase(query: string): string | null {
  const normalized = query.toLowerCase().trim();
  const words = normalized.split(/\s+/).filter((w) => w.length > 2);

  let bestTopic: KnowledgeTopic | null = null;
  let highestScore = 0;

  for (const topic of AGENT_KNOWLEDGE_BASE) {
    let score = 0;

    for (const kw of topic.keywords) {
      if (normalized.includes(kw)) {
        score += 3;
      }
      for (const word of words) {
        if (kw.includes(word) || word.includes(kw)) {
          score += 1.5;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  // Minimum threshold to consider a match confident
  if (bestTopic && highestScore >= 2.5) {
    return bestTopic.answer;
  }

  return null;
}
