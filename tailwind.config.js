// Gera tailwind.css: npx tailwindcss@3.4.17 -i tailwind.input.css -o tailwind.css --minify
module.exports = {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                dark: '#0d0d0d',
                gold: '#D9B250',
                white: '#ffffff',
                gray: '#CFCFCF',
                accent: '#E53F3F'
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif']
            }
        }
    }
}
