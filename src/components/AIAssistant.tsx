"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Bot,
    X,
    Send,
    Sparkles,
    MessageCircle,
    ExternalLink,
    Briefcase,
    Code2,
    GraduationCap,
    User,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { useTheme } from "./ThemeProvider";

function formatMessage(text: string): ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={i} className="font-semibold text-inherit">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return <span key={i}>{part}</span>;
    });
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
    role: "user" | "assistant" | "whatsapp" | "chips";
    content: string;
}

interface Intent {
    id: string;
    keywords: string[];
    synonyms?: string[];
    response: string | string[];
    followUp?: string[];
}

// ---------------------------------------------------------------------------
// Knowledge base – conversational, human-sounding responses
// ---------------------------------------------------------------------------

const intents: Intent[] = [
    // ── Greetings ──────────────────────────────────────────────────────
    {
        id: "greeting",
        keywords: [
            "hi", "hello", "hey", "hola", "sup", "yo", "howdy", "greetings",
            "good morning", "good afternoon", "good evening", "whats up",
            "what's up", "wassup",
        ],
        response: [
            "Hey there! 👋 I'm Aadish's portfolio assistant. I know everything about his work, skills, and background. What would you like to know?",
            "Hi! Welcome to Aadish's portfolio. I can tell you about his projects, experience, skills, education — you name it. What interests you?",
            "Hello! Great to have you here. Ask me anything about Aadish — from his AI projects to his chess medals. 🙂",
        ],
        followUp: ["Tell me about him", "What are his projects?", "Skills overview"],
    },

    // ── About / Who ────────────────────────────────────────────────────
    {
        id: "about",
        keywords: [
            "about", "who", "aadish", "tell me about", "introduce", "himself",
            "background", "bio", "overview", "summary", "profile", "describe",
            "what does he do", "what do you do",
        ],
        response: [
            "Aadish Parashar is an AI Engineer and Product Leader currently pursuing his Master's in AI & Data Science at Deggendorf Institute of Technology, Germany — while working at EQS Group on enterprise RAG and Q by EQS.\n\nHere's a quick snapshot:\n• Working Student Software Engineer at EQS Group (RAG + Q by EQS)\n• Led 40+ engineers and architected 3 AI modules at Heybobo.ai\n• 3 published patents (including a govt-funded one)\n• Built AI systems impacting 2000+ users\n• Designed agentic workflows with LangGraph\n\nHe's passionate about building AI that actually works for real people — not just in demos.",
            "Aadish is an AI Engineer who bridges building intelligent systems and leading product teams. He's currently a Working Student Software Engineer at EQS Group in Germany — contributing to RAG systems and Q by EQS — while pursuing his MS in AI & Data Science.\n\nPreviously he managed 40+ engineers at Heybobo.ai, holds 3 patents, and has shipped AI products with 80%+ accuracy. A unique blend of deep technical skill and leadership.",
        ],
        followUp: ["Tell me about EQS", "What are his skills?", "Work experience"],
    },

    // ── Projects ───────────────────────────────────────────────────────
    {
        id: "projects",
        keywords: [
            "project", "projects", "built", "build", "portfolio", "work",
            "case study", "shipped", "product", "app", "application", "demo",
            "what has he built", "what did he make", "show me his work",
        ],
        response:
            "Aadish has built some impressive AI systems:\n\n🏥 **Injury Assessment AI**\nAn autonomous diagnostic system that reasons over raw health data to provide real-time triage. It's been used by 2,000+ users with 80% diagnostic accuracy. Built with TinyLLaMA, FastAPI, and Python.\n\n🔐 **Face Recognition & Anti-Spoofing**\nA biometric security layer using custom CNNs that distinguishes living subjects from deepfakes in milliseconds — achieving 90% fraud prevention with sub-second latency.\n\nBoth are open-source on his GitHub!",
        followUp: ["Tell me more about Injury AI", "Face recognition details", "GitHub link"],
    },
    {
        id: "project-injury",
        keywords: [
            "injury", "health", "diagnostic", "triage", "medical", "assessment",
            "tinyllama", "health ai", "injury ai",
        ],
        response:
            "The **Injury Assessment AI** is one of Aadish's flagship projects. It's not just a classifier — it actually *reasons* about health data.\n\n• Uses TinyLLaMA (a lightweight LLM) fine-tuned for medical reasoning\n• FastAPI backend for real-time inference\n• 2,000+ users have been analyzed through the system\n• 80% diagnostic accuracy in triage scenarios\n\nThe system evaluates risk levels and guides users with contextual medical suggestions. It's designed for real-world deployment, not just academic demos.\n\n🔗 github.com/Aadish0011/Injury_Assessment-with-LLM-Generated-suggestions",
        followUp: ["What about Face Recognition?", "What tech stack?", "Other projects?"],
    },
    {
        id: "project-face",
        keywords: [
            "face", "recognition", "anti-spoof", "spoofing", "biometric",
            "deepfake", "liveness", "cnn", "security camera",
        ],
        response:
            "The **Face Recognition & Anti-Spoofing System** is a real-time biometric defense layer.\n\n• Custom CNN architecture trained on liveness detection\n• Distinguishes real faces from photos, screens, and deepfakes\n• 90% fraud prevention rate\n• Sub-second latency — works in real-time\n• Built with TensorFlow, OpenCV, and Conv-Nets\n\nIt's designed for practical security applications like exam proctoring and identity verification.\n\n🔗 github.com/Aadish0011/Face_Recognition_Anti-spoof",
        followUp: ["Tell me about his experience", "Skills overview", "Patents?"],
    },

    // ── Experience ─────────────────────────────────────────────────────
    {
        id: "experience",
        keywords: [
            "experience", "job", "career", "work history", "employment",
            "company", "companies", "professional", "role", "position",
            "where has he worked", "where did he work",
        ],
        response:
            "Aadish has impressive industry experience:\n\n🟢 **Working Student Software Engineer — EQS Group** (Mar 2026 – Present)\nGermany · Current\n• Building RAG pipelines for grounded enterprise AI over compliance data\n• Contributing to Q by EQS — the AI intelligence layer inside the Compliance Cockpit\n• Working on case intelligence, policy assistance, and governed AI workflows\n\n🟡 **Associate PM & AI Engineer — Heybobo.ai** (Jul 2025 – Mar 2026)\nBengaluru, India · Full-time\n• Managed 40+ engineers across UI/UX, Frontend, Backend, AI/ML, and DevOps\n• Architected 3 AI modules: Health Intelligence, Adaptive Learning, Grooming Personalization\n• Designed agentic workflows with LangGraph for multi-step reasoning\n\n⚡ **Engineering Coordinator / PM — Shinkan Pvt. Ltd.** (Aug 2024 – Jul 2025)\n• Fine-tuned COCO-SSD for proctored exam monitoring\n• Managed 10+ engineers; improved system scalability by 50%\n\nHe's growing at the intersection of enterprise AI, RAG, and product leadership.",
        followUp: ["Tell me about EQS", "What about Heybobo?", "Shinkan details"],
    },
    {
        id: "eqs",
        keywords: [
            "eqs", "eqs group", "eqs groups", "working student", "q by eqs",
            "compliance", "rag", "retrieval", "current job", "current role",
            "latest job", "what is he doing now", "where does he work",
        ],
        response:
            "At **EQS Group** (Mar 2026 – Present), Aadish works as a **Working Student Software Engineer** while pursuing his Master's in Germany.\n\n**What he's building:**\n• **RAG systems** — retrieval-augmented generation pipelines that ground AI answers in real compliance data (policies, cases, disclosures)\n• **Q by EQS** — the new AI-native intelligence layer inside the EQS Compliance Cockpit\n\n**Impact of Q:**\nQ helps compliance teams with case intelligence, whistleblowing triage, case classification, and policy assistance — all inside a governed enterprise environment with audit trails and human oversight.\n\nThis role sits right at the cutting edge of enterprise AI: not demos, but production AI for regulated industries.",
        followUp: ["What is RAG?", "Tell me about Heybobo", "His skills"],
    },
    {
        id: "rag",
        keywords: [
            "rag", "retrieval augmented", "retrieval-augmented", "embeddings",
            "vector", "knowledge base", "document retrieval",
        ],
        response:
            "RAG (Retrieval-Augmented Generation) is a core focus of Aadish's current work at **EQS Group**.\n\nInstead of letting an LLM guess, RAG retrieves relevant documents/context first, then generates answers grounded in that data — critical for compliance where accuracy and auditability matter.\n\nAt EQS, he contributes to RAG pipelines that power **Q by EQS**, helping the platform answer questions over case data, policy libraries, and workflow history with permission controls and explainability.\n\nHe also has strong LLM/agentic experience from Heybobo (LangGraph, prompt engineering, tool-calling) that complements this enterprise RAG work.",
        followUp: ["Tell me about EQS", "Q by EQS details", "AI/ML skills"],
    },
    {
        id: "heybobo",
        keywords: [
            "heybobo", "hey bobo",
            "associate project manager", "apm",
        ],
        response:
            "At **Heybobo.ai** (Jul 2025 – Mar 2026), Aadish had a dual role as Associate PM and AI Engineer in Bengaluru:\n\n**Leadership & Execution:**\n• Managed 40+ engineers across UI/UX, Frontend, Backend, AI/ML, and DevOps\n• Drove sprint planning, roadmap execution, release cycles, and cross-team alignment\n• Translated product vision into scalable AI system architecture\n\n**AI Engineering & Architecture:**\nArchitected 3 intelligent AI modules:\n• Health Intelligence Module\n• Education & Adaptive Learning Module\n• Grooming & Lifestyle Personalization Module\n\n**Technical Contributions:**\n• Designed agentic workflows using LangGraph for multi-step reasoning\n• Built LLM-powered pipelines with structured prompt engineering\n• Developed autonomous AI agents with tool-calling and contextual memory\n• Integrated AI systems with APIs, databases, and external services\n\n**Impact:** Delivered AI-first features from concept to production, improving personalization and intelligent automation.\n\nHe then moved to Germany for his Master's and joined EQS Group as a Working Student Software Engineer.",
        followUp: ["Tell me about EQS", "What about Shinkan?", "Skills overview"],
    },
    {
        id: "shinkan",
        keywords: [
            "shinkan", "previous job", "coordinator", "proctoring",
            "exam monitoring", "coco-ssd",
        ],
        response:
            "At **Shinkan Pvt. Ltd.** (Aug 2024 – Jul 2025), Aadish worked as Engineering Coordinator / PM:\n\n• Fine-tuned the COCO-SSD model for proctored exam environments\n• Managed a team of 10+ engineers\n• Improved system scalability by 50% through resource optimization\n• Built infrastructure for real-time exam monitoring\n• Aligned technical goals with product delivery across stakeholders\n\nThis is where he learned that great AI isn't just about algorithms — it's about systems that work reliably at scale.",
        followUp: ["Tell me about Heybobo", "His projects?", "Education background"],
    },

    // ── Skills ─────────────────────────────────────────────────────────
    {
        id: "skills",
        keywords: [
            "skill", "skills", "tech", "technology", "stack", "tools",
            "technologies", "tech stack", "what can he do", "capabilities",
            "proficient", "good at", "expertise", "specialization",
            "what does he know", "what he knows",
        ],
        response:
            "Aadish has a strong and diverse technical skill set:\n\n🧠 **AI & Machine Learning**\nRAG Systems, LLMs (T5, Qwen, TinyLLaMA), LangChain, LangGraph, Agentic Workflows, TensorFlow, PyTorch, OpenCV, Scikit-learn, Prompt Engineering\n\n💻 **Languages & Backend**\nPython (primary), Java, SQL, FastAPI, MySQL\n\n📊 **Data & Visualization**\nPandas, NumPy, Power BI, Tableau, Excel\n\n🚀 **Product & Leadership**\nAgile PM, Sprint Planning, Roadmapping, Cross-functional Team Leadership (40+), Release Cycles, Technical Documentation\n\nHe's currently applying RAG and enterprise AI skills at EQS Group (Q by EQS), with deep agentic AI experience from Heybobo.",
        followUp: ["Tell me about EQS", "AI/ML details", "Leadership style?"],
    },
    {
        id: "python",
        keywords: [
            "python", "py", "python programming",
        ],
        response:
            "Python is Aadish's primary language and runs through everything he builds:\n\n• **AI/ML**: TensorFlow, PyTorch, Scikit-learn, Hugging Face\n• **Backend**: FastAPI for high-performance REST APIs\n• **Data**: Pandas, NumPy for data manipulation\n• **LLMs**: Fine-tuning and deploying models like TinyLLaMA, T5, Qwen\n• **Computer Vision**: OpenCV, COCO-SSD pipelines\n\nIt's not just a language for him — it's the backbone of his entire engineering workflow.",
        followUp: ["Other languages?", "What about Java?", "His projects"],
    },
    {
        id: "java",
        keywords: ["java", "oop", "object oriented"],
        synonyms: ["java programming"],
        response:
            "Yes, Aadish is proficient in Java as well. He has solid experience with object-oriented programming concepts. While Python is his go-to for AI/ML work, Java complements his CS fundamentals and backend knowledge.",
        followUp: ["Python skills?", "SQL experience?", "Full stack?"],
    },
    {
        id: "sql",
        keywords: [
            "sql", "mysql", "database", "db", "query", "queries",
        ],
        response:
            "Aadish works with SQL and MySQL for database design, complex queries, and data management in his AI applications. His data pipeline work involves structured storage, retrieval optimization, and integration with ML workflows.",
        followUp: ["Data visualization tools?", "Backend skills?", "Python?"],
    },
    {
        id: "ai-ml",
        keywords: [
            "ai", "ml", "machine learning", "deep learning", "neural network",
            "llm", "large language model", "langchain", "langgraph",
            "transformer", "nlp", "natural language", "computer vision",
            "opencv", "tensorflow", "pytorch", "model", "training",
            "fine-tuning", "fine tuning",
        ],
        response:
            "AI and ML are Aadish's core strengths. Here's what he works with:\n\n**RAG & Enterprise AI**: Building retrieval-augmented generation at EQS Group for Q by EQS\n**Large Language Models**: Google T5, Qwen, TinyLLaMA — fine-tuning, deployment, and prompt engineering\n**Agentic AI**: LangGraph, LangChain for multi-agent and workflow systems\n**Deep Learning**: TensorFlow, PyTorch — custom architectures, CNNs, model optimization\n**Computer Vision**: OpenCV, COCO-SSD — real-time object detection and liveness detection\n**NLP**: Chatbot automation, text classification, intent recognition\n\nHe doesn't just *use* AI frameworks — he builds end-to-end systems that ship to real users.",
        followUp: ["Tell me about EQS", "Show me his AI projects", "Team leadership"],
    },
    {
        id: "data-viz",
        keywords: [
            "power bi", "tableau", "data visualization", "dashboard",
            "analytics", "data analysis", "pandas", "numpy", "excel",
            "visualization",
        ],
        response:
            "Aadish has strong data visualization and analysis skills:\n\n• **Pandas & NumPy** for data manipulation and analysis\n• **Power BI** for business intelligence dashboards\n• **Tableau** for interactive data storytelling\n• **Excel** for advanced spreadsheet modeling\n\nHe uses these to turn raw data into actionable insights — both for his own ML pipelines and for stakeholder reporting.",
        followUp: ["AI/ML skills?", "Backend tools?", "His experience"],
    },

    // ── Education ──────────────────────────────────────────────────────
    {
        id: "education",
        keywords: [
            "education", "study", "college", "university", "degree", "school",
            "academic", "studied", "learning", "qualification", "graduated",
            "graduation", "cgpa", "gpa", "marks", "grade",
        ],
        response:
            "Aadish has a strong academic foundation:\n\n🎓 **M.S. in AI & Data Science** (Current)\nDeggendorf Institute of Technology, Germany\nMar 2026 – Present\n\n🎓 **B.E. in Computer Science (AI)**\nChitkara University, Punjab, India\nCGPA: 8.68 / 10 | 2021 – 2025\n\n📚 **Higher Secondary (12th CBSE)** — 80.2%\n📚 **Secondary School (10th CBSE)** — 88.2%\nBoth at Little Angels School, India\n\nHe's now pursuing advanced AI research in Germany while building on 4 years of hands-on engineering.",
        followUp: ["Why Germany?", "What about work experience?", "His patents"],
    },
    {
        id: "masters",
        keywords: [
            "masters", "master", "ms", "germany", "deggendorf", "dit",
            "current study", "where is he now", "what is he doing now",
            "currently",
        ],
        response:
            "Aadish is currently pursuing his **Master of Science in Artificial Intelligence and Data Science** at the **Deggendorf Institute of Technology** in Germany (started March 2026).\n\nAlongside his studies, he works as a **Working Student Software Engineer at EQS Group**, contributing to RAG systems and **Q by EQS** — the company's AI intelligence layer for enterprise compliance.\n\nAfter leading AI teams in India, he moved to Germany to deepen his research skills while shipping real enterprise AI. Academic rigor + production impact.",
        followUp: ["Tell me about EQS", "His undergrad?", "Career goals?"],
    },
    {
        id: "chitkara",
        keywords: [
            "chitkara", "undergraduate", "undergrad", "bachelors", "bachelor",
            "b.e.", "btech", "b tech",
        ],
        response:
            "Aadish completed his **B.E. in Computer Science (AI)** from **Chitkara University**, Punjab, India (2021–2025) with a CGPA of 8.68/10.\n\nHis coursework covered core CS, machine learning, deep learning, and computer vision. This is where he built his technical foundation and started working on real AI projects alongside his studies.",
        followUp: ["Now doing Masters?", "Work experience?", "Projects he built"],
    },

    // ── Patents & Achievements ─────────────────────────────────────────
    {
        id: "patents",
        keywords: [
            "patent", "patents", "intellectual property", "ip", "invention",
            "shoe sole", "innovation", "published",
        ],
        response:
            "Aadish has **3 published patents** — which is exceptional for someone his age:\n\n• A government-funded **Shoe Sole Innovation** patent\n• AI-powered assessment system patents\n\nThese aren't just theoretical filings — they represent real innovations in applied AI that are now legally protected intellectual property. Having published patents demonstrates both originality of thought and the ability to take ideas through formal validation.",
        followUp: ["Achievements?", "Chess medals?", "His projects"],
    },
    {
        id: "achievements",
        keywords: [
            "achievement", "achievements", "accomplishment", "award", "awards",
            "honors", "distinction", "recognition",
        ],
        response:
            "Here are Aadish's key achievements:\n\n🏆 **3 Published Patents** — including a govt-funded innovation\n♟️ **Chess Medals at IIT-level** — Silver (IIT Mandi), Gold (JUIT), Bronze (IIT Ropar)\n👥 **Managed 40+ Engineers** at Heybobo.ai across 5 departments\n🧠 **Architected 3 AI Modules** — Health, Learning, and Personalization\n🎯 **2000+ Users Impacted** through his AI diagnostic system\n📈 **50% Scalability Improvement** at Shinkan through optimization\n\nA mix of intellectual, technical, and leadership achievements.",
        followUp: ["Tell me about chess", "Patent details", "His work experience"],
    },
    {
        id: "chess",
        keywords: [
            "chess", "medal", "medals", "tournament", "iit mandi", "juit",
            "iit ropar", "strategy", "board game",
        ],
        response:
            "Aadish is a competitive chess player who's performed at IIT-level tournaments:\n\n🥈 **Silver Medal** — IIT Mandi\n🥇 **Gold Medal** — JUIT\n🥉 **Bronze Medal** — IIT Ropar\n\nChess isn't just a hobby for him — it reflects the same strategic thinking he applies to engineering and product management. Pattern recognition, thinking several moves ahead, adapting to pressure — these skills translate directly into how he approaches technical problems.",
        followUp: ["Other achievements?", "His leadership style", "About him"],
    },

    // ── Contact ────────────────────────────────────────────────────────
    {
        id: "contact",
        keywords: [
            "contact", "reach", "email", "mail", "phone", "number", "call",
            "linkedin", "github", "social", "connect", "hire", "hiring",
            "message", "dm", "whatsapp",
        ],
        response:
            "You can reach Aadish through:\n\n📧 **Email**: aadishparashar001@gmail.com\n💼 **LinkedIn**: linkedin.com/in/aadishparashar001\n💻 **GitHub**: github.com/Aadish0011\n📱 **WhatsApp**: Available for direct chat\n\nHe's open to discussing AI roles, collaborations, research opportunities, or just geeking out about LLMs!",
        followUp: ["Chat on WhatsApp", "View LinkedIn", "See GitHub"],
    },

    // ── Why hire / value ───────────────────────────────────────────────
    {
        id: "why-hire",
        keywords: [
            "why hire", "why should", "what makes him special", "unique",
            "stand out", "different", "better", "value", "strength",
            "what sets him apart", "why him", "convince me",
        ],
        response:
            "Here's what makes Aadish stand out:\n\n**1. Enterprise AI at EQS** — Currently shipping RAG and Q by EQS for regulated compliance — AI that must be accurate, auditable, and production-ready.\n\n**2. He ships real AI products** — Architected 3 AI modules at Heybobo (Health, Learning, Personalization) from concept to production.\n\n**3. Technical depth + leadership** — Can design agentic LangGraph workflows AND manage 40+ engineers across 5 teams.\n\n**4. Hands-on AI architect** — RAG pipelines, autonomous agents, tool-calling, contextual memory, and LLM systems.\n\n**5. Patented innovator** — 3 published patents show he thinks beyond existing solutions.\n\n**6. Global perspective** — India → Germany: engineering roots + Master's + enterprise AI at EQS.\n\nHe's not just an engineer who codes — he's a builder who leads.",
        followUp: ["Tell me about EQS", "Contact him", "Work experience"],
    },

    // ── Leadership / Management ────────────────────────────────────────
    {
        id: "leadership",
        keywords: [
            "leadership", "leader", "manage", "manager", "management",
            "team", "lead", "leading", "coordination", "mentor",
            "agile", "sprint", "scrum", "roadmap",
        ],
        response:
            "Leadership is a core part of Aadish's identity:\n\n• **Managed 40+ engineers** at Heybobo.ai across UI/UX, Frontend, Backend, AI/ML, and DevOps\n• **Managed 10+ engineers** at Shinkan with 50% scalability improvements\n• Practices **Agile/Scrum** — sprint planning, roadmap execution, release cycles\n• **Translates product vision into architecture** — bridges strategy with AI engineering execution\n• Skilled at **cross-functional coordination** between highly diverse teams\n\nHe believes the best AI leaders are the ones who can both read the code and read the room.",
        followUp: ["His experience at Heybobo?", "Technical skills", "Why hire him?"],
    },

    // ── Casual / Fun ───────────────────────────────────────────────────
    {
        id: "hobbies",
        keywords: [
            "hobby", "hobbies", "fun", "free time", "interests", "passion",
            "outside work", "for fun", "spare time",
        ],
        response:
            "Beyond code and products:\n\n♟️ **Chess** — Competitive player with IIT-level medals. Strategic thinking is in his DNA.\n🚀 **Shipping fast** — He genuinely enjoys the rush of taking an idea to production.\n📊 **Data exploration** — Finds patterns in everything, even outside work.\n🤝 **Team building** — Loves mentoring and growing engineering teams.\n\nHe's also someone who values continuous learning — hence the move to Germany for his Master's.",
        followUp: ["Chess details?", "About him", "His projects"],
    },

    // ── Thanks / Goodbye ───────────────────────────────────────────────
    {
        id: "thanks",
        keywords: [
            "thanks", "thank you", "thx", "ty", "appreciate", "helpful",
            "great", "awesome", "cool", "nice", "perfect", "wonderful",
            "amazing", "good answer",
        ],
        response: [
            "You're welcome! Let me know if there's anything else you'd like to know about Aadish. 😊",
            "Glad I could help! Feel free to ask anything else, or reach out to Aadish directly.",
            "Happy to help! If you want to connect with Aadish, I can share his contact info too.",
        ],
        followUp: ["Contact info", "Anything else about him", "View projects"],
    },
    {
        id: "goodbye",
        keywords: [
            "bye", "goodbye", "see you", "later", "cya", "gtg",
            "gotta go", "take care", "peace",
        ],
        response: [
            "Take care! Thanks for checking out Aadish's portfolio. Feel free to come back anytime! 👋",
            "Goodbye! If you ever want to discuss AI, projects, or opportunities with Aadish, you know where to find me. 🙂",
        ],
        followUp: ["Contact Aadish", "Back to portfolio"],
    },

    // ── Help ───────────────────────────────────────────────────────────
    {
        id: "help",
        keywords: [
            "help", "what can you do", "how do you work", "options",
            "menu", "guide", "what should i ask", "commands",
            "what can i ask", "how to use",
        ],
        response:
            "I can help you learn about Aadish! Here are some things you can ask:\n\n• \"Who is Aadish?\" — Overview & background\n• \"What are his projects?\" — AI systems he's built\n• \"Skills & tech stack\" — Languages, frameworks, tools\n• \"Work experience\" — Companies & roles\n• \"Education\" — Degrees & current studies\n• \"Patents & achievements\" — Awards, IP, chess medals\n• \"Why should I hire him?\" — His unique value\n• \"Contact info\" — Email, LinkedIn, GitHub\n\nOr just ask anything naturally — I'll figure it out! 🙂",
        followUp: ["About Aadish", "His projects", "Contact info"],
    },

    // ── Resume / CV ────────────────────────────────────────────────────
    {
        id: "resume",
        keywords: [
            "resume", "cv", "curriculum vitae", "download resume",
            "pdf", "document",
        ],
        response:
            "While a formal resume download isn't set up yet, this portfolio covers everything you'd find on one — and more!\n\nYou can explore his:\n• Work experience\n• Projects with impact metrics\n• Full skills breakdown\n• Education history\n• Patents and achievements\n\nFor a direct conversation or to request a resume, reach out via email or LinkedIn!",
        followUp: ["Contact info", "Work experience", "Skills"],
    },

    // ── Location / Availability ────────────────────────────────────────
    {
        id: "location",
        keywords: [
            "where", "located", "location", "city", "country", "based",
            "india", "available", "availability", "remote", "timezone",
            "relocate",
        ],
        response:
            "Aadish is currently based in **Germany**, pursuing his Master's in AI & Data Science at Deggendorf Institute of Technology.\n\nPreviously based in India where he worked at Heybobo.ai and Shinkan.\n\nHe's open to opportunities in Europe and beyond — and comfortable with both in-person and remote collaboration across time zones.",
        followUp: ["Why Germany?", "Contact him", "His experience"],
    },

    // ── Age / Personal ─────────────────────────────────────────────────
    {
        id: "personal",
        keywords: [
            "age", "old", "birthday", "born", "year born", "young",
            "how old",
        ],
        response:
            "Aadish graduated with his B.E. in 2025 and is currently pursuing his Master's — so he's early in his career but has already packed in impressive experience: two PM roles, 3 patents, multiple AI products, and competitive chess medals.\n\nRather than focusing on age, his track record speaks for itself!",
        followUp: ["His achievements", "Work experience", "Education"],
    },
];

