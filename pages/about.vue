<script setup>
const itemsSlider = {
  image: '/images/img_5.png',
}
</script>
<template>
  <LayoutsHeader/>

  <GlobalSlider :items="itemsSlider" h="lg:h-[40vh] h-[30vh]"/>
  <u-container>
    <div class="relative w-full">
      <div class="absolute -top-36 z-20 w-full flex justify-center" >
        <img class="border-amber-50 w-8/12 lg:w-4/12  border-2 rounded-2xl" src="/images/abote.png" alt="درباره ما">
      </div>
    </div>
      <div class="pt-32 w-full flex flex-col items-center">
      <h3 class="font-extrabold text-mainColor text-right text-2xl pt-2 w-3/4"> سلام سلامی به گرمی خواندن این متن :)</h3>
      <p class="border-mainColor leading-10 lg:text-xl p-3 m-3  border-2 subpixel-antialiased lg:w-8/12 border-dashed rounded-2xl"> ماجرای ما از علاقه به دنیای خودرو شروع شد؛ از دیدن اینکه چقدر پیدا کردن یه خودروی مناسب، نو یا کارکرده، می‌تونه سخت و پر از عدم‌اطمینان باشه. برای همین با عشق تیمی رو جمع کردیم تا یه پلتفرم شفاف و قابل‌اعتماد برای خرید خودرو بسازیم؛ جایی که مشتری با خیال راحت خودروی موردنظرش رو پیدا کنه و یه کارشناس واقعی باهاش تماس بگیره، نه یک فرآیند خودکار و بی‌روح. <span class="text-mainColor text-xl font-bold"> با عشق در کنار شما تا لحظه‌ی تحویل خودرو</span></p>
      </div>

  </u-container>
  <LayoutsFooter/>
</template>

