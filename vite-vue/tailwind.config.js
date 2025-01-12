module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        spacing: {
            '20': '20px'
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
    content: [
        "./node_modules/flowbite/**/*.js"
    ]
}
