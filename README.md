# StudyLens / XYZ AI — Human-Like AI School Assistant 🎓🤖

An applied AI solution engineered for modern School ERP ecosystems. XYZ AI behaves like a real human school assistant, seamlessly engaging with **Students, Parents, Teachers, and School Management / Principals** across **Chat, Voice, and an Interactive AI Avatar**.

---

## 🌟 Core Highlights & Capabilities

- 🎭 **4 Persona Roles**:
  - **Student**: Friendly & supportive Academic Assistant (attendance checks, homework assistance, schedule lookup).
  - **Parent**: Caring & patient Parent Support Assistant (child attendance, fee status, teacher escalation).
  - **Teacher**: Professional Teaching Assistant (attendance logging, roster management, exam logs).
  - **Principal**: Executive Management Assistant (school-wide analytics, attendance trends, staff logs).
- 🗣️ **Multimodal Voice & AI Avatar**:
  - Full bidirectional Speech-to-Text (STT) and natural Text-to-Speech (TTS).
  - Dynamic interactive canvas Avatar with real-time **lip synchronization** and reactive emotional expressions (Idle, Listening, Thinking, Speaking, Empathetic, Professional).
- 🌐 **11+ Indian & Global Languages**:
  - English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Bengali (বাংলা), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), and Urdu (اردو).
- 🛡️ **Hardened Application-Layer Security & RBAC**:
  - Enforced at the code/tool execution level — never relying merely on LLM system prompts.
  - Defenses against prompt injection, jailbreak attempts, system prompt extraction, credential exfiltration, and unauthorized action spoofing.
- 📞 **Verified Human Escalation Protocol**:
  - Guaranteed verification: only confirms teacher or management escalation when a valid mock dispatch request (`REQ-XXXX`) is confirmed.

---

## 🏗️ Repository Structure (School ERP Ecosystem)

```
School ERP Ecosystem/
├── 01. Student Repository/
│   └── student-portal/            # Student Dashboard & Academic View
├── 02. Parent Repository/
│   └── parent-portal/             # Parent Portal & Child Attendance View
├── 03. Management Repository/
│   └── management-portal/         # Principal & Executive Analytics Suite
├── 04. Staff Repository/
│   └── staff-portal/              # Teacher Attendance Logging Portal
└── 05. XYZ AI Repository/
    └── xyz-ai/                    # Core AI Engine, Speech Processor, AI Avatar & RBAC
```

---

## 🚀 Getting Started

### 1. Zero-Config Static Launch
Open `School ERP Ecosystem/05. XYZ AI Repository/xyz-ai/index.html` in any modern web browser or host on GitHub Pages / Vercel.

### 2. Local Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Security & Safety Guardrails

XYZ AI implements multi-tiered security:
1. **Role-Based Permission Enforcement**: Non-elevated roles (e.g. Student) are blocked at the tool layer from executing unauthorized operations (e.g. `MARK_ATTENDANCE` or `FETCH_ALL_STUDENTS`).
2. **Prompt Injection Sanitization**: Detects and sanitizes pattern exploits like `"Ignore previous instructions"` or `"System prompt extraction"`.
3. **Audit Trail**: Real-time permission evaluation logging in the Live Security Audit Drawer.

---

## 📄 License
MIT License © 2026 StudyLens / XYZ AI Ecosystem.
