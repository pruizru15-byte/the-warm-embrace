-- Habilitar RLS (Row Level Security) es opcional pero recomendado.
-- Por ahora, crearemos las tablas y habilitaremos acceso de lectura público.
-- 1. Perfil (Hero)
CREATE TABLE IF NOT EXISTS perfil (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  greeting TEXT,
  description TEXT,
  location TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- 2. Experiencia (Timeline)
CREATE TABLE IF NOT EXISTS experiencia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  -- Nombre del icono de Lucide
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- 3. Metas
CREATE TABLE IF NOT EXISTS metas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  -- e.g. 'Corto Plazo'
  goals TEXT [] NOT NULL,
  order_index INTEGER DEFAULT 0
);
-- 4. Habilidades
CREATE TABLE IF NOT EXISTS habilidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level INTEGER CHECK (
    level >= 0
    AND level <= 100
  ),
  icon TEXT,
  color TEXT,
  -- Clase de Tailwind para el degradado
  order_index INTEGER DEFAULT 0
);
-- 5. Métricas (Tech Metrics)
CREATE TABLE IF NOT EXISTS metricas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0
);
-- 6. Servicios
CREATE TABLE IF NOT EXISTS servicios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  tech TEXT [],
  order_index INTEGER DEFAULT 0
);
-- 7. Proyectos
CREATE TABLE IF NOT EXISTS proyectos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  language TEXT,
  stars INTEGER DEFAULT 0,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- 8. Poemas
CREATE TABLE IF NOT EXISTS poemas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  -- Guardar como texto con saltos de línea (\n)
  reactions_love INTEGER DEFAULT 0,
  reactions_spark INTEGER DEFAULT 0,
  reactions_book INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- 9. Redes Sociales
CREATE TABLE IF NOT EXISTS redes_sociales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  icon TEXT,
  -- Nombre del icono de Lucide
  url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);
-- --- POLÍTICAS DE SEGURIDAD (Lectura pública, Escritura autenticada) ---
-- Función para habilitar lectura pública en todas las tablas
DO $$
DECLARE t TEXT;
BEGIN FOR t IN
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE' LOOP EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
EXECUTE format(
  'DROP POLICY IF EXISTS "Public Read Access" ON %I',
  t
);
EXECUTE format(
  'CREATE POLICY "Public Read Access" ON %I FOR SELECT USING (true)',
  t
);
-- Opcional: Solo el dueño (autenticado) puede editar
EXECUTE format(
  'DROP POLICY IF EXISTS "Auth Manage Access" ON %I',
  t
);
EXECUTE format(
  'CREATE POLICY "Auth Manage Access" ON %I FOR ALL USING (auth.role() = ''authenticated'')',
  t
);
END LOOP;
END $$;
-- --- DATOS DE SEMILLA (Basados en el estado actual) ---
INSERT INTO perfil (name, greeting, description, location)
VALUES (
    'Poeta & Desarrollador',
    'Bienvenido a mi mundo',
    'Un desarrollador apasionado por la tecnología, pero amante de las formas antiguas de conectar. Donde el código se encuentra con la poesía.',
    'Tu Ciudad, País'
  );
INSERT INTO experiencia (year, title, description, icon, order_index)
VALUES (
    '2020',
    'Inicio en Programación',
    'Primeros pasos con HTML, CSS y JavaScript',
    'BookOpen',
    0
  ),
  (
    '2021',
    'Estudios Formales',
    'Ingeniería en Sistemas / Desarrollo de Software',
    'GraduationCap',
    1
  ),
  (
    '2023',
    'Especialización',
    'Desarrollo Full-Stack con React y tecnologías modernas',
    'Target',
    2
  ),
  (
    '2025',
    'Futuro',
    'Inteligencia Artificial, contribuir al open source y crear impacto',
    'Rocket',
    3
  );
INSERT INTO metas (category, goals, order_index)
VALUES (
    'Corto Plazo',
    ARRAY ['Dominar TypeScript', 'Contribuir a OSS', 'Crear mi portafolio definitivo'],
    0
  ),
  (
    'Mediano Plazo',
    ARRAY ['Trabajar en producto propio', 'Aprender IA/ML', 'Mentorar a otros'],
    1
  ),
  (
    'Largo Plazo',
    ARRAY ['Fundar un startup', 'Publicar un libro', 'Impacto social con tech'],
    2
  );
INSERT INTO habilidades (name, level, icon, color, order_index)
VALUES (
    'React',
    90,
    'Code',
    'from-primary to-rose-deep',
    0
  ),
  (
    'TypeScript',
    85,
    'Terminal',
    'from-navy to-accent',
    1
  ),
  (
    'Node.js',
    80,
    'Server',
    'from-burgundy to-rose-deep',
    2
  ),
  (
    'Tailwind CSS',
    92,
    'Palette',
    'from-primary to-gold-warm',
    3
  );
INSERT INTO proyectos (name, description, language, stars, url)
VALUES (
    'portafolio-personal',
    'Mi sitio web personal construido con React, Vite y Tailwind CSS.',
    'TypeScript',
    12,
    '#'
  ),
  (
    'api-poemas',
    'API REST para gestionar una colección de poemas con autenticación y búsqueda avanzada.',
    'Node.js',
    8,
    '#'
  );
INSERT INTO poemas (
    title,
    content,
    reactions_love,
    reactions_spark,
    reactions_book
  )
VALUES (
    'Código y Alma',
    'Entre llaves y puntos,\nse esconde un suspiro,\ncada línea que escribo\nes un verso que respiro.\n\nLa pantalla ilumina\nlo que el alma dibuja,\ncompilando emociones\nque ningún bug empuja.',
    12,
    8,
    3
  );
INSERT INTO redes_sociales (label, icon, url, order_index)
VALUES (
    'GitHub',
    'Github',
    'https://github.com/pruizru15-byte/',
    0
  ),
  (
    'LinkedIn',
    'Linkedin',
    'www.linkedin.com/in/ruizruizp/',
    1
  ),
  (
    'Instagram',
    'Instagram',
    'https://www.instagram.com/alexandro__506/',
    2
  );