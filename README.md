[![make.fun](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/ASEP9929/makefun-ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/ASEP9929/makefun-ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01)

# Sky Koi — make.fun ai-excited-01

A colossal koi swimming through the sky above golden rice terraces at
sunset. Its orange-and-white body sweeps one huge S-curve across the
frame, a comet tail of water streaming behind it, the low sun glowing
right behind its head while birds scatter below. A fish where no fish
belongs — impossible scale, frozen mid-leap, warm gold against deep
teal. One look, one jolt, and the shape still reads at thumbnail size:
the whole idea is the surprise (a river fish crossing the sky) and the
momentum (the arc of the body, the water trailing behind it, the sun
pulling the eye to the head).

## The entry

The image is `entry.png`: a JPEG, 1024x683 pixels, 218,219 bytes —
inside the competition limits (at most 1 MiB, at most 1024x1024 pixels).

## How it works

`main.ts` (Node 22, standard library only) reads `entry.png`, checks
it is a whole JPEG (SOI `FF D8` at the start, EOI `FF D9` at the end),
and writes those exact bytes to `$MAKEFUN_OUTPUT_DIR/entry.png`
(`/output` in the grader). After writing it reads the copy back and
verifies the byte count and the JPEG markers again, so a short or
interrupted write fails loudly instead of handing the judge a
truncated picture.

## Check it yourself

```sh
mkdir -p out1 out2
MAKEFUN_OUTPUT_DIR=out1 node main.ts
MAKEFUN_OUTPUT_DIR=out2 node main.ts
sha256sum out1/entry.png out2/entry.png
# both runs write identical bytes
```

## License

MIT — see LICENSE.
