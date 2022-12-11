// 根据 path 转换为 自定义path
export function copyPath(str: string): string {
  const arr = str.split(" ");
  let x = arr[1];
  let y = arr[2];
  let count = 0;
  const res = arr
    .reduce((init, val, index) => {
      if (index == 1) val = "rX";
      if (index == 2) val = "rY";
      if (["Z"].includes(val)) count += 1;
      if (index > 2 && !["M", "L", "Z"].includes(val)) {
        if ((index - count) % 3 == 1)
          val = "rX" + (+val - +x > 0 ? "+" : "") + (+val - +x != 0 ? (+val - +x).toFixed(2) : "");
        if ((index - count) % 3 == 2)
          val = "rY" + (+val - +y > 0 ? "+" : "") + (+val - +y != 0 ? (+val - +y).toFixed(2) : "");
      }
      init.push(val);
      return init;
    }, [])
    .join(" ");
  console.log(res);
  return res;
}
