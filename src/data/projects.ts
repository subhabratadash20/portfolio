export type ProjectCategory = "AI & Systems" | "Mobile & Flutter" | "FinTech & Cloud";

export interface Project {
    slug: string;
    emoji: string;
    title: string;
    subtitle: string;
    description: string; // Short description for cards
    tags: string[];
    category: ProjectCategory;
    isLive?: boolean;
    metrics?: string;
    links: {
        appStore?: string;
        playStore?: string;
        demo?: string;
    };
    overview: string;
    features: {
        title: string;
        icon: string;
        items: string[];
    }[];
    techStack: {
        category: string;
        value: string;
    }[];
    architecture?: {
        title: string;
        description: string;
    }[];
}

export const projects: Project[] = [
    {
        slug: "konnectax",
        emoji: "📱",
        title: "KONNECTAX",
        subtitle: "Multi-Platform Live Streaming App",
        description: "Engineered a powerful multi-platform live streaming app enabling creators to broadcast simultaneously to YouTube, Facebook, and TikTok.",
        tags: ["Flutter", "RTMP", "Mux", "OAuth", "Socket.IO"],
        category: "Mobile & Flutter",
        isLive: true,
        metrics: "Simultaneous 3-Platform Broadcast",
        links: {
            appStore: "https://apps.apple.com/us/app/konnectax/id6748018179",
            playStore: "https://play.google.com/store/apps/details?id=com.konnectax.app"
        },
        overview: "Engineered a powerful multi-platform live streaming application enabling content creators to broadcast simultaneously to YouTube, Facebook, and TikTok from a single interface. This app revolutionizes content creation by eliminating the need for multiple streaming setups.",
        features: [
            {
                title: "Multi-Platform Simulcasting",
                icon: "🔴",
                items: [
                    "Simultaneous live streaming to YouTube, Facebook, and TikTok via Mux Simulcast",
                    "Real-time RTMP broadcasting with camera controls (flip, flash toggle)",
                    "Stream duration timer and platform-specific status indicators"
                ]
            },
            {
                title: "Social Platform Integration",
                icon: "🔗",
                items: [
                    "OAuth-based account linking for YouTube (Google), Facebook, and TikTok",
                    "Automatic token refresh and seamless re-authentication flows",
                    "Facebook Pages selection for business account streaming",
                    "YouTube Data API integration for automatic stream key retrieval"
                ]
            },
            {
                title: "Live Comments System",
                icon: "💬",
                items: [
                    "Unified live comments overlay supporting YouTube Live Chat and Facebook Live Comments",
                    "Real-time comment fetching with pagination and auto-refresh",
                    "Cross-platform comment posting functionality"
                ]
            },
            {
                title: "Advanced Streaming Features",
                icon: "📹",
                items: [
                    "Camera preview with real-time RTMP streaming via rtmp_broadcaster",
                    "Picture-in-Picture (PiP) mode support for background streaming",
                    "Wakelock functionality to prevent screen timeout during live sessions",
                    "Comprehensive error handling with user-friendly notifications"
                ]
            },
            {
                title: "Secure Authentication",
                icon: "🔐",
                items: [
                    "Multi-provider authentication (Google, Facebook, Apple, Email/Password)",
                    "OTP verification and password recovery flows",
                    "Secure credential storage and management via Supabase"
                ]
            }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart, GetX" },
            { category: "Streaming", value: "Mux, RTMP, rtmp_broadcaster" },
            { category: "Backend", value: "Supabase, Firebase" },
            { category: "APIs", value: "YouTube Data API, Facebook Graph API" },
            { category: "Auth", value: "OAuth 2.0, Apple Sign-In" },
            { category: "Platforms", value: "iOS, Android" }
        ]
    },
    {
        slug: "plugg",
        emoji: "💞",
        title: "PLUGG",
        subtitle: "AI-Powered Social Networking App",
        description: "Developed an intelligent social networking app using AI to match users based on interests, preferences, and lifestyle compatibility.",
        tags: ["Flutter", "AI", "Socket.IO", "RevenueCat", "Firebase"],
        category: "AI & Systems",
        isLive: true,
        metrics: "Smart Compatibility Scoring",
        links: {
            appStore: "#",
            playStore: "#"
        },
        overview: "Developed an intelligent social networking application that uses AI to match users based on interests, preferences, and lifestyle. The platform enables meaningful connections through smart matchmaking and real-time communication features.",
        features: [
            {
                title: "AI-Powered Matchmaking",
                icon: "🤖",
                items: [
                    "Intelligent user matching based on interests, preferences, and lifestyle compatibility",
                    "Smart compatibility scoring for meaningful connection suggestions",
                    "Personalized recommendation engine for user discovery"
                ]
            },
            {
                title: "Real-Time Chat System",
                icon: "💬",
                items: [
                    "Socket.IO-based real-time messaging with instant delivery and typing indicators",
                    "Read receipts and message status updates for seamless communication",
                    "Rich media support including images, videos, documents, and voice messages",
                    "GIPHY integration for expressive GIF communication"
                ]
            },
            {
                title: "Location-Based Discovery",
                icon: "📍",
                items: [
                    "Geolocation services for nearby user discovery and location-based matching",
                    "Geocoding for smart location display and distance calculations",
                    "Privacy-focused location sharing controls for user safety"
                ]
            },
            {
                title: "Push Notifications",
                icon: "🔔",
                items: [
                    "Firebase Cloud Messaging (FCM) for real-time notification delivery",
                    "Background notification handling for messages, matches, and connection requests",
                    "Notification deep linking for seamless in-app navigation"
                ]
            },
            {
                title: "Interactive Onboarding",
                icon: "🎯",
                items: [
                    "Story-like interactive onboarding flow with smooth transitions",
                    "Personal details collection with validation and interest discovery",
                    "Identity verification process for platform authenticity"
                ]
            },
            {
                title: "Subscription System",
                icon: "💳",
                items: [
                    "RevenueCat integration for cross-platform subscription management",
                    "In-app purchase flow for premium features and benefits",
                    "Subscription status sync and entitlement handling"
                ]
            },
            {
                title: "Secure Authentication",
                icon: "🔐",
                items: [
                    "Multi-provider authentication (Apple Sign-In, Google Sign-In)",
                    "OTP verification flow with secure PIN input",
                    "Encrypted credential storage and secure session management"
                ]
            }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart, GetX" },
            { category: "Real-Time", value: "Socket.IO" },
            { category: "Backend", value: "Firebase (Auth, FCM), RevenueCat" },
            { category: "Storage", value: "Hive, Flutter Secure Storage" },
            { category: "Architecture", value: "Clean Architecture, Feature-First" },
            { category: "Platforms", value: "iOS, Android" }
        ]
    },
    {
        slug: "nora-ai",
        emoji: "🤖",
        title: "NORA AI",
        subtitle: "AI-Powered Personal Assistant",
        description: "Built an intelligent personal assistant that helps users manage daily life through natural voice and text conversations.",
        tags: ["Flutter", "OpenAI", "ElevenLabs", "Socket.IO", "Firebase"],
        category: "AI & Systems",
        isLive: true,
        metrics: "Dual TTS Engine + Background AlarmKit",
        links: {
            appStore: "#",
            playStore: "#",
            demo: "https://naipa.ai"
        },
        overview: "Built an intelligent AI-powered personal assistant application that helps users manage their daily life through natural voice and text conversations. Nora acts as a smart companion, handling reminders, notes, events, and providing personalized assistance while learning user preferences over time.",
        features: [
            {
                title: "Conversational AI Assistant",
                icon: "🤖",
                items: [
                    "Real-time AI chat system with natural language understanding",
                    "Context-aware responses that understand user intent",
                    "Message feedback system for continuous AI improvement"
                ]
            },
            {
                title: "Voice-First Experience",
                icon: "🎙️",
                items: [
                    "Advanced speech-to-text for hands-free voice commands",
                    "Dual TTS engines (OpenAI TTS & ElevenLabs) with emotional voice synthesis",
                    "Real-time audio feedback and waveform visualization"
                ]
            },
            {
                title: "Smart Alarm & Reminder System",
                icon: "⏰",
                items: [
                    "Intelligent alarm scheduling with platform-native integration",
                    "iOS AlarmKit & Android AlarmManager support",
                    "Background task handling for reliable alarm triggers"
                ]
            },
            {
                title: "Calendar & Event Management",
                icon: "📅",
                items: [
                    "Native device calendar sync for seamless event management",
                    "Event creation through natural conversation",
                    "Smart date/time parsing from natural language inputs"
                ]
            },
            {
                title: "Notes & Memory System",
                icon: "📝",
                items: [
                    "Note-taking with categories for organized storage",
                    "Quick note capture through voice or text",
                    "Search and retrieval for easy access"
                ]
            },
            {
                title: "Fitness & Wellness Tracking",
                icon: "💪",
                items: [
                    "Fitness tracking module for health monitoring",
                    "Personalized fitness recommendations",
                    "Goal-based tracking and progress insights"
                ]
            },
            {
                title: "Real-Time Notifications",
                icon: "🔔",
                items: [
                    "Firebase Cloud Messaging for instant alerts",
                    "Foreground/background notification handling",
                    "Deep linking for seamless navigation"
                ]
            },
            {
                title: "Personalization & Accessibility",
                icon: "🌐",
                items: [
                    "Dynamic theming with Dark/Light mode switching",
                    "Multi-language support with real-time switching",
                    "Responsive UI with smooth animations"
                ]
            }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart, GetX" },
            { category: "Real-Time", value: "Socket.IO" },
            { category: "AI/Voice", value: "OpenAI TTS, ElevenLabs, STT" },
            { category: "Backend", value: "Firebase (Auth, FCM, Functions)" },
            { category: "Native", value: "iOS AlarmKit, Android AlarmManager" },
            { category: "Architecture", value: "Clean Architecture, Feature-First" }
        ],
        architecture: [
            { title: "Clean Architecture", description: "Separated domain, data, and presentation layers for maintainability and testability" },
            { title: "Feature-First Structure", description: "Organized codebase by features (Chat, Alarms, Notes, Events) for scalable development" },
            { title: "Reactive State Management", description: "GetX for efficient state management and dependency injection" },
            { title: "Offline-First Approach", description: "Local caching for core features to ensure app usability without connectivity" }
        ]
    },
    {
        slug: "diy-marketplace",
        emoji: "🛍️",
        title: "DIY Marketplace",
        subtitle: "Handmade Commerce Platform",
        description: "Built a mobile commerce platform connecting artisans with buyers seeking unique handmade products with dual buyer/seller interfaces.",
        tags: ["Flutter", "Firebase", "Moyasar", "RTL", "E-Commerce"],
        category: "FinTech & Cloud",
        isLive: true,
        metrics: "Bilingual English/Arabic RTL & Moyasar",
        links: {
            appStore: "#",
            playStore: "#"
        },
        overview: "Built a mobile commerce platform that connects artisans and crafters with buyers seeking unique handmade products. The app provides a complete marketplace experience with separate buyer and seller interfaces, real-time messaging, and secure payment processing.",
        features: [
            {
                title: "Dual-Role Marketplace",
                icon: "🏪",
                items: [
                    "Seamless buyer and seller experiences within a single app",
                    "Dedicated seller dashboard with sales analytics and earnings tracking",
                    "Buyer-focused discovery with search, filters, and category browsing"
                ]
            },
            {
                title: "Complete Shopping Experience",
                icon: "🛒",
                items: [
                    "Smooth add-to-cart animations and real-time cart updates",
                    "Multi-step checkout flow with address management",
                    "Order tracking system with status updates",
                    "Product reviews and ratings for buyer feedback"
                ]
            },
            {
                title: "Secure Payment Integration",
                icon: "💳",
                items: [
                    "Moyasar payment gateway for secure transactions",
                    "Saved payment cards management for faster checkout",
                    "Transaction history and payment receipts"
                ]
            },
            {
                title: "In-App Messaging",
                icon: "💬",
                items: [
                    "Real-time chat system for buyer-seller communication",
                    "Conversation management with message history",
                    "Push notifications for new messages and order updates"
                ]
            },
            {
                title: "Seller Tools",
                icon: "🏬",
                items: [
                    "Product listing with multiple images and variant support",
                    "Shop customization for brand identity",
                    "Bank account integration for seamless payouts",
                    "Sales analytics dashboard with revenue charts"
                ]
            },
            {
                title: "Multi-Language Support",
                icon: "🌍",
                items: [
                    "Full Arabic and English localization",
                    "RTL (Right-to-Left) layout support for Arabic users",
                    "Dynamic language switching without app restart"
                ]
            },
            {
                title: "Modern UI/UX",
                icon: "🎨",
                items: [
                    "Skeleton loading states for smooth content transitions",
                    "Dark and light theme support with system preference",
                    "Responsive layouts for various screen sizes"
                ]
            }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart, GetX" },
            { category: "Backend", value: "Firebase (Auth, Firestore, FCM)" },
            { category: "Payments", value: "Moyasar" },
            { category: "Storage", value: "GetStorage, Cached Network Images" },
            { category: "Architecture", value: "Clean Architecture, MVC Pattern" },
            { category: "Platforms", value: "iOS, Android" }
        ]
    },
    {
        slug: "stylaa",
        emoji: "💇‍♂️",
        title: "STYLAA",
        subtitle: "Salon Booking & Appointment System",
        description: "Developed a dual-platform system for salon bookings with real-time appointment scheduling and secure payment gateways.",
        tags: ["Flutter", "Payments", "AI"],
        category: "Mobile & Flutter",
        isLive: true,
        metrics: "Dual Customer/Merchant App Ecosystem",
        links: {
            appStore: "#",
            playStore: "#"
        },
        overview: "Developed a dual-platform system for salon bookings with real-time appointment scheduling and secure payment gateways.",
        features: [
            { title: "Dual-Platform", icon: "👥", items: ["Separate apps for users and businesses"] },
            { title: "Real-time Scheduling", icon: "📅", items: ["Live availability checking and booking"] },
            { title: "AI Recommendations", icon: "✨", items: ["Smart service suggestions based on user history"] }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart" },
            { category: "Backend", value: "Node.js, MongoDB" }
        ]
    },
    {
        slug: "groundmetrx",
        emoji: "🌍",
        title: "GROUNDMETRX",
        subtitle: "Logistics App with Geofencing",
        description: "Implemented real-time asset tracking with advanced geofencing technology and optimized delivery routes via Google Maps API.",
        tags: ["Flutter", "Geofencing", "Maps"],
        category: "Mobile & Flutter",
        isLive: true,
        metrics: "Sub-Meter Fleet Telemetry & Geofencing",
        links: {
            appStore: "#",
            playStore: "#"
        },
        overview: "Implemented real-time asset tracking with advanced geofencing technology and optimized delivery routes via Google Maps API.",
        features: [
            { title: "Real-time Tracking", icon: "📍", items: ["Live asset location updates"] },
            { title: "Geofencing", icon: "🚧", items: ["Automated entry/exit alerts"] },
            { title: "Route Optimization", icon: "🗺️", items: ["Efficient pathfinding for deliveries"] }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart" },
            { category: "Maps", value: "Google Maps API" }
        ]
    },
    {
        slug: "blufix",
        emoji: "⚡",
        title: "BLUFIX AI",
        subtitle: "On-Demand AI Diagnostics & Smart Home Service Dispatch",
        description: "Engineered a production on-demand AI diagnostic and smart dispatch platform connecting homeowners with certified technicians in real time.",
        tags: ["Flutter", "Riverpod", "Node.js 22", "PostgreSQL", "Redis", "OpenAI", "Stripe"],
        category: "AI & Systems",
        isLive: true,
        metrics: "Live on Play Store & App Store | Node 22 API",
        links: {
            playStore: "https://play.google.com/store/apps/details?id=ai.blufix",
            demo: "https://blufix.ai"
        },
        overview: "BluFix AI is a full-scale on-demand marketplace for smart home diagnostics and service dispatch. The mobile app leverages Flutter and Riverpod to connect homeowners with verified HVAC, plumbing, and electrical service providers. It incorporates a two-stage multi-agent AI diagnostic engine that analyzes photo/audio fault inputs, suggests preliminary fixes, generates automated cost estimates, and coordinates geo-fenced technician dispatch with real-time tracking, live Firestore event streams, and automated Stripe/Paystack payment settlements.",
        features: [
            {
                title: "Two-Stage AI Diagnostic Pipeline",
                icon: "🧠",
                items: [
                    "Multi-agent diagnostic pipeline powered by OpenAI SDK to evaluate appliance malfunctions",
                    "Image and audio fault classification with confidence scoring and safety advisories",
                    "Automated preliminary repair cost generation and recommended parts breakdown"
                ]
            },
            {
                title: "Real-Time Dispatch & Radar",
                icon: "📡",
                items: [
                    "Provider Radar matching nearby certified technicians based on geospatial coordinates",
                    "Real-time service request broadcasting with automated lead expiry logic",
                    "Live job progress tracking with Firestore real-time streaming and status timestamps"
                ]
            },
            {
                title: "Financials & Idempotent Payouts",
                icon: "💳",
                items: [
                    "Full Stripe Connect and Paystack integration with multi-currency checkout",
                    "Automated technician wallet, dispute escrow, and instant payout workflows",
                    "Subscription and tier management for priority technician dispatching"
                ]
            },
            {
                title: "Cross-Platform Architecture",
                icon: "📱",
                items: [
                    "Robust client state management built on Flutter 3, Riverpod 3.3, and AutoRoute",
                    "Deterministic offline caching with Dio interceptors and fail-fast sync",
                    "Push notifications via FCM with custom deep links to active repair sessions"
                ]
            }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart, Riverpod 3.3, AutoRoute" },
            { category: "Backend", value: "Node.js 22, Express 5, TypeScript 5.9" },
            { category: "Database", value: "PostgreSQL, Redis, AWS S3" },
            { category: "AI & ML", value: "OpenAI Multi-Agent Diagnostic Pipeline" },
            { category: "Payments", value: "Stripe Connect, Paystack" },
            { category: "Real-Time", value: "Firebase Firestore Events, FCM" }
        ],
        architecture: [
            { title: "Clean DAG DDL & Database Pool", description: "Strict Directed Acyclic Graph migration order with transactional integrity and connection pooling" },
            { title: "Multi-Role Security Model", description: "Role-segregated JWT authorization with dual-storage media proxying for customer privacy" },
            { title: "Microservice Resilience", description: "Idempotent payment webhooks with Redis locking and event-driven dispatch workers" }
        ]
    },
    {
        slug: "rent-roll",
        emoji: "📊",
        title: "RENT ROLL PULSE",
        subtitle: "Real Estate Valuation & Rent Roll Analytics Platform",
        description: "Built an institutional-grade rent roll analytics platform enabling property agencies to calculate portfolio valuations, benchmark against regional metrics, and track portfolio health.",
        tags: ["Flutter", "GetX", "Firebase Firestore", "Cloud Functions", "PDF Generation", "Stripe"],
        category: "FinTech & Cloud",
        isLive: true,
        metrics: "Automated Valuation Engine & Stripe Billing",
        links: {
            appStore: "https://apps.apple.com/us/app/rent-roll-health/id6752246444",
            playStore: "https://play.google.com/store/apps/details?id=com.rentroll.app"
        },
        overview: "Rent Roll Pulse is an advanced financial analytics and property management valuation application. Built for real estate agencies and asset managers, it automates complex rent roll multiplier calculations, Annual Management Income (AMI) projections, arrears impact analysis, and compliance audit tracking. Features custom high-performance financial graphing, automated client-facing PDF valuation reports, and Stripe-powered subscription gating.",
        features: [
            {
                title: "Institutional Valuation Engine",
                icon: "📈",
                items: [
                    "Automated portfolio valuation based on PUM (Properties Under Management) and AMI multipliers",
                    "Dynamic calculation of Average Annual Management Income (AAMI) and OPEX ratios",
                    "Financial risk scoring based on landlord-to-property ratios and arrears exposure"
                ]
            },
            {
                title: "Regional Benchmarking & Insights",
                icon: "🗺️",
                items: [
                    "State-specific market benchmark comparisons against real-time regional averages",
                    "Vacancy and rent arrears drill-downs with predictive revenue loss modeling",
                    "Compliance and routine inspection tracking with priority escalation warnings"
                ]
            },
            {
                title: "Automated Valuation PDF Reports",
                icon: "📑",
                items: [
                    "Client-ready PDF audit and valuation report generator with custom chart renders",
                    "Broker collaboration channel with secure in-app messaging and document exchange",
                    "Direct export and print support with institutional formatting"
                ]
            },
            {
                title: "Subscription & Monetization",
                icon: "💎",
                items: [
                    "Multi-tier feature access matrix (Free vs Premium analytics)",
                    "Stripe customer portal with webhook-driven entitlement verification",
                    "Anonymous guest preview mode with seamless migration to authenticated accounts"
                ]
            }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart, GetX, Custom Paint Charts" },
            { category: "Cloud & Backend", value: "Firebase Firestore, Cloud Functions" },
            { category: "Reporting", value: "Dart PDF Generation, Vector Printing" },
            { category: "Payments", value: "Stripe Billing & Subscriptions" },
            { category: "Storage", value: "SharedPreferences, Cloud Storage" }
        ],
        architecture: [
            { title: "Reactive Financial State", description: "GetX controller pipeline recalculating multi-variable valuation models with zero frame drops" },
            { title: "Secure Serverless Functions", description: "Cloud Functions handling sensitive Stripe webhook events and regional data aggregation" }
        ]
    },
    {
        slug: "oroko-community",
        emoji: "🌐",
        title: "ETANA OROKO",
        subtitle: "Dual-Layer Social Community & Real-Time Media Platform",
        description: "Architected a dual-identity social network uniting PostgreSQL via Firebase Data Connect for relational feeds and Cloud Firestore for ultra-low latency WebRTC streaming and messaging.",
        tags: ["Flutter", "Riverpod", "Firebase Data Connect", "PostgreSQL", "Agora WebRTC", "Gemini AI"],
        category: "AI & Systems",
        isLive: true,
        metrics: "Dual PostgreSQL + Firestore RTC Engine",
        links: {
            appStore: "https://apps.apple.com/us/app/etana/id6782059746",
            playStore: "https://play.google.com/store/apps/details?id=com.etanaoroko.app",
            demo: "https://myetana.com"
        },
        overview: "Etana Oroko is a modern cultural and creator-focused social platform engineered with an advanced dual-layer backend architecture. It combines Firebase Data Connect (managed PostgreSQL) for relational operations (posts, nested comments, clubs, campaigns, marketplace stores) with Cloud Firestore for sub-second real-time messaging, presence tracking, and Agora-powered WebRTC video/audio communications. Integrated Gemini 3.8 Flash powers smart content moderation and contextual search.",
        features: [
            {
                title: "Dual-Identity Architecture",
                icon: "🔄",
                items: [
                    "Strict segregation between Firebase Auth UID (real-time/chat/WebRTC) and PostgreSQL UUID (relational entities)",
                    "Data Connect GraphQL queries for complex multi-table joins, feeds, and follower graphs",
                    "Real-time Firestore listeners for typing indicators, online presence, and instant messaging"
                ]
            },
            {
                title: "Agora WebRTC Streaming",
                icon: "🎥",
                items: [
                    "Low-latency 1-on-1 and group voice/video calls powered by Agora RTC Engine",
                    "Dynamic channel token exchange and background call management",
                    "Interactive live media streams with audience reactions and live chat"
                ]
            },
            {
                title: "AI Moderation & Smart Feed",
                icon: "✨",
                items: [
                    "Gemini 3.8 Flash multimodal integration for automated content moderation",
                    "Contextual vector search and personalized community recommendation engine",
                    "Smart hashtag extraction and engagement sentiment analysis"
                ]
            },
            {
                title: "Community Marketplace & Events",
                icon: "🛍️",
                items: [
                    "Built-in marketplace for creator goods with integrated checkout",
                    "Event scheduling with RSVP tracking and automated calendar synchronization",
                    "Promotions and campaign organizer dashboard with conversion metrics"
                ]
            }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart, Riverpod, GoRouter" },
            { category: "Database (Relational)", value: "Firebase Data Connect (Cloud SQL PostgreSQL)" },
            { category: "Real-Time & Chat", value: "Cloud Firestore, FCM" },
            { category: "Streaming & Voice", value: "Agora WebRTC SDK" },
            { category: "AI Services", value: "Google Gemini 3.8 Flash" }
        ],
        architecture: [
            { title: "Dual-Domain Isolation", description: "Guaranteed architectural boundaries separating relational SQL operations from real-time document streaming" },
            { title: "Type-Safe GraphQL Layer", description: "Auto-generated Dart SDK via Firebase Data Connect schema for compile-time query safety" }
        ]
    },
    {
        slug: "flinki",
        emoji: "🏆",
        title: "FLINKI",
        subtitle: "Sports Social Network, Event Tracker & Peer Marketplace",
        description: "Created a sports community platform bringing together athletes and clubs with matchmaking, live event scheduling, rich multimedia chat, and equipment marketplace.",
        tags: ["Flutter", "GetX", "Firebase", "Real-Time Chat", "Video Player", "Marketplace"],
        category: "Mobile & Flutter",
        isLive: true,
        metrics: "Integrated Video Engine & P2P Marketplace",
        links: {
            appStore: "#",
            playStore: "#"
        },
        overview: "Flinki is a sports ecosystem mobile app connecting local athletes, sports enthusiasts, and club managers. It features structured event scheduling with RSVP workflows, peer-to-peer sports gear marketplace, interactive club directories, and real-time multimedia chat with video playback capabilities.",
        features: [
            {
                title: "Sports Matchmaking & Clubs",
                icon: "🤝",
                items: [
                    "Smart athlete discovery filtered by sport, skill level, and location radius",
                    "Club and group creation with administrative roles, rosters, and team announcements",
                    "Direct connection requests with status management"
                ]
            },
            {
                title: "Event Scheduling & Tracking",
                icon: "📅",
                items: [
                    "Interactive event creation for matches, practice sessions, and tournaments",
                    "Real-time attendee headcount and RSVP status tracking",
                    "Integrated venue map navigation and automated reminder alerts"
                ]
            },
            {
                title: "Sports Gear Marketplace",
                icon: "🛒",
                items: [
                    "Peer-to-peer marketplace for buying, selling, and trading sports gear",
                    "Categorized search with condition filters and photo galleries",
                    "Direct in-app buyer/seller negotiation chat"
                ]
            },
            {
                title: "Rich Multimedia Chat",
                icon: "💬",
                items: [
                    "1-on-1 and group sports squad messaging with read receipts",
                    "Video playback and image preview integration inside message streams",
                    "Push notification deep linking to specific match lobbies"
                ]
            }
        ],
        techStack: [
            { category: "Frontend", value: "Flutter, Dart, GetX" },
            { category: "Backend", value: "Firebase (Auth, Firestore, Cloud Storage, FCM)" },
            { category: "Media", value: "Video Player, Image Picker, Cached Network Image" },
            { category: "Architecture", value: "Clean Architecture, Centralized AppRoutes" }
        ]
    }
];
