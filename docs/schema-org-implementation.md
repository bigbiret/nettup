# Schema.org Implementation for Nettup

Denne dokumentasjonen beskriver schema.org-implementeringen som er lagt til for å forbedre SEO og Google-synlighet.

## Oversikt

Vi har implementert omfattende schema.org-markup som gir søkemotorer strukturerte data om:
- Organisasjonsinformasjon
- Tjenester og pakker  
- Case studies og kundereviews
- FAQ-innhold
- Brødsmuler for navigasjon

## Arkitektur

### Komponenter
- **`src/components/SchemaOrg.astro`** - Gjenbrukbar komponent for å rendre JSON-LD
- **`src/utils/schema.ts`** - Alle schema-definisjoner og utility-funksjoner

### Schema-typer implementert

#### Globale schemas (på alle sider)
- **Organization** - Nettup som bedrift
- **WebSite** - Hovedinnformasjon om nettsiden
- **LocalBusiness** - Profesjonell tjeneste med priser
- **BreadcrumbList** - Dynamiske brødsmuler

#### Side-spesifikke schemas
- **Product** - For hver tjenestepakke (Start, Plus, Pro, Premium)
- **FAQPage** - På FAQ-siden (`/faq`)
- **CreativeWork** - For case studies
- **Review** - Kundetestimonials fra case studies

## Implementering per side

### BaseLayout.astro
Alle sider får automatisk:
```astro
<SchemaOrg data={organizationSchema} />
<SchemaOrg data={websiteSchema} />
<SchemaOrg data={localBusinessSchema} />
<SchemaOrg data={breadcrumbSchema(currentBreadcrumbs)} />
```

### Pakker-siden (`/pakker`)
Får tillegg av Product-schema for hver pakke:
```astro
<SchemaOrg data={startPackageSchema} />
<SchemaOrg data={plusPackageSchema} />
<SchemaOrg data={proPackageSchema} />
<SchemaOrg data={premiumPackageSchema} />
```

### FAQ-siden (`/faq`)
Får FAQ-schema automatisk via `schemaType="faq"` parameter.

### Case study-sider (`/case/[slug]`)
Får automatisk:
- CreativeWork-schema for case studyen
- Review-schema for kundetestimonials

## Bruk av schema-typer

### Standard bruk
```astro
<BaseLayout 
  title="Side tittel"
  description="Side beskrivelse"
>
```

### Med FAQ
```astro
<BaseLayout 
  title="FAQ"
  description="Ofte stilte spørsmål"
  schemaType="faq"
>
```

### Med egendefinerte brødsmuler
```astro
<BaseLayout 
  title="Case Study"
  description="Beskrivelse"
  schemaType="case"
  breadcrumbs={[
    { name: 'Hjem', url: 'https://nettup.no' },
    { name: 'Case', url: 'https://nettup.no/case' },
    { name: 'Spesifikk case', url: 'https://nettup.no/case/case-1' }
  ]}
>
```

## Utility-funksjoner

### `packageSchema(name, price, description, features)`
Genererer Product-schema for tjenestepakker.

### `caseStudySchema(title, description, url, client?)`
Genererer CreativeWork-schema for case studies.

### `reviewSchema(text, rating, author, company?)`
Genererer Review-schema for kundetestimonials.

### `breadcrumbSchema(breadcrumbs)`
Genererer BreadcrumbList-schema fra breadcrumb-array.

## Validering

For å validere schema-markup:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console** for å overvåke rich snippets

## SEO-fordeler

Implementeringen gir følgende SEO-fordeler:

- **Rich snippets** i Google-søk (stjerner, priser, FAQ-svar)
- **Bedre forståelse** av innhold for søkemotorer  
- **Økt klikkrate** gjennom visuelt forbedrede søkeresultater
- **Local business** optimalisering for lokal synlighet
- **Brødsmuler** i søkeresultater for bedre navigasjon

## Vedlikehold

### Oppdatering av organisasjonsdata
Rediger `organizationSchema` i `src/utils/schema.ts`:
- Telefonnummer
- Adresse
- Sosiale medier-lenker
- Logo-URL

### Legge til nye schema-typer
1. Definer schema i `src/utils/schema.ts`
2. Legg til i relevant side eller BaseLayout
3. Test med validation tools

### FAQ-oppdateringer
Oppdater både:
- `faqSchema` i utils/schema.ts
- `faqs` array i src/pages/faq.astro

## Testing

Bygget kjører uten feil:
```bash
npm run build
```

Alle sider genereres korrekt med schema-markup inkludert. 