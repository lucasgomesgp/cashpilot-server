import env from "../../env";

export function htmlTemplateLinkRecovery(userId: string): string {
  return `
    <div style="background-color: #f5f5f5; padding: 20px;">
        <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px; border-radius: 10px; text-align: center;">
          <img src="cid:logo_cid" alt="Logo" height="64" style="margin-bottom: 1rem;width:40%" alt="CashPilot"/>
      <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 10px;">Recuperação de conta</h2>
      <p style="font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
        O e-mail de recuperação para sua conta CashPilot foi solicitado.
      </p>
      <p style="font-size: 14px; line-height: 1.5; margin-bottom: 30px;">
        Clique no botão abaixo para redefinir sua senha.
      </p>
      <a href="${env.API_BASE_URL}/users/confirm-email?user_id=${userId}"
        style="
          background-color: #1a73e8;
          color: #ffffff;
          padding: 10px 24px;
          border-radius: 4px;
          font-size: 14px;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
        ">
        Recuperar senha
      </a>
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
