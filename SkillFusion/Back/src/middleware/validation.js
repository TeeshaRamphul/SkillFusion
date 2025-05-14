import Joi from 'joi';

// Inscription : registerController
export const registerSchema = Joi.object({
  pseudo: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Le pseudo est requis.',
    'string.min': 'Le pseudo doit contenir au moins 3 caractères.',
    'any.required': 'Le pseudo est obligatoire.',
  }),

  mail: Joi.string().email().required().messages({
    'string.empty': "L'email est requis.",
    'string.email': "L'email doit être valide.",
  })
});


// Tester le fichier node validation.js
const utilisateur = {
  pseudo: "Jean",
  mail: "jean@example.com"
};
const { error } = registerSchema.validate(utilisateur);


if (error) {
  console.log("Erreur de validation :", error.details[0].message);
} else {
  console.log("Données valides !");
} 

// node validation.js