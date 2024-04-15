const wordEllipsis = (text: string, wordsCountLimit: number) => {
  if (!text) {
    return "";
  }
  let tab = text.split(" ");
  let res = [];
  for (let i = 0; i < wordsCountLimit; i++) {
    res.push(tab[i] || "");
  }

  return res.join(" ").trim();
};

const textEllipsis = (text: string, lettersCount: number, endText?: string) => {
  if (!text) {
    return "";
  }
  if (text.length < lettersCount) {
    return text;
  }
  return text.slice(0, lettersCount) + (endText || "");
};

const capitalizeWord = (str?: string) => {
  if (str === "" || !str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeSentence = (sentence: string) => {
  if (sentence === "") {
    return sentence;
  }

  const words = sentence.split(" ");
  const capitalizedWords = words.map((word) => capitalizeWord(word));
  const result = capitalizedWords.join(" ");

  return result;
};

export { wordEllipsis, textEllipsis, capitalizeSentence, capitalizeWord };
