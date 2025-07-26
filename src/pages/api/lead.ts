import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();

        const leadData = {
            name: formData.get('name'),
            email: formData.get('email'),
            timestamp: new Date().toISOString(),
            source: 'footer_lead_form'
        };

        // Valider required fields
        if (!leadData.name || !leadData.email) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Navn og e-post er påkrevd'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Valider e-post format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(leadData.email as string)) {
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

        console.log('Ny lead registrering:', leadData);

        // Integrer med email marketing tools:
        // - Mailchimp
        // - ConvertKit  
        // - EmailOctopus
        // - SendGrid Contacts
        try {
            await addToEmailList(leadData);
            await saveToCRM(leadData);
        } catch (error) {
            console.error('Feil ved lead processing:', error);
            // Ikke fail komplett
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Takk for din interesse! Vi kommer tilbake til deg snart.'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Lead API error:', error);
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

// Placeholder for email list integration
async function addToEmailList(data: any) {
    // Eksempel Mailchimp implementasjon:
    // const response = await fetch(`https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email_address: data.email,
    //     status: 'subscribed',
    //     merge_fields: {
    //       FNAME: data.name.split(' ')[0],
    //       LNAME: data.name.split(' ').slice(1).join(' ') || ''
    //     },
    //     tags: ['website-lead']
    //   })
    // });
    console.log('Lead ville blitt lagt til e-postliste:', data.email);
}

// Placeholder for CRM integration
async function saveToCRM(data: any) {
    console.log('Lead ville blitt lagret i CRM:', data);
} 