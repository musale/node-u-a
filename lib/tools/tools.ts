import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
/**
 * Read the contents of a YAML file
 *
 * @function yaml
 * @param {string}                filename - the full system path to a YAML file
 */
export function readYamlFile(filename: string) {
  return new Promise((resolve, reject) => {
    try {
      const yamlString: string = readFileSync(filename, 'utf8');
      resolve(safeLoad(yamlString, { filename }));
    } catch (e) {
      reject(e);
    }
  });
}

export function validateInitialScreen(values: any): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    const keys = Object.keys(values);
    const initialScreenExists = keys.find(name => name === 'initial_screen');
    if (!initialScreenExists) return reject('initial_screen must be included');
    const initialNextScreenName = values['initial_screen'];
    const nextScreen = keys.find(name => name === initialNextScreenName);
    if (!nextScreen)
      return reject(
        `initial_screen has ${initialNextScreenName} as next screen which must be included`
      );
    try {
      await validateNextScreen(initialNextScreenName, values[nextScreen]);
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
}

export function validateNextScreen(
  screenName: string,
  values: any
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (values['type'] !== 'quit_screen' && !values['type'])
      return reject(`screen type must be included in the screen ${screenName}`);
    if (!values['text'])
      return reject(`screen text must be included in the screen ${screenName}`);
    return resolve();
  });
}
