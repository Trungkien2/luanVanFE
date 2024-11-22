export interface Ibase {
  id: string;
  created_at_unix_timestamp?: number;
  updated_at_unix_timestamp?: number;
  deleted_at?: string;
  [key: string]: unknown;
}
