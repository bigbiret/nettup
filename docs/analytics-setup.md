# Nettside Setup - Analytics og Kontaktskjema

## Oversikt

Dette nettstedet bruker Google Analytics 4 (GA4) med GDPR-kompatibel cookie consent og FormSubmit.co for kontaktskjema. Systemet er optimalisert for GitHub Pages deployment.

## Analytics Komponenter

### 1. GoogleAnalytics.astro

- Håndterer GA4 tracking
- Bruker environment variable for GA ID
- IP-adresser anonymiseres automatisk
- Ingen personlig informasjon samles inn
- Konsent-basert tracking

### 2. CookieBanner.astro

- GDPR-kompatibel cookie banner
- Tre tilstander: Godta, Avslå, Ingen valg (standard: ingen tracking)
- Lagrer brukerens valg i 1 år
- Integrert med Google Analytics consent mode

### 3. Cookies-side (/cookies)

- Informativ side om cookie-bruk
- Forklarer personvern-praksis
- Kontaktinformasjon

## Kontaktskjema Setup

### FormSubmit.co Integration

- **100% gratis** service for form submissions
- **Ingen backend** påkrevd - perfekt for GitHub Pages
- **Automatisk e-post** til både post@nettup.no og bruker
- **Spam-beskyttelse** innebygd
- **Custom redirect** til takk-side (/takk)

### Konfiguration

```html
<form action="https://formsubmit.co/post@nettup.no" method="POST">
  <input type="hidden" name="_next" value="https://nettup.no/takk" />
  <input
    type="hidden"
    name="_subject"
    value="Ny kontaktforespørsel fra nettup.no"
  />
  <input
    type="hidden"
    name="_autoresponse"
    value="Takk for din henvendelse! Vi har mottatt din melding og vil komme tilbake til deg innen 24 timer. Med vennlig hilsen, Teamet på Nettup"
  />
  <input type="hidden" name="_template" value="table" />
  <input type="hidden" name="_captcha" value="false" />
  <!-- Form fields -->
</form>
```

## Funksjonalitet

### Cookie Consent States

1. **Ingen valg (standard)**: Ingen analytics tracking
2. **Godta alle**: Analytics tracking aktivert
3. **Kun nødvendige**: Ingen analytics tracking

### Privacy Features

- ✅ IP-adresser anonymiseres
- ✅ Ingen personlig informasjon samles
- ✅ Ingen reklame-tracking
- ✅ Ingen cross-domain tracking
- ✅ Consent-basert tracking
- ✅ Bruker kan endre valg når som helst

### Accessibility Features

- ✅ WCAG 2.1 AA compliant
- ✅ Riktig landmark-struktur (banner, region, group)
- ✅ ARIA-labels og beskrivelser
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

## Konfigurasjon

### Environment Variables

```bash
# .env
PUBLIC_GA_ID=G-JGFB95353H
```

### GA4 Settings

- `anonymize_ip: true` - IP-adresser anonymiseres
- `allow_google_signals: false` - Ingen reklame-signaler
- `allow_ad_personalization_signals: false` - Ingen personlig reklame
- `user_id: null` - Ingen bruker-ID tracking
- `allow_display_features: false` - Ingen demografisk data
- `link_attribution: false` - Ingen forbedret link-attribuering
- `allow_linker: false` - Ingen cross-domain tracking

## Testing

### Test Cookie Banner

1. Åpne nettstedet i incognito/private modus
2. Cookie banner skal vises
3. Test "Godta alle" - analytics skal aktiveres
4. Test "Kun nødvendige" - analytics skal deaktiveres
5. Test at valget lagres (refresh siden)

### Test Accessibility

1. Kjør axe-core test: `npx @axe-core/cli http://localhost:4321`
2. Test med screen reader (NVDA, JAWS, VoiceOver)
3. Test keyboard navigation (Tab, Enter, Escape)
4. Verifiser at alle elementer har riktig ARIA-attributter

### Test Analytics

1. Åpne browser developer tools
2. Gå til Network tab
3. Godta cookies
4. Se etter Google Analytics requests
5. Verifiser at ingen personlig data sendes

## Vedlikehold

### Oppdatere GA ID

1. Endre `PUBLIC_GA_ID` i `.env`
2. Eller endre default verdi i `GoogleAnalytics.astro`

### Oppdatere Cookie Banner Tekst

1. Rediger tekst i `CookieBanner.astro`
2. Oppdater `/cookies` siden hvis nødvendig

### Legge til Nye Cookies

1. Oppdater consent management i `CookieBanner.astro`
2. Oppdater `GoogleAnalytics.astro` hvis nødvendig
3. Oppdater dokumentasjon

## Compliance

### GDPR

- ✅ Consent før tracking
- ✅ Mulighet for å trekke tilbake consent
- ✅ Transparent om data-bruk
- ✅ Minimal data-samling

### Norske Regler

- ✅ Følger personvernloven
- ✅ Informativ cookie-banner
- ✅ Enkel å forstå

## Troubleshooting

### Analytics fungerer ikke

1. Sjekk at GA ID er riktig
2. Sjekk at consent er gitt
3. Sjekk browser console for feil

### Cookie banner vises ikke

1. Sjekk at `CookieBanner.astro` er importert
2. Sjekk at `show` prop er satt til `true`
3. Sjekk browser console for feil

### Consent lagres ikke

1. Sjekk at cookies er aktivert i browser
2. Sjekk at SameSite=Lax fungerer
3. Test i incognito modus
