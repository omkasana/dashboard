# CRM Dashboard

<p align="center">
  <img src="./public/images/logo.svg" alt="CRM Dashboard Logo" width="96" />
</p>

<p align="center">
  <strong>Modern CRM dashboard built with Next.js, TypeScript, Tailwind CSS, and reusable business modules.</strong>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-CSS-38BDF8?logo=tailwindcss&logoColor=fff" />
</p>

## Overview

This project is a CRM/ERP-style admin dashboard for managing business data, modules, forms, records, user workflows, and onboarding flows. It includes reusable list views, form engines, profile components, authentication screens, and a guided ERP onboarding experience.

```mermaid
flowchart LR
  Auth[Auth Pages] --> Dashboard[Dashboard Shell]
  Dashboard --> Modules[Module Configs]
  Dashboard --> Lists[List Views]
  Dashboard --> Forms[Dynamic Forms]
  Dashboard --> Profiles[Profile Views]
  Dashboard --> Onboarding[ERP Onboarding]
  Modules --> API[API Services]
  Lists --> API
  Forms --> API
```

## Highlights

- Next.js app router structure with TypeScript.
- Config-driven dashboard modules.
- Reusable form, list, navbar, sidebar, and profile components.
- ERP onboarding flow split into focused components.
- Tailwind-powered responsive UI.
- API/service layer for backend integration.

## Project Structure

```mermaid
mindmap
  root((src))
    app
      auth
      dashboard
      onboarding
    components
      Form
      List
      Navbar
      Sidebar
      Profile
      UI
    config
      modules
    hooks
    lib
    service
    types
```

## Getting Started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production app |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js, React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data/UI | TanStack Query, TanStack Table, Radix UI |
| Forms | React Hook Form, Zod |
| Motion | Framer Motion |
| Icons | Lucide React |

## Onboarding Flow

The ERP onboarding route is organized into data, page orchestration, landing UI, builder UI, and sidebar cards.

```mermaid
flowchart TD
  Page[page.tsx] --> Data[onboarding-data.tsx]
  Page --> Landing[OnboardingLanding]
  Page --> Builder[OnboardingBuilder]
  Landing --> LandingHeader
  Landing --> LandingPromptPanel
  Builder --> BuilderHeader
  Builder --> SectionNav
  Builder --> MessageList
  Builder --> Composer
  Builder --> BlueprintSidebar
  BlueprintSidebar --> SidebarCards
```
