// ai-excited-01 — "The Night Lantern"
// A paper lantern the size of a house drifts low over a sleeping forest,
// its string trailing down to a tiny child on the hill. The picture is
// the whole entry: this program only carries it, byte for byte, to where
// the grader looks. It never draws, crops or recompresses anything, so
// the judge always sees exactly the image in this repository.
//
// Node 22, standard library only. Two runs must write the same bytes,
// so the program checks the source before writing and the copy after
// writing, and fails loudly on any mismatch instead of handing the
// judge a truncated picture.
//
// Local check:
//   mkdir -p out1 out2
//   MAKEFUN_OUTPUT_DIR=out1 node main.ts
//   MAKEFUN_OUTPUT_DIR=out2 node main.ts
//   sha256sum out1/entry.png out2/entry.png   # identical

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FILE = 'entry.png';
const MAX_BYTES = 1_048_576; // 1 MiB, the competition limit
const MAX_SIDE = 1024; // pixels, the competition limit

function fail(message: string): never {
  throw new Error(`entry.png rejected: ${message}`);
}

// A whole JPEG opens with SOI (FF D8) and closes with EOI (FF D9).
// Anything missing either end is not the picture the judge should see.
function checkWholeJpeg(bytes: Buffer): void {
  if (bytes.length < 4) fail('too short to be a JPEG');
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) fail('missing SOI marker FF D8');
  if (bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
    fail('missing EOI marker FF D9');
  }
}

// Read width x height from the first SOF frame (baseline or progressive).
// Walks the JPEG markers; returns null only for a file with no SOF at all.
function readDimensions(bytes: Buffer): { width: number; height: number } | null {
  let pos = 2; // past SOI
  while (pos + 9 < bytes.length) {
    if (bytes[pos] !== 0xff) {
      pos += 1;
      continue;
    }
    const marker = bytes[pos + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      pos += 2;
      continue;
    }
    const length = bytes.readUInt16BE(pos + 2);
    if (length < 2 || pos + 2 + length > bytes.length) return null;
    if (
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc
    ) {
      return {
        height: bytes.readUInt16BE(pos + 5),
        width: bytes.readUInt16BE(pos + 7),
      };
    }
    pos += 2 + length;
  }
  return null;
}

function paths(): { source: string; target: string; dir: string } {
  // An empty MAKEFUN_OUTPUT_DIR means the same as unset: fall back.
  const dir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const here = new URL('.', import.meta.url).pathname;
  return { source: join(here, FILE), target: join(dir, FILE), dir };
}

function main(): void {
  const { source, target, dir } = paths();

  if (!existsSync(source)) fail(`source image missing: ${source}`);
  const picture = readFileSync(source);

  if (picture.length > MAX_BYTES) {
    fail(`${picture.length} bytes exceeds the 1 MiB limit`);
  }
  checkWholeJpeg(picture);
  const size = readDimensions(picture);
  if (size === null) fail('no SOF frame found; not a decodable JPEG');
  if (size.width > MAX_SIDE || size.height > MAX_SIDE) {
    fail(`dimensions ${size.width}x${size.height} exceed ${MAX_SIDE}x${MAX_SIDE}`);
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(target, picture);

  // Confirm the copy landed whole: same bytes back, still a whole JPEG.
  const written = readFileSync(target);
  if (!written.equals(picture)) {
    fail(`copy mismatch: wrote ${written.length} of ${picture.length} bytes`);
  }
  checkWholeJpeg(written);
}

main();
