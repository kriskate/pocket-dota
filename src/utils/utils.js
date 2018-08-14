// to-do - add some kind of error popup to inform about this
export const connectionIssue = () => console.log('Internet might be down');


const r_trailingBR = new RegExp(/(<br\s*\/>)+$/);
const r_whitespaceBR = new RegExp(/(<br\s*\/> )/, 'g');
export const trimAbilities = (htmlContent) =>
  htmlContent.trim().replace(r_whitespaceBR, '<br/>').replace(r_trailingBR, '');