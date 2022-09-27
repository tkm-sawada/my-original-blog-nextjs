/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // オリジナルブルー
        'original-blue': '#080059',
        'original-gray': '#EAEAEA',
      },
      fontFamily: {
        body: [
          'Lato',
          '游ゴシック体',
          'Yu Gothic',
          'YuGothic',
          'ヒラギノ角ゴシック Pro',
          'Hiragino Kaku Gothic Pro',
          'メイリオ',
          'Meiryo',
          'ＭＳ Ｐゴシック',
          'MS PGothic',
          'sans-serif'
        ]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
