# Blogg Artikler

Denne mappen inneholder alle blogg-artikler for nettstedet.

## Hvordan legge til en ny artikkel

1. Opprett en ny `.md` fil i `src/content/blog/` mappen
2. Bruk følgende frontmatter format:

```markdown
---
title: 'Tittelen på artikkelen'
description: 'Kort beskrivelse av artikkelen som vises i preview'
pubDate: 2024-01-15
author: 'Nettup Team'
tags: ['tag1', 'tag2', 'tag3']
image: '/images/blog/bilde.jpg' # valgfritt
featured: true # valgfritt, for fremhevede artikler
readingTime: 5 # valgfritt, estimert lesetid i minutter
---

# Innholdet her...

## Undertittel

Mer innhold...
```

## Frontmatter felter

- **title** (påkrevd): Artikkelens tittel
- **description** (påkrevd): Kort beskrivelse som vises i preview
- **pubDate** (påkrevd): Publiseringsdato (YYYY-MM-DD format)
- **author** (påkrevd): Forfatterens navn
- **tags** (valgfritt): Array med tags for kategorisering
- **image** (valgfritt): Bilde som vises i preview
- **featured** (valgfritt): Boolean for å fremheve artikkelen
- **readingTime** (valgfritt): Estimert lesetid i minutter

## Tips for innhold

- Bruk markdown for formatering
- Inkluder relevante lenker til andre sider på nettstedet
- Legg til subtile referanser til Nettup's tjenester
- Bruk bilder for å gjøre innholdet mer engasjerende
- Hold artiklene informative og verdifulle for leserne

## SEO tips

- Bruk relevante nøkkelord i tittel og beskrivelse
- Inkluder interne lenker til relevante sider
- Legg til call-to-actions der det er naturlig
- Bruk beskrivende bilde-filer
