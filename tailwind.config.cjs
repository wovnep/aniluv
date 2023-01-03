/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                background: "#181818",
                menu: "#212121",
                hover: "#3D3D3D",
                darker: "#0A0A0A",
                accent: "#FF007F",
                accent_hover: "#FF3399",
            },
        },
        fontFamily: {
            sans: ["Quicksand"],
        },
    },
    plugins: [],
};
