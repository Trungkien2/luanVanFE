
import axiosClient from '@/config/axiosClient';
import { APIGetParams } from './apiUlti';


export default class BaseAPI {
  private router: string = '';
  constructor(router: string) {
    this.router = router;
  }
  public getList = async (params: APIGetParams) =>
    await axiosClient.get(this.router, {
      params,
    });

  public findOne = async (id: string, params: APIGetParams) =>
    await axiosClient.get(this.router + '/' + id, {
      params,
    });

  public create = async (payload: any) =>
    await axiosClient.post(this.router, payload);

  public delete = async (id: string) =>
    await axiosClient.delete(this.router + '/' + id);

  public update = async (id: string, payload: any) =>
    await axiosClient.put(this.router + '/' + id, payload);

  getRouter() {
    return this.router;
  }
}
