export class Beaker {
  id: string
  rule: {
    list: String
    get: string
    update: string
    create: string
    delete: string,
  }
  hello() {
    return this.id + '-hello'
  }
}
