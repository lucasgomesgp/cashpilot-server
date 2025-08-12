import env from "../../env";

export function htmlTemplate(userId: string): string {
  return `
    <div
           style="
             font-family: sans-serif;
             max-width: 400px;
             margin: 2rem auto;
             padding: 1rem;
             border-radius: 0.5rem;
           "
         >
           <h2>Bem vindo(a) ao CashPilot</h2>
           <p style="padding: 1rem 0; line-height: 2rem">
             Clique no link abaixo para recuperar sua senha!
           </p>
           <a
             href="${env.API_BASE_URL}/users/confirm-email?user_id=${userId}"
             style="
               text-decoration: none;
               background-color: #2D60FF;
               color: white;
               padding: 0.5rem 2rem;
               border-radius: 0.3rem;
               font-weight: bold;
             "
           >
             Recuperar
           </a>
           <p style="padding: 1rem 0; line-height: 2rem; font-size: 14px">
             Se esta ação foi um engano, por favor, ignore este email.
           </p>
           <p style="font-size:12px;color: grey;text-align:center"> CashPilot LTDA </p>
         </div>`;
}
