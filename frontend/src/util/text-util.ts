export function getWordCount(text : string) : number {
    // Remove leading and trailing whitespace
    const trimmedText = text.trim();
  
    // If the trimmed text is empty, there are no words
    if (!trimmedText) {
      return 0;
    }
  
    // Split the text into an array of words using spaces as delimiters
    const words = trimmedText.split(/\s+/).filter(Boolean);
  
    // Return the number of words
    return words.length;
  }