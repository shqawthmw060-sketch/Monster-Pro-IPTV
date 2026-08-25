import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AccessGate from "./components/AccessGate";
import Catalog from "./pages/Catalog";
import AdminLogin from "./pages/AdminLogin";
import Control from "./pages/Control";
import AdminSection from "./pages/AdminSection";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <AccessGate />
      </Route>
      <Route path="/login">
        <AccessGate />
      </Route>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/login/admin" component={AdminLogin} />
      <Route path="/control" component={Control} />
      <Route path="/control/users"><AdminSection title="User management" scope="USERS" description="Search, status, devices, and account actions will use a server-authorized users API." /></Route>
      <Route path="/control/devices"><AdminSection title="Device management" scope="DEVICES" description="Device identity, activity, blocking, and revocation will use the Neon-backed devices API." /></Route>
      <Route path="/control/content"><AdminSection title="Content management" scope="CONTENT" description="Movies, series, seasons, episodes, and legal stream variants will be managed from the content server APIs." /></Route>
      <Route path="/control/sources"><AdminSection title="Content sources" scope="SOURCES" description="Source health, validation, and sync history will appear after the corresponding protected API is connected." /></Route>
      <Route path="/control/analytics"><AdminSection title="Analytics" scope="ANALYTICS" description="Only real backend metrics will be shown here. No charts or statistics are fabricated." /></Route>
      <Route path="/control/logs"><AdminSection title="Audit logs" scope="LOGS" description="Authentication, account, device, import, and system events will be searchable without logging secrets or passwords." /></Route>
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
