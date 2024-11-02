import { IBase } from "./base.interface";

export interface IPost extends IBase {
    user_id: number;
    title: string;
    body: string;
    media: string;
    status: string;

  }