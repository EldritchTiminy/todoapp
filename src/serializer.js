function serialize (obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "function") {
      return value.toString();
    }
    return value;
  });
};

function revive (obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(revive);
  };

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      if (
        value.startsWith("function") ||
        value.startsWith("(") ||
        value.startsWith("async ")
      ) {
        try {
          obj[key] = new Function('return ' + value)();
        } catch {};
      };
    } else if (typeof value === "object") {
      obj[key] = revive (value);
    };
  };

  return obj;
};

function deserialize (str) {
  const parsed = JSON.parse(str);
  return revive(parsed);
};

export {serialize, revive, deserialize};