# Ifada Web — Official Website

[![Repo Size](https://img.shields.io/github/repo-size/abivmsul/ifada-web)](https://github.com/abivmsul/ifada-web)
[![License](https://img.shields.io/github/license/abivmsul/ifada-web)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/abivmsul/ifada-web)](https://github.com/abivmsul/ifada-web)
[![Language: TypeScript](https://img.shields.io/badge/language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Framework: Next.js](https://img.shields.io/badge/framework-Next.js-black)](https://nextjs.org/)

> Official website for Ifada Islamic Organisation — built with Next.js + TypeScript.  
> A responsive, accessible, and content-managed site intended to showcase services, events, and donation/campaigns.

---

## Demo / Screenshots

> **Live demo:** _(Add your deployed URL here, e.g. https://ifada.example.com)_

![Homepage Screenshot - replace with your screenshot](./assets/screenshot-home.png)

---

## Table of contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture & notable files](#architecture--notable-files)
- [Getting started (local)](#getting-started-local)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [How I approached this project (for recruiters)](#how-i-approached-this-project-for-recruiters)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

---

## About

This repository contains the codebase for Ifada’s website. It was developed as a modern, maintainable web presence that supports:

- Static and dynamic content pages
- Events / campaigns listing
- Donation or contact flows (if present)
- Mobile-first, accessible UI

Repository uses Next.js and TypeScript. :contentReference[oaicite:1]{index=1}

---

## Features

- Responsive layout (mobile → desktop)
- Clean semantic markup for accessibility
- Content-managed sections (CMS integration ready/used)
- Well-structured components and CSS (Tailwind/PostCSS or custom)
- Developer-friendly scripts for local development and production builds

---

## Tech stack

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS / PostCSS (project contains Tailwind config)
- **CMS / Config:** Sanity / sanity.config.ts present (if used)
- **Bundler / Tools:** Node, npm / pnpm / yarn

(These come from the repository file structure and config files.) :contentReference[oaicite:2]{index=2}

---

## Architecture & notable files

- `app/` — Next.js app routes and pages (main frontend code)
- `src/` — source components & utilities
- `sanity.config.ts` — CMS configuration for structured content (if used)
- `tailwind.config.js` — tailwind setup
- `README.md` — this file

---

## Getting started (local)

1. Clone the repo
```bash
git clone https://github.com/abivmsul/ifada-web.git
cd ifada-web
