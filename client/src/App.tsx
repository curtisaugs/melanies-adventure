import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import North from "./pages/North";
import South from "./pages/South";
import WildcardRainforest from "./pages/WildcardRainforest";
import WildcardOutback from "./pages/WildcardOutback";
import MarineVolunteer from "./pages/MarineVolunteer";
import Scout from "./pages/Scout";
function DynamicTitle() {
  const [location] = useLocation();
  useEffect(() => {
    document.title = "Lola's Adventure — Queensland Road Trip";
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/north"} component={North} />
      <Route path={"/south"} component={South} />
      <Route path={"/wildcard-rainforest"} component={WildcardRainforest} />
      <Route path={"/wildcard-outback"} component={WildcardOutback} />
      <Route path={"/marine-volunteer"} component={MarineVolunteer} />
      <Route path={"/scout"} component={Scout} />
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
