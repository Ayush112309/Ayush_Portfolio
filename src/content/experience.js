/** Add new roles to the top of the array; the timeline renders them in order. */
export const experience = [
  {
    id: '360-technology',
    company: '360 Technology LLC',
    role: 'AI Agent Lab Intern',
    location: 'USA',
    start: 'June 2026',
    end: 'August 2026',
    summary:
      'Built PlantTwin AI, an industrial digital twin that streams live PLC telemetry into AI agents for predictive maintenance and root-cause analysis.',
    highlights: [
      'Architected backend microservices and streaming pipelines for autonomous AI agent orchestration, processing 1,200+ telemetry events/sec with sub-40ms latency.',
      'Engineered TimescaleDB hypertables with chunk partitioning, cutting analytical query time by 45% on high-frequency sensor streams.',
      'Built bidirectional MQTT-over-WebSockets and REST layers for real-time state sync and automated alert dispatch to dashboards.',
      'Developed LLM-driven anomaly diagnostics and root-cause analysis, reaching 94.2% precision in automated fault alerting.',
      'Validated the stack with Dockerized CI/CD, PyTest suites and continuous hardware-in-the-loop testing on a Siemens S7-1200 PLC with zero deployment downtime.',
    ],
    metrics: [
      { value: '1,200+', label: 'events/sec' },
      { value: '<40ms', label: 'pipeline latency' },
      { value: '−45%', label: 'query time' },
      { value: '94.2%', label: 'alert precision' },
    ],
    stack: ['Python', 'FastAPI', 'TimescaleDB', 'MQTT', 'OPC-UA', 'Siemens S7-1200', 'WebSockets', 'Docker', 'PyTest', 'LLMs'],
    relatedProject: 'planttwin-ai',
  },
];
