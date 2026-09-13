# StudyLens / XYZ AI — AI-Powered School ERP Ecosystem 🎓🤖

StudyLens / XYZ AI is a human-like AI assistant for modern school ERP workflows. It supports **Students, Parents, Teachers, and School Management** through **chat, voice, and avatar-based interaction** with role-aware controls and security guardrails.

## Ecosystem Repositories

The project ecosystem is organized into five repositories/modules:

1. [Student Repository](./School%20ERP%20Ecosystem/01.%20Student%20Repository/)
2. [Parent Repository](./School%20ERP%20Ecosystem/02.%20Parent%20Repository/)
3. [Management Repository](./School%20ERP%20Ecosystem/03.%20Management%20Repository/)
4. [Staff Repository](./School%20ERP%20Ecosystem/04.%20Staff%20Repository/)
5. [XYZ AI Repository](./School%20ERP%20Ecosystem/05.%20XYZ%20AI%20Repository/)

## Key Features

- **Role Personas**: Student, Parent, Teacher, Principal/Management
- **Multimodal Experience**: Chat, Speech-to-Text, Text-to-Speech, Interactive Avatar
- **Multilingual Support**: English + major Indian languages
- **RBAC + Security Guardrails**: Input sanitization, role-level action enforcement, audit visibility
- **Escalation Protocols**: Structured teacher/management handoff flow

## Installation

### Prerequisites

- Node.js 18+
- npm 9+

### Local Setup

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Setup Instructions

1. Clone the repository.
2. Install dependencies with `npm install`.
3. (Optional) Copy `.env.example` to `.env.local` and configure values as needed.
4. Start the application with `npm run dev`.

For static module preview, open:
`/School ERP Ecosystem/05. XYZ AI Repository/xyz-ai/index.html`

## Usage Examples

### Student Query
- “What is my attendance this month?”

### Parent Query
- “Show my child’s attendance and recent notices.”

### Teacher Query
- “Mark Rahul absent for today.”

### Principal Query
- “Give me school-wide attendance trends for this week.”

## API Documentation

StudyLens currently exposes functionality primarily through frontend interaction modules and persona-driven orchestration logic.

### Functional API Surface (Role-Aware Operations)

- `FETCH_OWN_ATTENDANCE` — Student self-attendance access
- `FETCH_CHILD_ATTENDANCE` — Parent linked-child attendance access
- `MARK_ATTENDANCE` — Teacher attendance update action
- `FETCH_SCHOOL_ANALYTICS` — Principal/management analytics access
- `ESCALATE_TO_TEACHER_OR_MANAGEMENT` — Verified escalation flow

### Security Notes

- Operations are enforced by role at execution boundaries.
- Prompt-injection patterns are sanitized before action routing.
- Unauthorized operations are blocked and auditable.

## Deployment Instructions

### Vercel (Recommended)

1. Import this repository into Vercel.
2. Configure environment variables (if used).
3. Deploy with default Next.js settings.

### Static Hosting (for standalone AI module)

Deploy files under:
`School ERP Ecosystem/05. XYZ AI Repository/xyz-ai/`
to any static host (GitHub Pages, Netlify, or S3 static hosting).

## Troubleshooting

- **`npm run dev` fails**: Ensure Node.js and npm versions are compatible; remove `node_modules` and reinstall.
- **Port already in use**: Start on another port (for example `PORT=3001 npm run dev`).
- **Voice features not working**: Verify browser microphone permissions and use a modern Chromium-based browser.
- **Avatar/interaction glitches**: Hard refresh and check browser console for runtime errors.

## Contributing Guidelines

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting changes.

## License

This project is licensed under the MIT License. See [LICENSE.md](./LICENSE.md).
