const NodeEnvironment = require('jest-environment-node');

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    const baseUrl = 'https://raw.githubusercontent.com/kriskate/dota-data/master/';
    const dataInfo = await fetch(`${baseUrl}info.json`);
    const data = {}
    // do data
    this.global.wikidata = data;
  }

  async teardown() {
    this.global.wikidata = destroyGlobalObject();
    await someTeardownTasks();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;