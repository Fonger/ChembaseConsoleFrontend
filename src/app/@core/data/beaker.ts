export interface Beaker {
  id: string;
  rule: ACLRule;
}

export interface ACLRule {
  list: String;
  get: string;
  update: string;
  create: string;
  delete: string;
}
