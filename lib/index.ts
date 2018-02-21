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
    const values = await readYamlFile(this.filePath);
    this.screenValues = values;
    console.log(this.ussdPath);
    return callback(`Welcome`);
  }
}
export default USSD;
