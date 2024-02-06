export interface IOrthographyResponse {
  data: {
    result: string;
    accuracy: number;
    message: string;
    errors: string[];
  };
}
