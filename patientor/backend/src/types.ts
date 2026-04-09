export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; // Dấu '?' vì trường này có thể không có
}
