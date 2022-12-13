const selfX = null;
const selfY = null;

// 根据 path 转换为 自定义path
const copyPath = (str: string): string => {
  const arr = str.split(" ");
  let x = selfX || arr[1];
  let y = selfY || arr[2];
  let count = 0;
  const res = arr
    .reduce((init, val, index) => {
      if (["M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z"].includes(val)) {
        count = 0;
      } else {
        count += 1;
        if (count % 2 == 1) val = "rX" + (+val - +x > 0 ? "+" : "") + (+val - +x != 0 ? (+val - +x).toFixed(2) : "");
        if (count % 2 == 0) val = "rY" + (+val - +y > 0 ? "+" : "") + (+val - +y != 0 ? (+val - +y).toFixed(2) : "");
      }
      init.push(val);
      return init;
    }, [])
    .join(" ");
  console.log(res);
  return res;
};

export default {
  copyPath,
};
