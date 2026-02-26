import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Itineraries from "./pages/Itineraries";
import Destinations from "./pages/Destinations";
import Relocation from "./pages/Relocation";
import GradSchools from "./pages/GradSchools";
import Flights from "./pages/Flights";
import RhineCruise from "./pages/RhineCruise";
import TripBuilder from "./pages/TripBuilder";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/itineraries" component={Itineraries} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/relocation" component={Relocation} />
      <Route path="/grad-schools" component={GradSchools} />
      <Route path="/flights" component={Flights} />
      <Route path="/rhine-cruise" component={RhineCruise} />
      <Route path="/build-my-trip" component={TripBuilder} />
      <Route path="/trip-builder" component={TripBuilder} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          Page not found
        </div>
      </Route>
    </Switch>
  );
}

export default App;
