export interface KnowledgeTopic {
  keywords: string[];
  title: string;
  answer: string;
  category: "architecture" | "project" | "skills" | "contact" | "general" | "resume";
}

export const AGENT_KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // 0. Realtime CV / Resume Generator Intent
  {
    category: "resume",
    keywords: ["cv", "resume", "curriculum vitae", "download cv", "get cv", "generate cv", "pdf resume", "biodata", "hire him", "recruit"],
    title: "Subhabrata Das — Realtime ATS Resume & CV",
    answer:
      "# SUBHABRATA DAS\n" +
      "**Senior Flutter Developer & AI-Powered Systems Architect**\n" +
      "📍 Kolkata, India (Available for Remote / Hybrid Worldwide)\n" +
      "📧 [subhabratadash1@gmail.com](mailto:subhabratadash1@gmail.com) • [LinkedIn](https://linkedin.com/in/subhabratadash) • [GitHub](https://github.com/subhabratadash20)\n\n" +
      "### Executive Summary\n" +
      "Senior Mobile & AI Systems Architect with **3+ years** of verified production experience architecting high-throughput Flutter applications, LangGraph multi-agent orchestration frameworks, and real-time distributed backends. Pioneer of native hardware bridge protocols (iOS AlarmKit, Android AlarmManager) and dual-identity database infrastructures (Firebase Data Connect PostgreSQL + Cloud Firestore RTC). Published author of multiple commercial apps across Google Play Store and Apple App Store.\n\n" +
      "### Core Competencies\n" +
      "• **Mobile Architecture**: Flutter 3.11+, Dart 3 (Sealed Classes, Pattern Matching), Riverpod 3.3, GetX, AutoRoute, GoRouter.\n" +
      "• **AI & Multi-Agent**: LangGraph Supervisor Agent, Tool Palette Routing, OpenAI SDK, Gemini 3.8 Flash, Tavily Search, FastAPI.\n" +
      "• **Backend & Cloud**: Node.js 22 LTS, Express 5, TypeScript 5.9, Docker, Google Cloud Run, Cloudflare Workers, Cloud Functions.\n" +
      "• **Databases & Checkpoints**: PostgreSQL (Neon, Cloud SQL), Firebase Data Connect (GraphQL), Cloud Firestore, Redis, MongoDB Atlas.\n" +
      "• **Hardware Bridges & RTC**: iOS AlarmKit & EventKit, Android AlarmManager, Agora WebRTC, Socket.IO, Mux RTMP.\n" +
      "• **Payments**: Stripe Connect (Idempotent Split Payouts), Paystack, RevenueCat, Moyasar, OAuth 2.0.\n\n" +
      "### Key Production Architectures (10 Apps)\n" +
      "1. **Nora AI (`naipa.ai`)**: Autonomous Executive Assistant with LangGraph Supervisor, dynamic tool pruning, duplex Socket.IO, iOS AlarmKit & Android AlarmManager hardware bridges.\n" +
      "2. **BluFix AI (`ai.blufix`)**: Two-stage multimodal acoustic & vision failure analyzer, automated repair cost estimator, and real-time Provider Radar GPS dispatch.\n" +
      "3. **Etana Oroko (`myetana.com`)**: Dual-identity PostgreSQL + Firestore RTC, Gemini 3.8 Flash content moderation, vector recommendation engine, and Agora WebRTC.\n" +
      "4. **Rent Roll Pulse (`com.rentroll.app`)**: Commercial real estate valuation engine with AAMI/AMI recalculations and vector PDF financial reports.\n" +
      "5. **Konnectax (`com.konnectax.app`)**: Simultaneous 3-platform RTMP simulcasting (YouTube, Facebook, TikTok) via Mux with unified comments.\n" +
      "6. **Plugg (`plugg.social`)**: AI lifestyle compatibility matchmaking and Socket.IO rich media chat.\n" +
      "7. **Flinki**: Sports matchmaking, tournament RSVP tracking, P2P equipment marketplace, and in-app video player.\n" +
      "8. **Stylaa**: Dual customer/merchant salon scheduling ecosystem and AI style suggestions.\n" +
      "9. **Groundmetrx**: Sub-meter GPS fleet tracking with automated polygon geofencing entry/exit alerts.\n" +
      "10. **DIY Marketplace**: Bilingual Arabic/English RTL commerce platform with Moyasar payments.\n\n" +
      "### Education\n" +
      "• **Bachelor of Computer Applications (BCA)** — 2020 to 2023 | **CGPA: 8.99 / 10.0**\n\n" +
      "[[ACTION:DOWNLOAD_CV]]",
  },

  // 1. All 10 Production Applications Catalog
  {
    category: "project",
    keywords: ["all apps", "apps", "projects", "what apps", "list apps", "how many apps", "portfolio", "built apps", "ten apps", "10 apps"],
    title: "Subhabrata's 10 Production Applications",
    answer:
      "Subhabrata Das has architected and delivered **10 comprehensive production systems** spanning AI, Mobile, FinTech, and Real-Time Streaming:\n\n" +
      "1. **Nora AI (`naipa.ai`)**: Autonomous AI executive companion with LangGraph supervisor routing, iOS AlarmKit / Android AlarmManager bridges, and duplex Socket.IO.\n" +
      "2. **BluFix AI (`ai.blufix`)**: On-demand smart home diagnostics with multimodal photo/audio fault analyzer and live GPS Provider Radar dispatch.\n" +
      "3. **Etana Oroko (`myetana.com`)**: Creator social network uniting Firebase Data Connect (PostgreSQL) with Firestore RTC, Gemini 3.8 Flash moderation, and Agora WebRTC.\n" +
      "4. **Rent Roll Pulse (`com.rentroll.app`)**: Real estate FinTech valuation engine calculating AAMI/AMI metrics with on-device vector PDF financial reports.\n" +
      "5. **Konnectax (`com.konnectax.app`)**: Multi-platform RTMP live streaming SaaS broadcasting simultaneously to YouTube, Facebook, and TikTok via Mux.\n" +
      "6. **Plugg (`plugg.social`)**: AI compatibility matchmaking network with Socket.IO rich chat, geolocation discovery, and RevenueCat subscriptions.\n" +
      "7. **Flinki**: Sports community platform featuring athlete matchmaking, tournament RSVP scheduling, P2P gear marketplace, and in-app video.\n" +
      "8. **Stylaa**: Dual customer & merchant salon appointment booking system with real-time calendars and AI beauty recommendations.\n" +
      "9. **Groundmetrx**: Enterprise logistics fleet telemetry platform with sub-meter GPS and automated polygon geofencing boundary alerts.\n" +
      "10. **DIY Marketplace**: Bilingual Arabic/English RTL mobile marketplace connecting crafters with buyers via Moyasar payments.\n\n" +
      "You can ask me to deep-dive into the architectural mechanics of any of these apps!",
  },

  // 2. BluFix AI & Diagnostic Analyzer
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

  // 3. Etana Oroko: Recommendation Engine, Moderator & Writing Assistant
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

  // 4. Nora AI Autonomous Ecosystem & Device Bridges
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

  // 5. Rent Roll Pulse: FinTech Valuation
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

  // 6. Konnectax: Multi-Platform RTMP Simulcasting
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

  // 7. Plugg: AI Matchmaking
  {
    category: "project",
    keywords: ["plugg", "matchmaking", "compatibility", "dating", "lifestyle", "revenuecat", "giphy"],
    title: "Plugg: AI Compatibility Matchmaking Platform",
    answer:
      "**Plugg (`plugg.social`)** is an intelligent social networking app that uses AI to connect users based on lifestyle compatibility and shared interests.\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **AI Matchmaking & Compatibility Scoring**: Analyzes user preferences and lifestyle indicators to suggest meaningful connections.\n" +
      "• **Socket.IO Rich Media Chat**: Instant messaging with delivery receipts, typing indicators, GIPHY integration, and voice/video notes.\n" +
      "• **Monetization & Location**: RevenueCat cross-platform in-app subscriptions, geolocation discovery with privacy controls, and Firebase Cloud Messaging.",
  },

  // 8. Flinki: Sports Q-Commerce & Video
  {
    category: "project",
    keywords: ["flinki", "sports", "athlete", "tournament", "rsvp", "equipment", "video player", "marketplace"],
    title: "Flinki: Sports Social Network & P2P Equipment Hub",
    answer:
      "**Flinki** is a sports community mobile application bringing together athletes, teams, and tournament organizers.\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Sports Matchmaking & Club Directories**: Smart athlete discovery filtered by sport, skill level, and radius.\n" +
      "• **Tournament Event Tracker & RSVP**: Event scheduling with live attendee rosters and automated calendar sync.\n" +
      "• **P2P Sports Equipment Marketplace**: Buy and sell new and used sports gear with in-app chat.\n" +
      "• **Rich Multimedia Chat & Video Player**: Real-time messaging with integrated high-performance video playback.",
  },

  // 9. Stylaa: Salon Booking & AI Suggestions
  {
    category: "project",
    keywords: ["stylaa", "salon", "barber", "appointment", "booking", "beauty", "calendar"],
    title: "Stylaa: Dual-Platform Salon Booking Ecosystem",
    answer:
      "**Stylaa** is a dual-platform booking system connecting clients with salons and independent stylists.\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Dual Dedicated Apps**: Separate user-facing client app and merchant-facing business management app.\n" +
      "• **Real-Time Calendar Scheduling**: Live stylist slot availability checking, instant reservations, and reminders.\n" +
      "• **AI Style Recommendations**: Suggests hairstyles, treatments, and beauty services based on user booking history and profile preferences.\n" +
      "• **Tech Stack**: Flutter, Node.js, MongoDB, and secure payment gateway integration.",
  },

  // 10. Groundmetrx: LiDAR & Fleet Geofencing
  {
    category: "project",
    keywords: ["groundmetrx", "fleet", "logistics", "lidar", "geofencing", "gps", "tracking", "route"],
    title: "Groundmetrx: Enterprise Logistics & LiDAR Fleet Tracking",
    answer:
      "**Groundmetrx** is an enterprise logistics and geospatial fleet telemetry platform.\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Sub-Meter GPS Telemetry**: Real-time vehicle location tracking with live map updates and speed analytics.\n" +
      "• **Automated Geofencing Radar**: Configurable polygon geofences with instantaneous entry/exit push alerts.\n" +
      "• **Route Optimization**: Google Maps API pathfinding delivering optimal delivery sequences and traffic avoidance.\n" +
      "• **LiDAR & Spatial Mapping**: Spatial asset visualization for field operations.",
  },

  // 11. DIY Marketplace: Bilingual Arabic RTL Commerce
  {
    category: "project",
    keywords: ["diy", "marketplace", "handmade", "artisan", "arabic", "rtl", "moyasar", "crafter"],
    title: "DIY Marketplace: Bilingual Arabic/English RTL Commerce",
    answer:
      "**DIY Marketplace** is a mobile commerce platform connecting artisans and crafters with buyers seeking handmade goods.\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Dual Buyer/Seller Interface**: Switch seamlessly between shopper discovery and seller store analytics within one app.\n" +
      "• **Full Bilingual Localization & RTL**: Comprehensive Arabic and English layouts with dynamic Right-to-Left (RTL) flipping without app restart.\n" +
      "• **Moyasar Payment Integration**: Secure localized card checkout and seller payout management.\n" +
      "• **In-App Messaging**: Real-time negotiation chat between buyers and sellers with Firebase Firestore.",
  },

  // 12. State Management & Mobile Tech
  {
    category: "skills",
    keywords: ["riverpod", "getx", "state management", "bloc", "flutter", "dart", "gorouter", "autoroute"],
    title: "Mobile Architecture & State Management",
    answer:
      "Subhabrata specializes in production-tested Flutter architectures:\n\n" +
      "• **Riverpod 3**: Used for robust dependency injection, immutable providers, and testable domain logic in enterprise projects (BluFix, Etana Oroko).\n" +
      "• **GetX**: Used for lightweight, reactive state and mathematical recalculations in financial valuation apps (Rent Roll Pulse, Flinki).\n" +
      "• **Routing**: Deep-linking architectures configured with `go_router` and `auto_route`.\n" +
      "• **Dart 3**: Pattern matching, sealed classes, records, and isolate multi-threading.",
  },

  // 13. Databases & Cloud Infrastructure
  {
    category: "skills",
    keywords: ["database", "postgresql", "postgres", "graphql", "redis", "docker", "node", "firebase", "nosql"],
    title: "Databases, Cloud & Microservices",
    answer:
      "• **PostgreSQL & GraphQL**: Designed relational schemas and complex multi-table join pipelines with Firebase Data Connect and Neon.\n" +
      "• **Redis**: In-memory caching, rate-limiting, and geospatial index lookups.\n" +
      "• **Node.js 22 LTS & Docker**: Containerized microservices, idempotent webhook consumers, and REST APIs.\n" +
      "• **Real-Time Layer**: Cloud Firestore listeners, Socket.IO duplex clusters, and Agora RTC surfaces.",
  },

  // 14. Contact & Hiring
  {
    category: "contact",
    keywords: ["contact", "hire", "email", "job", "salary", "available", "location", "linkedin", "reach out"],
    title: "Contact & Availability",
    answer:
      "Subhabrata Das is open to high-impact Senior Mobile & AI Systems Engineering roles.\n\n" +
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
