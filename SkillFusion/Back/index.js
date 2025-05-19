import "dotenv/config";
import express from "express";
import { router } from "./src/router.js";
import cors from "cors";
import { xss } from "express-xss-sanitizer";

// Création de l'app Express
const app = express();
// Body parser
app.use(express.urlencoded({ extended : true })); // Body applications/www-x-urlencoded
// Pour pouvoir utiliser le req.body et récupérer le JSON envoyé par le client
app.use(express.json());



const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(cors({
  origin: (origin, callback) => {
    // Autoriser localhost/127.0.0.1 en développement
    const localRegex = /^(http:\/\/localhost:\d+|http:\/\/127\.0\.0\.1:\d+)$/;

    if (!origin || localRegex.test(origin)) {
      callback(null, true);
    } else if (allowedOrigin && origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));


app.use(xss());

// Configuration du router
app.use(router);

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server started at http://localhost:${port}`);
});