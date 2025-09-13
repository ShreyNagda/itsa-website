import { MediaItem } from "./supabase/types";

// Accepts absolute http(s) URLs or root-relative paths like "/path/to/file".
function isValidUrlLike(url: unknown): url is string {
  if (typeof url !== "string" || url.trim().length === 0) return false;
  if (url.startsWith("http://") || url.startsWith("https://")) return true;
  if (url.startsWith("/")) return true;
  return false;
}

export function isMediaItem(value: any): value is MediaItem {
  return (
    value &&
    (value.type === "image" || value.type === "video") &&
    typeof value.title === "string" &&
    isValidUrlLike(value.url)
  );
}

export function validateMediaItems(input: unknown): {
  valid: MediaItem[];
  errors: string[];
} {
  const errors: string[] = [];
  if (!Array.isArray(input)) {
    return { valid: [], errors: ["Media data is not an array"] };
  }
  const valid: MediaItem[] = [];
  input.forEach((item, idx) => {
    if (isMediaItem(item)) {
      valid.push(item);
    } else {
      errors.push(`Invalid media item at index ${idx}`);
    }
  });
  return { valid, errors };
}

// Tiny helper suitable for manual checks in dev tools or scripts.
export function testMediaInput(input: unknown): string {
  const { valid, errors } = validateMediaItems(input);
  return `valid=${valid.length} errors=${errors.length}${
    errors.length ? ` -> ${errors.join(", ")}` : ""
  }`;
}
