export interface OrthographyResponse {
  data: {
    result: string;
    accuracy: number;
    message: string;
    errors: string[];
  };
}
