// to-do - add some kind of error popup to inform about this
export const connectionIssue = () => console.log('Internet might be down');

export const parseCategory = category => category.split(' ').join('_').toLowerCase();

// to-do - move all these in the backend parser
const r_trailingBR = /(<br\s*\/>)+$/;
const r_beginingBR = /(^<br\s*\/>)+/;
const r_whitespaceBR = /(<br\s*\/> )/g;
const r_doubleBRandN = /(<br><br>\r\n)/g; // arc warden
const r_doubleN = /(\\n\\n)/g; // oracle
const r_nt = /(\n\t\t)/g; // luna
const r_rn = /(\r\n)/g; // oracle
const r_tt = /(\t\t)/g; // oracle
const r_slash3 = /(\\\")/g; // oracle
const r_percent2 = /(%%)/g; // oracle
const r_slash2n = /(\\n)/g; // invoker
export const trimAbilities = (htmlContent) =>
  htmlContent.trim().replace(r_whitespaceBR, '<br/>')
  .replace(r_nt, '<br/><br/>')
  .replace(r_doubleBRandN, '<br/><br/>')
  .replace(r_tt, '')
  .replace(r_rn, '<br/><br/>')
  .replace(r_doubleN, '<br/><br/>')
  .replace(r_trailingBR, '')
  .replace(r_beginingBR, '')
  .replace(r_slash3, '\"')
  .replace(r_percent2, '%')
  .replace(r_slash2n, '')




export const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
