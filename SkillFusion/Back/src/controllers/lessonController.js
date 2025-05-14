import { Category, Lesson, Material, Step } from "../models/association.js";

const lessonController = {

//Recupère tous les cours
  async getAllLessons(req, res) {
    const categoryId = req.query.category_id; // Utilise category_id pour correspondre à la query string

  try {
    if (categoryId) {
      const lessons = await Lesson.findAll({
        where: { category_id: categoryId }, // Assurez-vous d'utiliser 'category_id' comme clé
        include: ['category'],
      });

      const category = await Category.findByPk(categoryId);
      return res.json({
        lessons,
        categoryName: category?.name || 'Non spécifié', // Renvoie le nom de la catégorie
      });
    }
     
      const lessons = await Lesson.findAll({
        include: ['category'],
      });

      res.status(200).json(lessons);
    } catch (error) {
      console.error('Erreur Sequelize →', error.message);
      res.status(500).json({ error: error.message });
    }
  },

//Recupère un cours
  async getOneLesson(req, res) {
    try {

      const id = req.params.id
      const lesson = await Lesson.findByPk(id, {
        include: ['category', 'materials', "steps"],
      });

      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      res.status(200).json(lesson);
    } catch (error) {
      console.error('Erreur Sequelize →', error.message);
      res.status(500).json({ error: error.message });
    }
  },

//Ajoute un cours
  async addLesson(req, res) {
    try {
      const { name, text, category_id, users_id, materials, steps } = req.body;

      // Validation simple
      if (!name || !text || !category_id || !users_id) {
        return res.status(400).json({ error: 'Nom, texte, catégorie_id et users_id sont requis.' });
      }

      // Création de la leçon principale
      const lesson = await Lesson.create({
        name,
        text,
        category_id,
        users_id
      });

      //Ajout des materials s'ils existent
      if (Array.isArray(materials) && materials.length > 0) {
        await Promise.all(materials.map(material =>
          lesson.createMaterial(material) // ou lesson.addMaterial selon tes associations
        ));
      }

    // Ajout des steps s'ils existent
      if (Array.isArray(steps) && steps.length > 0) {
        await Promise.all(steps.map(step =>
        lesson.createStep(step) // ou lesson.addStep selon tes associations
      ));
    }

      // Récupérer la leçon complète avec associations pour la réponse
      const lessonWithAssociations = await Lesson.findByPk(lesson.id, {
        include: ['category', 'materials', 'steps'],
      });

      res.status(201).json(lessonWithAssociations);
    } catch(error) {
      console.error('Erreur Sequelize →', error);
      res.status(500).json({ error: 'Erreur lors de la création de la leçon.' });
    }
  },

//Met à jour un cours
  async updateLesson(req, res, next) {
    const lesson = await Lesson.findByPk(req.params.id, {
      include: ["categories", "materials", "steps"]
    });

    if (!lesson) {
      return next();
    }

    for (const key in req.body) {
      // On vérifie que la clé existe avant de mettre à jour => permet de ne pas utilser d'éventuelles
      // clés inconnues dans le Model
      if (lesson[key] !== undefined) {
        lesson[key] = req.body[key];
      }
    }

    await lesson.save();

    res.status(200).json(lesson);
  },

//Supprime à jour un cours
  async deleteLesson(req, res, next) {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      return next();
    }

    await lesson.destroy();

    res.sendStatus(204);
  },
}

export { lessonController };  
