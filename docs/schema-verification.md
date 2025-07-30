# Verifisering av Schema.org Markup

Denne guiden viser hvordan du kan verifisere at schema.org-markup er riktig implementert på nettsiden din.

## 1. Sjekke generert HTML

Etter å ha kjørt `npm run build`, kan du sjekke den genererte HTML-en i `dist/`-mappen:

```bash
# Sjekk om schema.org-markup er generert
grep -r "application/ld+json" dist/

# Sjekk spesifikke schema-typer
grep -r "Organization" dist/
grep -r "WebSite" dist/
grep -r "FAQPage" dist/
grep -r "BreadcrumbList" dist/
```

## 2. Google Rich Results Test

Bruk Google Rich Results Test for å validere schema.org-markup:

1. Gå til: https://search.google.com/test/rich-results
2. Lim inn URL-en til din nettside eller HTML-koden
3. Klikk "Test URL" eller "Test Code"
4. Se resultatene for rik utdrag

## 3. Schema.org Validator

Bruk Schema.org's egen validator:

1. Gå til: https://validator.schema.org/
2. Lim inn URL-en til din nettside
3. Klikk "Validate"
4. Se detaljerte resultater

## 4. Chrome DevTools

1. Åpne Chrome DevTools (F12)
2. Gå til "Elements" fanen
3. Søk etter "application/ld+json"
4. Klikk på script-taggen for å se JSON-innholdet

## 5. Automatisk testing

Du kan også lage en enkel test for å verifisere at schema.org-markup er tilstede:

```bash
# Test at alle sider har schema.org-markup
for file in dist/*.html; do
  if ! grep -q "application/ld+json" "$file"; then
    echo "Mangler schema.org-markup i: $file"
  fi
done
```

## 6. Eksempel på forventet output

På forsiden (`dist/index.html`) skal du se:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nettup",
    "url": "https://nettup.no",
    ...
  }
</script>
```

## 7. Sjekke spesifikke sider

### Forsiden

- Organization schema ✓
- WebSite schema ✓
- BreadcrumbList schema ✓

### FAQ-siden

- Organization schema ✓
- WebSite schema ✓
- BreadcrumbList schema ✓
- FAQPage schema ✓

### Pakker-siden

- Organization schema ✓
- WebSite schema ✓
- BreadcrumbList schema ✓
- Product schema (for hver pakke) ✓

## 8. Feilsøking

Hvis schema.org-markup ikke vises:

1. Sjekk at `SchemaOrg.astro` komponenten er riktig importert
2. Verifiser at schema-objektene i `utils/schema.ts` er korrekte
3. Sjekk at BaseLayout.astro bruker riktige props
4. Kjør `npm run build` på nytt
5. Sjekk konsollen for feilmeldinger

## 9. Google Search Console

Etter at nettsiden er live:

1. Gå til Google Search Console
2. Velg din nettside
3. Gå til "Enhancements" > "Rich results"
4. Se om Google har oppdaget rik utdrag

## 10. Monitoring

Overvåk schema.org-implementeringen ved å:

- Sjekke Google Search Console regelmessig
- Teste med Google Rich Results Test etter endringer
- Overvåke søkeresultater for rik utdrag
- Sjekke at alle nye sider får riktig schema.org-markup
