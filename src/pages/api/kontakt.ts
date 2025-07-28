import type { APIRoute } from 'astro';
import 'dotenv/config';

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
    };

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Navn, e-post og melding er påkrevd',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Send email via Resend
    await sendContactEmail(contactData);

    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Takk for din henvendelse! Vi kommer tilbake til deg innen 24 timer.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Noe gikk galt. Prøv igjen senere.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// Email sending function using Resend
async function sendContactEmail(data: any) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
        Ny kontaktforespørsel fra nettup.no
      </h2>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Navn:</strong> ${data.name}</p>
        <p><strong>E-post:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Telefon:</strong> ${data.phone || 'Ikke oppgitt'}</p>
        <p><strong>Bedrift:</strong> ${data.company || 'Ikke oppgitt'}</p>
        <p><strong>Interessert i pakke:</strong> ${data.package || 'Ikke valgt'}</p>
        <p><strong>Budsjett:</strong> ${data.budget || 'Ikke oppgitt'}</p>
      </div>
      <div style="margin: 20px 0;">
        <h3 style="color: #1f2937;">Melding:</h3>
        <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
          <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
        </div>
      </div>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; font-size: 14px; color: #6b7280;">
        <p><strong>Tidspunkt:</strong> ${new Date(data.timestamp).toLocaleString('nb-NO')}</p>
        <p><strong>Kilde:</strong> Kontaktskjema på nettup.no</p>
      </div>
    </div>
  `;

  const userEmailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
        Takk for din henvendelse!
      </h2>
      <p>Hei ${data.name},</p>
      <p>Vi har mottatt din henvendelse og vil komme tilbake til deg innen 24 timer.</p>
      <p>Her er en kopi av meldingen du sendte:</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
      </div>
      <p>Med vennlig hilsen,<br><strong>Teamet på Nettup</strong></p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 14px;">
        <p><strong>Kontaktinformasjon:</strong></p>
        <p>📧 post@nettup.no<br>
        📞 +47 473 31 298<br>
        📍 Trollåsveien 4, 1414 Trollåsen</p>
      </div>
    </div>
  `;

  // Send email to Nettup
  const { error } = await resend.emails.send({
    from: 'Nettup <noreply@nettup.no>',
    to: ['post@nettup.no'],
    subject: `Ny kontaktforespørsel fra ${data.name}`,
    html: emailContent,
    replyTo: data.email,
  });

  if (error) {
    throw error;
  }

  // Send confirmation email to user
  await resend.emails.send({
    from: 'Nettup <noreply@nettup.no>',
    to: [data.email],
    subject: 'Takk for din henvendelse - Nettup',
    html: userEmailContent,
    replyTo: 'post@nettup.no',
  });
}
