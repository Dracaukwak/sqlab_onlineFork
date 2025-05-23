# TODO list

## Prioritaire

- [x] Rendre hidden le bouton feedBack lorsque la zone de codeMirrorEditor est dirty
- [ ] Refonte Drag to reorder (+ Icone de zone préhension (à droite) et pour dérouler le bandeau (à gauche) l'icone de zone de préhension doit être fixe et ne pas pouvoir être repoussé par le nom des colonnes)
- [ ] Implémenter clique to insert pour les données dans le bandeau (après avoir fait la refonte Drag to reorder)
- [x] Implémenter système de score en utilisant `task.reward` généré à partir de SQLab 0.7.9.
    - Bouton mise score -> Un slider pour miser un pourcentage de son score 10 à 50% de son score. 
    - Dans local storage : `score/${activityNumber}`.
    - Adapter le modèle de slider donné dans `public/assets`.
- [ ] Localiser les messages du système de score.
- [ ] Au passage, gérer correctement le pluriel (le système de localisation devrait permettre de le faire, regarder).
- [ ] Côté modèle, traitement des requêtes de l'utilisateur : transmettre au client des données comportant une réponse (ok ou non) et un message d'erreur si la requête a échoué (erreur SQL) ou si la vérification n'a pas produit de feedback ; dans le client, afficher les erreurs éventuelles dans la zone appropriée.
- [x] Faire apparaître systématiquement une icone dans l'onglet :
  - [ Exécuter ↻ ] lorsque cliquer sur l'onglet (ré)exécute la requête.
  - [ Exécuter ✓ ] lorsque l'exécution est à jour.
  - Pour les icones, utiliser [Heroicons](https://heroicons.com) (tailwindlabs), resp. `arrow-path` et `check-circle` dans le pack `solid`.
  - Intégrer les deux SVG inline directement dans le code HTML, avec une classe `.hidden` (déjà stylée qq part) pour les permuter.
  ```html
  <span id="run-icon">
    Run
    <svg class="icon refresh" viewBox="0 0 16 16">...</svg>
    <svg class="icon check hidden" viewBox="0 0 16 16">...</svg>
  </span>
  ```
  Et côté JS:
  ```javascript
  document.querySelector('.refresh').classList.toggle('hidden', !flag);
  document.querySelector('.check').classList.toggle('hidden', flag);
  ```
- [x] Supprimer la dépendance à Font-awesome de la même manière pour les icones des modes sombre et clair.
- [ ] Au moment du clic sur Exécuter, reformater la requête SQL avec https://github.com/nene/prettier-plugin-sql-cst. C'est la requête formatée qui sera envoyée au serveur. Par défaut, elle remplace également le contenu de l'éditeur. Ajouter une option pour ne pas le faire dans le menu Hamburger.
- [ ] Réparer le coin d'agrandissement de la zone de codeMirrorEditor qui semble ne plus fonctionner.

## Non prioritaire

- [ ] Aventure d'accueil/Tutoriel
- [ ] Page d'accueil pour selectionner sa base puis l'aventure ou la série d'exercices
- [ ] Quand la page d'accueil sera faite, le menu hamburger sera remplacé par un bouton home, et ses fonctionnalités seront intégrées dans la page d'accueil ou dans une page de paramètres.
- [ ] Gestion des utilisateurs
- [ ] Tester les trucs importants (fonctions du modèle serveur, certaines fonctions du client ?  )
- [ ] Le modèle teste d'abord si les colonnes de la requête sont celles attendues. Quand ce n'est pas le cas, le client ne devrait pas décrémenter le score, mais juste rappeler la liste des colonnes attendues.
- [ ] Quand on clique sur le score, un carousel de statistiques s'ouvre au-dessous de la barre de titre. Il peut y avoir dedans :
  - Un graphe de l'évolution du score du joueur, sous la forme d'une courbe avec des points apparents. Abscisse : numéro d'exécution (1, 2, ...). Ordonnée : score (échelle semi-logarithmique ?). Au survol d'un point, une info-bulle avec le timestamp et le numéro de la question.
  - Un graphe avec les questions traitées par le joueur, sous la forme d'un nuage de points. Abcisse  numéro d'exécution _successful_ (1, 2, ...). Ordonnée : numéro de la question. Au survol d'un point, une info-bulle avec le timestamp.
  - Une version globale du premier graphe, avec la possibilité de mettre en évidence tel ou tel joueur.
  - Une version globale du second graphe, avec la possibilité de mettre en évidence tel ou tel joueur.
