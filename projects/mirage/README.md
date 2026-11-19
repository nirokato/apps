# mirage

Drop in a photo and see what the [Mirage](https://huggingface.co/Cactus-Compute/mirage) vision model finds in it: a scene summary, named objects with boxes and outlines, readable text, and how the objects relate. Inference runs in the browser through WebAssembly; the image is never uploaded.

**Live:** [mirage.apps.andymolenda.com](https://mirage.apps.andymolenda.com)

## Files

| File | What it is |
|------|------------|
| `index.html` | The page: image input, canvas overlays, result lists |
| `worker.js` | Web Worker that loads the engine and weights and runs `cactus_describe` |
| `vendor/cactus.js`, `vendor/cactus.wasm` | Cactus runtime 4.1.4, WebAssembly build, unmodified |
| `vendor/LICENSE.txt` | Apache-2.0 license for the runtime |

The weights (`mirage.cact`, 21.6 MB) are fetched from Hugging Face at a pinned commit on first use, checked against a SHA-256 in `worker.js`, and kept in Cache Storage.

## Updating

- **Engine:** copy `cactus.js` and `cactus.wasm` from `releases/<version>/wasm/` in [Cactus-Compute/cactus](https://huggingface.co/Cactus-Compute/cactus) and check them against that release's `manifest.json`. 4.1.4: `cactus.js` `707341e4…dfc70c`, `cactus.wasm` `fae56a5a…7d3be0`.
- **Weights:** change `url`, `size` and `sha256` in `worker.js` together.

## Run locally

```
python3 -m http.server 8000
```

## Credits

The engine and weights are by [Cactus Compute](https://github.com/cactus-compute/cactus), Apache-2.0. The idea comes from [Joe Maddalone's mirage-demo](https://github.com/joemaddalone/mirage-demo); this page is written from scratch.
