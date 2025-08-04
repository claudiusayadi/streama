# Streama - Next.js Frontend

A modern React frontend built with Next.js 15, TailwindCSS 4, and Zustand for the Streama movie and TV show streaming platform.

## 🚀 Features

- **Next.js 15** with App Router
- **TailwindCSS 4** with inline themes
- **Zustand** for state management
- **Axios** for API communication
- **TanStack Query** for data fetching and caching
- **ShadCN UI** components
- **Lucide React** icons
- **TypeScript** for type safety

## 📁 Project Structure

```
app/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and TailwindCSS
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (redirects to /movies)
│   ├── movies/
│   │   ├── page.tsx       # Movies listing page
│   │   └── [id]/page.tsx  # Movie detail page
│   └── tv/
│       ├── page.tsx       # TV shows listing page
│       └── [id]/page.tsx  # TV show detail page
├── components/            # Reusable components
│   ├── ui/               # ShadCN UI components
│   ├── Layout.tsx        # Main app layout with sidebar
│   ├── MovieCard.tsx     # Movie card component
│   ├── TVCard.tsx        # TV show card component
│   ├── MoviesPageComponent.tsx
│   └── TVPageComponent.tsx
├── lib/                  # Utilities and API
│   ├── api.ts           # Axios API client
│   └── utils.ts         # Utility functions
└── store/               # Zustand stores
    └── app-store.ts     # App state management
```

## 🛠️ Development

### Prerequisites

- Bun runtime
- Node.js 18+
- Backend API running on http://localhost:5134

### Getting Started

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

3. **Start development server:**

   ```bash
   bun dev
   # or from root directory
   bun app:dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 🌐 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5134/api/v1
```

## 🎨 UI Components

The app uses ShadCN UI components with TailwindCSS 4:

- **Button** - Interactive buttons with variants
- **Card** - Content containers
- **Layout** - Main application layout with sidebar navigation

## 📱 Features

### Movies

- Browse popular, top-rated, new, and upcoming movies
- View detailed movie information
- Navigate with Next.js App Router

### TV Shows

- Browse popular, top-rated, new, and upcoming TV shows
- View detailed TV show information
- Season and episode information

### Navigation

- Sidebar navigation between Movies and TV
- Responsive design
- Clean, modern interface

## 🔧 API Integration

The frontend communicates with the NestJS backend via:

- **Axios** HTTP client
- **TanStack Query** for caching and state management
- **TypeScript** interfaces for type safety

### API Endpoints Used:

- `/movies/*` - Movie data and details
- `/tv/*` - TV show data and details

## 🚀 Build & Deploy

```bash
# Build for production
bun run build

# Start production server
bun start
```

## 🏗️ Migration from Vite

This Next.js app replaces the previous Vite-based React app with:

- ✅ Next.js App Router for file-based routing
- ✅ Server-side rendering capabilities
- ✅ Improved build optimization
- ✅ Better development experience
- ✅ Production-ready deployment options

## 📦 Dependencies

### Main Dependencies

- `next` - React framework
- `react` & `react-dom` - React library
- `@tanstack/react-query` - Data fetching and caching
- `axios` - HTTP client
- `zustand` - State management
- `lucide-react` - Icons
- `clsx` - Utility for className management

### Styling

- `tailwindcss` - Utility-first CSS framework
- `@tailwindcss/postcss` - PostCSS plugin

## 🎯 Key Improvements

1. **File-based Routing**: Simplified navigation with Next.js App Router
2. **Image Optimization**: Automatic image optimization with Next.js Image
3. **Performance**: Better bundle optimization and code splitting
4. **SEO**: Built-in SEO optimizations
5. **Developer Experience**: Hot reloading and better debugging
