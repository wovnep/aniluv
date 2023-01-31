![banner](https://i.imgur.com/UY0Iv7x.png)

<h4 align="center"> Modern, Lightweight anime streaming application for Windows, Linux and MacOS </h4>

---

<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/wovnep/aniluv/release.yml?style=plastic)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/wovnep/aniluv)
![GitHub](https://img.shields.io/github/license/wovnep/aniluv)

</div>

![screenshot](https://i.imgur.com/3ceUpAh.png)

## Features

Aniluv is still under development. These are the features currently available on the app.

-   Watch anime (Tv shows, Movies, etc.)
-   Choose between gogoanime and crunchyroll ([more](https://github.com/wovnep/aniluv#crunchyroll-vs-gogoanime))
-   Connect Anilist and manage your anime list (Login to see manage option below player)
-   Supports Windows, Linux and macOS
-   Search and view anime info
-   Get trending/popular releases
-   Low memory usage, achieved by using rust on the backend (Tauri)

## Crunchyroll vs Gogoanime

If you can understand English just stick with Gogoanime. It's the most reliable anime provider, Or if you want other languages subtitles (depending on the anime), go with Crunchyroll. The Crunchyroll option bit slower to load anime, but after that you are fine.

## Download

-   Download the latest version from [here](https://github.com/wovnep/aniluv/releases/latest). Make sure to select the right package based on your operating system.

## Build

The first step is to install [Rust](https://www.rust-lang.org)

### Windows

-   Install C++ Build tools and Windows 10 SDK from [Visual Studio](https://visualstudio.microsoft.com/visual-cpp-build-tools)
-   Windows 10 users must install [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section). WebView2 is pre-installed in Windows 11.

### macOS

-   Install Clang and macOS dev dependencies

```
xcode-select --install
```

### Linux

-   Install C compiler and webkit2gtk

```
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

After dependency installation proceeds with the commands below.

```
git clone https://github.com/wovnep/aniluv.git

npm install
```

## Development

#### Build

```
npm run tauri build
```

#### Dev

```
npm run tauri dev
```

#### Prettify

```
npm run prettier
```

## Thanks to

Check out these amazing projects.

-   [Tauri](https://tauri.app/)
-   [Svelte](https://svelte.dev/)
-   [Tailwindcss](https://tailwindcss.com/)
-   [Consumet](https://github.com/consumet)
-   [Anilist](https://anilist.co/)

## More

-   [Discord](https://discord.gg/6uvyxGnNnp)

## License

MIT License
