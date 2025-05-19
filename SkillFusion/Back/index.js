import "dotenv/config";
import express from "express";
import { router } from "./src/router.js";
import cors from "cors";
import { xss } from "express-xss-sanitizer";

// Création de l'app Express
const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN;
app.use(cors({
  origin: (origin, callback) => {
    const localRegex = /^(http:\/\/localhost:\d+|http:\/\/127\.0\.0\.1:\d+)$/;

    if (!origin || localRegex.test(origin)) {
      callback(null, true); // OK local
    } else if (allowedOrigin && origin === allowedOrigin) {
      callback(null, true); // OK Vercel
    } else {
      console.warn(`❌ CORS blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 1800
}));
app.options('*', cors());
// Body parser
app.use(express.urlencoded({ extended : true })); // Body applications/www-x-urlencoded
// Pour pouvoir utiliser le req.body et récupérer le JSON envoyé par le client
app.use(express.json());

app.use(xss());


app.get('/', (req, res) => {
  res.send('API Skill Fusion is running');
});

// Configuration du router
app.use(router);

app.listen(process.env.PORT, () => {
  // On écoute sur le port défini dans le fichier .env
  console.log(`🚀 Listening on port ${process.env.PORT}`); // Affiche l'URL d'écoute
});
