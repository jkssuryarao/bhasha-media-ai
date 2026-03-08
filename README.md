# BHASHA-MEDIA AI

A Next.js 14 application that enables Indian creators to generate multilingual scripts and voice content using AI. Built for hackathon demos with a modern, responsive UI and Indian-inspired theme.

## Features

- **AI-Powered Content Generation**: Enter a topic, select a language, and receive AI-generated scripts with audio narration
- **Multilingual Support**: Hindi, English, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Malayalam, Punjabi
- **Authentication**: NextAuth with credential-based login (Admin + user signup)
- **History**: Local storage persistence for generated content
- **Admin Dashboard**: Usage statistics and recent activity
- **Dark Mode**: Toggle between light and dark themes
- **PWA Support**: Installable on mobile and desktop with offline capability

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Auth**: NextAuth.js
- **PWA**: @ducanh2912/next-pwa

## Architecture

### Application Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 14)                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│  │ Login    │ │ Generate │ │ History  │ │ Admin    │  ...            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ POST { prompt, language }
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Lambda Function URL (HTTPS)                        │
└──────────────────────────────┬──────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       AWS Lambda                                    │
│  - Receives prompt + language                                       │
│  - Orchestrates AI pipeline                                         │
└──────────────┬──────────────────────────────┬───────────────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────┐    ┌─────────────────────────────────────┐
│ Amazon Bedrock           │    │ Amazon Polly                         │
│ (Claude 3 Sonnet)        │    │ - Text-to-Speech                     │
│ - Script generation      │    │ - Multilingual voices                │
└──────────────────────────┘    └────────────────┬────────────────────┘
                                                 │
                                                 ▼
                                    ┌─────────────────────────────────┐
                                    │ Amazon S3                        │
                                    │ - Store generated audio (mp3)    │
                                    │ - Return presigned/public URL    │
                                    └─────────────────────────────────┘
```

### AWS Services Used

| Service | Purpose |
|---------|---------|
| **AWS Lambda** | Serverless compute - receives requests, orchestrates pipeline |
| **Amazon Bedrock** | Claude 3 Sonnet for script generation |
| **Amazon Polly** | Text-to-speech for audio narration |
| **Amazon S3** | Storage for generated audio files |

## Project Structure

```
/app
  /(auth)          # Login, Signup (unauthenticated)
  /(dashboard)     # Protected routes
  /api/auth        # NextAuth API
/components        # Reusable UI components
/lib               # API client, auth, utilities
/public            # Static assets, manifest
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: `http://localhost:3000` for dev
- `NEXT_PUBLIC_LAMBDA_URL`: Your AWS Lambda Function URL

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Credentials

**Admin Login:**
- Email: `admin@bhashasetu.ai`
- Password: `admin123`

**PWA Icons:** Add `icon-192.png` and `icon-512.png` to `/public` for optimal install experience. The app works with the default SVG icon.

**User:** Sign up with any email/password (stored locally).

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_LAMBDA_URL`
4. Deploy

## API Contract

**Request (POST to Lambda URL):**
```json
{
  "prompt": "topic or theme",
  "language": "Hindi"
}
```

**Response:**
```json
{
  "generated_text": "...",
  "audio_url": "https://...mp3"
}
```

## License

MIT
