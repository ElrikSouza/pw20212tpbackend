export const cachedProperty = (source) => {
  let property = null;

  return async () => {
    if (property != null) {
      return property;
    }

    property = await source();

    return property;
  };
};
