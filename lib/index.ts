import { readYamlFile } from './tools/tools';
import { CustomErrors } from './tools/errors';
import { YamlValues } from './tools/types';

class USSD {
  filePath: string;
  screenValues: any;
  ussdPath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async setUp() {
    // load yaml file
    try {
      const values = await readYamlFile(this.filePath);
      this.screenValues = values;
      return await this.validateYamlValues(values);
    } catch (error) {
      throw new Error(error);
    }
  }
  async run(body, callback) {
    try {
      const validMessage: string = await this.setUp();
      if (validMessage === 'valid') {
        this.ussdPath = body;
        return callback(null, `Welcome`);
      } else {
        return callback(validMessage, null);
      }
    } catch (error) {
      if (error instanceof CustomErrors) {
        const { message, stage } = error;
        return callback({ message, stage }, null);
      }
      return callback(error.message, null);
    }
  }

  validateYamlValues(values): Promise<string> {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(values);
      const initialScreenExists = keys.find(
        names => names === 'initial_screen'
      );
      if (initialScreenExists === undefined)
        reject(
          new CustomErrors('An initial_screen is required', 'yaml_validation')
        );
      return resolve(`valid`);
    });
  }
}
export default USSD;
