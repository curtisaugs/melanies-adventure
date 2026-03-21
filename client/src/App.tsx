import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Itineraries from "./pages/Itineraries";
import Destinations from "./pages/Destinations";
import Relocation from "./pages/Relocation";
import GradSchools from "./pages/GradSchools";
import Flights from "./pages/Flights";
import RhineCruise from "./pages/RhineCruise";
import TripBuilder from "./pages/TripBuilder";
import SharedItinerary from "./pages/SharedItinerary";
import ExtendedStay from "@/pages/ExtendedStay";
import RVAdventure from "@/pages/RVAdventure";
import AirbnbGetaway from "@/pages/AirbnbGetaway";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/itineraries"} component={Itineraries} />
      <Route path={"/destinations"} component={Destinations} />
      <Route path={"/relocation"} component={Relocation} />
      <Route path={"/grad-schools"} component={GradSchools} />
      <Route path={"/flights"} component={Flights} />
      <Route path={"/rhine-cruise"} component={RhineCruise} />
      <Route path={"/build-my-trip"} component={TripBuilder} />
      <Route path={"/trip/:shareId"} component={SharedItinerary} />
      <Route path={"/extended-stay"} component={ExtendedStay} />
      <Route path={"/rv-adventure"} component={RVAdventure} />
      <Route path={"/airbnb-getaway"} component={AirbnbGetaway} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
