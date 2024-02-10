import { CONSTANTS } from "../config/config";
import { endpoints } from "../config/endpoints.api";

export const proConStreamUseCase = async (prompt: string) =>
  // : IStream<IProConStreamResponse>
  {
    const errorMessage = "No se pudo realizar la comparación de pros y contras";
    try {
      const resp = await fetch(
        `${CONSTANTS.API_GPT_URL}${endpoints.proCon.stream}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );
      if (!resp.ok) throw new Error(errorMessage);
      //     const { data }:  = await resp.json();
      //     return {
      //       ok: true,
      //       ...data,
      //     };
    } catch (error) {
      //     return {
      //       ok: false,
      //       message: errorMessage,
      //       error,
      //     };
    }
  };
