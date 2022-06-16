
export const symbolsMatchFromStart = (source: string, input: string): boolean => {
  if (!source || !input) return false;
  const inputArr = input.toLowerCase().trim().split('');
  const sourceArr = source.toLowerCase().trim().split('');
  let response = true;
  for (let i = 0; i < sourceArr.length; i++) {
    const sourceSymbol = sourceArr[i];
    for (let j = 0; j < inputArr.length; j++) {
      const inputSymbol = inputArr[i];
      if (!inputSymbol) {
        return true;
      }
      if (inputSymbol !== sourceSymbol) {
        return false;
      } else {
        break;
      }
    }
  }
  return response;
};

