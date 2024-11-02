export interface IBase {
    id: string;
    created_date_unix_timestamp: number;
    updated_at_unix_timestamp: number;
    deleted_date?: Date;
    [key :string] : any;
}