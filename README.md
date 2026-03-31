# 🌹 The Warm Embrace | Portfolio Poético y Tecnológico

Bienvenido a **The Warm Embrace**, un espacio donde la precisión del código se entrelaza con la sensibilidad de la poesía. Este proyecto es un portafolio web dinámico, administrable y altamente interactivo, diseñado para mostrar el equilibrio entre el desarrollo de software y la expresión literaria.

---

## 🚀 Características Principales

- **✨ Diseño Premium**: Una interfaz "Cálida y Tecnológica" con micro-interacciones suaves impulsadas por Framer Motion.
- **📚 Rincón Literario**: Carrusel dinámico de poemas con vista detallada en modales, texturas de lino y sistema de reacciones.
- **💻 Vitrina de Proyectos**: Carrusel interactivo que muestra los últimos repositorios de GitHub con autoplay y navegación de bloques.
- **🛠️ Panel de Administración**: Sistema de edición en vivo para actualizar el perfil, habilidades y metas directamente desde la web.
- **📡 Backend en Tiempo Real**: Integración total con Supabase para la persistencia de datos (proyectos, poemas, mensajes de contacto).
- **📱 Responsividad Total**: Adaptado para PCs, tablets y móviles con configuraciones específicas de visualización.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Componentes UI**: [Shadcn UI](https://ui.shadcn.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Backend & DB**: [Supabase](https://supabase.com/)
- **Gestión de Datos**: [React Query](https://tanstack.com/query/latest)

---

## 📂 Estructura del Proyecto

```text
src/
├── components/     # Componentes visuales (Hero, Projects, Poems, etc.)
├── hooks/          # Hooks personalizados para fetching de datos (useData)
├── lib/            # Configuraciones (supabase.ts)
├── pages/          # Páginas principales (Index, Login, Admin)
└── ui/             # Componentes base de Shadcn
```

---

## 🚀 Instalación y Configuración

Sigue estos pasos para entrenar tus habilidades y correr el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/pruizru15-byte/the-warm-embrace.git
cd the-warm-embrace
```

### 2. Instalar dependencias
```bash
bun install
# o si usas npm
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Supabase:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

### 4. Preparar la Base de Datos
Ejecuta el script SQL contenido en `supabase_schema.sql` en el SQL Editor de tu proyecto de Supabase para crear las tablas y políticas de seguridad (RLS).

### 5. Iniciar el servidor de desarrollo
```bash
npm run dev
```

---

## 🔒 Administración

Para gestionar el contenido, accede a la ruta `/login`. Una vez autenticado, serás redirigido al panel de `/admin` donde podrás modificar la información del perfil en tiempo real.

---

## ✉️ Contacto

Si quieres colaborar o simplemente leer más poesía, puedes enviarme un mensaje a través de la sección de contacto en la landing page.

---

**Licencia**: Este proyecto es de código libre para uso personal.
**Autor**: [rpieroalexandro](https://github.com/pruizru15-byte)
