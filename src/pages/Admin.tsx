import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { LogOut, Save, ShieldCheck, Home } from "lucide-react";
import { useProfile } from "@/hooks/useData";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: profile, isLoading, refetch } = useProfile();
  
  const [formData, setFormData] = useState({
    name: "",
    greeting: "",
    description: "",
    location: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Check session
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "No autorizado", description: "Debes iniciar sesión para ver esto.", variant: "destructive" });
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        greeting: profile.greeting || "",
        description: profile.description || "",
        location: profile.location || ""
      });
    }
  }, [profile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await supabase
      .from('perfil')
      .update(formData)
      .eq('id', profile.id);

    if (error) {
      toast({ title: "Error al guardar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Guardado", description: "Los cambios se han aplicado al santuario." });
      refetch();
    }
    setSaving(false);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Cargando santuario...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-primary" size={20} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">Panel de Control</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-sans">Administración del Portafolio</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={() => navigate("/")} className="gap-2 flex-1 sm:flex-none">
              <Home size={16} /> Ver Web
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 flex-1 sm:flex-none">
              <LogOut size={16} /> Cerrar Sesión
            </Button>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-serif text-lg font-semibold">Editar Perfil Principal</h2>
            <p className="text-sm text-muted-foreground">Esta información se muestra en la sección Hero de tu sitio.</p>
          </div>
          
          <form onSubmit={handleSave} className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre / Rol</label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  placeholder="Ej: Poeta & Desarrollador"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Saludo</label>
                <Input 
                  value={formData.greeting} 
                  onChange={(e) => setFormData({ ...formData, greeting: e.target.value })} 
                  placeholder="Ej: Bienvenido a mi mundo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ubicación</label>
              <Input 
                value={formData.location} 
                onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                placeholder="Ej: Santiago, Chile"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                placeholder="Escribe una breve descripción sobre ti..."
                className="min-h-[120px]"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={saving} className="gap-2">
                <Save size={16} /> {saving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </motion.div>
        
        <p className="text-center text-xs text-muted-foreground mt-10">
          Tip: El resto de las secciones (Proyectos, Poemas, etc.) se pueden administrar directamente desde el dashboard de Supabase por ahora.
        </p>
      </div>
    </div>
  );
};

export default Admin;
