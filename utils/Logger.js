export default Logger = {
  log: (...args) => console.log(...args),
  silly: (...args) => console.log('---', ...args),
  debug: (...args) => console.log(...args),
  error: (...args) => console.log(...args),
}