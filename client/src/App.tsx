import { Switch, Route } from "wouter";
import { ThemeProvider } from "@/components/theme-provider";
import SurahIndex from "@/pages/SurahIndex";
import SurahView from "@/pages/SurahView";
import SavedAyahs from "@/pages/SavedAyahs";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="quran-visions-theme">
      <Switch>
        {/* الصفحة الرئيسية - فهرس السور */}
        <Route path="/" component={SurahIndex} />
        
        {/* صفحة عرض السورة */}
        <Route path="/surah/:number" component={SurahView} />
        
        {/* صفحة الآيات المحفوظة */}
        <Route path="/saved" component={SavedAyahs} />
        
        {/* صفحة 404 */}
        <Route>
          <div className="min-h-screen flex items-center justify-center bg-gradient-cosmic">
            <div className="text-center">
              <h1 className="font-amiri text-6xl text-primary mb-4">404</h1>
              <p className="text-muted-foreground mb-6">الصفحة غير موجودة</p>
              <a 
                href="/" 
                className="px-6 py-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
              >
                العودة للفهرس
              </a>
            </div>
          </div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
