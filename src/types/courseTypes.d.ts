export interface CourseDTO {
  courseId: string;
  name: string;
  price: string;
  description?: string;
}
export interface CourseContentDTO {
  courseId: string;
  step: string;
  content: string;
  contentType: string;
}
