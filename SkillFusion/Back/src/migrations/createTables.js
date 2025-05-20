// Importe sequelize (notre connexion avec la DB) depuis associations.js pour appliquer les models et les associations avant de pouvoir faire la migration
import { sequelize } from "../models/association.js";

try {

  // Supprime des tables spécifiques avant de tout nettoyer (exemple : lesson et category)
  await sequelize.query('DROP TABLE IF EXISTS "response","question","users_has_favorites","material","media","step","lesson","category","users","role" CASCADE');

  // Nettoie la DB en supprimant les tables 
  await sequelize.drop();

  // Supprime des tables spécifiques avant de tout nettoyer (exemple : lesson et category)
  await sequelize.query('DROP TABLE IF EXISTS "response","question","users_has_favorites","material","step","lesson","category","users","role" CASCADE');

  // Nettoie la DB en supprimant les tables 
  await sequelize.drop();
  
  // Recrée les tables vides
  await sequelize.sync({ force:true });

  // Quitte le process => ferme l'exécution du fichier et réaffiche l'invite de commande dans le terminal sans devoir faire un Ctrl + C
  // Le chiffre 0 est utilisé pour dire "pas d'erreur"
  process.exit(0);
	
} catch (error) {
  console.error(error);
  // Le chiffre 1 est utilisé pour dire "erreur"
  process.exit(1);
}