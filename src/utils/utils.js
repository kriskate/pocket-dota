// to-do - add some kind of error popup to inform about this
export const connectionIssue = () => console.log('Internet might be down');

export const parseCategory = category => category.split(' ').join('_').toLowerCase();


const r_trailingBR = /(<br\s*\/>)+$/;
const r_beginingBR = /(^<br\s*\/>)+/;
const r_whitespaceBR = /(<br\s*\/> )/g;
export const trimAbilities = (htmlContent) =>
  htmlContent.trim().replace(r_whitespaceBR, '<br/>')
  .replace(r_trailingBR, '')
  .replace(r_beginingBR, '');
