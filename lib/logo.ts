/**
 * EventPro Seating mark, rebuilt as vector paths from the supplied logo so the
 * splash can animate each shape. Colors sampled from the original artwork.
 * viewBox: 0 0 1540 480
 */
export const LOGO_ORANGE = "#f4a62a";
export const LOGO_SAND = "#e9d3b0";

export const logoPaths = {
  e1: "M85 0 H535 L450 120 H0 Z",
  e2: "M85 175 H495 L410 295 H0 Z",
  e3: "M85 350 H455 L370 470 H0 Z",
  // P: slanted top-left edge, round bowl, stem. Counter cut with evenodd.
  p: "M565 0 H900 A135 135 0 0 1 900 270 H665 V470 H520 V122 H490 Z M669 120 H861 A29 29 0 0 1 861 178 H669 A29 29 0 0 1 669 120 Z",
  // S: two loops + slanted bottom-left end.
  s: "M1520 0 H1220 A150 150 0 0 0 1220 300 H1360 A30 30 0 0 1 1360 360 H850 L760 480 H1360 A150 150 0 0 0 1360 180 H1220 A30 30 0 0 1 1220 120 H1520 Z",
};
