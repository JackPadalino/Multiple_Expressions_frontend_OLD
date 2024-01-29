// we can generate an array of placeholder peaks that will load and cutdown on wave
// form loading time
const arrayLength = 200;

const pattern = [0, 0.25, 0.5, 1, 0.5, 0.25];

// generating an array of placeholder peaks for the waveform component
const placeholderPeaks = Array.from(
  { length: arrayLength },
  (_, index) => pattern[index % pattern.length]
);

export default placeholderPeaks;
