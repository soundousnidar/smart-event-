import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const EditEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "", // stocker l'image en base64
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Pour gérer l'image téléchargée

  // Fonction pour convertir l'image en base64
  const convertToBase64 = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Chargement des détails de l'événement depuis l'API
  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:5254/api/Events/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      } else {
        toast({ title: "Erreur", description: "Événement introuvable", variant: "destructive" });
        navigate("/");
      }
    };

    fetchEvent();
  }, [id, navigate, toast]);

  // Gestion du changement de valeur des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Gestion du changement de l'image
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setEvent({ ...event, image: base64 as string }); // Mise à jour de l'image en base64
      setImageFile(file); // Sauvegarde du fichier pour l'envoi
    }
  };

  // Soumission du formulaire pour mettre à jour l'événement
  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:5254/api/Events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...event,
        // Pour l'API, tu envoies l'image sous forme base64
        image: event.image, 
      }),
    });

    if (response.ok) {
      toast({ title: "Événement mis à jour", description: "Les modifications ont été enregistrées." });
      navigate(`/events/${id}`);
    } else {
      toast({ title: "Erreur", description: "Échec de la mise à jour", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Modifier l’événement</h1>

      {/* Affichage de l'image actuelle sous forme de base64 */}
      {event.image && (
        <div className="mb-4">
          <Label>Image actuelle</Label>
          <img src={event.image} alt="Événement" className="w-full h-auto rounded shadow" />
        </div>
      )}

      <div className="space-y-4">
        {/* Champ pour le titre */}
        <div>
          <Label>Titre</Label>
          <Input name="title" value={event.title} onChange={handleChange} />
        </div>

        {/* Champ pour la description */}
        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            className="w-full border rounded p-2"
            value={event.description}
            onChange={handleChange}
          />
        </div>

        {/* Champ pour la date */}
        <div>
          <Label>Date</Label>
          <Input type="date" name="date" value={event.date.split("T")[0]} onChange={handleChange} />
        </div>

        {/* Champ pour l'heure */}
        <div>
          <Label>Heure</Label>
          <Input type="time" name="time" value={event.time} onChange={handleChange} />
        </div>

        {/* Champ pour le lieu */}
        <div>
          <Label>Lieu</Label>
          <Input name="location" value={event.location} onChange={handleChange} />
        </div>

        {/* Champ pour télécharger une nouvelle image */}
        <div>
          <Label>Image (télécharger une nouvelle image)</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Bouton pour soumettre les modifications */}
        <Button className="mt-4" onClick={handleSubmit}>
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
};

export default EditEventPage;
