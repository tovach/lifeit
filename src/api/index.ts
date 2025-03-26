export const makeOperation = (
  value: number,
  additional: number
): Promise<number> =>
  new Promise<number>((resolve, reject) => {
    const isOk = Math.random() < 0.9;
    setTimeout(() => {
      if (isOk) {
        resolve(value + additional);
      } else {
        reject(new Error("Ой что-то беку поплохело"));
      }
    }, 1000);
  });
