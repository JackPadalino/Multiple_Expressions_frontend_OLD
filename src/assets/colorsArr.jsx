const colorsArr = [
  { primary: "#3A7D49", secondary: "#cedfd2" }, // green
  { primary: "#4C5081", secondary: "#d2d3e0" }, //grey
  { primary: "#E34028", secondary: "#f8cfc9" }, // red
  { primary: "#EAA128", secondary: "#fae8c9" }, // yellow
  { primary: "#E0745F", secondary: "#f7dcd7" }, // salmon
];

export default colorsArr;

// algorithm to generate lightened hex codes - change percentage in coloredObjects below
// function lightenHexColor(hex, percent) {
//     // Convert hex to RGB
//     const hexToRgb = (hex) =>
//       hex
//         .replace(/^#/, "")
//         .match(/.{1,2}/g)
//         .map((value) => parseInt(value, 16));

//     // Convert RGB to hex
//     const rgbToHex = (r, g, b) =>
//       "#" +
//       [r, g, b]
//         .map((value) => Math.round(value).toString(16).padStart(2, "0"))
//         .join("");

//     // Adjust lightness
//     const rgbColor = hexToRgb(hex);
//     const lightenedRgbColor = rgbColor.map((value) =>
//       Math.min(255, value + (255 - value) * (percent / 100))
//     );

//     return rgbToHex(...lightenedRgbColor);
//   }

//   // Convert hex codes to objects with "primary" and "secondary" keys
//   const coloredObjects = colorsArr.map((hex) => ({
//     primary: hex,
//     secondary: lightenHexColor(hex, 75), // You can adjust the percentage as needed
//   }));
