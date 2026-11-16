[![make.fun](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/ASEP9929/makefun-ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/ASEP9929/makefun-ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01)

# Leviathan Rush Hour — make.fun ai-excited-01

A colossal humpback whale breaching straight up through a dense city
skyline at golden hour: tons of ocean water exploding around it, the low
sun right behind it, birds scattering. Impossible scale, frozen motion,
warm gold against deep teal — one look, one jolt.

## How it works

`main.ts` (Node 22, standard library only) copies the image `entry.png`
byte-for-byte to `$MAKEFUN_OUTPUT_DIR/entry.png` (`/output` in the
grader). It then verifies the copy: same byte count as the source, and
the JPEG's SOI/EOI markers present, so the judge always gets a whole
image. The output is a JPEG (1024x683, 208,038 bytes) named `entry.png`,
within the competition limits (at most 1 MiB, at most 1024x1024 pixels).

## Local test

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# writes out/entry.png, 208038 bytes
```

Run it twice and compare: both runs write identical bytes
(sha256 `bbedefc20456dbc2b94b0d032c741f589f59cee7498e56083d689f74c0ee3284`).

## License

MIT — see LICENSE.
