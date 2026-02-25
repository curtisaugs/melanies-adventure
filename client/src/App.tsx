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

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/itineraries"} component={Itineraries} />
      <Route path={"/destinations"} component={Destinations} />
      <Route path={"/relocation"} component={Relocation} />
      <Route path={"/grad-schools"} component={GradSchools} />
      <Route path={"/flights"} component={Flights} />
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
