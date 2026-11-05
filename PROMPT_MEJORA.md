# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/features/accounts/AccountList.tsx` — `Account.reduce`: Se invoca `reduce` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/transactions/TransactionForm.tsx` — `Account.find`: Se invoca `find` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/transactions/TransactionForm.tsx` — `Account.filter`: Se invoca `filter` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/navigation/MainNav.tsx` — `NavItem.find`: Se invoca `find` sobre `NavItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/features/navigation/MainNav.tsx` — `NavItem.map`: Se invoca `map` sobre `NavItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.7.0-dev.20240508`: typescript declara la version 5.7.0-dev.20240508, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Aplica conscientemente conceptos de estándares ARIA para mejorar accesibilidad web, Aplica conscientemente conceptos de estándares ARIA para mejorar accesibilidad web

### Reto
- Tema: Estándares Aria (Accessible Rich Internet Applications)
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Estándares ARIA en una Aplicación Web
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Identificación de Elementos Clave — objetivo: Identificar los elementos de la interfaz de usuario que requieren mejoras de accesibilidad. — entregable (NO resolver): Lista de elementos de la interfaz de usuario que requieren mejoras de accesibilidad.
- Fase 2: Aplicación de Atributos ARIA — objetivo: Aplicar atributos ARIA a los elementos identificados para mejorar la accesibilidad. — entregable (NO resolver): Aplicación con atributos ARIA aplicados a los elementos de la interfaz de usuario.
- Fase 3: Validación y Retroalimentación — objetivo: Validar las mejoras de accesibilidad y recibir retroalimentación. — entregable (NO resolver): Documento con resultados de las pruebas de accesibilidad y recomendaciones.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "banking-app-accessibility",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest",
    "test:a11y": "vitest -t 'a11y'",
    "prepare": "npm run build"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "react-router-dom": "6.22.3"
  },
  "devDependencies": {
    "@types/react": "18.2.79",
    "@types/react-dom": "18.2.25",
    "@types/react-router-dom": "5.3.3",
    "typescript": "5.7.0-dev.20240508",
    "vite": "5.2.9",
    "@vitejs/plugin-react": "4.2.1",
    "eslint": "8.57.0",
    "eslint-plugin-jsx-a11y": "6.8.0",
    "eslint-plugin-react": "7.34.1",
    "eslint-plugin-react-hooks": "4.6.0",
    "@testing-library/react": "15.0.2",
    "@testing-library/jest-dom": "6.4.2",
    "jest-axe": "8.0.0",
    "vitest": "1.5.0",
    "jsdom": "24.0.0"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "jsx-a11y/anchor-is-valid": "off"
    }
  }
}

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        presets: ['@babel/preset-typescript'],
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
            },
          ],
        ],
      },
    }),
    visualizer({
      open: false,
      filename: './dist/stats.html',
      template: 'treemap',
    }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['@testing-library/react', 'jest-axe'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, '**/node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    css: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/_variables.scss";',
      },
    },
  },
});

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@shared/*": ["src/shared/*"],
      "@services/*": ["src/services/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts", "**/*.test.ts", "**/*.stories.ts"]
}

// === ARCHIVO: src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div role="alert" aria-live="assertive">
    <h1 aria-label="Error de aplicación">Ocurrió un error inesperado</h1>
    <pre aria-label="Detalle del error">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      aria-label="Reintentar"
      className="retry-button"
    >
      Reintentar
    </button>
  </div>
);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// === ARCHIVO: src/app/App.tsx ===
import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainNav from '@features/navigation/MainNav';
import './App.css';

const AccountList = lazy(() => import('@features/accounts/AccountList'));
const TransactionForm = lazy(() => import('@features/transactions/TransactionForm'));

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);

  const handleOpenTransactionForm = (accountId: string) => {
    setActiveAccountId(accountId);
    setIsModalOpen(true);
  };

  const handleCloseTransactionForm = () => {
    setIsModalOpen(false);
    setActiveAccountId(null);
  };

  return (
    <div className="app-container" role="application" aria-label="Aplicación bancaria">
      <MainNav aria-label="Navegación principal" />
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Contenido principal"
        className="main-content"
      >
        <Suspense fallback={
          <div
            role="status"
            aria-live="polite"
            aria-label="Cargando contenido"
            className="loading-indicator"
          >
            Cargando...
          </div>
        }>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/accounts" replace />}
            />
            <Route
              path="/accounts"
              element={
                <AccountList
                  onTransactionClick={handleOpenTransactionForm}
                />
              }
            />
            <Route path="*" element={<Navigate to="/accounts" replace />} />
          </Routes>
        </Suspense>
      </main>

      {isModalOpen && activeAccountId && (
        <TransactionForm
          accountId={activeAccountId}
          onClose={handleCloseTransactionForm}
          aria-modal="true"
          aria-labelledby="transaction-form-title"
        />
      )}
    </div>
  );
};

export default App;

// === ARCHIVO: src/features/accounts/AccountList.tsx ===
import { useState, useEffect } from 'react';
import { AccountListItem } from './AccountListItem';
import { api } from '@services/api';

export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'investment';
  balance: number;
  currency: string;
  alias: string;
  lastTransactionDate: string;
  status: 'active' | 'inactive' | 'blocked';
}

interface AccountListProps {
  onSelectAccount?: (account: Account) => void;
  showInactive?: boolean;
}

interface AccountListState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
  selectedAccountId: string | null;
  sortBy: 'balance' | 'alias' | 'lastTransaction';
  sortOrder: 'asc' | 'desc';
  filterType: Account['accountType'] | 'all';
}

export function AccountList({ onSelectAccount, showInactive = false }: AccountListProps) {
  const [state, setState] = useState<AccountListState>({
    accounts: [],
    loading: true,
    error: null,
    selectedAccountId: null,
    sortBy: 'alias',
    sortOrder: 'asc',
    filterType: 'all',
  });

  useEffect(() => {
    loadAccounts();
  }, [showInactive]);

  const loadAccounts = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await api.getAccounts(showInactive);
      setState(prev => ({ ...prev, accounts: data, loading: false }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar las cuentas';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
    }
  };

  const handleSelectAccount = (account: Account) => {
    setState(prev => ({ ...prev, selectedAccountId: account.id }));
    onSelectAccount?.(account);
  };

  const handleSort = (sortBy: AccountListState['sortBy']) => {
    setState(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilterChange = (filterType: AccountListState['filterType']) => {
    setState(prev => ({ ...prev, filterType }));
  };

  const getFilteredAccounts = (): Account[] => {
    let filtered = [...state.accounts];
    
    if (state.filterType !== 'all') {
      filtered = filtered.filter(acc => acc.accountType === state.filterType);
    }
    
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (state.sortBy) {
        case 'balance':
          comparison = a.balance - b.balance;
          break;
        case 'alias':
          comparison = a.alias.localeCompare(b.alias);
          break;
        case 'lastTransaction':
          comparison = new Date(a.lastTransactionDate).getTime() - new Date(b.lastTransactionDate).getTime();
          break;
      }
      return state.sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  };

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getTotalBalance = (): number => {
    return state.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  };

  if (state.loading) {
    return (
      <div 
        role="status" 
        aria-live="polite" 
        aria-label="Cargando cuentas bancarias"
        className="account-list-loading"
      >
        <span className="sr-only">Cargando cuentas bancarias</span>
        <div className="spinner" aria-hidden="true"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div 
        role="alert" 
        aria-labelledby="error-title"
        className="account-list-error"
      >
        <h2 id="error-title" className="error-title">Error</h2>
        <p>{state.error}</p>
        <button 
          onClick={loadAccounts}
          aria-label="Reintentar cargar cuentas"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const filteredAccounts = getFilteredAccounts();

  return (
    <section 
      className="account-list-container"
      aria-labelledby="account-list-title"
    >
      <header className="account-list-header">
        <h1 id="account-list-title" className="account-list-title">
          Mis Cuentas
        </h1>
        <div 
          className="total-balance"
          aria-label={`Saldo total: ${formatCurrency(getTotalBalance(), 'EUR')}`}
        >
          <span className="total-balance-label">Saldo Total:</span>
          <span className="total-balance-amount">
            {formatCurrency(getTotalBalance(), 'EUR')}
          </span>
        </div>
      </header>

      <div 
        className="account-filters"
        role="search"
        aria-label="Filtrar cuentas"
      >
        <label htmlFor="filter-type" className="filter-label">
          Filtrar por tipo:
        </label>
        <select
          id="filter-type"
          value={state.filterType}
          onChange={(e) => handleFilterChange(e.target.value as AccountListState['filterType'])}
          aria-describedby="filter-type-desc"
          className="filter-select"
        >
          <option value="all">Todas las cuentas</option>
          <option value="checking">Cuenta Corriente</option>
          <option value="savings">Cuenta de Ahorros</option>
          <option value="investment">Cuenta de Inversión</option>
        </select>
        <span id="filter-type-desc" className="sr-only">
          Selecciona el tipo de cuenta para filtrar la lista
        </span>
      </div>

      <div 
        className="account-sort"
        role="group"
        aria-labelledby="sort-group-label"
      >
        <span id="sort-group-label" className="sr-only">Ordenar cuentas</span>
        <button
          onClick={() => handleSort('alias')}
          aria-pressed={state.sortBy === 'alias'}
          className="sort-button"
        >
          Ordenar por Nombre {state.sortBy === 'alias' && (state.sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('balance')}
          aria-pressed={state.sortBy === 'balance'}
          className="sort-button"
        >
          Ordenar por Saldo {state.sortBy === 'balance' && (state.sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('lastTransaction')}
          aria-pressed={state.sortBy === 'lastTransaction'}
          className="sort-button"
        >
          Ordenar por Fecha {state.sortBy === 'lastTransaction' && (state.sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      <ul 
        className="account-list"
        aria-label="Lista de cuentas bancarias"
        role="list"
      >
        {filteredAccounts.length === 0 ? (
          <li 
            role="status" 
            aria-live="polite"
            className="no-accounts-message"
          >
            No se encontraron cuentas con los filtros seleccionados.
          </li>
        ) : (
          filteredAccounts.map((account) => (
            <AccountListItem
              key={account.id}
              account={account}
              isSelected={state.selectedAccountId === account.id}
              onSelect={() => handleSelectAccount(account)}
              formatCurrency={formatCurrency}
            />
          ))
        )}
      </ul>

      <div 
        className="account-list-summary"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">
          Mostrando {filteredAccounts.length} de {state.accounts.length} cuentas
        </span>
        <span aria-hidden="true">
          ({filteredAccounts.length} cuentas)
        </span>
      </div>
    </section>
  );
}

// === ARCHIVO: src/features/accounts/AccountListItem.tsx ===
import { memo } from 'react';
import type { Account } from './AccountList';

interface AccountListItemProps {
  account: Account;
  isSelected: boolean;
  onSelect: () => void;
  formatCurrency: (amount: number, currency: string) => string;
}

const accountTypeLabels: Record<Account['accountType'], string> = {
  checking: 'Cuenta Corriente',
  savings: 'Cuenta de Ahorros',
  investment: 'Cuenta de Inversión',
};

const accountTypeIcons: Record<Account['accountType'], string> = {
  checking: '🏦',
  savings: '💰',
  investment: '📈',
};

const statusLabels: Record<Account['status'], string> = {
  active: 'Activa',
  inactive: 'Inactiva',
  blocked: 'Bloqueada',
};

export const AccountListItem = memo(function AccountListItem({
  account,
  isSelected,
  onSelect,
  formatCurrency,
}: AccountListItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  const getStatusAriaLabel = (): string => {
    const baseLabel = `Cuenta ${account.alias}`;
    if (account.status === 'active') {
      return `${baseLabel}, tipo ${accountTypeLabels[account.accountType]}, saldo ${formatCurrency(account.balance, account.currency)}, estado activo`;
    }
    if (account.status === 'inactive') {
      return `${baseLabel}, tipo ${accountTypeLabels[account.accountType]}, saldo ${formatCurrency(account.balance, account.currency)}, estado inactivo`;
    }
    return `${baseLabel}, tipo ${accountTypeLabels[account.accountType]}, saldo ${formatCurrency(account.balance, account.currency)}, estado bloqueado`;
  };

  const formattedBalance = formatCurrency(account.balance, account.currency);
  const formattedDate = new Date(account.lastTransactionDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <li
      className={`account-item ${isSelected ? 'account-item--selected' : ''} ${account.status !== 'active' ? 'account-item--inactive' : ''}`}
      role="listitem"
    >
      <button
        className="account-item-button"
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        aria-pressed={isSelected}
        aria-label={getStatusAriaLabel()}
        aria-describedby={`account-${account.id}-details`}
        disabled={account.status === 'blocked'}
        tabIndex={0}
      >
        <div className="account-item-icon" aria-hidden="true">
          {accountTypeIcons[account.accountType]}
        </div>
        
        <div className="account-item-info">
          <div className="account-item-header">
            <span className="account-alias">{account.alias}</span>
            <span 
              className={`account-status account-status--${account.status}`}
              role="text"
              aria-label={`Estado: ${statusLabels[account.status]}`}
            >
              {account.status !== 'active' && (
                <span aria-hidden="true">•</span>
              )}
              {statusLabels[account.status]}
            </span>
          </div>
          
          <div 
            id={`account-${account.id}-details`}
            className="account-item-details"
          >
            <span className="account-number">
              <span className="sr-only">Número de cuenta:</span>
              {account.accountNumber}
            </span>
            <span className="account-type">
              {accountTypeLabels[account.accountType]}
            </span>
          </div>
        </div>
        
        <div className="account-item-balance">
          <span className="sr-only">Saldo actual:</span>
          <span 
            className={`balance-amount ${account.balance < 0 ? 'balance-negative' : ''}`}
            aria-hidden="true"
          >
            {formattedBalance}
          </span>
          {account.balance < 0 && (
            <span className="sr-only">Saldo negativo</span>
          )}
        </div>
        
        <div className="account-item-footer">
          <span className="last-transaction">
            <span className="sr-only">Última transacción:</span>
            {formattedDate}
          </span>
          <span className="sr-only">
            Presiona Enter para seleccionar esta cuenta
          </span>
        </div>
      </button>

      {isSelected && (
        <div 
          className="account-item-expanded"
          role="region"
          aria-label="Detalles de cuenta seleccionada"
          aria-expanded="true"
        >
          <h4 className="sr-only">Opciones de la cuenta</h4>
          <div className="account-actions">
            <button
              className="account-action-button"
              aria-label={`Ver movimientos de la cuenta ${account.alias}`}
            >
              Ver Movimientos
            </button>
            <button
              className="account-action-button"
              aria-label={`Realizar transferencia desde la cuenta ${account.alias}`}
            >
              Transferir
            </button>
            {account.accountType === 'savings' && (
              <button
                className="account-action-button"
                aria-label={`Configurar ahorros objetivos para la cuenta ${account.alias}`}
              >
                Ahorro Objetivo
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
});

// === ARCHIVO: src/features/transactions/TransactionForm.tsx ===
import { useState, useCallback } from 'react';
import { api } from '@services/api';
import type { Account } from '../accounts/AccountList';

export interface TransactionFormData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
  category: 'transfer' | 'payment' | 'withdrawal' | 'deposit';
  scheduledDate?: string;
}

export interface TransactionFormErrors {
  fromAccountId?: string;
  toAccountId?: string;
  amount?: string;
  description?: string;
  category?: string;
  scheduledDate?: string;
}

interface TransactionFormProps {
  accounts: Account[];
  onSuccess?: (transactionId: string) => void;
  onCancel?: () => void;
  initialData?: Partial<TransactionFormData>;
}

interface TransactionFormState {
  data: TransactionFormData;
  errors: TransactionFormErrors;
  isSubmitting: boolean;
  submitError: string | null;
  touched: Record<string, boolean>;
}

const initialState: TransactionFormState = {
  data: {
    fromAccountId: '',
    toAccountId: '',
    amount: 0,
    description: '',
    category: 'transfer',
    scheduledDate: undefined,
  },
  errors: {},
  isSubmitting: false,
  submitError: null,
  touched: {},
};

export function TransactionForm({ accounts, onSuccess, onCancel, initialData }: TransactionFormProps) {
  const [state, setState] = useState<TransactionFormState>(() => ({
    ...initialState,
    data: { ...initialState.data, ...initialData },
  }));

  const validateField = useCallback((name: keyof TransactionFormData, value: string | number): string | undefined => {
    switch (name) {
      case 'fromAccountId':
        if (!value) return 'Selecciona una cuenta de origen';
        if (value === state.data.toAccountId) return 'La cuenta de origen no puede ser igual a la de destino';
        break;
      case 'toAccountId':
        if (!value) return 'Selecciona una cuenta de destino';
        break;
      case 'amount':
        if (!value || Number(value) <= 0) return 'El monto debe ser mayor a 0';
        if (Number(value) > 10000) return 'El monto máximo es 10,000 EUR';
        break;
      case 'description':
        if (!value || String(value).trim().length < 3) return 'La descripción debe tener al menos 3 caracteres';
        if (String(value).length > 200) return 'La descripción no puede exceder 200 caracteres';
        break;
      case 'category':
        if (!value) return 'Selecciona una categoría';
        break;
      case 'scheduledDate':
        if (value) {
          const date = new Date(String(value));
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date < today) return 'La fecha no puede ser anterior a hoy';
        }
        break;
    }
    return undefined;
  }, [state.data.toAccountId]);

  const validateForm = useCallback((): boolean => {
    const newErrors: TransactionFormErrors = {};
    let isValid = true;
    
    (Object.keys(state.data) as Array<keyof TransactionFormData>).forEach((field) => {
      const error = validateField(field, state.data[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    
    setState(prev => ({ ...prev, errors: newErrors }));
    return isValid;
  }, [state.data, validateField]);

  const handleChange = useCallback((field: keyof TransactionFormData, value: string | number) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      touched: { ...prev.touched, [field]: true },
    }));
    
    if (state.touched[field]) {
      const error = validateField(field, value);
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: error },
      }));
    }
  }, [state.touched, validateField]);

  const handleBlur = useCallback((field: keyof TransactionFormData) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
    }));
    
    const error = validateField(field, state.data[field]);
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }));
  }, [state.data, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allTouched = Object.keys(state.data).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setState(prev => ({ ...prev, touched: allTouched }));
    
    if (!validateForm()) {
      return;
    }
    
    setState(prev => ({ ...prev, isSubmitting: true, submitError: null }));
    
    try {
      const result = await api.createTransaction(state.data);
      
      setState(prev => ({ ...prev, isSubmitting: false }));
      
      if (onSuccess) {
        onSuccess(result.transactionId);
      }
      
      setState(prev => ({
        ...prev,
        data: initialState.data,
        touched: {},
        errors: {},
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al procesar la transacción';
      setState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        submitError: errorMessage 
      }));
    }
  };

  const handleReset = () => {
    setState(initialState);
    onCancel?.();
  };

  const getInputAriaDescribedBy = (field: keyof TransactionFormErrors): string => {
    return `${field}-error`;
  };

  const getAccountBalance = (accountId: string): number => {
    const account = accounts.find(acc => acc.id === accountId);
    return account?.balance ?? 0;
  };

  const activeAccounts = accounts.filter(acc => acc.status === 'active');

  return (
    <form 
      onSubmit={handleSubmit}
      className="transaction-form"
      aria-labelledby="transaction-form-title"
      noValidate
    >
      <h1 id="transaction-form-title" className="transaction-form-title">
        Nueva Transacción
      </h1>

      {state.submitError && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="transaction-form-error"
        >
          <span aria-hidden="true">⚠️</span>
          <span>{state.submitError}</span>
        </div>
      )}

      <fieldset className="transaction-form-fieldset">
        <legend className="sr-only">Detalles de la transacción</legend>

        <div className="form-group">
          <label 
            htmlFor="fromAccountId" 
            className="form-label"
          >
            Cuenta de Origen <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <select
            id="fromAccountId"
            name="fromAccountId"
            value={state.data.fromAccountId}
            onChange={(e) => handleChange('fromAccountId', e.target.value)}
            onBlur={() => handleBlur('fromAccountId')}
            aria-required="true"
            aria-invalid={!!state.errors.fromAccountId}
            aria-describedby={state.errors.fromAccountId ? getInputAriaDescribedBy('fromAccountId') : undefined}
            className="form-select"
          >
            <option value="">Selecciona una cuenta...</option>
            {activeAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.alias} - Saldo: {account.balance.toFixed(2)} {account.currency}
              </option>
            ))}
          </select>
          {state.errors.fromAccountId && (
            <span 
              id="fromAccountId-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.fromAccountId}
            </span>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="toAccountId" 
            className="form-label"
          >
            Cuenta de Destino <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <select
            id="toAccountId"
            name="toAccountId"
            value={state.data.toAccountId}
            onChange={(e) => handleChange('toAccountId', e.target.value)}
            onBlur={() => handleBlur('toAccountId')}
            aria-required="true"
            aria-invalid={!!state.errors.toAccountId}
            aria-describedby={state.errors.toAccountId ? getInputAriaDescribedBy('toAccountId') : undefined}
            className="form-select"
          >
            <option value="">Selecciona una cuenta...</option>
            {activeAccounts
              .filter(acc => acc.id !== state.data.fromAccountId)
              .map((account) => (
                <option key={account.id} value={account.id}>
                  {account.alias} ({account.accountNumber})
                </option>
              ))}
          </select>
          {state.errors.toAccountId && (
            <span 
              id="toAccountId-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.toAccountId}
            </span>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="amount" 
            className="form-label"
          >
            Monto (EUR) <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={state.data.amount || ''}
            onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur('amount')}
            min="0.01"
            max="10000"
            step="0.01"
            aria-required="true"
            aria-invalid={!!state.errors.amount}
            aria-describedby={state.errors.amount ? getInputAriaDescribedBy('amount') : 'amount-hint'}
            className="form-input"
            placeholder="0.00"
          />
          <span id="amount-hint" className="form-hint">
            Monto máximo: 10,000 EUR
          </span>
          {state.errors.amount && (
            <span 
              id="amount-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.amount}
            </span>
          )}
          {state.data.fromAccountId && state.data.amount > 0 && (
            <div 
              className="form-info"
              aria-live="polite"
            >
              <span className="sr-only">Saldo disponible después de la transacción:</span>
              {(getAccountBalance(state.data.fromAccountId) - state.data.amount).toFixed(2)} EUR
            </div>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="category" 
            className="form-label"
          >
            Categoría <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <select
            id="category"
            name="category"
            value={state.data.category}
            onChange={(e) => handleChange('category', e.target.value)}
            onBlur={() => handleBlur('category')}
            aria-required="true"
            aria-invalid={!!state.errors.category}
            aria-describedby={state.errors.category ? getInputAriaDescribedBy('category') : undefined}
            className="form-select"
          >
            <option value="transfer">Transferencia</option>
            <option value="payment">Pago</option>
            <option value="withdrawal">Retiro</option>
            <option value="deposit">Depósito</option>
          </select>
          {state.errors.category && (
            <span 
              id="category-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.category}
            </span>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="description" 
            className="form-label"
          >
            Descripción <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={state.data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            aria-required="true"
            aria-invalid={!!state.errors.description}
            aria-describedby={state.errors.description ? getInputAriaDescribedBy('description') : 'description-hint'}
            className="form-textarea"
            rows={3}
            maxLength={200}
            placeholder="Describe el motivo de la transacción..."
          />
          <span id="description-hint" className="form-hint">
            <span aria-hidden="true">
              {state.data.description.length}/200 caracteres
            </span>
            <span className="sr-only">
              {state.data.description.length} de 200 caracteres utilizados
            </span>
          </span>
          {state.errors.description && (
            <span 
              id="description-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.description}
            </span>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="scheduledDate" 
            className="form-label"
          >
            Programar para más tarde (opcional)
          </label>
          <input
            type="date"
            id="scheduledDate"
            name="scheduledDate"
            value={state.data.scheduledDate || ''}
            onChange={(e) => handleChange('scheduledDate', e.target.value)}
            onBlur={() => handleBlur('scheduledDate')}
            aria-describedby={state.errors.scheduledDate ? getInputAriaDescribedBy('scheduledDate') : 'scheduled-hint'}
            className="form-input"
          />
          <span id="scheduled-hint" className="form-hint">
            Deja vacío para ejecutar inmediatamente
          </span>
          {state.errors.scheduledDate && (
            <span 
              id="scheduledDate-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.scheduledDate}
            </span>
          )}
        </div>
      </fieldset>

      <div className="transaction-form-actions" role="group" aria-label="Acciones del formulario">
        <button
          type="submit"
          disabled={state.isSubmitting}
          aria-busy={state.isSubmitting}
          className="form-button form-button--primary"
        >
          {state.isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>Procesando...</span>
              <span className="sr-only">Por favor espera</span>
            </>
          ) : (
            'Confirmar Transacción'
          )}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          disabled={state.isSubmitting}
          className="form-button form-button--secondary"
          aria-label="Cancelar y limpiar el formulario"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// === ARCHIVO: src/features/transactions/TransactionFormFields.tsx ===
import React, { useId } from 'react';
import { Button } from '@shared/components/Button';
import { useAccessibility } from '@shared/hooks/useAccessibility';

interface TransactionFormFieldsProps {
  amount: string;
  onAmountChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  transactionType: 'deposit' | 'withdrawal' | 'transfer';
  onTypeChange: (type: 'deposit' | 'withdrawal' | 'transfer') => void;
  targetAccount?: string;
  onTargetAccountChange?: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  errors?: {
    amount?: string;
    description?: string;
    targetAccount?: string;
  };
}

export const TransactionFormFields: React.FC<TransactionFormFieldsProps> = ({
  amount,
  onAmountChange,
  description,
  onDescriptionChange,
  transactionType,
  onTypeChange,
  targetAccount = '',
  onTargetAccountChange,
  isSubmitting,
  onSubmit,
  onCancel,
  errors = {},
}) => {
  const { announceToScreenReader, preferences } = useAccessibility();
  const amountId = useId();
  const descriptionId = useId();
  const typeGroupId = useId();
  const targetAccountId = useId();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    onAmountChange(value);
  };

  const handleTypeChange = (type: 'deposit' | 'withdrawal' | 'transfer') => {
    onTypeChange(type);
    announceToScreenReader(`Tipo de transacción cambiado a ${type}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const validateForm = (): boolean => {
    if (!amount || parseFloat(amount) <= 0) {
      announceToScreenReader('El monto debe ser mayor que cero');
      return false;
    }
    if (transactionType === 'transfer' && (!targetAccount || targetAccount.length < 5)) {
      announceToScreenReader('La cuenta destino debe tener al menos 5 caracteres');
      return false;
    }
    return true;
  };

  const formatCurrency = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return '$0.00';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  const hasError = (field: 'amount' | 'description' | 'targetAccount'): boolean => {
    return !!errors[field];
  };

  const getErrorMessage = (field: 'amount' | 'description' | 'targetAccount'): string => {
    return errors[field] || '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="form"
      aria-labelledby="transaction-form-title"
      aria-describedby="transaction-form-description"
    >
      <h2 id="transaction-form-title" className="sr-only">
        Formulario de Transacción
      </h2>
      <p id="transaction-form-description" className="sr-only">
        Complete los detalles de su transacción bancaria
      </p>

      <fieldset
        role="radiogroup"
        aria-labelledby={`${typeGroupId}-label`}
        aria-describedby="transaction-type-help"
      >
        <legend id={`${typeGroupId}-label`} className="form-legend">
          Tipo de Transacción
        </legend>
        <p id="transaction-type-help" className="sr-only">
          Seleccione el tipo de transacción que desea realizar
        </p>

        <div className="radio-group" role="group" aria-label="Opciones de tipo de transacción">
          {(['deposit', 'withdrawal', 'transfer'] as const).map((type) => (
            <label
              key={type}
              className={`radio-label ${transactionType === type ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="transactionType"
                value={type}
                checked={transactionType === type}
                onChange={() => handleTypeChange(type)}
                aria-describedby={transactionType === type ? `${type}-description` : undefined}
              />
              <span className="radio-label-text">
                {type === 'deposit' && 'Depósito'}
                {type === 'withdrawal' && 'Retiro'}
                {type === 'transfer' && 'Transferencia'}
              </span>
              <span
                id={`${type}-description`}
                className="sr-only"
              >
                {type === 'deposit' && 'Agregar fondos a su cuenta'}
                {type === 'withdrawal' && 'Retirar fondos de su cuenta'}
                {type === 'transfer' && 'Enviar fondos a otra cuenta'}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-field">
        <label
          htmlFor={amountId}
          className="form-label"
        >
          Monto
          <span className="required-indicator" aria-hidden="true">*</span>
        </label>
        <div className="input-wrapper">
          <span
            className="input-prefix"
            aria-hidden="true"
          >
            $
          </span>
          <input
            id={amountId}
            type="text"
            inputMode="decimal"
            pattern="[0-9]*\.?[0-9]{0,2}"
            value={amount}
            onChange={handleAmountChange}
            className={`form-input ${hasError('amount') ? 'input-error' : ''}`}
            aria-required="true"
            aria-invalid={hasError('amount')}
            aria-describedby={hasError('amount') ? `${amountId}-error` : `${amountId}-help`}
            aria-label="Monto en dólares"
            autoComplete="transaction-amount"
            disabled={isSubmitting}
          />
        </div>
        {amount && (
          <p
            id={`${amountId}-formatted`}
            className="sr-only"
            aria-live="polite"
          >
            Equivalente a {formatCurrency(amount)}
          </p>
        )}
        <p id={`${amountId}-help`} className="form-help">
          Ingrese el monto en dólares (ej: 100.50)
        </p>
        {hasError('amount') && (
          <p
            id={`${amountId}-error`}
            className="form-error"
            role="alert"
            aria-live="assertive"
          >
            {getErrorMessage('amount')}
          </p>
        )}
      </div>

      <div className="form-field">
        <label
          htmlFor={descriptionId}
          className="form-label"
        >
          Descripción
          <span className="required-indicator" aria-hidden="true">*</span>
        </label>
        <textarea
          id={descriptionId}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className={`form-textarea ${hasError('description') ? 'input-error' : ''}`}
          aria-required="true"
          aria-invalid={hasError('description')}
          aria-describedby={hasError('description') ? `${descriptionId}-error` : `${descriptionId}-help`}
          aria-label="Descripción de la transacción"
          maxLength={200}
          rows={3}
          disabled={isSubmitting}
        />
        <div className="textarea-counter" aria-hidden="true">
          {description.length}/200
        </div>
        <p id={`${descriptionId}-help`} className="form-help">
          Agregue una descripción opcional para esta transacción
        </p>
        {hasError('description') && (
          <p
            id={`${descriptionId}-error`}
            className="form-error"
            role="alert"
            aria-live="assertive"
          >
            {getErrorMessage('description')}
          </p>
        )}
      </div>

      {transactionType === 'transfer' && onTargetAccountChange && (
        <div className="form-field">
          <label
            htmlFor={targetAccountId}
            className="form-label"
          >
            Cuenta Destino
            <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input
            id={targetAccountId}
            type="text"
            value={targetAccount}
            onChange={(e) => onTargetAccountChange(e.target.value)}
            className={`form-input ${hasError('targetAccount') ? 'input-error' : ''}`}
            aria-required="true"
            aria-invalid={hasError('targetAccount')}
            aria-describedby={hasError('targetAccount') ? `${targetAccountId}-error` : `${targetAccountId}-help`}
            aria-label="Número de cuenta destino"
            autoComplete="off"
            placeholder="Ingrese el número de cuenta"
            disabled={isSubmitting}
          />
          <p id={`${targetAccountId}-help`} className="form-help">
            Ingrese el número de cuenta de 5 a 20 dígitos
          </p>
          {hasError('targetAccount') && (
            <p
              id={`${targetAccountId}-error`}
              className="form-error"
              role="alert"
              aria-live="assertive"
            >
              {getErrorMessage('targetAccount')}
            </p>
          )}
        </div>
      )}

      <div
        className="form-actions"
        role="group"
        aria-label="Acciones del formulario"
      >
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          aria-describedby={isSubmitting ? 'submitting-status' : undefined}
        >
          {isSubmitting ? 'Procesando...' : 'Confirmar Transacción'}
        </Button>
        {isSubmitting && (
          <span
            id="submitting-status"
            className="sr-only"
            role="status"
            aria-live="polite"
          >
            Su transacción está siendo procesada
          </span>
        )}
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          aria-label="Cancelar y volver al listado de cuentas"
        >
          Cancelar
        </Button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Complete todos los campos requeridos para continuar
      </p>
    </form>
  );
};

// === ARCHIVO: src/features/navigation/MainNav.tsx ===
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccessibility } from '@shared/hooks/useAccessibility';

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  ariaLabel?: string;
}

interface MainNavProps {
  items: NavItem[];
  userName?: string;
  onLogout?: () => void;
}

export const MainNav: React.FC<MainNavProps> = ({
  items,
  userName,
  onLogout,
}) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { announceToScreenReader, preferences } = useAccessibility();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
        announceToScreenReader(`Menú ${menuId} cerrado`);
      } else {
        newSet.add(menuId);
        announceToScreenReader(`Menú ${menuId} abierto`);
      }
      return newSet;
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    item: NavItem,
    index: number,
    parentId?: string
  ) => {
    const menuItems = parentId
      ? items.find((i) => i.path === parentId)?.children || []
      : items;
    const totalItems = menuItems.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % totalItems;
        const nextItem = document.getElementById(`nav-item-${menuItems[nextIndex]?.path}`);
        nextItem?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + totalItems) % totalItems;
        const prevItem = document.getElementById(`nav-item-${menuItems[prevIndex]?.path}`);
        prevItem?.focus();
        break;
      case 'Escape':
        if (parentId) {
          setExpandedMenus((prev) => {
            const newSet = new Set(prev);
            newSet.delete(parentId);
            return newSet;
          });
          triggerRef.current?.focus();
          announceToScreenReader('Menú cerrado');
        }
        break;
      case 'Enter':
      case ' ':
        if (item.children && item.children.length > 0) {
          e.preventDefault();
          toggleMenu(item.path);
        }
        break;
    }
  };

  const handleMobileToggle = () => {
    setMobileMenuOpen((prev) => {
      const newState = !prev;
      if (newState) {
        announceToScreenReader('Menú móvil abierto');
      } else {
        announceToScreenReader('Menú móvil cerrado');
      }
      return newState;
    });
  };

  const handleDropdownToggle = (itemPath: string) => {
    setActiveDropdown((prev) => {
      const newState = prev === itemPath ? null : itemPath;
      if (newState) {
        announceToScreenReader(`Submenú de ${items.find((i) => i.path === itemPath)?.label} abierto`);
      } else {
        announceToScreenReader('Submenú cerrado');
      }
      return newState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setExpandedMenus(new Set());
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMenus(new Set());
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const renderNavItem = (item: NavItem, index: number, parentId?: string): React.ReactNode => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.has(item.path);
    const isCurrentDropdownActive = activeDropdown === item.path;

    return (
      <li
        key={item.path}
        className={`nav-item ${hasChildren ? 'has-children' : ''} ${isActive(item.path) ? 'active' : ''}`}
        role="none"
      >
        {hasChildren ? (
          <>
            <button
              id={`nav-item-${item.path}`}
              className="nav-link nav-dropdown-trigger"
              aria-haspopup="true"
              aria-expanded={isExpanded}
              aria-controls={`nav-dropdown-${item.path}`}
              aria-label={item.ariaLabel || `${item.label}, tiene submenú`}
              onClick={() => toggleMenu(item.path)}
              onKeyDown={(e) => handleKeyDown(e, item, index, parentId)}
            >
              {item.icon && <span className="nav-icon" aria-hidden="true">{item.icon}</span>}
              <span className="nav-label">{item.label}</span>
              <span
                className={`dropdown-arrow ${isExpanded ? 'expanded' : ''}`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            <ul
              id={`nav-dropdown-${item.path}`}
              className={`nav-dropdown ${isExpanded ? 'expanded' : ''}`}
              role="menu"
              aria-label={`Submenú de ${item.label}`}
              hidden={!isExpanded}
            >
              {item.children?.map((child, childIndex) => (
                <li key={child.path} role="none">
                  <Link
                    id={`nav-item-${child.path}`}
                    to={child.path}
                    className={`nav-dropdown-link ${isActive(child.path) ? 'active' : ''}`}
                    role="menuitem"
                    aria-current={isActive(child.path) ? 'page' : undefined}
                    aria-label={child.ariaLabel || child.label}
                    tabIndex={isExpanded ? 0 : -1}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        toggleMenu(item.path);
                        triggerRef.current?.focus();
                      }
                    }}
                  >
                    {child.icon && <span className="nav-icon" aria-hidden="true">{child.icon}</span>}
                    <span>{child.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Link
            id={`nav-item-${item.path}`}
            to={item.path}
            className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            role="menuitem"
            aria-current={isActive(item.path) ? 'page' : undefined}
            aria-label={item.ariaLabel || item.label}
            onKeyDown={(e) => handleKeyDown(e, item, index, parentId)}
          >
            {item.icon && <span className="nav-icon" aria-hidden="true">{item.icon}</span>}
            <span className="nav-label">{item.label}</span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <nav
      className="main-nav"
      role="navigation"
      aria-label="Navegación principal"
      ref={menuRef}
    >
      <div className="nav-container">
        <div className="nav-brand">
          <Link
            to="/"
            className="brand-link"
            aria-label="BankingApp - Ir a página principal"
          >
            <span className="brand-icon" aria-hidden="true">🏦</span>
            <span className="brand-text">BankingApp</span>
          </Link>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={handleMobileToggle}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-nav-menu"
          aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          <span className="hamburger-icon" aria-hidden="true">
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          </span>
        </button>

        <ul
          id="main-nav-menu"
          className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}
          role="menubar"
          aria-label="Menú principal"
        >
          {items.map((item, index) => renderNavItem(item, index))}
        </ul>

        {userName && (
          <div className="nav-user-section" role="group" aria-label="Sección de usuario">
            <div className="user-menu-container">
              <button
                className="user-menu-trigger"
                aria-haspopup="true"
                aria-expanded={!!activeDropdown}
                aria-controls="user-dropdown-menu"
                onClick={() => handleDropdownToggle('user')}
                aria-label={`Usuario: ${userName}, opciones de cuenta`}
              >
                <span className="user-avatar" aria-hidden="true">
                  {userName.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{userName}</span>
                <span
                  className={`dropdown-arrow ${activeDropdown === 'user' ? 'expanded' : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>
              <ul
                id="user-dropdown-menu"
                className={`user-dropdown ${activeDropdown === 'user' ? 'active' : ''}`}
                role="menu"
                aria-label="Opciones de cuenta de usuario"
                hidden={activeDropdown !== 'user'}
              >
                <li role="none">
                  <button
                    className="user-dropdown-item"
                    role="menuitem"
                    aria-label="Ver perfil de usuario"
                  >
                    <span aria-hidden="true">👤</span>
                    <span>Mi Perfil</span>
                  </button>
                </li>
                <li role="none">
                  <button
                    className="user-dropdown-item"
                    role="menuitem"
                    aria-label="Configuración de accesibilidad"
                  >
                    <span aria-hidden="true">♿</span>
                    <span>Accesibilidad</span>
                  </button>
                </li>
                <li role="none">
                  <button
                    className="user-dropdown-item"
                    role="menuitem"
                    onClick={onLogout}
                    aria-label="Cerrar sesión"
                  >
                    <span aria-hidden="true">🚪</span>
                    <span>Cerrar Sesión</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div
        className="nav-breadcrumb"
        role="navigation"
        aria-label="Ruta de navegación"
      >
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" aria-label="Inicio">
              <span aria-hidden="true">🏠</span>
              <span className="sr-only">Inicio</span>
            </Link>
          </li>
          {location.pathname !== '/' && (
            <li className="breadcrumb-item" aria-current="page">
              <span className="breadcrumb-separator" aria-hidden="true">/</span>
              <span>{location.pathname.split('/').pop() || 'Página'}</span>
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
};

// === ARCHIVO: src/shared/components/Button.tsx ===
import React, { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  aria-describedby?: string;
  aria-controls?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className = '',
      children,
      aria-describedby,
      aria-controls,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const widthClass = fullWidth ? 'w-full' : '';

    const getAriaAttributes = () => {
      const attrs: Record<string, string | boolean> = {
        'aria-disabled': isDisabled,
      };

      if (loading) {
        attrs['aria-busy'] = true;
      }

      if (aria-describedby) {
        attrs['aria-describedby'] = aria-describedby;
      }

      if (aria_controls) {
        attrs['aria-controls'] = aria_controls;
      }

      if (loading && children) {
        const labelId = `${props.id || 'button'}-loading-label`;
        attrs['aria-label'] = `Cargando, por favor espere`;
        attrs['aria-describedby'] = labelId;
      }

      return attrs;
    };

    const baseClasses = `
      inline-flex items-center justify-center font-medium rounded-lg
      transition-colors duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `.replace(/\s+/g, ' ').trim();

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`}
        {...getAriaAttributes()}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2" aria-hidden="true">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2" aria-hidden="true">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// === ARCHIVO: src/shared/components/Modal.tsx ===
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  aria-describedby?: string;
  aria-labelledby?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = 'md',
  aria_describedby,
  aria_labelledby,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getGeneratedId = useCallback((prefix: string) => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const titleId = aria_labelledby || getGeneratedId('modal-title');
  const descriptionId = description
    ? aria_describedby || getGeneratedId('modal-description')
    : undefined;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (closeOnEscape && event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [isOpen, closeOnEscape, onClose]
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      setTimeout(() => {
        const focusableElement = modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        focusableElement?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);

      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen && !isAnimating) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4
        ${isOpen ? 'opacity-100' : 'opacity-0'}
        transition-opacity duration-200`}
      role="presentation"
      aria-hidden="true"
      onClick={handleOverlayClick}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]}
          w-full transform transition-all duration-200
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2
            id={titleId}
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {description && (
          <div id={descriptionId} className="px-4 py-2 text-sm text-gray-600">
            {description}
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// === ARCHIVO: src/shared/hooks/useAccessibility.ts ===
import { useState, useCallback, useEffect, useRef } from 'react';

interface UseAccessibilityOptions {
  initialExpanded?: boolean;
  initialPressed?: boolean;
  initialSelected?: boolean;
  initialChecked?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onPressedChange?: (pressed: boolean) => void;
  onSelectedChange?: (selected: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
}

interface AccessibilityState {
  expanded: boolean;
  pressed: boolean;
  selected: boolean;
  checked: boolean;
  disabled: boolean;
  readonly: boolean;
  hidden: boolean;
}

interface UseAccessibilityReturn extends AccessibilityState {
  toggleExpanded: () => void;
  togglePressed: () => void;
  toggleSelected: () => void;
  toggleChecked: () => void;
  setExpanded: (value: boolean) => void;
  setPressed: (value: boolean) => void;
  setSelected: (value: boolean) => void;
  setDisabled: (value: boolean) => void;
  setReadonly: (value: boolean) => void;
  setHidden: (value: boolean) => void;
  getAriaAttributes: () => Record<string, string | boolean>;
}

export const useAccessibility = (
  options: UseAccessibilityOptions = {}
): UseAccessibilityReturn => {
  const {
    initialExpanded = false,
    initialPressed = false,
    initialSelected = false,
    initialChecked = false,
    onExpandedChange,
    onPressedChange,
    onSelectedChange,
    onCheckedChange,
  } = options;

  const [expanded, setExpanded] = useState(initialExpanded);
  const [pressed, setPressed] = useState(initialPressed);
  const [selected, setSelected] = useState(initialSelected);
  const [checked, setChecked] = useState(initialChecked);
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleExpandedChange = useCallback(
    (value: boolean) => {
      setExpanded(value);
      onExpandedChange?.(value);
    },
    [onExpandedChange]
  );

  const handlePressedChange = useCallback(
    (value: boolean) => {
      setPressed(value);
      onPressedChange?.(value);
    },
    [onPressedChange]
  );

  const handleSelectedChange = useCallback(
    (value: boolean) => {
      setSelected(value);
      onSelectedChange?.(value);
    },
    [onSelectedChange]
  );

  const handleCheckedChange = useCallback(
    (value: boolean) => {
      setChecked(value);
      onCheckedChange?.(value);
    },
    [onCheckedChange]
  );

  const toggleExpanded = useCallback(() => {
    handleExpandedChange(!expanded);
  }, [expanded, handleExpandedChange]);

  const togglePressed = useCallback(() => {
    handlePressedChange(!pressed);
  }, [pressed, handlePressedChange]);

  const toggleSelected = useCallback(() => {
    handleSelectedChange(!selected);
  }, [selected, handleSelectedChange]);

  const toggleChecked = useCallback(() => {
    if (!disabled && !readonly) {
      handleCheckedChange(!checked);
    }
  }, [checked, disabled, readonly, handleCheckedChange]);

  const getAriaAttributes = useCallback(() => {
    const attrs: Record<string, string | boolean> = {};

    if (expanded !== initialExpanded) {
      attrs['aria-expanded'] = expanded;
    }

    if (pressed !== initialPressed) {
      attrs['aria-pressed'] = pressed;
    }

    if (selected !== initialSelected) {
      attrs['aria-selected'] = selected;
    }

    if (checked !== initialChecked) {
      attrs['aria-checked'] = checked;
    }

    if (disabled) {
      attrs['aria-disabled'] = true;
    }

    if (readonly) {
      attrs['aria-readonly'] = true;
    }

    if (hidden) {
      attrs['aria-hidden'] = true;
    }

    return attrs;
  }, [expanded, pressed, selected, checked, disabled, readonly, hidden, initialExpanded, initialPressed, initialSelected, initialChecked]);

  return {
    expanded,
    pressed,
    selected,
    checked,
    disabled,
    readonly,
    hidden,
    toggleExpanded,
    togglePressed,
    toggleSelected,
    toggleChecked,
    setExpanded: handleExpandedChange,
    setPressed: handlePressedChange,
    setSelected: handleSelectedChange,
    setDisabled,
    setReadonly,
    setHidden,
    getAriaAttributes,
  };
};

export const useFocusTrap = (
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement>
) => {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    previousFocus.current = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const firstFocusable = containerRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [isActive, containerRef]);
};

export const useAnnounce = () => {
  const announcerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText =
      'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;';
    document.body.appendChild(announcer);
    announcerRef.current = announcer;

    return () => {
      document.body.removeChild(announcer);
    };
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcerRef.current) {
      announcerRef.current.setAttribute('aria-live', priority);
      announcerRef.current.textContent = '';
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      }, 100);
    }
  }, []);

  return announce;
};

// === ARCHIVO: src/services/api.ts ===
import type { Account, Transaction, ApiResponse, ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: response.statusText,
        code: `HTTP_${response.status}`,
        status: response.status,
      }));
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }
    
    const data: T = await response.json();
    return { data, status: response.status };
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeader(),
      },
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeader(),
      },
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();

export const accountService = {
  async getAccounts(): Promise<ApiResponse<Account[]>> {
    return apiClient.get<Account[]>('/accounts');
  },

  async getAccountById(id: string): Promise<ApiResponse<Account>> {
    return apiClient.get<Account>(`/accounts/${id}`);
  },

  async getAccountBalance(id: string): Promise<ApiResponse<{ balance: number }>> {
    return apiClient.get<{ balance: number }>(`/accounts/${id}/balance`);
  },
};

export const transactionService = {
  async getTransactions(accountId: string, params?: Record<string, string>): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get<Transaction[]>(`/accounts/${accountId}/transactions`, params);
  },

  async createTransaction(transaction: Omit<Transaction, 'id' | 'date'>): Promise<ApiResponse<Transaction>> {
    return apiClient.post<Transaction>('/transactions', transaction);
  },

  async getTransactionById(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get<Transaction>(`/transactions/${id}`);
  },
};

export default apiClient;

// === ARCHIVO: src/types/aria.d.ts ===
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    role?: AriaRole;
    'aria-activedescendant'?: string;
    'aria-atomic'?: Booleanish | 'false' | 'true';
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    'aria-braillelabel'?: string;
    'aria-brailleroledescription'?: string;
    'aria-busy'?: Booleanish;
    'aria-checked'?: Booleanish | 'mixed';
    'aria-colcount'?: number;
    'aria-colindex'?: number;
    'aria-colindextext'?: string;
    'aria-colspan'?: number;
    'aria-controls'?: string;
    'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time';
    'aria-describedby'?: string;
    'aria-description'?: string;
    'aria-disabled'?: Booleanish;
    'aria-dropeffect'?: 'copy' | 'execute' | 'link' | 'move' | 'none' | 'popup';
    'aria-errormessage'?: string;
    'aria-expanded'?: Booleanish;
    'aria-flowto'?: string;
    'aria-grabbed'?: Booleanish;
    'aria-haspopup'?: Booleanish | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
    'aria-hidden'?: Booleanish;
    'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
    'aria-keyshortcuts'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-level'?: number;
    'aria-live'?: 'off' | 'assertive' | 'polite';
    'aria-modal'?: Booleanish;
    'aria-multiline'?: Booleanish;
    'aria-multiselectable'?: Booleanish;
    'aria-orientation'?: 'horizontal' | 'vertical' | 'undefined';
    'aria-owns'?: string;
    'aria-placeholder'?: string;
    'aria-posinset'?: number;
    'aria-pressed'?: Booleanish | 'mixed';
    'aria-readonly'?: Booleanish;
    'aria-relevant'?: 'additions' | 'additions-text' | 'all' | 'removals' | 'text';
    'aria-required'?: Booleanish;
    'aria-roledescription'?: string;
    'aria-rowcount'?: number;
    'aria-rowindex'?: number;
    'aria-rowindextext'?: string;
    'aria-rowspan'?: number;
    'aria-selected'?: Booleanish;
    'aria-setsize'?: number;
    'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
    'aria-valuemax'?: number;
    'aria-valuemin'?: number;
    'aria-valuenow'?: number;
    'aria-valuetext'?: string;
  }
}

export type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'blockquote'
  | 'button'
  | 'caption'
  | 'cell'
  | 'checkbox'
  | 'code'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'deletion'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'emphasis'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'insertion'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'mark'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'paragraph'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'strong'
  | 'subscript'
  | 'superscript'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

export interface AriaAttributes {
  'aria-activedescendant'?: string;
  'aria-atomic'?: Booleanish | 'false' | 'true';
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  'aria-braillelabel'?: string;
  'aria-brailleroledescription'?: string;
  'aria-busy'?: Booleanish;
  'aria-checked'?: Booleanish | 'mixed';
  'aria-colcount'?: number;
  'aria-colindex'?: number;
  'aria-colindextext'?: string;
  'aria-colspan'?: number;
  'aria-controls'?: string;
  'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-describedby'?: string;
  'aria-description'?: string;
  'aria-disabled'?: Booleanish;
  'aria-dropeffect'?: 'copy' | 'execute' | 'link' | 'move' | 'none' | 'popup';
  'aria-errormessage'?: string;
  'aria-expanded'?: Booleanish;
  'aria-flowto'?: string;
  'aria-grabbed'?: Booleanish;
  'aria-haspopup'?: Booleanish | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
  'aria-hidden'?: Booleanish;
  'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
  'aria-keyshortcuts'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-level'?: number;
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-modal'?: Booleanish;
  'aria-multiline'?: Booleanish;
  'aria-multiselectable'?: Booleanish;
  'aria-orientation'?: 'horizontal' | 'vertical' | 'undefined';
  'aria-owns'?: string;
  'aria-placeholder'?: string;
  'aria-posinset'?: number;
  'aria-pressed'?: Booleanish | 'mixed';
  'aria-readonly'?: Booleanish;
  'aria-relevant'?: 'additions' | 'additions-text' | 'all' | 'removals' | 'text';
  'aria-required'?: Booleanish;
  'aria-roledescription'?: string;
  'aria-rowcount'?: number;
  'aria-rowindex'?: number;
  'aria-rowindextext'?: string;
  'aria-rowspan'?: number;
  'aria-selected'?: Booleanish;
  'aria-setsize'?: number;
  'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
}

export interface AriaLabeling {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-description'?: string;
}

export interface AriaStates {
  'aria-busy'?: Booleanish;
  'aria-checked'?: Booleanish | 'mixed';
  'aria-disabled'?: Booleanish;
  'aria-expanded'?: Booleanish;
  'aria-grabbed'?: Booleanish;
  'aria-hidden'?: Booleanish;
  'aria-invalid'?: Booleanish | 'grammar' | 'spelling';
  'aria-pressed'?: Booleanish | 'mixed';
  'aria-selected'?: Booleanish;
}

export interface AriaInteraction {
  'aria-activedescendant'?: string;
  'aria-controls'?: string;
  'aria-haspopup'?: Booleanish | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
  'aria-keyshortcuts'?: string;
  'aria-owns'?: string;
}

export type Booleanish = boolean | 'true' | 'false';

export interface FocusManagement {
  tabIndex?: number;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

export interface KeyboardNavigation {
  role: AriaRole;
  tabIndex?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
}

export interface LiveRegion {
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-atomic'?: Booleanish;
  'aria-relevant'?: 'additions' | 'additions-text' | 'all' | 'removals' | 'text';
}

export interface ModalDialog extends AriaAttributes {
  role: 'dialog' | 'alertdialog';
  'aria-modal'?: Booleanish;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// === ARCHIVO: public/index.html ===
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Aplicación bancaria en línea - Gestiona tus cuentas y transacciones de manera segura" />
  <meta name="theme-color" content="#1e3a5f" />
  
  <title>Banking App - Acceso Seguro</title>
  
  <style>
    :root {
      --color-primary: #1e3a5f;
      --color-secondary: #4a90a4;
      --color-accent: #f5a623;
      --color-background: #f8f9fa;
      --color-text: #212529;
      --color-text-light: #6c757d;
      --color-success: #28a745;
      --color-error: #dc3545;
      --color-warning: #ffc107;
      --spacing-xs: 0.25rem;
      --spacing-sm: 0.5rem;
      --spacing-md: 1rem;
      --spacing-lg: 1.5rem;
      --spacing-xl: 2rem;
      --border-radius: 0.375rem;
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
      --transition-fast: 150ms ease-in-out;
      --transition-normal: 250ms ease-in-out;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    html {
      font-size: 16px;
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: var(--color-background);
      color: var(--color-text);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    #root {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Skip link para navegación por teclado */
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--color-primary);
      color: white;
      padding: var(--spacing-sm) var(--spacing-md);
      z-index: 1000;
      text-decoration: none;
      transition: top var(--transition-fast);
    }

    .skip-link:focus {
      top: 0;
      outline: 3px solid var(--color-accent);
      outline-offset: 2px;
    }

    /* Estilos para lectores de pantalla */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Focus visible para accesibilidad */
    :focus-visible {
      outline: 3px solid var(--color-accent);
      outline-offset: 2px;
    }

    /* Reducir movimiento para usuarios que lo prefieren */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* Alto contraste */
    @media (prefers-contrast: high) {
      :root {
        --color-background: #ffffff;
        --color-text: #000000;
        --color-primary: #000080;
        --border-radius: 0;
      }

      a, button {
        border: 2px solid currentColor;
      }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
  
  <div id="root" role="application" aria-label="Aplicación bancaria">
    <!-- React mount point -->
  </div>
  
  <noscript>
    <div role="alert" style="padding: 2rem; text-align: center; background: #fff3cd; border: 1px solid #ffc107;">
      <p style="margin: 0; font-weight: bold;">JavaScript requerido</p>
      <p style="margin: 0.5rem 0 0;">Esta aplicación requiere JavaScript para funcionar. Por favor, habilite JavaScript en su navegador.</p>
    </div>
  </noscript>
  
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>

// === ARCHIVO: README.md ===
# Banking App - Accesibilidad

Aplicación bancaria en línea construida con React 19 y TypeScript, diseñada siguiendo los estándares de accesibilidad ARIA (Accessible Rich Internet Applications) para garantizar que usuarios con discapacidades puedan navegar y utilizar todas las funcionalidades de manera autónoma.

## Requisitos Previos

- Node.js versión 18.x o superior
- npm versión 9.x o superior

## Instalación

1. Clonar el repositorio o extraer los archivos del proyecto
2. Ejecutar el siguiente comando para instalar las dependencias:

```bash
npm install
```

Este comando instalará todas las dependencias definidas en `package.json`, incluyendo las librerías de testing de accesibilidad como `jest-axe` y los plugins de ESLint para validación de ARIA.

## Ejecución del Proyecto

### Desarrollo

Para iniciar el servidor de desarrollo con recarga en caliente:

```bash
npm run dev
```

El servidor arrancará en `http://localhost:5173` (puerto por defecto de Vite).

### Build de Producción

Para generar los archivos optimizados para producción:

```bash
npm run build
```

Los archivos generados se almacenarán en el directorio `dist/`.

### Preview de Producción

Para servir los archivos buildados localmente:

```bash
npm run preview
```

## Herramientas de Accesibilidad

### ESLint con jsx-a11y

El proyecto incluye `eslint-plugin-jsx-a11y` para detectar problemas de accesibilidad durante el desarrollo. El linter se ejecuta automáticamente en el pre-commit hook y puede ejecutarse manualmente:

```bash
npm run lint
```

Esta configuración valida:
- Uso correcto de roles ARIA
- Atributos de etiquetado (`aria-label`, `aria-labelledby`, `aria-describedby`)
- Elementos interactivos con tabindex apropiado
- Contraste de colores y relaciones entre elementos

### Pruebas de Accesibilidad con jest-axe

El proyecto integra `jest-axe` para ejecutar pruebas automatizadas de accesibilidad que detectan violaciones de WCAG 2.1 nivel AA. Las pruebas verifican:
- Atributos ARIA requeridos en componentes interactivos
-_roles semánticos en lugar de divs genéricos
- Estados y propiedades ARIA correctamente aplicados
- Navegación por teclado funcional

Para ejecutar todas las pruebas:

```bash
npm run test
```

Para ejecutar únicamente las pruebas de accesibilidad:

```bash
npm run test:a11y
```

## Estructura del Proyecto

```
src/
├── app/                    # Componente raíz y configuración
├── features/               # Componentes de negocio por dominio
│   ├── accounts/          # Gestión de cuentas
│   ├── transactions/      # Formularios de transacciones
│   └── navigation/        # Navegación principal
├── shared/                # Componentes reutilizables
│   ├── components/       # Componentes presentacionales
│   └── hooks/            # Hooks personalizados
├── services/              # Clientes HTTP y servicios
└── types/                 # Definiciones de tipos TypeScript
```

## Patrón de Componentes

El proyecto sigue el patrón contenedor/presentacional:
- **Contenedores**: Gestionan estado y lógica de negocio
- **Presentacionales**: Renderizan UI y reciben props para estados ARIA

Cada componente presentacional recibe propiedades que permiten manejar estados de accesibilidad dinámicamente, como `aria-expanded`, `aria-selected`, `aria-disabled`, entre otros.

## Convenciones de Accesibilidad

El código fuente aplica las siguientes convenciones basadas en WAI-ARIA 1.2:

1. **Roles semánticos**: Uso de `role` en componentes interactivos no nativos
2. **Atributos aria-***: Aplicados según el contexto del componente
3. **Gestión de foco**: `tabindex` apropiado para elementos interactivos
4. **Etiquetado**: `aria-label`, `aria-labelledby` o `aria-describedby` según corresponda
5. **Estructura HTML5**: Combinada con atributos ARIA para máxima compatibilidad

## Validación Manual

Además de las pruebas automatizadas, se recomienda validar manualmente:
- Navegación completa con teclado (Tab, Shift+Tab, Enter, Escape)
- Lectores de pantalla (NVDA, JAWS, VoiceOver)
- Zoom del navegador al 200%
- Contraste de colores en modo de alto contraste

## Contribución

Al contribuir código, asegurar que:
- Los nuevos componentes incluyan atributos ARIA necesarios
- Las pruebas de accesibilidad pasen (`npm run test:a11y`)
- El linter no muestre errores de jsx-a11y (`npm run lint`)
- La navegación por teclado funcione correctamente
```
