import { Switch, Route } from "wouter";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="quran-visions-theme">
      <Switch>
        <Route path="/" component={Home} />
        <Route>
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="font-amiri text-4xl text-primary mb-4">404</h1>
              <p className="text-muted-foreground">الصفحة غير موجودة</p>
            </div>
          </div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
