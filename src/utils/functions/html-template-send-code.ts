export function htmlTemplateCode(code: string): string {
  return `
       <div style="background-color: #f5f5f5; padding: 20px;">
        <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 10px; border-radius: 10px; text-align: center;">          
        <img src="cid:logo_cid" alt="Logo" height="64" style="margin-bottom: 1rem;width:40%" alt="CashPilot" />
      <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 10px;">Recuperação de conta</h2>
      <p style="padding: 1rem 0; line-height: 1.5rem; font-size: 14px; color: #3c4043;">
            Te enviamos um novo código para seguir o próximo passo da recuperação de senha.
          </p>
          <p style="font-size: 22px; font-weight: 700; letter-spacing: 0.25rem; margin: 1rem 0; color: #202124;">
            ${code}
          </p>
          <p style="font-size: 12px; color: #5f6368; margin-top: 30px;">
            Se você não solicitou esta alteração, pode ignorar este e-mail com segurança.
          </p>
          </div>
          <p style="font-size: 11px; color: #5f6368; text-align: center; margin-top: 20px;">
            CashPilot LTDA • ${new Date().getFullYear()}
          </p>
      </div>
        `;
}
