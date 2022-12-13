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
  "1": [
    "Rect",
    {
      width: 70,
      height: 70,
    },
  ],
  "2": [
    "Rect",
    {
      width: 50,
      height: 50,
      angle: 45,
    },
  ],
  "3": [
    "Path",
    "M rX rY C rX+2.76 rY rX+5.00 rY+2.24 rX+5.00 rY+5.00 L rX+5.00 rY+52.50 Q rX-20.00 rY+39.00 rX-45.00 rY+52.50 Q rX-70.00 rY+66.00 rX-95.00 rY+52.50 L rX-95.00 rY+7.50 L rX-95.00 rY+5.00 C rX-95.00 rY+2.24 rX-92.76 rY rX-90.00 rY Z",
  ],
  "4": [
    "Ellipse",
    {
      rx: 50,
      ry: 30,
    },
  ],
  "5": [
    "Path",
    "M rX rY L rX+38.78 rY C rX+55.68 rY rX+69.39 rY+13.43 rX+69.39 rY+30.00 C rX+69.39 rY+46.57 rX+55.68 rY+60.00 rX+38.78 rY+60.00 L rX rY+60.00 C rX-16.90 rY+60.00 rX-30.61 rY+46.57 rX-30.61 rY+30.00 C rX-30.61 rY+13.43 rX-16.90 rY rX rY Z",
  ],
  "6": ["Path", "M rX rY L rX+46.00 rY L rX+73.00 rY+30.00 L rX+46.00 rY+60.00 L rX rY+60.00 L rX-27.00 rY+30.00 Z"],
  "7": [
    "Path",
    "M rX rY C rX rY-2.76 rX+2.28 rY-5.00 rX+5.09 rY-5.00 L rX+80.41 rY-5.00 C rX+92.35 rY+0.38 rX+100.00 rY+12.10 rX+100.00 rY+25.00 C rX+100.00 rY+37.90 rX+92.35 rY+49.62 rX+80.41 rY+55.00 L rX+5.09 rY+55.00 C rX+2.28 rY+55.00 rX rY+52.76 rX rY+50.00 L rX rY Z",
  ],
  "8": [
    [
      "Ellipse",
      {
        rx: 35,
        ry: 35,
      },
    ],
    ["Path", "M rX+10.00 rY+60.00 L rX+60.00 rY+10.00"],
    ["Path", "M rX+10.00 rY+10.00 L rX+60.00 rY+60.00"],
  ],
  "9": [
    [
      "Ellipse",
      {
        rx: 35,
        ry: 35,
      },
    ],
    ["Path", "M rX+35 rY L rX+35 rY+70"],
    ["Path", "M rX rY+35 L rX+70 rY+35"],
  ],
  "10": [
    "Path",
    "M rX rY L rX+61.22 rY L rX+80.61 rY+20.00 L rX+80.61 rY+55.00 C rX+80.61 rY+57.76 rX+78.33 rY+60.00 rX+75.51 rY+60.00 L rX-14.29 rY+60.00 C rX-17.11 rY+60.00 rX-19.39 rY+57.76 rX-19.39 rY+55.00 L rX-19.39 rY+20.00 L rX rY Z",
  ],
  "11": [
    "Path",
    "M rX rY L rX-32.50 rY Q rX-38.50 rY rX-36.35 rY-5.60 L rX-17.65 rY-54.40 Q rX-15.50 rY-60.00 rX-9.50 rY-60.00 L rX+55.50 rY-60.00 Q rX+61.50 rY-60.00 rX+59.35 rY-54.40 L rX+40.65 rY-5.60 Q rX+38.50 rY rX+32.50 rY Z",
  ],
  "12": [
    [
      "Path",
      "M rX rY L rX rY-40.00 C rX rY-45.52 rX+13.43 rY-50.00 rX+30.00 rY-50.00 C rX+46.57 rY-50.00 rX+60.00 rY-45.52 rX+60.00 rY-40.00 L rX+60.00 rY C rX+60.00 rY+5.52 rX+46.57 rY+10.00 rX+30.00 rY+10.00 C rX+13.43 rY+10.00 rX rY+5.52 rX rY Z",
    ],
    [
      "Path",
      "M rX rY-40.00 C rX rY-34.48 rX+13.43 rY-30.00 rX+30.00 rY-30.00 C rX+46.57 rY-30.00 rX+60.00 rY-34.48 rX+60.00 rY-40.00",
    ],
  ],
  "13": [
    "Path",
    "M rX rY L rX+89.11 rY C rX+89.64 rY+0.57 rX+89.64 rY+1.43 rX+89.11 rY+2.00 C rX+85.11 rY+6.46 rX+82.47 rY+17.59 rX+82.47 rY+30.00 C rX+82.47 rY+42.41 rX+85.11 rY+53.54 rX+89.11 rY+58.00 C rX+89.64 rY+58.57 rX+89.64 rY+59.43 rX+89.11 rY+60.00 L rX rY+60.00 C rX-5.72 rY+60.00 rX-10.36 rY+46.57 rX-10.36 rY+30.00 C rX-10.36 rY+13.43 rX-5.72 rY rX rY Z",
  ],
  "14": [
    [
      "Rect",
      {
        width: 70,
        height: 70,
      },
    ],
    ["Path", "M rX rY+15 L rX+70 rY+15"],
    ["Path", "M rX+15 rY L rX+15 rY+70"],
  ],
  "15": [
    [
      "Path",
      "M rX rY L rX+81.64 rY C rX+86.71 rY rX+90.82 rY+13.43 rX+90.82 rY+30.00 C rX+90.82 rY+46.57 rX+86.71 rY+60.00 rX+81.64 rY+60.00 L rX rY+60.00 C rX-5.07 rY+60.00 rX-9.18 rY+46.57 rX-9.18 rY+30.00 C rX-9.18 rY+13.43 rX-5.07 rY rX rY Z",
    ],
    [
      "Path",
      "M rX+81.64 rY C rX+76.56 rY rX+72.45 rY+13.43 rX+72.45 rY+30.00 C rX+72.45 rY+46.57 rX+76.56 rY+60.00 rX+81.64 rY+60.00",
    ],
  ],
  "16": [
    [
      "Ellipse",
      {
        rx: 50,
        ry: 50,
      },
    ],
    ["Path", "M rX+50 rY+100.00 L rX+100.00 rY+100.00"],
  ],
  "17": ["Path", "M rX rY L rX+80.00 rY L rX+80.00 rY+60.00 L rX-20.00 rY+60.00 L rX-20.00 rY+20.00 Z"],
  "18": [
    "Path",
    "M rX rY Q rX+25.00 rY+11.11 rX+50.00 rY Q rX+75.00 rY-11.12 rX+100.00 rY L rX+100.00 rY+52.64 Q rX+75.00 rY+41.53 rX+50.00 rY+52.64 Q rX+25.00 rY+63.76 rX rY+52.64 L rX rY Z",
  ],
  "19": [
    "Path",
    "M rX rY C rX+8.26 rY-15.12 rX+22.71 rY-26.04 rX+39.69 rY-30.00 L rX+80.41 rY-30.00 C rX+92.35 rY-24.62 rX+100.00 rY-12.90 rX+100.00 rY C rX+100.00 rY+12.90 rX+92.35 rY+24.62 rX+80.41 rY+30.00 L rX+39.69 rY+30.00 C rX+22.71 rY+26.04 rX+8.26 rY+15.12 rX rY Z",
  ],
  "20": [
    "Path",
    "M rX rY L rX-44.50 rY Q rX-50.00 rY rX-50.00 rY-5.50 L rX-50.00 rY-28.50 Q rX-50.00 rY-34.00 rX-44.68 rY-35.38 L rX+44.68 rY-58.62 Q rX+50.00 rY-60.00 rX+50.00 rY-54.50 L rX+50.00 rY-5.50 Q rX+50.00 rY rX+44.50 rY Z",
  ],
  "21": ["Path", "M rX rY L rX+23.00 rY-60.00 L rX+77.00 rY-60.00 L rX+100.00 rY Z", { angle: 180 }],
  "22": [
    "Path",
    "M rX rY L rX+87.68 rY C rX+89.11 rY+0.02 rX+90.25 rY+0.56 rX+90.81 rY+1.49 C rX+91.38 rY+2.42 rX+91.33 rY+3.66 rX+90.67 rY+4.92 L rX+45.83 rY+58.99 C rX+44.70 rY+59.99 rX+42.98 rY+59.99 rX+41.85 rY+58.99 L rX-2.99 rY+4.92 C rX-3.61 rY+3.61 rX-3.65 rY+2.35 rX-3.08 rY+1.41 C rX-2.51 rY+0.48 rX-1.40 rY-0.03 rX rY Z",
  ],
  "23": [
    "Path",
    "M rX rY L rX+87.68 rY C rX+89.11 rY-0.02 rX+90.25 rY-0.56 rX+90.81 rY-1.49 C rX+91.38 rY-2.42 rX+91.33 rY-3.66 rX+90.67 rY-4.92 L rX+45.83 rY-58.99 C rX+44.70 rY-59.99 rX+42.98 rY-59.99 rX+41.85 rY-58.99 L rX-2.99 rY-4.92 C rX-3.61 rY-3.61 rX-3.65 rY-2.35 rX-3.08 rY-1.41 C rX-2.51 rY-0.48 rX-1.40 rY+0.03 rX rY Z",
  ],
  "24": [
    "Path",
    "M rX rY C rX+1.86 rY+0.02 rX+3.34 rY+0.64 rX+3.95 rY+1.65 C rX+4.56 rY+2.66 rX+4.25 rY+3.95 rX+3.09 rY+5.10 L rX-93.99 rY+94.90 C rX-95.15 rY+96.05 rX-95.46 rY+97.34 rX-94.85 rY+98.35 C rX-94.24 rY+99.36 rX-92.76 rY+99.98 rX-90.90 rY+100.00 L rX rY+100.00 C rX+1.86 rY+99.98 rX+3.34 rY+99.36 rX+3.95 rY+98.35 C rX+4.56 rY+97.34 rX+4.25 rY+96.05 rX+3.09 rY+94.90 L rX-93.99 rY+5.10 C rX-95.15 rY+3.95 rX-95.46 rY+2.66 rX-94.85 rY+1.65 C rX-94.24 rY+0.64 rX-92.76 rY+0.02 rX-90.90 rY L rX rY Z",
  ],
  "25": [
    [
      "Path",
      "M rX rY L rX+46.94 rY+46.94 C rX+47.58 rY+47.42 rX+47.96 rY+48.18 rX+47.96 rY+48.98 C rX+47.96 rY+49.78 rX+47.58 rY+50.54 rX+46.94 rY+51.02 L rX rY+97.96 C rX-0.48 rY+98.60 rX-1.24 rY+98.98 rX-2.04 rY+98.98 C rX-2.84 rY+98.98 rX-3.60 rY+98.60 rX-4.08 rY+97.96 L rX-51.02 rY+51.02 C rX-51.66 rY+50.54 rX-52.04 rY+49.78 rX-52.04 rY+48.98 C rX-52.04 rY+48.18 rX-51.66 rY+47.42 rX-51.02 rY+46.94 L rX-4.08 rY C rX-3.60 rY-0.64 rX-2.84 rY-1.02 rX-2.04 rY-1.02 C rX-1.24 rY-1.02 rX-0.48 rY-0.64 rX rY Z",
    ],
    ["Path", "M rX-50 rY+50 L rX+50.00 rY+50"],
  ],
  "26": [
    "Ellipse",
    {
      rx: 50,
      ry: 50,
    },
  ],
  "27": ["Path", "M rX rY L rX+60.00 rY L rX+60.00 rY+30.00 L rX+30.00 rY+60.00 L rX rY+30.00 Z"],
  "28": [
    [
      "Rect",
      {
        width: 100,
        height: 60,
      },
    ],
    ["Path", "M rX+14.00 rY L rX+14.00 rY+60.00 M rX+86.00 rY L rX+86.00 rY+60.00"],
  ],
  "29": [
    [
      "Path",
      "M rX rY L rX+5.05 rY+5.00 L rX rY+10.00 L rX-5.05 rY+5.00 L rX rY Z M rX-20.21 rY L rX-15.16 rY+5.00 L rX-20.21 rY+10.00 L rX-25.27 rY+5.00 L rX-20.21 rY Z M rX+20.21 rY L rX+25.27 rY+5.00 L rX+20.21 rY+10.00 L rX+15.16 rY+5.00 L rX+20.21 rY Z",
      {
        fill: "#ffff00",
      },
    ],
    ["Path", "M rX-47.50 rY-15.00 L rX+47.50 rY-15.00"],
    ["Path", "M rX-47.50 rY+25.00 L rX+47.50 rY+25.00"],
  ],
  "30": [
    "Path",
    "M rX-50.50 rY-201.00 L rX+9.50 rY-201.00 L rX+9.50 rY-222.00 L rX+49.50 rY-187.00 L rX+9.50 rY-152.00 L rX+9.50 rY-173.00 L rX-50.50 rY-173.00 L rX-50.50 rY-187.00 Z",
  ],
  "31": [
    "Path",
    "M rX rY L rX-50.00 rY L rX-50.00 rY+100.00 L rX rY+100.00",
    {
      fill: "rgba(250,250,250,0)",
    },
  ],
  "32": [
    ["Path", "M rX rY L rX+53.63 rY"],
    [
      "Path",
      "M rX+58.88 rY L rX+51.88 rY+3.50 L rX+53.63 rY L rX+51.88 rY-3.50 Z",
      {
        fill: "#000000",
      },
    ],
  ],
  "33": [
    ["Path", "M rX rY L rX+47.26 rY"],
    [
      "Path",
      "M rX-5.25 rY L rX+1.75 rY-3.50 L rX rY L rX+1.75 rY+3.50 Z",
      {
        fill: "#000000",
      },
    ],
    [
      "Path",
      "M rX+52.51 rY L rX+45.51 rY+3.50 L rX+47.26 rY L rX+45.51 rY-3.50 Z",
      {
        fill: "#000000",
      },
    ],
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
