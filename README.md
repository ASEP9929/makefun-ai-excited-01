[![make.fun](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/ASEP9929/makefun-ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/ASEP9929/makefun-ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01)

# The Night Lantern — make.fun ai-excited-01

A paper lantern the size of a house drifts low over a sleeping forest
at night, tilted a little by the wind, its warm light spilling over
the treetops. A thin red string trails down from its tassel to a tiny
child standing on the hill, one arm raised, holding on — and beside
the child a little house glows with a single lit window, while small
fireflies answer the lantern's light from the trees below. The whole
jolt is the scale: a festival lantern big enough to light a forest,
flown like a kite by someone small enough to disappear under it.
Warm amber against deep indigo, one huge round shape, and the idea
still reads at thumbnail size: light, held on a string.

## The entry

The image is `entry.png`: a JPEG, 1024x1024 pixels, 90,689 bytes —
inside the competition limits (at most 1 MiB, at most 1024x1024 pixels).
It was drawn procedurally in this session (Python/PIL, no stock photo
or copied artwork): sky, stars, lantern, string, child, house and
forest are all shapes and gradients this entry's own code laid down.

## How it works

`main.ts` (Node 22, standard library only) reads `entry.png` and
checks it before writing anything: at most 1 MiB, a whole JPEG (SOI
`FF D8` at the start, EOI `FF D9` at the end), and dimensions read
from its SOF frame within 1024x1024. It then writes those exact bytes
to `$MAKEFUN_OUTPUT_DIR/entry.png` (`/output` in the grader), reads
the copy back, and verifies the bytes and the JPEG markers again, so
a short or interrupted write fails loudly instead of handing the
judge a truncated picture.

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
