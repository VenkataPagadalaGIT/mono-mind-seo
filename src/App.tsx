import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";

import Projects from "./pages/Projects";
import Publications from "./pages/Publications";
import Insights from "./pages/Insights";
import PillarPage from "./pages/PillarPage";
import BlogPostPage from "./pages/BlogPostPage";
import ServiceLanding from "./pages/ServiceLanding";
import Solutions from "./pages/Solutions";
import Research from "./pages/Research";
import Contact from "./pages/Contact";
import AIContributors from "./pages/AIContributors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/projects" element={<Projects />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<PillarPage />} />
          <Route path="/insights/:pillarSlug/:postSlug" element={<BlogPostPage />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<ServiceLanding />} />
          <Route path="/research" element={<Research />} />
          <Route path="/ai-contributors" element={<AIContributors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
