export interface Detail {
  key: number;
  fileName: string;
  filePath: string;
  parentFolder: string;
  fileExtension: string;
  fileSize: number;
  createdDate: Date;
  modifiedDate: Date;
  selected?: boolean;
  isRequired: boolean;
  id: number;
  [key: string]: any; // Index signature to allow string indexing
}
export interface ConfigDetail {
  name: string;
  value: string;
  scope: string;
  type: string;
  selected?: boolean;
  isRequired: boolean;
  isEditing: boolean;
  id: number;
}