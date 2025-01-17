import { http, HttpResponse } from "msw";

export interface IHelloWorldResponse {
  welcome: string;
}

export const getHelloMock = http.get<never, IHelloWorldResponse>(
  "http://localhost:8080/hello",
  async () => {
    return HttpResponse.json({
      welcome: "Hello World",
    });
  }
);
