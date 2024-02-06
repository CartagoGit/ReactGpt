export const orthographyUseCase = async (prompt: string) => {
  try {
    console.log(prompt);
  } catch (error) {
    return {
      ok: true,
      accuracy: 0,
      error: [],
      message: "No se pudo realizar la correción ortográfica",
    };
  }
};
