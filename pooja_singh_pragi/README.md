# 🌐 Comprehensive Analytics Dashboard

An advanced analytics dashboard built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **SCSS**, integrating multiple APIs to deliver interactive, animated, and accessible user experiences.

## 🚀 Features

- 🌦️ Weather Dashboard with current & 7-day forecast (OpenWeatherMap + GeoDB Cities)
- 📰 Categorized News Feed with pagination (NewsAPI)
- 📈 Real-time Stock Market Data with charts (Alpha Vantage API)
- 🧠 Bonus Integration: GitHub Repo Stats (GitHub API)
- 🎨 Advanced Animations using **Lottie**, **3.js**, and CSS
- 📦 Redux Toolkit + RTK Query for state management & data fetching
- 🌍 Localization support (English & Spanish)
- 🔒 NextAuth.js for authentication with local storage

---

## 🧱 Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, SCSS Modules
- **State Management**: Redux Toolkit + RTK Query
- **Charts**: Recharts
- **Animations**: CSS Animations
- **Auth**: NextAuth.js  Email/Password

---

## 📁 Project Structure

```bash
.
├── components/         # Reusable UI components
├── pages/              # Next.js pages with dynamic routing
├── styles/             # SCSS modules + Tailwind configs
├── hooks/              # Custom hooks
├── store/              # Redux store & slices
├── utils/              # Utility functions
├── services/           # API integrations
├── public/             # Static assets
```
# Creating a new Markdown file with the detailed README content

readme_content = """
# 🧪 API Integrations

| API               | Purpose        | Description                                     |
|------------------|----------------|-------------------------------------------------|
| 🌦️ OpenWeatherMap | Weather        | Current + 7-day forecast with charts            |
| 🏙️ GeoDB Cities    | Autocomplete   | City name suggestions for weather search       |
| 📰 NewsAPI         | News           | Filtered news with infinite scroll             |
| 💹 Alpha Vantage   | Finance        | Stock charts, prices, metrics                  |
| 💻 GitHub API      | Bonus          | Repo stats, commits, contributors              |

## 📦 Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/your-username/analytics-dashboard.git
cd analytics-dashboard
```
2. **Install dependencies**
```bash
npm install
```
3. **CConfigure environment variables**
```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
NEXT_PUBLIC_FINANCE_API_KEY=your_alpha_vantage_key
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```
4. **Run the app locally**
```bash
npm run dev
```
🌐 **Live Demo**

🚀 Check out the live version of the dashboard here: [Live Preview](https://react-practice-nine-chi.vercel.app/)

📹 **Watch Demo Video**  
Here’s a quick walkthrough of the dashboard and its features:

[![Watch the demo](![home page](image.png))](https://youtu.be/Ugmvm22CmHk)

> Replace the YouTube link with your actual demo video URL once it's uploaded.
