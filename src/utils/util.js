// 고유 key 생성
export const createKey = () => {
  return new Date().getTime().toString();
};

// JSON to QueryString
export const jsonToQs = (obj) => {
  let qs = "";
  if (obj) {
    qs = `?${Object.entries(obj)
      .map((row) => row.join("="))
      .join("&")}`;
  }
  return qs;
};
