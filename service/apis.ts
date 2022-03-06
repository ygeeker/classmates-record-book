import { AdminLoginRequestBody } from '../pages/api/admin/login';
import { CreateStudentRequestBody } from '../pages/api/student';
import service from './axios';

export class API {
  static async createStudent(body: CreateStudentRequestBody) {
    return await service.post('/student', body);
  }
  static async adminLogin(body: AdminLoginRequestBody) {
    return await service.post<{ token: string }>('/admin/login', body);
  }
  static async adminInit() {
    return await service.get('/admin/init');
  }
}
