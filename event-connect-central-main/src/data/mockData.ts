
import { Event } from "../models/Event";
import { Registration } from "../models/Registration";

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Conférence Tech Innovation 2025",
    description: "Découvrez les dernières tendances technologiques et innovations qui façonneront notre futur numérique.",
    date: "2025-06-15",
    time: "09:00 - 18:00",
    location: "Centre de Conférences Moderne, Paris",
    maxParticipants: 200,
    currentParticipants: 145,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Atelier UX Design",
    description: "Un atelier pratique pour maîtriser les principes fondamentaux du design d'expérience utilisateur.",
    date: "2025-06-22",
    time: "14:00 - 17:00",
    location: "Studio Créatif, Lyon",
    maxParticipants: 30,
    currentParticipants: 18,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Meetup Développement Web",
    description: "Rencontrez d'autres développeurs web et partagez vos connaissances sur les derniers frameworks.",
    date: "2025-07-05",
    time: "19:00 - 22:00",
    location: "Espace Coworking Central, Marseille",
    maxParticipants: 50,
    currentParticipants: 32,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Conférence Cybersécurité",
    description: "Comprendre les menaces actuelles et apprendre à protéger vos données et systèmes informatiques.",
    date: "2025-07-18",
    time: "10:00 - 16:00",
    location: "Centre de Sécurité Numérique, Lille",
    maxParticipants: 120,
    currentParticipants: 95,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Workshop Intelligence Artificielle",
    description: "Initiez-vous à l'IA et au machine learning à travers des exemples concrets et exercices pratiques.",
    date: "2025-08-02",
    time: "09:30 - 17:30",
    location: "Institut des Sciences Avancées, Toulouse",
    maxParticipants: 40,
    currentParticipants: 40,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Hackathon Innovation Sociale",
    description: "48 heures pour développer des solutions technologiques répondant à des problématiques sociales.",
    date: "2025-08-22",
    time: "10:00 (Jour 1) - 18:00 (Jour 2)",
    location: "Espace Collaboratif, Nantes",
    maxParticipants: 80,
    currentParticipants: 64,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
  }
];

export const mockRegistrations: Registration[] = [
  { id: 1, fullName: "Jean Dupont", email: "jean.dupont@email.com", eventId: 1 },
  { id: 2, fullName: "Marie Martin", email: "marie.martin@email.com", eventId: 1 },
  { id: 3, fullName: "Pierre Dubois", email: "pierre.dubois@email.com", eventId: 1 },
  { id: 4, fullName: "Sophie Leroy", email: "sophie.leroy@email.com", eventId: 2 },
  { id: 5, fullName: "Lucas Bernard", email: "lucas.bernard@email.com", eventId: 2 },
  { id: 6, fullName: "Emma Petit", email: "emma.petit@email.com", eventId: 3 },
  { id: 7, fullName: "Nicolas Moreau", email: "nicolas.moreau@email.com", eventId: 3 },
  { id: 8, fullName: "Camille Roux", email: "camille.roux@email.com", eventId: 4 },
  { id: 9, fullName: "Thomas Fournier", email: "thomas.fournier@email.com", eventId: 5 }
];
