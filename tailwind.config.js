/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#135bec",
                "background-light": "#F5F5F5",
                "background-dark": "#101622",
                "card-light": "#ffffff",
                "card-dark": "#222222",
                "text-light": "#000000",
                "text-dark": "#f5f5f5",
                "text-muted-light": "#555555",
                "text-muted-dark": "#aaaaaa",
                "accent-light": "#0000FF",
                "accent-dark": "#FFFF00",
                "neobrutal-accent": "#FFFF00",
                "neobrutal-border-light": "#000000",
                "neobrutal-border-dark": "#f5f5f5",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            boxShadow: {
                'neobrutalist-shadow': '4px 4px 0px 0px #000000',
                'neobrutalist-shadow-sm': '2px 2px 0px 0px #000000',
                'neobrutal-light': '4px 4px 0px 0px #000000',
                'neobrutal-dark': '4px 4px 0px 0px #135bec', /* Updated from Settings snippet */
            }
        },
    },
    plugins: [],
}