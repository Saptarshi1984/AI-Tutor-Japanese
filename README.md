# AI Tutor Japanese

AI-powered companion for learners preparing for JLPT and conversational Japanese. It blends adaptive lesson planning, a guided assessment, and AI coaching to help learners progress with confidence.

[Live Demo](https://ai-tutor-japanese-k917.vercel.app/) | [GitHub Repository](https://github.com/Saptarshi1984/AI-Tutor-Japanese)

## Features
- Personalized dashboard that adapts once a learner signs in with Supabase authentication (email/password or Google OAuth).
- Guided AI language consultant that uses OpenAI and LangChain to recommend roadmaps and answer study questions in real time.
- Quick access to core learning flows: placement assessment, AI chat, vocabulary builders, and character drills tailored for Japanese.
- Mobile-first interface built with Chakra UI and custom components so the experience mirrors a native study companion.
- Secure session handling with Supabase; client sessions persist across refreshes and are invalidated instantly on sign-out.

## Tech Stack
- Next.js 15 App Router with React 19 and TypeScript
- Chakra UI, Tailwind CSS utilities, Framer Motion
- Supabase Auth + Database
- OpenAI API with LangChain orchestration

## Getting Started
1. Install dependencies: `npm install`
2. Create a `.env.local` file and set the required variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_OPENAI_API_KEY`
3. Run the development server: `npm run dev`
4. Visit `http://localhost:3000` to explore the app locally.

> Need test data? Seed initial lessons or user records in Supabase using the SQL editor, or create accounts through the Sign Up flow.

## Available Scripts
- `npm run dev` - start the Next.js dev server
- `npm run build` - create an optimized production build
- `npm run start` - serve the production build locally
- `npm run lint` - run ESLint checks

## Project Structure
```
src/
  app/
    AI/               # AI coaching workspace
    Dashboard/        # Authenticated learner hub
    JapLevelTest/     # Placement assessment flow
    LearnCharacter/   # Character drills and practice
    providers/        # Global contexts (Supabase auth)
  components/
    HomePage.tsx      # Landing experience
    LessonCard.tsx    # Reusable quick-access card
    interfaceAI.tsx   # AI consultant UI widgets
    MCQ.tsx           # Multiple-choice quiz engine
```

## Deployment
The production build is hosted on Vercel and synced with the `main` branch. Every push triggers a build pipeline; successful builds are automatically promoted to https://ai-tutor-japanese-k917.vercel.app/.

For a custom deployment:
1. Set the same environment variables in Vercel Project Settings.
2. Add your public domain to Supabase Auth > URL Configuration (Site URL + Redirect URLs).
3. Redeploy to capture the new settings.

## Contributing
Issues and pull requests are welcome. If you plan a sizable change, open an issue first to align on direction or implementation details.

## License
This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.
