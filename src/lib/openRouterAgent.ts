import { queryLocalKnowledgeBase } from "@/data/agentKnowledge";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `You are the personal AI Portfolio Copilot for Subhabrata Das, an experienced Flutter Developer and AI-Powered Systems Architect based in Kolkata, India.
Your mission is to represent Subhabrata to recruiters, engineering managers, and clients with technical precision, professionalism, and enthusiasm.

Core Profile:
- Experience: 3+ years in production mobile and full-stack architecture (2023 BCA graduate with 8.99 CGPA).
- Core Stack: Flutter 3.11+, Dart 3, Riverpod 3, GetX, Node.js 22 LTS, PostgreSQL, Firebase Data Connect, Redis, Agora WebRTC, OpenAI SDK, Gemini 3.8 Flash, Docker, Stripe Connect, Git.
- Key Apps:
  1. BluFix AI: Multi-agent HVAC & appliance diagnostic engine, technician radar dispatch, Node 22 API, PostgreSQL, Redis, Stripe/Paystack.
  2. Rent Roll Pulse: FinTech multifamily valuation platform, AAMI/AMI algorithms, vector PDF engine.
  3. Etana Oroko: Creator social network, dual-layer PostgreSQL (Firebase Data Connect) + Firestore RTC, Agora WebRTC live broadcasting, Gemini writing assistant.
  4. Konnectax & Plugg: Mux simulcast SaaS and AI matchmaking social network.
- Email: subhabratadas2002@gmail.com
- LinkedIn: https://linkedin.com/in/subhabratadash
- GitHub: https://github.com/subhabratadash20

Keep answers clear, technically accurate, concise, and formatted in clean markdown. Always answer as his AI representative.`;

/**
 * Hybrid LLM Query Engine
 * 1. Queries local knowledge base first (instant response, zero cost, 100% reliable).
 * 2. Falls back to OpenRouter free models if complex or conversational.
 */
export async function askPortfolioAgent(
  userPrompt: string,
  chatHistory: ChatMessage[],
  customApiKey?: string
): Promise<string> {
  // Step 1: Fast local knowledge match
  const localAnswer = queryLocalKnowledgeBase(userPrompt);
  if (localAnswer) {
    return localAnswer;
  }

  // Step 2: OpenRouter Free Models integration
  const apiKey = customApiKey || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

  if (!apiKey) {
    // Graceful helpful fallback without exposing errors
    return (
      "I have comprehensive details on Subhabrata's production apps (BluFix AI, Rent Roll Pulse, Etana Oroko, Konnectax), his Flutter & Riverpod architecture, databases (PostgreSQL, Firestore), and contact info.\n\n" +
      "Try asking about:\n" +
      "• *'How does the BluFix multi-agent AI work?'*\n" +
      "• *'What is the dual database architecture in Etana?'*\n" +
      "• *'What state management libraries does Subhabrata use?'*\n" +
      "• *'How can I get in touch?'*"
    );
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://subhabratadash.in",
        "X-Title": "Subhabrata Das Portfolio Agent",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...chatHistory.slice(-4),
          { role: "user", content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 350,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const data = await response.json();
    return (
      data.choices?.[0]?.message?.content ||
      "I could not retrieve an answer right now. Please reach out directly to Subhabrata at subhabratadas2002@gmail.com!"
    );
  } catch (error) {
    console.warn("OpenRouter query fallback:", error);
    return (
      "I specialize in answering questions about Subhabrata's technical architecture, production Flutter & Node.js systems, and availability. Feel free to ask about BluFix AI, Etana Oroko, or reach out directly at subhabratadas2002@gmail.com!"
    );
  }
}
