<script lang="ts" setup>
import { Analytics } from "@vercel/analytics/nuxt";

useHead({
  title: "Helium Travel",
  meta: [
    { name: "description", content: "Một trang lưu trữ nhật ký du lịch nhanh và nhẹ viết bằng Nuxt" },
    { name: "author", content: "Noah Trần" },
    { name: "creator", content: "Noah Trần" },
    { name: "keywords", content: "Travel,Nuxt,Pinia,AWS,S3,DaisyUI,Du lịch,Notes,Nhật ký" },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    { rel: "shortcut icon", href: "/favicon-16x16.png" },
    { rel: "author", href: "https://github.com/Coder-Blue" },
  ],
});

useSeoMeta({
  ogTitle: "Helium Travel",
  ogDescription: "Một trang lưu trữ nhật ký du lịch nhanh và nhẹ viết bằng Nuxt",
  ogLocale: "vi_VN",
  ogUrl: "https://helium-travel.vercel.app",
  ogSiteName: "Helium Travel",
  ogImage: "https://i.ibb.co/NnyBW5rS/helium-og.png",

  twitterCard: "summary_large_image",
  twitterTitle: "Helium Travel",
  twitterDescription: "Một trang lưu trữ nhật ký du lịch nhanh và nhẹ viết bằng Nuxt",
  twitterCreator: "@sh1ro_code",
  twitterImage: "https://i.ibb.co/NnyBW5rS/helium-og.png",
});
</script>

<template>
  <Analytics />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
