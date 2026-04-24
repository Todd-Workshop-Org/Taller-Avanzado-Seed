# Taller-Avanzado-Seed

Semilla de trabajo para el taller tecnico de Agentic Workflows en Port, incluyendo blueprints, acciones self-service, prompts de agentes y datos de ejemplo de ecommerce.

## Objetivo

Este repositorio sirve como base para:

- Definir entidades de SDLC (servicios, repositorios, incidentes, despliegues, pull requests).
- Crear flujos operativos (por ejemplo, alta de incidentes).
- Estandarizar la respuesta asistida por agentes mediante prompts.
- Dejar lista la estructura para poblar entidades reales por entorno/equipo.

## Estructura del repositorio

- `blueprints/`: definiciones de esquema y relaciones entre entidades.
- `actions/`: acciones ejecutables en Port (self-service workflows).
- `agent-prompts/`: instrucciones para agentes de IA (triage, remediation, etc.).
- `entities/`: contenedores por tipo para instancias de entidades.
- `scripts/`: utilidades de carga y provisionamiento.
- `README.md`: documentación principal del proyecto.

## Componentes actuales

### Blueprints

- `incident.json`: modelo de incidente con severidad, estado, tipo de evento y plan de remediacion.
- `service.json`: blueprint de servicios.
- `repository.json`: blueprint de repositorios.
- `deployment.json`: blueprint de despliegues con ambiente, fecha y estado.
- `pull-request.json`: blueprint de pull requests con estado, fechas, link y numero de PR.

### Actions

- `create-incident.json`: accion self-service para crear incidentes en el blueprint `incident`.
  - Solicita tipo de evento, titulo y servicio impactado.
  - Inicializa propiedades como `status`, `event_type` y `triggered_at`.
  - Relaciona el incidente con `affected_service`.

### Agent prompts

- `remediation-prompt.md`: prompt con guardrails e instrucciones para generar un plan de remediacion.
- `triage-prompt.md`: archivo reservado para prompt de triage (actualmente vacio).

### Scripts

- `scripts/import-entities.py`: script principal de provisionamiento en Port.
  - Elimina blueprints existentes (si ya existen): `repository`, `service`, `pullRequest`, `deployment`, `incident`.
  - Recrea blueprints desde `blueprints/*.json`.
  - Hace upsert de acciones self-service desde `actions/*.json` (incluye `create-incident.json`).
  - Importa entidades de ejemplo en orden seguro de relaciones.
  - Recalcula fechas relativas para `pullRequest` y `deployment` en cada ejecucion (hasta 48h hacia atras).

## Dataset de ejemplo actual

- `services`: 3
- `repositories`: 3
- `pull-requests`: 30
- `deployments`: 24

## Ejecucion

Puedes ejecutar el script de dos maneras:

```bash
python3 scripts/import-entities.py
```

o bien:

```bash
./scripts/import-entities.py
```

Si no existen variables de entorno, el script pedira credenciales de forma interactiva:

- `PORT_CLIENT_ID`
- `PORT_CLIENT_SECRET`

Opcional:

- `PORT_BASE_URL` (default: `https://api.getport.io`)

## Notas importantes

- El script es destructivo para los blueprints administrados (los elimina y recrea).
- Las relaciones entre entidades se cargan en orden para evitar errores de dependencia.
- Se incluye la accion self-service de creacion de incidentes como parte del setup.