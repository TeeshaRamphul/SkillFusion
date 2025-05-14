export function isAdmin(req, res, next) {
  const user = req.user;
  if (user.role_id !== 1) {
    return res.status(403).json({ error: "Accès interdit. Vous n'êtes pas administrateur." });
  }
  next();  // L'utilisateur est admin, on continue
}

//Vérifier si l'utilisateur est soit "Administrateur" ou "Instructeur"
export function isAdminOrInstructor(req, res, next) {
  if (req.user.role !== 'Administrateur' && req.user.role !== 'Instructeur') {
    return res.status(403).json({ error: "AccÃ¨s interdit. Vous devez Ãªtre administrateur ou instructeur." });
  }
  next();
}
