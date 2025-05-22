
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "@/models/Event";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { mockEvents } from "@/data/mockData";

interface EventFormProps {
  event?: Event;
  isEditing?: boolean;
}

const EventForm = ({ event, isEditing = false }: EventFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState(
    event?.date ? new Date(event.date).toISOString().split("T")[0] : ""
  );
  const [time, setTime] = useState(event?.time || "");
  const [location, setLocation] = useState(event?.location || "");
  const [maxParticipants, setMaxParticipants] = useState(
    event?.maxParticipants?.toString() || "50"
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    event?.image || null
  );
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const validateForm = () => {
    if (!title || !description || !date || !time || !location || !maxParticipants) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return false;
    }
    
    if (isNaN(parseInt(maxParticipants)) || parseInt(maxParticipants) <= 0) {
      toast({
        title: "Nombre de participants invalide",
        description: "Le nombre maximum de participants doit être un nombre positif.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  if (!isEditing) {
    // Utiliser FormData pour POST (avec image)
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("Date", date);
    formData.append("Time", time);
    formData.append("Location", location);
    formData.append("MaxParticipants", maxParticipants);
    formData.append("CurrentParticipants", "0"); // ou selon ton besoin
    if (image) {
      formData.append("Image", image);
    }

    try {
      const response = await fetch(`http://localhost:5254/api/events`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'événement.");
      }

      const savedEvent = await response.json();

      toast({
        title: "Événement créé",
        description: "Votre événement a été créé avec succès.",
      });

      navigate(`/`);
    } catch (error) {
      toast({
        title: "Erreur",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  } else {
    // PUT : envoie en JSON (comme déjà implémenté)
    const eventData = {
      id: event?.id,
      title,
      description,
      date,
      time,
      location,
      maxParticipants: parseInt(maxParticipants),
      currentParticipants: event?.currentParticipants ?? 0,
      imageBase64: imagePreview || "", // base64 ou vide
    };

    try {
      const response = await fetch(
        `http://localhost:5254/api/events/${event?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'événement.");
      }

      const savedEvent = await response.json();

      toast({
        title: "Événement mis à jour",
        description: "L'événement a été modifié avec succès.",
      });

      navigate(`/`);
    } catch (error) {
      toast({
        title: "Erreur",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }
};

  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        Retour
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? "Modifier l'événement" : "Créer un nouvel événement"}
      </h1>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre de l'événement *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Donnez un titre à votre événement"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre événement"
                rows={5}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="time">Heure *</Label>
                <Input
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="ex: 09:00 - 18:00"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Lieu *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Adresse ou nom du lieu"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="maxParticipants">Nombre maximum de participants *</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                min="1"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="image">Image de l'événement</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2 relative">
                  <img
                    src={imagePreview}
                    alt="Prévisualisation"
                    className="max-h-48 rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview(null);
                      setImage(null);
                    }}
                  >
                    Supprimer
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Annuler
              </Button>
              <Button type="submit">
                {isEditing ? "Mettre à jour" : "Créer l'événement"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventForm;
