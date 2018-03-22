import { readYamlFile } from './tools/tools';

class USSD {
  filePath: string;
  screenValues: any;
  ussdPath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  async run(body, callback) {
    this.ussdPath = body;
    try {
      const values = await readYamlFile(this.filePath);
      this.screenValues = values;
      console.log(this.ussdPath);
      return callback(null, `Welcome`);
    } catch (error) {
      return callback(error.message, null);
    }
  }
}
export default USSD;
