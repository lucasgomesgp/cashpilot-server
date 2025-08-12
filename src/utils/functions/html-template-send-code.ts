import env from "../../env";

export function htmlTemplate(code: string): string {
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
           <h2>CashPilot</h2>
           <p style="padding: 1rem 0; line-height: 2rem">
             Te enviamos um novo código, para seguir o próximo passo da recuperação de senha
           </p>
           <p style="font-size:20px;font-weight:700;text-align:center;letter-spacing:0.2rem"> ${code} </p>
           <p style="padding: 1rem 0; line-height: 2rem; font-size: 14px">
             Se esta ação foi um engano, por favor, ignore este email.
           </p>
            <p style="font-size:12px;color: grey;text-align:center"> CashPilot LTDA </p>
         </div>`;
}
