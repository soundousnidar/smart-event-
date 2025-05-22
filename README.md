# SmartEvent – Plateforme de gestion d’événements 🎯

## 📌 Description du Projet

**SmartEvent** est une application web développée avec **ASP.NET Core** et **React.js**, permettant la **gestion complète d’événements** (conférences, ateliers, rencontres). Les utilisateurs peuvent consulter les événements disponibles, voir les détails, et s’inscrire en ligne. Ce projet a été conçu en suivant une **architecture N-Tier**, puis partiellement transformé vers une **architecture orientée services (SOA)**.

---

## 🧩 Objectifs

- Gérer efficacement des événements.
- Permettre aux utilisateurs de s'inscrire tout en évitant les inscriptions en double.
- Offrir une architecture modulaire et évolutive avec N-Tier, puis SOA.

---

## 🚀 Fonctionnalités

### 1. Gestion des Événements
- 📝 CRUD complet : création, modification, suppression d'événements.
- 📋 Liste des événements.
- 🔍 Détail de chaque événement.

### 2. Gestion des Inscriptions
- ✅ Inscription des utilisateurs à un événement.
- 🚫 Prévention des inscriptions en double.
- 👥 Affichage de la liste des participants à un événement.

---

## 🧪 Technologies Utilisées

| Couches             | Technologies |
|---------------------|--------------|
| Backend             | ASP.NET Core Web API (N-Tier → SOA) |
| Frontend            | React.js |
| Base de données     | SQL Server (Entity Framework Core) |
| Architecture        | N-Tier, SOA (phase 2) |
| Communication inter-services | HTTP (entre SmartEvent.API et RegistrationService) |

---

## 📁 Arborescence Minimale

SmartEvent/
├── SmartEvent.API/ # API principale
├── SmartEvent.Core/ # Interfaces, modèles
├── SmartEvent.Services/ # Logique métier
├── SmartEvent.Data/ # EF Core, DbContext, Repositories
├── SmartEvent.RegistrationService/ # Service séparé pour les inscriptions (SOA)
├d
└── README.md # Présentation du projet


---

## 🔗 Endpoints REST Exemples

- `GET /api/events` → Retourne la liste des événements.
- `POST /api/registrations` → Permet l’inscription d’un utilisateur.

-

## 🧭 Mise en Route (Setup)

### Prérequis

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server)
- Visual Studio ou VS Code

### Étapes

1. **Cloner le projet**  
   ```bash
   git clone https://votre-repo.git
   cd SmartEvent
