export interface Project {
    slug: string;
    emoji: string;
    title: string;
    subtitle: string;
    description: string; // Short description for cards
    tags: string[];
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
        links: {
            appStore: "#",
            playStore: "#"
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
        links: {
            appStore: "#",
            playStore: "#"
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
    }
];
