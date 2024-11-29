require('dotenv').config(); // Charge les variables d'environnement

const admin = require('firebase-admin');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Utilisez process.env.PORT pour Vercel

// Charger la clé privée
const serviceAccount = require(process.env.FIREBASE_KEY); // Utilisez une variable d'environnement pour le chemin

// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log('Firebase Admin SDK initialisé.');

app.use(express.json());

// Endpoint pour supprimer un utilisateur
app.post('/deleteUser', async (req, res) => {
  const email = req.body.email;
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(user.uid);
    res.send(`Utilisateur avec l'email ${email} supprimé avec succès.`);
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur Node.js en écoute sur le port ${port}`);
});
