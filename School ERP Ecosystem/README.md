# XYZ AI — Human-Like AI School Assistant

XYZ AI is a standalone **Applied AI Solution** designed for modern School ERP Ecosystems. It behaves like a real human school assistant, interacting seamlessly with **Students, Parents, Teachers, and School Management/Principals** across Chat, Voice, and an Interactive AI Avatar.

---

## 🏗️ 1. Repository Structure (School ERP Ecosystem)

Per Section 5 of the specification, the project is organized into 5 repositories:

```
School ERP Ecosystem/
│
├── 01. Student Repository
│   └── student-portal/            # Student Dashboard & Academic View
│
├── 02. Parent Repository
│   └── parent-portal/             # Parent Portal & Child Attendance View
│
├── 03. Management Repository
│   └── management-portal/         # Principal & Executive Analytics Suite
│
├── 04. Staff Repository
│   └── staff-portal/              # Teacher Attendance Logging Portal
│
└── 05. XYZ AI Repository
    └── xyz-ai/                    # Core AI Engine, Speech Processor, AI Avatar Canvas & Security Guardrails
```

---

## 🎯 2. Personas & Capability Matrix

| User Role | Persona | AI Capability | Sample Natural Language Query | Hardened RBAC Rule |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | Friendly Academic Assistant | View own attendance & schedule | *"What is my attendance?"* | Permitted for own record only (`Aarav Sharma`). Blocked from modifying data or viewing school-wide metrics. |
| **Parent** | Caring Parent Support Assistant | View linked child's attendance & request call | *"How much attendance does my child have?"* | Permitted for linked child (`Rahul Sharma`). Authorized to trigger human escalation call requests. |
| **Teacher** | Professional Teaching Assistant | Mark student attendance & view roster | *"Mark Rahul absent today."* | Authorized to modify class attendance. Blocked from viewing principal analytics. |
| **Principal** | Executive Management Assistant | School attendance analytics & staff logs | *"What is the overall attendance?"* | Full school-wide analytics access across all classes and staff records. |

---

## 🗣️ 3. Multimodal Experience (Chat + Voice + AI Avatar)

1. **Chat Interface**: Natural language understanding, conversational history, follow-up tracking, missing context prompt.
2. **Speech Pipeline (Voice)**:
   - **Speech-to-Text (STT)**: Web Speech API voice input microphone button.
   - **Text-to-Speech (TTS)**: Natural voice synthesis with persona-tuned pitch and speech rate.
3. **Interactive Canvas AI Avatar**:
   - Dynamic 3D canvas avatar rendering.
   - Real-time **lip synchronization** during voice playback.
   - **Facial expressions**: Idle, Listening, Thinking, Speaking, Empathetic/Caring, Professional.
   - Visual styling adapted dynamically based on selected Persona.

---

## 🌐 4. 12-Language Support

XYZ AI supports 12 major languages:
**English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Bengali (বাংলা), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Kannada (<ctrl42><ctrl42><ctrl42><ctrl42>), Malayalam (മലയാളം), and Urdu (اردو)**.

---

## 📞 5. Escalation to Real Teacher / School Management

- Supported options: **"Talk to Teacher"** and **"Contact School Management"**.
- State Machine Rule: The system never claims a representative has been contacted until a mock service call request object (`REQ-XXXX`) is issued and confirmed.

---

## 🛡️ 6. Hardened Security & Safety Guardrails

XYZ AI implements security at the **application/tool execution layer** rather than relying only on LLM prompts:

- **Role-Based Permission Enforcement**: Function-level checks block unauthorized actions (e.g. Students attempting `MARK_ATTENDANCE` or `SCHOOL_WIDE_METRICS`).
- **Prompt Injection Defense**: Input sanitization prevents jailbreak attempts (`"Ignore previous instructions"`, `"System prompt extraction"`).
- **Credential & Prompt Shielding**: Masking API keys and internal prompt structure from output stream.
- **Live Security Audit Drawer**: Displays real-time evaluation logs of permission checks and blocked injections.
