import dayjs from 'dayjs';

export const removeFirstSlash = (path: string) => (path[0] === '/' ? path.slice(1) : path);

export const getEmailFromString = (str: string) => {
  const regex =
    /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  let email = '';
  const matches = regex.exec(str);
  if (matches) email = matches[0];
  return email;
};

export const toCamelCase = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.?)/g, (m, chr) => chr.toUpperCase());
};

export const toCamelCaseKey = (obj: object) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCaseKey(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toCamelCase(key)]: toCamelCaseKey(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

export const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .map((word) => word.toLowerCase())
    .join('_');
};

export const toSnakeCaseKey = (obj: object) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCaseKey(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [toSnakeCase(key)]: toSnakeCaseKey(obj[key]),
      }),
      {}
    );
  }

  return obj;
};

export function formatMoney(
  amount: string | number = 0,
  decimalCount = 2,
  decimal = '.',
  thousands = ','
) {
  decimalCount = Math.abs(decimalCount);
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

  const negativeSign = Number(amount) < 0 ? '-' : '';

  const i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
  const j = i.length > 3 ? i.length % 3 : 0;

  return (
    negativeSign +
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
    (decimalCount
      ? decimal +
        Math.abs(Number(amount) - Number(i))
          .toFixed(decimalCount)
          .slice(2)
      : '')
  );
}
export function parseTime(date: Date | string, dateFormat = 'YYYY-MM-DD') {
  return dayjs(date).format(dateFormat);
}

export const phoneRegex = new RegExp(/^(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export function applyAlphaToColorHex(hexColor: string, alpha = 1) {
  const red = parseInt(hexColor.substring(1, 3), 16);
  const green = parseInt(hexColor.substring(3, 5), 16);
  const blue = parseInt(hexColor.substring(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function shuffleArray(array: number[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function generateRandomArray() {
  const initialArray = Array.from({ length: 12 }, (_, index) => index);
  return shuffleArray(initialArray);
}

export function scaleSize(
  newSize: number,
  originalSize: { width: number; height: number },
  type: 'height' | 'width' = 'height'
) {
  if (type !== 'height') {
    return Math.floor((newSize * originalSize.width) / originalSize.height);
  }
  return Math.floor((newSize * originalSize.height) / originalSize.width);
}
