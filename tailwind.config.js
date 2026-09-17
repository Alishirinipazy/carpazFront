/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9'
            },
            colors:{
                mainColor:'#e10f1f',
                secColor:'#050B20',
                cosColor:'#FF4C4C',
                darkColor:'#1C1B22',
                neonColor:'rgba(44,44,44,0)',
                test:{
                    main:'#e10f1f',
                    back:'#BBBBBB',
                    backBtn:'#BBBBBB',
                }
            }
        }
    }
};