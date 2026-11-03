export interface KnowledgeTopic {
  keywords: string[];
  title: string;
  answer: string;
  category: "architecture" | "project" | "skills" | "contact" | "general";
}

export const AGENT_KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // 1. BluFix AI
  {
    category: "project",
    keywords: ["blufix", "airfix", "diagnostic", "radar", "technician", "hvac", "dispatch"],
    title: "BluFix AI: On-Demand Diagnostics & Dispatch",
    answer:
      "**BluFix AI** is an on-demand marketplace for smart home diagnostics and service dispatch (Live on Google Play Store & iOS: `ai.blufix`).\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Two-Stage Multi-Agent AI Pipeline**: Ingests user-submitted equipment photos and audio recordings to detect failure modes, diagnose repair difficulty, and predict part replacements before technician arrival.\n" +
      "• **Real-Time Geofenced Dispatch Radar**: Connects homeowners to verified HVAC, electrical, and plumbing contractors using live GPS proximity calculation and WebSocket telemetry.\n" +
      "• **Tech Stack**: Flutter 3.11+, Riverpod 3.3, AutoRoute, Node.js 22 LTS REST API, Redis caching, PostgreSQL, Stripe Connect (idempotent split payouts), and Paystack.",
  },

  // 2. Etana Oroko
  {
    category: "project",
    keywords: ["etana", "oroko", "community", "social", "webrtc", "agora", "myetana"],
    title: "Etana Oroko: Dual-Identity Social RTC Platform",
    answer:
      "**Etana Oroko** is a creator-first social platform (Live on App Store & Play Store: `com.etanaoroko.app`, Web: `myetana.com`).\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Dual-Identity Architecture**: Combines **Firebase Data Connect (managed PostgreSQL)** for relational operations (posts, nested comments, clubs, follower graphs) with **Cloud Firestore** for sub-second real-time messaging and presence tracking.\n" +
      "• **Low-Latency Agora WebRTC**: Integrated RTC Engine for multi-user voice rooms and video broadcasts with dynamic token rotations.\n" +
      "• **Gemini 3.8 Flash Assistant**: Context-aware content refinement and safety moderation integrated via Google Secret Manager.",
  },

  // 3. Rent Roll Pulse
  {
    category: "project",
    keywords: ["rent roll", "valuation", "fintech", "real estate", "health", "aami", "ami", "pdf"],
    title: "Rent Roll Pulse: FinTech Valuation & Health Analytics",
    answer:
      "**Rent Roll Pulse** is a commercial and multifamily real estate valuation SaaS (Live on App Store: `6752246444`, Play Store: `com.rentroll.app`).\n\n" +
      "**Key Architecture Highlights:**\n" +
      "• **Proprietary Financial Engines**: Executes automated valuation recalculations (AAMI & AMI algorithms) comparing multi-family properties against regional market baselines.\n" +
      "• **Vector PDF Generation**: Generates instantaneous, high-DPI investor-ready PDF financial reports directly on device.\n" +
      "• **Tech Stack**: Flutter, GetX reactive controllers, Firebase Firestore, Cloud Functions, and Stripe subscription tiering.",
  },

  // 4. Nora AI Autonomous Ecosystem
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
      "agentic",
      "fastapi",
      "multi-agent",
      "subagents",
    ],
    title: "Nora AI: Multi-Agent Autonomous Ecosystem & Native Device Bridges",
    answer:
      "**Nora AI (`naipa.ai`)** is an autonomous executive assistant ecosystem architected by Subhabrata Das, combining multi-agent backend graph orchestration with deep native mobile OS automation.\n\n" +
      "**1. LangGraph Multi-Agent Topology & Supervisor Agent:**\n" +
      "• **Supervisor Intent Router (`graph_routing.py`)**: Classifies user prompts into structured `IntentTaskLiteral` classifications (`alarm.*`, `event.*`, `repeat.*`, `note.*`, `fitness.*`, `search.*`, `route.*`, `image.*`, `organizer.*`) and dynamically plans tool palettes (`PlannedToolLiteral`), minimizing token bloat and latency.\n" +
      "• **Specialist Sub-Agents**:\n" +
      "  - *Organizer Agent*: Manages calendar events, alarms, recurring notifications, and notes.\n" +
      "  - *Creative & Vision Agent*: Multimodal visual analysis (`analyze_image`), visual prompt editing (`image_edit_tool`), and reverse-search.\n" +
      "  - *Web Intelligence & Navigation*: Tavily real-time web search snapshots and Google Maps multi-modal route planning (`plan_route`).\n" +
      "  - *Fitness & Biometrics Agent*: Contextual workout logging and health goal analytics.\n\n" +
      "**2. Frontend-Backend Handshake & Real-Time Duplex:**\n" +
      "• **Duplex Socket.IO & FastAPI Protocol**: Sub-second token-by-token streaming, tool dispatch status events, and typing indicators.\n" +
      "• **Authentication Bridge**: Firebase Auth social credentials mapped to backend JWTs with automatic refresh (`api_client_v2.dart`) and multi-device FCM synchronization.\n" +
      "• **Low-Latency Speech & Audio Pipeline**: Real-time voice calls streaming duplex audio directly via WebRTC into OpenAI Realtime API; neural text-to-speech with ElevenLabs emotion-conditioned audio (`elevenlabs_emotion_service_v2.dart`) and OpenAI TTS.\n\n" +
      "**3. Native Mobile Device Bridges:**\n" +
      "• **iOS AlarmKit & EventKit**: Deep integration for critical system alarms (bypassing DND) and bidirectional Apple Calendar synchronization (`ios_alarmkit_service.dart`).\n" +
      "• **Android AlarmManager & Foreground Services**: Exact hardware alarms, full-screen notification wake-lock intents (`alarm_intents_v2.dart`), and action handlers (Snooze, Complete, Reschedule).\n\n" +
      "**4. Hybrid Persistence & Checkpoint Architecture:**\n" +
      "• **PostgreSQL (Neon)**: Persistent LangGraph conversation checkpoints and state history via `AsyncPostgresSaver` & `AsyncPostgresStore`.\n" +
      "• **MongoDB Atlas**: User profiles, relational notes, alarms, and fitness logs via Beanie ODM.\n" +
      "• **Redis & AWS S3**: High-speed cache for session state and secure S3 media bucket storage.",
  },

  // 5. Konnectax & Plugg
  {
    category: "project",
    keywords: ["konnectax", "plugg", "simulcast", "mux", "dating", "matchmaking", "tax"],
    title: "Konnectax & Plugg Social Platforms",
    answer:
      "• **Konnectax**: Tax compliance SaaS featuring multi-platform simulcasting via Mux, unified cross-platform live comments, and OAuth social account integration.\n" +
      "• **Plugg (`plugg.social`)**: AI-powered social networking app featuring intelligent compatibility scoring, Socket.IO real-time rich media chat, and RevenueCat subscription management.",
  },

  // 5. State Management & Mobile Tech
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

  // 6. Databases & Cloud Infrastructure
  {
    category: "skills",
    keywords: ["database", "postgresql", "postgres", "graphql", "redis", "docker", "node", "firebase", "nosql"],
    title: "Databases, Cloud & Microservices",
    answer:
      "• **PostgreSQL & GraphQL**: Designed relational schemas and complex multi-table join pipelines with Firebase Data Connect.\n" +
      "• **Redis**: In-memory caching, rate-limiting, and geospatial index lookups.\n" +
      "• **Node.js 22 LTS & Docker**: Containerized microservices, idempotent webhook consumers, and REST APIs.\n" +
      "• **Real-Time Layer**: Cloud Firestore listeners, Socket.IO clusters, and Agora RTC surfaces.",
  },

  // 7. Contact & Hiring
  {
    category: "contact",
    keywords: ["contact", "hire", "email", "job", "salary", "available", "location", "resume", "linkedin"],
    title: "Contact & Availability",
    answer:
      "Subhabrata Das is open to high-impact Senior Mobile & AI Systems Engineering roles.\n\n" +
      "• **Email**: subhabratadash1@gmail.com\n" +
      "• **LinkedIn**: [linkedin.com/in/subhabratadash](https://linkedin.com/in/subhabratadash)\n" +
      "• **GitHub**: [github.com/subhabratadash20](https://github.com/subhabratadash20)\n" +
      "• **Location**: Kolkata, India (Available for Remote / Hybrid opportunities worldwide).",
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
