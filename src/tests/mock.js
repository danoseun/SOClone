import { dataFactory } from './factory'

/**
 * Factory method for generating new records with specified attributes
 * @param {Array<String>} attributes - Attributes that needs to be present on a new record
 * @returns {Object}
 */
const record = attributes => {
  let generatedRecord = {}

  attributes.forEach(attribute => generatedRecord = {...generatedRecord, [attribute]: dataFactory(attribute)})
    console.log('ATT', attributes);
  return generatedRecord
}

export default record