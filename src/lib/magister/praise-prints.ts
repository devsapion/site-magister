import fs from "node:fs";
import path from "node:path";

/** Screenshot of a compliment (platform, support chat, social media) shown in "Quem usa aprova!". */
export interface PraisePrint {
  src: string;
  width: number;
  height: number;
}

/** Drop the prints in `public/<PRINTS_DIR>`; they are listed by file name. */
const PRINTS_DIR = "sites/magister/home/elogios";

type Size = { width: number; height: number };

/** Reads the pixel size from the file header so every print keeps its box before it loads. */
function readSize(buffer: Buffer, ext: string): Size | null {
  switch (ext) {
    case ".png":
      return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    case ".jpg":
    case ".jpeg": {
      let offset = 2;
      while (offset + 9 < buffer.length) {
        if (buffer[offset] !== 0xff) return null;
        const marker = buffer[offset + 1];
        // Start-of-frame markers carry the size (C4, C8 and CC share the range but are not frames).
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
        }
        offset += 2 + buffer.readUInt16BE(offset + 2);
      }
      return null;
    }
    case ".webp": {
      const chunk = buffer.toString("ascii", 12, 16);
      if (chunk === "VP8 ") {
        return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
      }
      if (chunk === "VP8L") {
        const bits = buffer.readUInt32LE(21);
        return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
      }
      if (chunk === "VP8X") {
        return { width: buffer.readUIntLE(24, 3) + 1, height: buffer.readUIntLE(27, 3) + 1 };
      }
      return null;
    }
    case ".svg": {
      const viewBox = buffer.toString("utf8").match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/);
      return viewBox ? { width: Number(viewBox[1]), height: Number(viewBox[2]) } : null;
    }
    default:
      return null;
  }
}

/** Every print in the folder, read at build time (the home is prerendered). */
export function getPraisePrints(): PraisePrint[] {
  const dir = path.join(process.cwd(), "public", PRINTS_DIR);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }))
    .flatMap((file) => {
      const size = readSize(fs.readFileSync(path.join(dir, file)), path.extname(file).toLowerCase());
      return size ? [{ src: `/${PRINTS_DIR}/${encodeURIComponent(file)}`, ...size }] : [];
    });
}
