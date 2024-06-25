/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        screen: "100dvh",
        carousel: "90%",
        "carousel-low": "85%",
        "carousel-phone": "88%"
      },
      animation: {
				fade: 'fadeIn 1s ease-in',
				"fade-out": 'fadeOut 1s ease-out',
			},
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
        fadeOut: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
			},
      screens: {
        "smart-phone": "470px",
        "low-phone": "520px",
        phone: "700px",
        medium: "920px"
      }
    },
  },
  
  plugins: [],
}

