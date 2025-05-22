import { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Edit, MapPin, Users, Trash2 } from "lucide-react"; // Import de l'icône de suppression
import { formatDate } from "@/utils/dateUtils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const eventId = parseInt(id || "0");

  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isFullyBooked, setIsFullyBooked] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:5254/api/Events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
        setIsFullyBooked(data.currentParticipants >= data.maxParticipants);
      }
    };
    
    fetchEvent();
  }, [eventId]);

  // Fetch event registrations
  useEffect(() => {
    const fetchRegistrations = async () => {
      const response = await fetch(`http://localhost:5227/api/Registrations/${eventId}/participants`);
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    };
    
    fetchRegistrations();
  }, [eventId]);

  const handleRegister = async () => {
    if (!fullName || !email) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }
    
    const newRegistration = { fullName, email, eventId };
    
    const response = await fetch("http://localhost:5227/api/Registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegistration),
    });
    
    if (response.ok) {
      const data = await response.text();
      toast({
        title: "Inscription réussie !",
        description: data,
      });
      setRegistrations([...registrations, newRegistration]);
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?");
    if (confirmDelete) {
      const response = await fetch(`http://localhost:5254/api/Events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Événement supprimé",
          description: "L'événement a été supprimé avec succès.",
        });
        navigate("/"); // Redirige vers la liste des événements après suppression
      } else {
        toast({
          title: "Erreur de suppression",
          description: "Une erreur est survenue lors de la suppression de l'événement.",
          variant: "destructive",
        });
      }
    }
  };

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
        <Button onClick={() => navigate("/")}>Retour aux événements</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-start">
            <Button variant="outline" onClick={() => navigate("/")}>
              Retour aux événements
            </Button>
            <Button variant="outline" onClick={() => navigate(`/events/edit/${eventId}`)}>
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
            <Button variant="outline" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
              Supprimer
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-5 w-5" />
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-5 w-5" />
            <span>{event.location}</span>
          </div>
          
          <div className="aspect-video mb-6 overflow-hidden rounded-lg">
            <img
              src={event.image ? `data:image/jpeg;base64,${event.image}` : "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose max-w-none mb-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="whitespace-pre-line">{event.description}</p>
          </div>

          <Button onClick={() => setShowParticipants(!showParticipants)} variant="outline">
            {showParticipants ? "Masquer les participants" : "Voir les participants"}
          </Button>

          {showParticipants && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-3">Participants ({registrations.length})</h3>
              <div className="bg-muted p-4 rounded-md max-h-64 overflow-y-auto">
                <ul className="space-y-2">
                  {registrations.map((registration) => (
                    <li key={registration.id}>
                      <span>{registration.fullName}</span> - <span className="text-muted-foreground">{registration.email}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Carte d'inscription à gauche */}
        <div className="flex justify-start">
          <Card className="w-full md:w-96"> {/* Ajustez la largeur si nécessaire */}
            <CardHeader>
              <CardTitle>Détails de l'inscription</CardTitle>
              <CardDescription>
                {isFullyBooked ? "Cet événement est complet" : `${event.currentParticipants}/${event.maxParticipants} participants`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span>Date:</span>
                  <span className="font-medium">{formatDate(event.date)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Heure:</span>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Lieu:</span>
                  <span className="font-medium">{event.location}</span>
                </div>

                {/* Inscription à l'événement */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4" disabled={isFullyBooked}>
                      {isFullyBooked ? "Complet" : "S'inscrire"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>S'inscrire à l'événement</DialogTitle>
                      <DialogDescription>
                        Remplissez ce formulaire pour vous inscrire à l'événement.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Entrez votre nom"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                      <Button onClick={handleRegister}>Confirmer l'inscription</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
