let counter = 0;

export const generateId = (): string => {
  counter += 1;
  return `toast-${Date.now()}-${counter}`;
};

export const classNames = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
