# DogView 🐶

DogView is an interactive web application that allows users to upload an image of a dog and receive breed predictions using a machine learning model trained with [Teachable Machine](https://teachablemachine.withgoogle.com/).

The app uses both a **local breed information dataset** and external API calls to provide users with breed details, ensuring fast response times and better coverage.

---

## Features

- 🖼️ Upload dog images via drag and drop
- 🎯 Get top 3 breed predictions with confidence bars
- 📚 Fetch breed details intelligently:
  - First tries a **local AKCBreedInfo file** (from a custom CSV)
  - Falls back to **The Dog API** if local data is missing
- 🐾 Fun animated design using TailwindCSS, Shadcn UI, and custom backgrounds
- ⚡ Fast, lightweight frontend powered by React and Vite

---

## Tech Stack

- **React** + **Vite** — Frontend Framework
- **Tailwind CSS** — Styling
- **Shadcn UI** + **Lucide Icons** — UI Components
- **Framer Motion** — Smooth Animations
- **Teachable Machine** — Image Classification Model
- **Local AKCBreedInfo CSV** — Primary breed descriptions
- **The Dog API** — Secondary breed data fallback
- **Hosted on** (Vercel)

---

## How It Works

1. **Upload an image** of a dog using the drag-and-drop area.
2. **DogView classifies the breed** using a custom Teachable Machine model.
3. **Top 3 predictions are displayed** with animated confidence bars.
4. **Breed Details Handling:**
   - **Primary:** Look up breed description and stats from the local `akcBreedInfo` dataset
   - **Fallback:** Fetch missing data from [The Dog API](https://thedogapi.com/)
5. **Friendly, animated UI** enhances the user experience!

---

## Running Locally

**Clone the repository:**
npm install
create .env file with API key
VITE_DOG_API_KEY=your_dog_api_key_here
npm run dev


```bash
git clone https://github.com/your-username/dogview.git
cd dogview
