# local-fonts

https://local-fonts.ssssota.dev

Preview fonts installed on your computer. (via [Local Font Access API](https://developer.mozilla.org/docs/Web/API/Local_Font_Access_API))

You can also view font information. (via [ttf-parser](https://github.com/RazrFalcon/ttf-parser) + WASM)

## Screenshots

|Preview and search|View font details|
|---|---|
|![Preview](https://user-images.githubusercontent.com/15074382/211305227-a1b1d278-299b-4f2f-8fb2-8eead8b0f996.png)|![local-fonts ssssota dev_ (1)](https://user-images.githubusercontent.com/15074382/211305399-64859a79-7587-403d-b20e-fd22d6439ad5.png)|

## Development

### Requirements

- [Node.js](https://nodejs.org/) v16↑
- [rustup](https://www.rust-lang.org/tools/install) (Rust, Cargo)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)

### Setup

```sh
git clone https://github.com/ssssota/local-fonts.git
cd local-fonts
corepack enable
pnpm install
```

### Development

```sh
pnpm wasm
pnpm dev
```

### Build

```sh
pnpm wasm
pnpm build
```
