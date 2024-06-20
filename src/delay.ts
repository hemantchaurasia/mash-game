export function delayForTwoSeconds(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }