/**
 * Content schema (documentation only — nothing imports this file).
 * Every section renders from objects shaped like these. Your editor picks the
 * JSDoc up for autocomplete if you add e.g. `/** @type {Project[]} *\/` above an array.
 *
 * @typedef {'ai' | 'backend' | 'realtime'} DomainId
 *
 * @typedef {Object} Metric
 * @property {string} value  Big figure, e.g. "1,200+"
 * @property {string} label  What it measures
 *
 * @typedef {Object} ResumeFile
 * @property {string} label     Button text, e.g. "Software engineering"
 * @property {string} file      Path inside /public, e.g. "/resume/x.pdf"
 * @property {boolean} [primary] Used by the hero "Download resume" button
 *
 * @typedef {Object} SocialLink
 * @property {'github'|'linkedin'|'email'|'x'|'website'} id
 * @property {string} label
 * @property {string} href    Empty string hides the link everywhere
 * @property {string} [handle]
 *
 * @typedef {Object} ExperienceItem
 * @property {string} id
 * @property {string} company
 * @property {string} role
 * @property {string} location
 * @property {string} start
 * @property {string} end
 * @property {string} summary
 * @property {string[]} highlights
 * @property {Metric[]} metrics
 * @property {string[]} stack
 * @property {string} [relatedProject]  Slug of a project to link its case study
 *
 * @typedef {'twin'|'rag'|'mqtt'|'pos'|'audio'} ProjectVisualKind
 *
 * @typedef {Object} Project
 * @property {string} slug        Unique, used in ?project=slug links
 * @property {string} title
 * @property {string} category
 * @property {string} [context]   e.g. "Built at 360 Technology LLC"
 * @property {string} tagline
 * @property {ProjectVisualKind} visual
 * @property {boolean} featured   Featured = large card + case study
 * @property {DomainId[]} domains Links the project into "How I think about systems"
 * @property {string[]} stack
 * @property {string[]} highlights
 * @property {Metric[]} metrics
 * @property {string} overview
 * @property {string} problem
 * @property {string} solution
 * @property {{name: string, detail: string}[]} architecture
 * @property {string[]} decisions
 * @property {string[]} challenges
 * @property {{github?: string, live?: string}} links  Empty strings are hidden
 *
 * @typedef {Object} ArchiveProject
 * @property {string} title
 * @property {string} area
 * @property {string} summary
 * @property {string} [result]
 * @property {string[]} stack
 * @property {string} [link]
 *
 * @typedef {Object} SkillCategory
 * @property {string} id
 * @property {string} title
 * @property {string} blurb
 * @property {{name: string, usedIn?: string}[]} skills
 *
 * @typedef {Object} SystemDomain
 * @property {DomainId} id
 * @property {string} name
 * @property {string} short     Label inside the graph node
 * @property {string} summary
 * @property {string[]} concepts
 * @property {string[]} technologies
 * @property {string[]} workflow
 */
export {};
