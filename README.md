# 🚀 Modern Full-Stack Developer Portfolio

A high-performance, fully responsive, and dynamic full-stack portfolio designed to showcase my engineering skills, production-ready projects, and technical expertise. Built with modern web technologies, fluid animations, and internationalization (i18n) support.

🌐 **Live Demo:** (https://my-portfolio-nine-nu-48.vercel.app/)

---

## ✨ Features

- **🌐 Dynamic Multi-Language Support (i18n):** Smooth localized routing across all pages without hardcoded paths.
- **✨ Fluid Animations:** Immersive interactive experiences powered by GSAP, ScrollTrigger, and Framer Motion.
- **📱 Ultra-Responsive UI:** Mobile-first fluid layouts styled seamlessly with Tailwind CSS.
- **⚡ Server-Side Optimization:** Fast image loading, optimized SEO metadata, and dynamic routing powered by Next.js.
- **💼 Dynamic Project Showcase:** Interactive layout filtering and detailed breakdowns for featured applications.
- **📬 Full-Stack Contact System:** API-driven contact form with automated validation and email dispatch.

---

## 🛠️ Tech Stack

**Frontend:**
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS / Shadcn UI
- **Animations:** GSAP (GreenSock) & ScrollTrigger, Framer Motion

**Backend & Database (If applicable - customize this section):**
- **Serverless/API:** Next.js Route Handlers
- **Database:** PostgreSQL / MongoDB (via Prisma ORM)
- **CMS:** Sanity.io / Strapi (for quick project updates)

**Deployment & Tools:**
- **Hosting:** Vercel
- **Version Control:** Git & GitHub

---

## 🚀 Getting Started

Follow these steps to set up and run the portfolio locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your keys:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add your email service or database strings here if needed
# DATABASE_URL=your_connection_string
# EMAIL_SERVICE_KEY=your_key
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```text
├── app/
│   ├── [lang]/          # Multi-language dynamic routing layout & pages
│   │   ├── projects/    # Localized project showcase routes
│   │   └── page.tsx     # Localized landing homepage
│   ├── api/             # Backend serverless API route handlers
│   └── layout.tsx       # Global root layouts & metadata
├── components/          # Reusable UI components (Buttons, Cards, GSAP wrappers)
├── public/              # Optimized local assets, icons, and images
├── lib/              
└── next.config.ts       # Core Next.js compilation configurations
```

---

## 🔧 Optimized Component Example

The portfolio handles localized navigation safely and dynamically using custom route wrappers rather than hardcoded URLs:

```tsx
// Example of the safe structural routing setup used in this portfolio
const params = useParams();
const currentLang = params?.locale || params?.lang || 'en';

<Link href={`/${currentLang}/projects`}>
  <IconicBtn text={"All Projects"} ... />
</Link>
```

