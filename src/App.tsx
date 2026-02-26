import { Switch, Route, Router } from "wouter";
import Home from "./pages/Home";
import Itineraries from "./pages/Itineraries";
import Destinations from "./pages/Destinations";
import Relocation from "./pages/Relocation";
import GradSchools from "./pages/GradSchools";
import Flights from "./pages/Flights";
import RhineCruise from "./pages/RhineCruise";
import TripBuilder from "./pages/TripBuilder";
import IberianExplorer from "./pages/IberianExplorer";
import FrenchArtDeVivre from "./pages/FrenchArtDeVivre";

// Use Vite's BASE_URL so the router matches correctly on GitHub Pages (/melanies-adventure/)
// and on local dev (/)
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

// v2 — image fixes + home page restructure
function App() {
  return (
    <Router base={BASE}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/itineraries" component={Itineraries} />
        <Route path="/destinations" component={Destinations} />
        <Route path="/relocation" component={Relocation} />
        <Route path="/grad-schools" component={GradSchools} />
        <Route path="/flights" component={Flights} />
        <Route path="/rhine-cruise" component={RhineCruise} />
        <Route path="/build-my-trip" component={TripBuilder} />
        <Route path="/iberian-explorer" component={IberianExplorer} />
        <Route path="/french-art-de-vivre" component={FrenchArtDeVivre} />
        <Route path="/trip-builder" component={TripBuilder} />
        <Route>
          <div className="min-h-screen flex items-center justify-center">
            Page not found
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
