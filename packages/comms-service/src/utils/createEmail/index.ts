import { EmailUserNames } from '../../constants/emailUserNames';

const emailStyles = `:root{Color-scheme:light dark;supported-color-schemes:light dark}img{border:none;-ms-interpolation-mode:bicubic;max-width:100%}table{border-spacing:0;border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%}table td{font-family:sans-serif;vertical-align:top}a,h1,h2,h3,h4,p,span,td{color:#343434;font-family:sans-serif;font-weight:400;line-height:1.4;margin:0;margin-bottom:20px}h1{margin-top:20px;font-size:35px;text-transform:capitalize}h2{font-size:24px}p{margin-bottom:15px;font-size:16px}a{text-decoration:underline;cursor:pointer;margin-bottom:15px;font-size:16px}a.btn-primary{width:auto;border-radius:30px;display:inline-block;font-size:14px;font-weight:700;margin:0;padding:12px 25px;margin-bottom:20px;text-decoration:none;text-transform:capitalize;border:none;background:linear-gradient(0deg,#0053c0,#0053c1);color:#fff;box-sizing:border-box}a.btn-primary:hover{background:linear-gradient(0deg,#006eff,#006efe)!important}.body,body{background-color:#fff;font-family:sans-serif;-webkit-font-smoothing:antialiased;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}.container{display:block;box-sizing:border-box;margin:0 auto!important;max-width:580px;padding:10px;width:100%}.footer,.footer a,.footer span{font-size:12px;text-align:center;padding:20px 0}.preheader{color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0}@media all{.ExternalClass{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}.apple-link a{color:inherit!important;font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;text-decoration:none!important}#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}}{extraStyles}`;
const htmlTemplate = `<!doctype html><html><head> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="color-scheme" content="light dark"> <meta name="supported-color-schemes" content="light dark"> <title>{title}</title> <style>${emailStyles}</style></head><body class=""> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td><td class="container">{formattedElements}<p class="footer"> <span class="apple-link">{domain}</span> <br>Please don't reply to these emails. If you have any questions, <a href="mailto:${EmailUserNames.contact}@{domain}">Contact us.</a> </p></td><td>&nbsp;</td></tr></table></body></html>`;

export enum EmailElements {
  button = 'button',
  link = 'link',
  h1 = 'h1',
  h2 = 'h2',
  text = 'text',
  html = 'html',
}
type Button = {
  type: EmailElements.button;
  href: string;
  text: string;
};
type Link = {
  type: EmailElements.link;
  href: string;
  text: string;
};
type H1 = {
  type: EmailElements.h1;
  text: string;
};
type H2 = {
  type: EmailElements.h2;
  text: string;
};
type Text = {
  type: EmailElements.text;
  text: string;
};
type Html = {
  type: EmailElements.html;
  html: string;
};
type Element = Button | Link | H1 | H2 | Text | Html;

type CreateEmailProps = {
  title: string;
  elements: Element[];
  extraStyles?: string;
  domain: string;
};

export const createEmail = ({
  title,
  elements,
  extraStyles = '',
  domain,
}: CreateEmailProps) => {
  const formattedElements = elements
    .map((element) => {
      switch (element.type) {
        case EmailElements.button:
          return `<a class='btn btn-primary' target='_blank' href='${element.href}'>${element.text}</a>`;
        case EmailElements.link:
          return `<a target='_blank' href='${element.href}'>${element.text}</a>`;
        case EmailElements.h1:
          return `<h1>${element.text}</h1>`;
        case EmailElements.h2:
          return `<h2>${element.text}</h2>`;
        case EmailElements.text:
          return `<p>${element.text}</p>`;
        case EmailElements.html:
          return element.html;
        default:
          return '';
      }
    })
    .join('');
  return htmlTemplate
    .replace(/{extraStyles}/g, extraStyles)
    .replace(/{title}/g, title)
    .replace(/{domain}/g, domain)
    .replace(/{formattedElements}/g, formattedElements);
};
