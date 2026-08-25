import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AccessGate from "./components/AccessGate";
import Catalog from "./pages/Catalog";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <AccessGate />
      </Route>
      <Route path="/login">
        <AccessGate />
      </Route>
      <Route path="/subscribe">
        <AccessGate />
      </Route>
      <Route path="/sections">
        <AccessGate />
      </Route>
      <Route path="/live">
        <AccessGate><NotFound /></AccessGate>
      </Route>
      <Route path="/movies">
        <AccessGate><Catalog type="movie" /></AccessGate>
      </Route>
      <Route path="/series">
        <AccessGate><Catalog type="series" /></AccessGate>
      </Route>
      <Route path="/sports">
        <AccessGate><NotFound /></AccessGate>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// MONSTER IPTV theme foundation: dark cinematic default with persisted switching enabled.
// Protected content is server-authorized through AccessGate; the public root is an access entry point.

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
