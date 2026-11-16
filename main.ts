// ai-excited-01 — "Sky Koi"
// A colossal koi arcs through the sky above golden rice terraces at
// sunset, dragging a comet tail of water behind it: a fish where no fish
// belongs, frozen mid-leap with the sun at its head. The picture is the
// whole entry; this program only carries it to where the grader looks.
//
// Node 22, standard library only. Deterministic: the output is the exact
// bytes of the image beside this file, so two runs always produce the
// same file at /output/entry.png and the judge never sees a half-written
// picture. The bytes are read and checked before anything is written, so
// a corrupt source fails loudly instead of handing the judge a broken
// image.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const IMAGE_NAME = 'entry.png';

// Where the picture goes, and where it comes from.
function locate() {
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const here = new URL('.', import.meta.url).pathname;
  return {
    sourcePath: join(here, IMAGE_NAME),
    targetPath: join(targetDir, IMAGE_NAME),
    targetDir,
  };
}

// A whole JPEG opens with SOI (FF D8) and closes with EOI (FF D9).
// Anything missing either end is not the picture the judge should see.
function isWholeJpeg(bytes) {
  return (
    bytes.length >= 4 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[bytes.length - 2] === 0xff &&
    bytes[bytes.length - 1] === 0xd9
  );
}

function deliver() {
  const { sourcePath, targetPath, targetDir } = locate();

  if (!existsSync(sourcePath)) {
    throw new Error(`missing source image: ${sourcePath}`);
  }

  const picture = readFileSync(sourcePath);
  if (!isWholeJpeg(picture)) {
    throw new Error('entry.png is not a whole JPEG: SOI/EOI markers missing');
  }

  mkdirSync(targetDir, { recursive: true });
  writeFileSync(targetPath, picture);

  // Confirm the write landed whole: same bytes back, still a whole JPEG.
  const written = readFileSync(targetPath);
  if (written.length !== picture.length) {
    throw new Error(
      `entry.png copy incomplete: wrote ${written.length} of ${picture.length} bytes`,
    );
  }
  if (!isWholeJpeg(written)) {
    throw new Error('entry.png copy is not a whole JPEG after writing');
  }
}

deliver();
