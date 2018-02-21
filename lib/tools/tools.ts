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
