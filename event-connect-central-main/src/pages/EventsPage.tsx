import { useState, useEffect } from "react";
import { Event } from "@/models/Event";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5254/api/events");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des événements");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events by search term
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase())
  );

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else {
      const aRatio = a.currentParticipants / a.maxParticipants;
      const bRatio = b.currentParticipants / b.maxParticipants;
      return aRatio - bRatio;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Événements à venir</h1>
        <p className="text-muted-foreground">
          Découvrez et inscrivez-vous aux événements qui vous intéressent
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Rechercher un événement..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date (croissant)</SelectItem>
              <SelectItem value="title">Titre (A-Z)</SelectItem>
              <SelectItem value="availability">Disponibilité</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Chargement des événements...</p>
      ) : sortedEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Aucun événement trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
