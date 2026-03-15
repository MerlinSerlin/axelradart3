export function formatTitleForURL(title: string): string {
  return title.replace(/\s+/g, '-').toLowerCase();
}

export function formatCollectionName(name: string): string {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export function capitalizeFirstLetterOfEachWord(input: string): string {
  return input
    .split(' ')
    .map(word => {
      if (word.startsWith('(')) {
        return '(' + word.charAt(1).toUpperCase() + word.slice(2);
      }
      if (word.toLowerCase() === 'ii') return 'II';
      if (word.toLowerCase() === 'iii') return 'III';
      if (word.toLowerCase() === 'iv') return 'IV';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
