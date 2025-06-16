export const timeLimitSeconds = (time: string): number => {
  const [h = "0", m = "0", s = "0"] = time.split(":");
  return time ? parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) : 0;
};
export const secondsToTime = (totalSeconds: number) => {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export const formatTimeString = (
  time: string,
  hourTitle: string,
  minTitle: string,
  secTitle: string,
  plural: string,
  secondsTitle: string
): string => {
  const [rawH, rawM, rawS] = time.split(":");

  const h = parseInt(rawH, 10);
  const m = parseInt(rawM, 10);
  const s = parseInt(rawS, 10);

  const parts = [];
  if (h > 0) parts.push(`${h} ${hourTitle}${h !== 1 ? plural : ""}`);
  if (m > 0) parts.push(`${m} ${minTitle}${m !== 1 ? plural : ""}`);
  if (s > 0) parts.push(`${s} ${secTitle}${s !== 1 ? plural : ""}`);

  return parts.length > 0 ? parts.join(" ") : secondsTitle;
};
