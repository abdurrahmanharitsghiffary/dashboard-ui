export interface ApiMeta {
  version: 'v1';
  modelName: string;
  modelPrimaryColumn: string;
  modelPrimaryTData: string;
  allowedModelMethods?: string[];
  columns: ApiMetaCol[];
}

export enum FormType {
  INPUT,
  TEXTAREA,
  SELECT,
  NONE,
}

export interface ApiMetaCol {
  colName: string;
  colModelName: string;
  colModelType: string;
  colType: string;
  formType: FormType;
  selectOptions?: string[];
  zodChainValidation: string[];
}
