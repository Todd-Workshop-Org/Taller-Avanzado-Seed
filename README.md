# Taller-Avanzado-Seed

Semilla de trabajo el taller técnico de Agentic Workflows de Port, incluyendo blueprints, acciones self-service y prompts de agentes para triage/remediacion.

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
- `README.md`: documentación principal del proyecto.

## Componentes actuales

### Blueprints

- `incident.json`: modelo de incidente con severidad, estado, tipo de evento y plan de remediacion.
- `service.json`: blueprint de servicios.
- `repository.json`: blueprint de repositorios.
- `deployment.json`: placeholder (pendiente de definicion).
- `pull-request.json`: placeholder (pendiente de definicion).

### Actions

- `create-incident.json`: accion self-service para crear incidentes en el blueprint `incident`.
  - Solicita tipo de evento, titulo y servicio impactado.
  - Inicializa propiedades como `status`, `event_type` y `triggered_at`.
  - Relaciona el incidente con `affected_service`.

### Agent prompts

- `remediation-prompt.md`: prompt con guardrails e instrucciones para generar un plan de remediacion.
- `triage-prompt.md`: archivo reservado para prompt de triage (actualmente vacio).