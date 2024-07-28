import util from 'util';

export const stringifySafe = (obj: any, replacer: any = null, space: number = 0): string => {
  return JSON.stringify(util.inspect(obj), replacer, space);
};
