import { CreateStudentRequestBody } from '../pages/api/student';
import service from './axios';

export class API {
  static async createStudent(body: CreateStudentRequestBody) {
    await service.post('/student', body);
  }
}
