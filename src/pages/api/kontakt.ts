import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const contactData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      package: formData.get('package'),
      budget: formData.get('budget'),
      message: formData.get('message'),
      consent: formData.get('consent'),
      timestamp: new Date().toISOString(),
      source: 'kontakt_form'
    };

    // Valider required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Navn, e-post og melding er påkrevd' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Valider e-post format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email as string)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Ugyldig e-postadresse' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Her kan du integrere med:
    // - E-posttjeneste (SendGrid, Mailgun, etc.)
    // - CRM-system (HubSpot, Salesforce, etc.)
    // - Database (Supabase, PlanetScale, etc.)
    // - Slack/Discord notifications
    
    console.log('Ny kontaktforespørsel:', contactData);

    // Eksempel på e-post sending (implementer med din foretrukne tjeneste)
    try {
      await sendContactEmail(contactData);
      await saveToCRM(contactData);
    } catch (error) {
      console.error('Feil ved sending/lagring:', error);
      // Ikke fail komplett - logg feilen og fortsett
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Takk for din henvendelse! Vi kommer tilbake til deg innen 24 timer.' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Noe gikk galt. Prøv igjen senere.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Placeholder for email sending - implementer med din tjeneste
async function sendContactEmail(data: any) {
  // Eksempel implementasjon med SendGrid/Mailgun/etc.
  // const response = await fetch('https://api.sendgrid.v3/mail/send', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     personalizations: [{
  //       to: [{ email: 'kontakt@nettup.no' }],
  //       subject: `Ny kontaktforespørsel fra ${data.name}`
  //     }],
  //     from: { email: 'noreply@nettup.no' },
  //     content: [{
  //       type: 'text/html',
  //       value: `
  //         <h2>Ny kontaktforespørsel</h2>
  //         <p><strong>Navn:</strong> ${data.name}</p>
  //         <p><strong>E-post:</strong> ${data.email}</p>
  //         <p><strong>Telefon:</strong> ${data.phone || 'Ikke oppgitt'}</p>
  //         <p><strong>Bedrift:</strong> ${data.company || 'Ikke oppgitt'}</p>
  //         <p><strong>Pakke:</strong> ${data.package || 'Ikke valgt'}</p>
  //         <p><strong>Budsjett:</strong> ${data.budget || 'Ikke oppgitt'}</p>
  //         <p><strong>Melding:</strong></p>
  //         <p>${data.message}</p>
  //       `
  //     }]
  //   })
  // });
  console.log('E-post ville blitt sendt til:', data.email);
}

// Placeholder for CRM integration - implementer med ditt CRM
async function saveToCRM(data: any) {
  // Eksempel implementasjon med HubSpot/Salesforce/etc.
  console.log('Data ville blitt lagret i CRM:', data);
} 