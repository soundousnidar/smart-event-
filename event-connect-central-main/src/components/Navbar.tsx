
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, List, Plus } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">SmartEvent</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" className="flex items-center space-x-2">
              <List className="h-4 w-4" />
              <span>Événements</span>
            </Button>
          </Link>
          
          <Link to="/events/create">
            <Button className="bg-orange hover:bg-orange-hover text-white flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Créer un événement</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
