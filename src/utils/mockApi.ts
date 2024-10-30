export const shareToX = async (text: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success
  if (text.length <= 140) {
    console.log('Shared to X:', text);
    return Promise.resolve();
  }
  
  return Promise.reject(new Error('Text exceeds 140 characters'));
}