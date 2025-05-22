
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Event } from "@/models/Event";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const isFullyBooked = event.currentParticipants >= event.maxParticipants;
  
  return (
    <Card className="event-card overflow-hidden flex flex-col h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={`http://localhost:5254/api/events/${event.id}/image`} 
          alt={event.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.svg"; // fallback image locale
          }}
        />
      </div>

      
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold line-clamp-2">{event.title}</h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{event.location}</span>
          </div>
          
          <div className="mt-4">
            <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Participants:</span>
            <span className={`font-medium ${isFullyBooked ? 'text-destructive' : ''}`}>
              {event.currentParticipants}/{event.maxParticipants}
            </span>
          </div>
          
          <Link to={`/events/${event.id}`} className="w-full">
            <Button 
              className="w-full" 
              variant={isFullyBooked ? "outline" : "default"}
              disabled={isFullyBooked}
            >
              {isFullyBooked ? "Complet" : "Voir détails"}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
