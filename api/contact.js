import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, service, message } = req.body;

    // Basic server-side validation
    if (!name || !email || !service || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        await resend.emails.send({
            from: 'CognitoDZ Contact <onboarding@resend.dev>',
            to: ['nishki25@gmail.com'],
            replyTo: email,
            subject: `[CognitoDZ] New Project Inquiry — ${service}`,
            html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0f0f1a;color:#ededef;padding:2rem;border-radius:12px;border:1px solid rgba(62,207,142,0.2);">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:2rem;">
            <div style="width:36px;height:36px;background:linear-gradient(135deg,#3ecf8e,#00d4ff);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:#080810;text-align:center;line-height:36px;">CG</div>
            <span style="font-weight:700;font-size:1.2rem;">Cognito<span style="color:#3ecf8e;">DZ</span> — New Inquiry</span>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:0.75rem 1rem;background:rgba(62,207,142,0.05);border:1px solid rgba(62,207,142,0.1);border-radius:6px 6px 0 0;color:#9293a5;font-size:0.8rem;font-weight:600;letter-spacing:0.05em;">FROM</td>
              <td style="padding:0.75rem 1rem;background:rgba(62,207,142,0.05);border:1px solid rgba(62,207,142,0.1);border-top:0;font-weight:600;">${name} &lt;${email}&gt;</td>
            </tr>
            <tr>
              <td style="padding:0.75rem 1rem;background:rgba(62,207,142,0.03);border:1px solid rgba(62,207,142,0.1);border-top:0;color:#9293a5;font-size:0.8rem;font-weight:600;letter-spacing:0.05em;">SERVICE</td>
              <td style="padding:0.75rem 1rem;background:rgba(62,207,142,0.03);border:1px solid rgba(62,207,142,0.1);border-top:0;color:#3ecf8e;font-weight:600;">${service}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding:0.75rem 1rem;background:rgba(62,207,142,0.02);border:1px solid rgba(62,207,142,0.1);border-top:0;border-radius:0 0 6px 6px;">
                <div style="color:#9293a5;font-size:0.8rem;font-weight:600;letter-spacing:0.05em;margin-bottom:0.5rem;">MESSAGE</div>
                <div style="line-height:1.7;white-space:pre-wrap;">${message}</div>
              </td>
            </tr>
          </table>
          <p style="margin-top:1.5rem;color:#9293a5;font-size:0.8rem;">You can reply directly to this email to respond to ${name}.</p>
        </div>
      `,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Resend error:', err);
        return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
}
