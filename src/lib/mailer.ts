import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface ContactPayload {
  name: string
  email: string
  phone: string
  message: string
  locale?: string
}

export async function sendContactEmail(payload: ContactPayload) {
  const { name, email, phone, message } = payload

  await transporter.sendMail({
    from: `"CaloWet Air Website" <${process.env.SMTP_USER}>`,
    to: process.env.TO_EMAIL,
    replyTo: email,
    subject: `New Enquiry from ${name} – CaloWet Air`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0047AB; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #F0F6FF; margin: 0; font-size: 20px;">New Website Enquiry</h1>
          <p style="color: #DCE8F7; margin: 4px 0 0; font-size: 13px;">CaloWet Air – HVAC Solutions Kenya</p>
        </div>
        <div style="background: #F0F6FF; padding: 24px; border: 1px solid #DCE8F7; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #0047AB; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #0047AB;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone</td>
              <td style="padding: 8px 0; color: #0047AB;">${phone}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #DCE8F7; margin: 16px 0;" />
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Message</p>
          <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 0;">${message}</p>
        </div>
        <p style="color: #9ca3af; font-size: 11px; text-align: center; margin-top: 16px;">
          CaloWet Air · Serving Nyanza, Western, Central & Rift Valley
        </p>
      </div>
    `,
  })
}
