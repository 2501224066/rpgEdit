// 图形绘制数据
export const txJoinData = {
  "0": [
    "Circle",
    {
      radius: 40,
    },
  ],
  "01": [
    "Ellipse",
    {
      rx: 50,
      ry: 30,
    },
  ],
  "1": [
    "Triangle",
    {
      width: 80,
      height: 70,
    },
  ],
  "2": [
    "Rect",
    {
      width: 70,
      height: 70,
    },
  ],
  "21": [
    "Rect",
    {
      width: 80,
      height: 50,
    },
  ],
  "22": ["Path", "M rX rY L rX+25 rY+50 L rX rY+100 L rX-25 rY+50 Z"],
  "23": ["Path", "M rX rY L rX+70 rY L rX+50 rY+60 L rX-20 rY+60 Z"],
  "24": ["Path", "M rX rY L rX+50 rY L rX+70 rY+60 L rX-20 rY+60 Z"],
  "3": ["Path", "M rX rY L rX-17.16 rY-51.3 L rX+27.83 rY-81 L rX+72.83 rY-51.3 L rX+55.67 rY Z"],
  "31": [
    "Path",
    "M rX rY L rX+30.67 rY L rX+40.03 rY-27.89 L rX+49.38 rY L rX+80.05 rY L rX+55.61 rY+18.67 L rX+65.30 rY+48.16 L rX+40.03 rY+29.91 L rX+14.75 rY+48.16 L rX+24.44 rY+18.67 Z",
  ],
  "4": ["Path", "M rX rY L rX+41.55 rY L rX+61.55 rY+34.50 L rX+41.55 rY+69.00 L rX rY+69.00 L rX-20.00 rY+34.50 Z"],
  "5": [
    "Path",
    "M rX rY L rX+40.00 rY L rX+70.00 rY+30.00 L rX+70.00 rY+70.00 L rX+40.00 rY+100.00 L rX rY+100.00 L rX-30.00 rY+70.00 L rX-30.00 rY+30.00 Z",
  ],
  "6": [
    "Path",
    "M rX rY L rX+34.00 rY L rX+34.00 rY-34.00 L rX+64.00 rY-34.00 L rX+64.00 rY L rX+98.00 rY L rX+98.00 rY+30.00 L rX+64.00 rY+30.00 L rX+64.00 rY+64.00 L rX+34.00 rY+64.00 L rX+34.00 rY+30.00 L rX rY+30.00 Z",
  ],
  "61": [
    "Path",
    "M rX rY L rX+34.00 rY L rX+34.00 rY-34.00 L rX+64.00 rY-34.00 L rX+64.00 rY L rX+98.00 rY L rX+98.00 rY+30.00 L rX+64.00 rY+30.00 L rX+64.00 rY+64.00 L rX+34.00 rY+64.00 L rX+34.00 rY+30.00 L rX rY+30.00 Z",
    { angle: 45 },
  ],
};

// 流程图数据
export const flowJoinData = {
  "0": [
    "Rect",
    {
      width: 70,
      height: 70,
    },
  ],
  "1": [
    "Rect",
    {
      width: 50,
      height: 50,
      angle: 45,
    },
  ],
};

// 特殊图形绘制数据
export const tsTxJoinData = {
  "9": [
    [
      "Path",
      "M rX rY L rX+74.32 rY L rX+74.32 rY+37.06 L rX rY+37.06 Z M rX+74.30 rY+28.12 L rX+76.20 rY+18.66 L rX+80.06 rY+36.86 L rX+83.94 rY+18.66 L rX+87.80 rY+36.86 L rX+91.68 rY+18.66 L rX+95.54 rY+36.86 L rX+97.62 rY+27.62 M rX+18.44 rY+9.26 L rX+18.44 rY-0.08 M rX+23.44 rY+9.26 L rX+13.22 rY+9.26 M rX+18.44 rY+27.82 L rX+18.44 rY+36.96 M rX+13.38 rY+27.82 L rX+23.46 rY+27.82 M rX+37.22 rY+0.02 L rX+37.22 rY+37.08 M rX+55.64 rY+55.48 L rX+55.64 rY+37.06 M rX+55.64 rY+27.26 L rX+55.64 rY+9.74 M rX+55.64 rY-0.08 L rX+55.64 rY-19.12 M rX-18.86 rY+37.18 L rX-9.42 rY+18.30 M rX+0.02 rY+37.06 L rX-27.92 rY+37.06 L rX-27.92 rY+18.46 L rX rY+18.46",
    ],
    [
      "Path",
      "M rX+58.90 rY+27.32 L rX+52.38 rY+27.32 L rX+55.64 rY+36.62 Z M rX+58.90 rY+9.70 L rX+52.38 rY+9.70 L rX+55.64 rY+0.40 Z",
      {
        fill: "#000",
      },
    ],
  ],
  "99": [
    "Path",
    "M rX rY L rX+13.80 rY+27.58 M rX rY+37.16 L rX+13.98 rY+9.58 M rX+18.58 rY-0.14 L rX+18.58 rY-18.90 M rX-46.32 rY+37.16 L rX-74.26 rY+37.16 L rX-74.26 rY+18.56 L rX-46.34 rY+18.56 M rX-65.20 rY+37.26 L rX-55.76 rY+18.40 M rX-37.18 rY+37.14 L rX-37.18 rY+10.86 M rX-18.56 rY+26.38 L rX-18.56 rY+0.16 M rX-9.12 rY+0.12 L rX-9.12 rY+37.16 M rX+0.04 rY-0.14 L rX+0.04 rY-18.90 M rX rY+55.58 L rX rY+37.16 M rX+18.56 rY+55.58 L rX+18.56 rY+37.16 M rX+27.96 rY+28.22 L rX+29.86 rY+18.76 L rX+33.72 rY+36.96 L rX+37.60 rY+18.76 L rX+41.46 rY+36.96 L rX+45.34 rY+18.76 L rX+49.20 rY+36.96 L rX+51.28 rY+27.72 M rX-46.34 rY+0.10 L rX+27.98 rY+0.10 L rX+27.98 rY+37.16 L rX-46.34 rY+37.16 Z",
  ],
};