// ---------------------------------------------------------------------------
// Matching engine — scored intent classification with fuzzy support
// ---------------------------------------------------------------------------

function normalize(text: string): string {
    return text
        .toLowerCase()
        .replace(/['']/g, "'")
        .replace(/[^\w\s']/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function scoreIntent(input: string, intent: Intent): number {
    const words = normalize(input).split(" ");
    const joined = normalize(input);
    let score = 0;

    for (const kw of intent.keywords) {
        if (joined.includes(kw)) {
            const kwWordCount = kw.split(" ").length;
            score += kwWordCount * 2;
            if (joined === kw) score += 5;
        }
    }

    if (intent.synonyms) {
        for (const syn of intent.synonyms) {
            if (joined.includes(syn)) score += 1.5;
        }
    }

    for (const word of words) {
        if (word.length < 3) continue;
        for (const kw of intent.keywords) {
            for (const kwPart of kw.split(" ")) {
                if (kwPart.length < 3) continue;
                if (
                    kwPart.startsWith(word.slice(0, 3)) ||
                    word.startsWith(kwPart.slice(0, 3))
                ) {
                    score += 0.5;
                }
                if (levenshtein(word, kwPart) <= 2 && word.length > 3) {
                    score += 1;
                }
            }
        }
    }

    return score;
}

function levenshtein(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
        Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] =
                a[i - 1] === b[j - 1]
                    ? dp[i - 1][j - 1]
                    : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

function pickRandom<T>(items: T | T[]): T {
    if (Array.isArray(items)) return items[Math.floor(Math.random() * items.length)];
    return items;
}

function classifyIntent(
    input: string,
    history: Message[]
): { response: string; followUp?: string[]; intentId: string } {
    const cleaned = normalize(input);

    if (cleaned.length === 0 || /^[.\s!?]+$/.test(cleaned)) {
        return {
            intentId: "empty",
            response: "Looks like that was empty! Try asking something like \"What are Aadish's projects?\" or \"Tell me about his skills.\"",
            followUp: ["About Aadish", "His projects", "Skills"],
        };
    }

    if (cleaned.length <= 2 && !/^(hi|yo|cv)$/i.test(cleaned)) {
        return {
            intentId: "too-short",
            response: "Could you give me a bit more to work with? I'm great at answering questions about Aadish's projects, experience, skills, and more!",
            followUp: ["What can you tell me?", "Projects", "Experience"],
        };
    }

    const tellMore = /^(tell me more|more|go on|continue|elaborate|details|expand|more details|more info|and\?|what else)$/i;
    if (tellMore.test(cleaned)) {
        const lastAssistantIntent = [...history]
            .reverse()
            .find((m) => m.role === "assistant" && m.content.length > 50);
        if (lastAssistantIntent) {
            return {
                intentId: "follow-up",
                response:
                    "Sure! Here are some related topics I can dive into — just pick one:",
                followUp: ["His projects", "Work experience", "Skills", "Education", "Contact info"],
            };
        }
    }

    const scored = intents
        .map((intent) => ({ intent, score: scoreIntent(input, intent) }))
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score);

    if (scored.length > 0 && scored[0].score >= 1.5) {
        const best = scored[0].intent;

        if (scored.length >= 2 && scored[1].score >= scored[0].score * 0.7) {
            const second = scored[1].intent;
            const r1 = pickRandom(best.response);
            const r2 = pickRandom(second.response);
            return {
                intentId: `${best.id}+${second.id}`,
                response: r1 + "\n\n---\n\n" + r2,
                followUp: best.followUp || second.followUp,
            };
        }

        return {
            intentId: best.id,
            response: pickRandom(best.response),
            followUp: best.followUp,
        };
    }

    return {
        intentId: "fallback",
        response:
            "Hmm, I'm not sure I understood that. I'm best at answering questions about Aadish's background, projects, skills, and experience.\n\nTry something like:\n• \"What has Aadish built?\"\n• \"Tell me about his AI experience\"\n• \"Why should I hire him?\"\n\nOr just say \"help\" to see everything I can talk about!",
        followUp: ["Help", "About Aadish", "His projects"],
    };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const INITIAL_CHIPS = ["About Aadish", "EQS & Q", "Skills", "Experience"];

const QUICK_PROMPTS = [
    { label: "About him", query: "Tell me about Aadish", icon: User },
    { label: "EQS & Q", query: "Tell me about EQS", icon: Sparkles },
    { label: "Experience", query: "Work experience", icon: Briefcase },
    { label: "Skills", query: "Skills overview", icon: Code2 },
    { label: "Education", query: "His education", icon: GraduationCap },
    { label: "Projects", query: "Show me projects", icon: Bot },
];

const AIAssistant = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hey! I'm Aadish's AI guide.\n\nI know his work at EQS Group (RAG + Q by EQS), Heybobo, projects, skills, and more.\n\nWhat would you like to explore?",
        },
        { role: "chips", content: INITIAL_CHIPS.join("|") },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        requestAnimationFrame(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        });
    }, []);

    useEffect(scrollToBottom, [messages, isTyping, scrollToBottom]);

    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => inputRef.current?.focus(), 200);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const processInput = useCallback((text: string) => {
        if (!text.trim()) return;

        setHasInteracted(true);
        const userMsg: Message = { role: "user", content: text };
        setMessages((prev) => {
            const filtered = prev.filter((m) => m.role !== "chips");
            return [...filtered, userMsg];
        });
        setInput("");
        setIsTyping(true);

        const delay = Math.min(450 + text.length * 8, 1100);

        setTimeout(() => {
            setMessages((prev) => {
                const result = classifyIntent(text, prev);
                const newMessages: Message[] = [
                    ...prev,
                    { role: "assistant", content: result.response },
                ];

                if (
                    result.intentId === "contact" &&
                    text.toLowerCase().includes("whatsapp")
                ) {
                    newMessages.push({ role: "whatsapp", content: "" });
                }

                if (result.followUp && result.followUp.length > 0) {
                    newMessages.push({
                        role: "chips",
                        content: result.followUp.join("|"),
                    });
                }

                return newMessages;
            });
            setIsTyping(false);
        }, delay);
    }, []);

    const handleSend = () => processInput(input);

    const handleChipClick = (chip: string) => {
        if (chip === "Chat on WhatsApp") {
            window.open("https://wa.me/919588188463", "_blank");
            return;
        }
        if (chip === "View LinkedIn") {
            window.open("https://linkedin.com/in/aadishparashar001", "_blank");
            return;
        }
        if (chip === "See GitHub" || chip === "GitHub link") {
            window.open("https://github.com/Aadish0011", "_blank");
            return;
        }
        if (chip === "Back to portfolio") {
            setIsOpen(false);
            return;
        }
        processInput(chip);
    };

    const showWelcomeGrid =
        !hasInteracted &&
        messages.filter((m) => m.role === "user").length === 0;

    return (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 16 }}
                        transition={{ type: "spring", damping: 26, stiffness: 320 }}
                        className={`absolute bottom-[4.5rem] right-0 w-[min(100vw-1.5rem,400px)] h-[min(72vh,580px)] rounded-3xl overflow-hidden flex flex-col border ${
                            isDark ? "border-white/[0.08]" : "border-slate-200/80"
                        }`}
                        style={{
                            background: isDark
                                ? "linear-gradient(165deg, rgba(12,10,32,0.98) 0%, rgba(3,0,20,0.98) 100%)"
                                : "linear-gradient(165deg, #ffffff 0%, #f8fafc 100%)",
                            backdropFilter: "blur(28px)",
                            boxShadow: isDark
                                ? "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.08), 0 0 60px rgba(212,175,55,0.06)"
                                : "0 24px 80px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)",
                        }}
                    >
                        {/* Ambient glow */}
                        <div
                            className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full opacity-40"
                            style={{
                                background: isDark
                                    ? "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)"
                                    : "radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)",
                            }}
                        />

                        {/* Header */}
                        <div
                            className={`relative px-4 py-3.5 border-b flex justify-between items-center ${
                                isDark
                                    ? "border-white/[0.06]"
                                    : "border-slate-100"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div
                                        className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                                            isDark
                                                ? "bg-gradient-to-br from-solar/25 to-solar/5 text-solar"
                                                : "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-700"
                                        }`}
                                    >
                                        <Sparkles size={18} />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[rgba(3,0,20,0.98)]" />
                                </div>
                                <div>
                                    <div
                                        className={`font-display font-bold text-[15px] tracking-tight ${
                                            isDark ? "text-white" : "text-slate-900"
                                        }`}
                                    >
                                        Aadish AI
                                    </div>
                                    <div
                                        className={`text-[11px] flex items-center gap-1.5 ${
                                            isDark ? "text-muted" : "text-slate-500"
                                        }`}
                                    >
                                        Portfolio guide · EQS · RAG · Q
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`p-2 rounded-xl transition-all ${
                                    isDark
                                        ? "text-subtle hover:text-white hover:bg-white/5"
                                        : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                                }`}
                                aria-label="Close assistant"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="relative flex-1 overflow-y-auto px-4 py-4 space-y-3.5 text-[13px]"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.22 }}
                                    className={`flex gap-2.5 ${
                                        msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    {msg.role === "whatsapp" ? (
                                        <a
                                            href="https://wa.me/919588188463"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/15 transition-colors text-xs font-medium"
                                        >
                                            <MessageCircle size={14} />
                                            Chat on WhatsApp
                                            <ExternalLink size={10} />
                                        </a>
                                    ) : msg.role === "chips" ? (
                                        <div className="flex flex-wrap gap-1.5 w-full pl-9">
                                            {msg.content.split("|").map((chip, ci) => (
                                                <button
                                                    key={ci}
                                                    onClick={() => handleChipClick(chip)}
                                                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                                                        isDark
                                                            ? "bg-white/[0.04] text-solar border border-solar/20 hover:bg-solar/10 hover:border-solar/35"
                                                            : "bg-white text-amber-800 border border-amber-200 shadow-sm hover:bg-amber-50 hover:border-amber-300"
                                                    }`}
                                                >
                                                    {chip}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            {msg.role === "assistant" && (
                                                <div
                                                    className={`mt-0.5 w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${
                                                        isDark
                                                            ? "bg-solar/15 text-solar"
                                                            : "bg-amber-100 text-amber-700"
                                                    }`}
                                                >
                                                    <Bot size={14} />
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[84%] px-3.5 py-2.5 ${
                                                    msg.role === "user"
                                                        ? isDark
                                                            ? "rounded-2xl rounded-br-md bg-gradient-to-br from-solar/20 to-solar/10 border border-solar/25 text-solar"
                                                            : "rounded-2xl rounded-br-md bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 text-amber-900"
                                                        : isDark
                                                          ? "rounded-2xl rounded-tl-md bg-white/[0.045] border border-white/[0.07] text-[#d1d8e4]"
                                                          : "rounded-2xl rounded-tl-md bg-slate-50 border border-slate-100 text-slate-700 shadow-sm"
                                                }`}
                                            >
                                                <div className="whitespace-pre-wrap leading-relaxed">
                                                    {formatMessage(msg.content)}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            ))}

                            {showWelcomeGrid && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="grid grid-cols-2 gap-2 pt-1 pl-9"
                                >
                                    {QUICK_PROMPTS.map((p) => (
                                        <button
                                            key={p.label}
                                            onClick={() => processInput(p.query)}
                                            className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                                                isDark
                                                    ? "bg-white/[0.03] border border-white/[0.06] hover:border-solar/25 hover:bg-solar/[0.06]"
                                                    : "bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50/60 shadow-sm"
                                            }`}
                                        >
                                            <p.icon
                                                size={14}
                                                className={
                                                    isDark
                                                        ? "text-solar/70 group-hover:text-solar"
                                                        : "text-amber-600"
                                                }
                                            />
                                            <span
                                                className={`text-[11px] font-medium ${
                                                    isDark
                                                        ? "text-muted group-hover:text-white"
                                                        : "text-slate-600 group-hover:text-slate-900"
                                                }`}
                                            >
                                                {p.label}
                                            </span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            {isTyping && (
                                <div className="flex gap-2.5 justify-start">
                                    <div
                                        className={`mt-0.5 w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${
                                            isDark
                                                ? "bg-solar/15 text-solar"
                                                : "bg-amber-100 text-amber-700"
                                        }`}
                                    >
                                        <Bot size={14} />
                                    </div>
                                    <div
                                        className={`px-4 py-3 rounded-2xl rounded-tl-md flex gap-1.5 items-center ${
                                            isDark
                                                ? "bg-white/[0.045] border border-white/[0.07]"
                                                : "bg-slate-50 border border-slate-100"
                                        }`}
                                    >
                                        {[0, 1, 2].map((d) => (
                                            <motion.div
                                                key={d}
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    isDark ? "bg-solar" : "bg-amber-500"
                                                }`}
                                                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                                                transition={{
                                                    duration: 0.9,
                                                    repeat: Infinity,
                                                    delay: d * 0.15,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div
                            className={`relative px-3 py-3 border-t ${
                                isDark ? "border-white/[0.06]" : "border-slate-100"
                            }`}
                        >
                            <div
                                className={`relative flex items-center rounded-2xl transition-all ${
                                    isDark
                                        ? "bg-white/[0.04] border border-white/[0.08] focus-within:border-solar/35 focus-within:bg-white/[0.05]"
                                        : "bg-slate-50 border border-slate-200 focus-within:border-amber-400 focus-within:bg-white"
                                }`}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        !e.shiftKey &&
                                        handleSend()
                                    }
                                    placeholder="Ask about EQS, RAG, skills..."
                                    className={`w-full bg-transparent rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none ${
                                        isDark
                                            ? "text-white placeholder:text-subtle"
                                            : "text-slate-900 placeholder:text-slate-400"
                                    }`}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className={`absolute right-1.5 p-2 rounded-xl transition-all disabled:opacity-30 disabled:cursor-default ${
                                        input.trim()
                                            ? "bg-solar text-void hover:bg-solar-bright"
                                            : isDark
                                              ? "text-solar"
                                              : "text-amber-600"
                                    }`}
                                    aria-label="Send message"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <div className="relative">
                {!isOpen && (
                    <motion.span
                        className="absolute inset-0 rounded-full bg-solar/40"
                        animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                    />
                )}
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                            ? isDark
                                ? "bg-white/10 text-white border border-white/15"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            : "bg-solar text-void hover:bg-solar-bright glow-solar"
                    }`}
                    aria-label="Toggle AI assistant"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <X size={22} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="bot"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Bot size={22} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
};

export default AIAssistant;
