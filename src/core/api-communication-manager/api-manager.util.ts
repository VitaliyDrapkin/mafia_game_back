export const ApiManagerUtil = {
  paramMapToObject(paramMap: Map<string, any>): object {
    const paramObject: object = {};
    if (paramMap) {
      for (const [key, value] of paramMap) {
        paramObject[key] = value;
      }
    }
    return paramObject;
  },
};
