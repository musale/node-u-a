import { readYamlFile, validateInitialScreen } from './tools/tools';

class USSD {
  filePath: string;
  yamlContent: any;
  ussdPath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async run(body, callback) {
    try {
      const yamlContent = await readYamlFile(this.filePath);
      this.yamlContent = yamlContent;
      await validateInitialScreen(this.yamlContent);
      return callback(null, 'Welcome');
    } catch (error) {
      return callback(new Error(error), null);
    }
  }
}

export default USSD;
