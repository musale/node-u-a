import { readYamlFile, validateInitialScreen } from './tools/tools';

class USSD {
  filePath: string;
  yamlContent: any;
  ussdPath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async run(body, callback) {
    const { text } = body;
    this.ussdPath = text;
    try {
      const yamlContent = await readYamlFile(this.filePath);
      this.yamlContent = yamlContent;
      if (this.ussdPath === '') {
        await validateInitialScreen(this.yamlContent);
        return callback(null, 'Welcome');
      }
      return callback(null, this.ussdPath);
    } catch (error) {
      return callback(new Error(error), null);
    }
  }
}

export default USSD;
