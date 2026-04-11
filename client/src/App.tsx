import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
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
import LolaHome from "@/pages/lola/LolaHome";
import LolaNorth from "@/pages/lola/LolaNorth";
import LolaSouth from "@/pages/lola/LolaSouth";
import LolaWildcardRainforest from "@/pages/lola/LolaWildcardRainforest";
import LolaWildcardOutback from "@/pages/lola/LolaWildcardOutback";
import LolaMarineVolunteer from "@/pages/lola/LolaMarineVolunteer";
import LolaScout from "@/pages/lola/LolaScout";
function DynamicTitle() {
  const [location] = useLocation();
  useEffect(() => {
    if (location.startsWith("/lola")) {
      document.title = "Lola's Adventure — Queensland Road Trip";
    } else {
      document.title = "Melanie's European Adventure — 50th Birthday Journey";
    }
  }, [location]);
  return null;
}

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
      {/* Lola's Adventure */}
      <Route path={"/lola"} component={LolaHome} />
      <Route path={"/lola/north"} component={LolaNorth} />
      <Route path={"/lola/south"} component={LolaSouth} />
      <Route path={"/lola/wildcard-rainforest"} component={LolaWildcardRainforest} />
      <Route path={"/lola/wildcard-outback"} component={LolaWildcardOutback} />
      <Route path={"/lola/marine-volunteer"} component={LolaMarineVolunteer} />
      <Route path={"/lola/scout"} component={LolaScout} />
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
          <DynamicTitle />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
