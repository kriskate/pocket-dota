// to-do - add some kind of error popup to inform about this
export const connectionIssue = () => console.log('Internet might be down');


const r_trailingBR = /(<br\s*\/>)+$/;
const r_whitespaceBR = /(<br\s*\/> )/g;
export const trimAbilities = (htmlContent) =>
  htmlContent.trim().replace(r_whitespaceBR, '<br/>').replace(r_trailingBR, '');