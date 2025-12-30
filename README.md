# Tryggresa

Tryggresa är en webbaserad bokningsapplikation för trygg och tillgänglig transport. Applikationen riktar sig främst till äldre personner och personer med särskilda behov, exempelvis rullstolsburna, applikationen kan änvända av anhöriga och personal.

## Live-demo
Frontend: https://tryggresa-frontend.vercel.app  
Backend API: https://tryggresa-backend.onrender.com

## Tech Stack
### Frontend
- React
- TypeScript
- React Router
- Tailwind CSS
- Context API (auth state)

### Backend
- Nodejs
- Express
- Prisma ORM
- MongoDB Atlas
- JWT (JSON Web Tokens)

## Funktioner 
- Sök och boka resa (enkel eller tur & retur)
- Välje tillgängliga tider
- Skapa bokning utan inlogning
- Inloggning och registering
- Visa mina bokningar (skyddad sida)
- Avboka resa
- Visa användarprofil

## Tillgänglighet
- Responsive design för mobil och desktop
- Semantisk HTML
- Tydliga formulärlabels
- Fokus på enkel navigation och tydlig feedback

## Installation (lokalt)
````bash
git clone <repo-url>
npm install
npm run dev