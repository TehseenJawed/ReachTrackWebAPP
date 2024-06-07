/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      screens: {
        'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '2000px',
      // => @media (min-width: 2000px) { ... }

      },
      extend: {
        fontFamily: {
          'segoeui': ['segoeui','sans-serif'],
        },
        boxShadow: {
          'card': '0 0px 15px 2px #00000020',
        },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
        }
      },
      colors: {
        primary: '#4285F4',
        // primary: '#4682B4',
        bgColor: '#F5F5F5',
        danger: '#FF0000',
        darkGray: '#606060',
        success: '#34A853',
        textColor: '#7C7B7B',
        bgActive: '#E0E0E0',
        cardborder: '#F1F2F6',
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#fff',
        'black': '#000',
        'card': '#F5F5F5',
        'green-light': '#0DBF61',
        'orange-light': '#FF7100',
        'gray-light': '#B7B7B7',
        'gray-extralight': '#efefef',
        'gray-darklight': '#C4C4C4',
        'blue-light': '#3584E9',
        'blue-extralight': '#5C86F3',
        'blue-extralight-hover': '#7CA0FC',
      },
    },
    plugins: [],
  }
  