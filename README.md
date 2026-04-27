# Taller-Avanzado-Seed
Seed data para el taller técnico de Agentic Workflows en Port, incluyendo blueprints, acciones self-service, prompts de agentes y datos de ejemplo de ecommerce.

## Objetivo

Este repositorio sirve como base para:

- Definir entidades de SDLC (servicios, repositorios, incidentes, despliegues, pull requests).
- Crear flujos operativos (por ejemplo, alta de incidentes).
- Estandarizar la respuesta asistida por agentes mediante prompts.
- Dejar lista la estructura para poblar entidades reales por entorno/equipo.

## Estructura del repositorio

- `blueprints/`: definiciones de esquema y relaciones entre entidades.
- `actions/`: acciones ejecutables en Port (self-service workflows).
- `agent-prompts/`: prompts para el agente de IA en modo interactivo (Claude Agent).
- `ai-node-prompts/`: prompts para nodos de IA dentro de workflows automatizados de Port.
- `entities/`: contenedores por tipo para instancias de entidades.
- `scripts/`: utilidades de carga y provisionamiento.
- `README.md`: documentación principal del proyecto.

## Componentes actuales

### Blueprints

- `incident.json`: modelo de incidente con severidad, estado, tipo de evento y plan de remediación.
- `service.json`: blueprint de servicios.
- `repository.json`: blueprint de repositorios.
- `deployment.json`: blueprint de despliegues con ambiente, fecha y estado.
- `pull-request.json`: blueprint de pull requests con estado, fechas, link y número de PR.

### Actions

- `create-incident.json`: acción self-service para crear incidentes en el blueprint `incident`.
  - Solicita tipo de evento, título y servicio impactado.
  - Inicializa propiedades como `status`, `event_type` y `triggered_at`.
  - Relaciona el incidente con `affected_service`.

### Agent prompts

Usados con el agente de IA en modo interactivo (Claude Agent en Port):

- `triage-prompt.md`: prompt de triage con guardrails completos. Determina severidad por tier de servicio, revisa despliegues de las últimas 24h y PRs relacionados, e identifica servicios dependientes en riesgo.
- `remediation-prompt.md`: prompt con guardrails e instrucciones para generar un plan de remediación.

### AI node prompts

Usados como instrucciones en nodos de IA dentro de workflows automatizados de Port:

- `triage-node.md`: prompt conciso de triage para nodo de IA en workflow. Recibe el identificador del incidente y solicita determinar severidad según el tier del servicio y recopilar despliegues de las últimas 24h.
- `remediation-node.md`: prompt conciso de remediación para nodo de IA en workflow. Recibe el identificador del incidente y solicita revisar servicio, despliegues, PRs y servicios dependientes.

### Scripts

Ambos scripts son funcionalmente idénticos — elige el que mejor se adapte a tu entorno:

- `scripts/import-entities.js`: versión Node.js (recomendada). Sin dependencias externas, funciona en Windows, Linux y Mac con Node.js instalado.
- `scripts/import-entities.py`: versión Python 3. Solo usa stdlib, sin paquetes pip.

Ambos scripts:
  - Eliminan blueprints existentes (si ya existen): `repository`, `service`, `pullRequest`, `deployment`, `incident`.
  - Recrean blueprints desde `blueprints/*.json`.
  - Hacen upsert de acciones self-service desde `actions/*.json` (incluye `create-incident.json`).
  - Importan entidades de ejemplo en orden seguro de relaciones.
  - Recalculan fechas relativas para `pullRequest` y `deployment` en cada ejecución (hasta 48h hacia atrás).

## Dataset de ejemplo actual

- `services`: 3
- `repositories`: 3
- `pull-requests`: 30
- `deployments`: 24

## Requisitos previos

Necesitas tener instalado lo siguiente:

- **Git** (recomendado para clonar): https://git-scm.com/downloads — o usa `curl` si ya está disponible en tu sistema
- **Node.js** (recomendado): https://nodejs.org
- **Python 3** (alternativa a Node.js): https://www.python.org/downloads

## Ejecución

### 1. Descarga el repositorio

**Con Git:**

```bash
git clone https://github.com/Todd-Workshop-Org/Taller-Avanzado-Seed.git
```

**Con curl** (si no tienes Git instalado):

```bash
curl -L https://github.com/Todd-Workshop-Org/Taller-Avanzado-Seed/archive/refs/heads/main.zip -o Taller-Avanzado-Seed.zip
```

Luego descomprime el archivo descargado y entra a la carpeta `Taller-Avanzado-Seed-main`.

### 2. Entra al directorio

```bash
cd Taller-Avanzado-Seed
```

### 3. Ejecuta el script

**Con Node.js:**

```bash
node scripts/import-entities.js
```

**Con Python 3:**

```bash
python3 scripts/import-entities.py
```

> En Windows con Python, puede que necesites usar `python` en lugar de `python3`.

### 4. Ingresa tus credenciales

Si no existen variables de entorno, el script pedirá credenciales de forma interactiva:

- `PORT_CLIENT_ID`
- `PORT_CLIENT_SECRET`

Puedes encontrarlas en **Settings → Credentials** dentro de tu organización en Port.

Opcional:

- `PORT_BASE_URL` (default: `https://api.getport.io`)

## Notas importantes

- El script es destructivo para los blueprints administrados (los elimina y recrea).
- Las relaciones entre entidades se cargan en orden para evitar errores de dependencia.
- Se incluye la acción self-service de creación de incidentes como parte del setup.
