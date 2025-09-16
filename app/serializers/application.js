import RESTSerializer from "@ember-data/serializer/rest"

function underscore(string) {
  return String(string).replace(/[A-Z]/g, (m) => "_" + m.toLowerCase())
}

export default class ApplicationSerializer extends RESTSerializer {
  keyForAttribute(attr) {
    return underscore(attr)
  }

  keyForRelationship(key) {
    return underscore(key)
  }
}
