---
title: "Avtorizatsiyasiz endpoint jimgina bazaga murojaat qilganda"
summary: "Kim soʻrayotganini tekshirishdan oldin javob beradigan endpoint — xato qaytarsa ham, muammodir. Xato taymingi, inyeksiya yuzasi va huquqlarni tekshirish tartibi haqida."
date: 2026-09-25
cat: "Web / API"
lang: uz
key: unauthenticated-endpoint-database
---

Maxsus API marshruti POST soʻrovni qabul qilar, argumentlarni qayta ishlashni boshlar, maʼlumotlar bazasiga yetib borar va *keyingina* yiqilardi — bir necha soniyadan soʻng 500 qaytarib. Bunga yetib borish uchun avtorizatsiya talab qilinmasdi. Bu — “u shunchaki xato bilan toʻxtaydi-ku” degan fikr koʻringanchalik tinchlantiruvchi emasligi haqidagi anonimlashtirilgan eslatma.

## Xatoning oʻzi — topilma

Bazaga murojaatdan *keyin* yiqiladigan endpoint sizga allaqachon bir necha narsani aytib boʻldi:

- **Avtorizatsiya juda kech bajariladi yoki umuman bajarilmaydi.** Chaqiruvchining shaxsini tekshirishdan oldin bazaga yetib borish — kirish haqidagi qaror nozik ish boshlanganidan keyin qabul qilinishini anglatadi. Aynan shu tartib — xato, endpoint bugun nima qaytarishidan qatʼi nazar.
- **Inyeksiya yuzasi bor.** Agar avtorizatsiyasiz kiritma soʻrovga baza darajasida xato keltirib chiqaradigan darajada chuqur yetib borsa, savol endi kiritma soʻrovga *yetadimi* degan savol emas — u parametrlanganmi degan savol. 500 dan oldingi ~3 soniya kechikish — server hujumchi nazoratidagi maʼlumot ustida haqiqiy soʻrov ishini bajarayotganiga kuchli ishora.
- **Xatodagi xatti-harakat tuzilmani ochadi.** Tayming va xato turlaridagi farqlar oʻzi maʼlumotdir: qaysi kiritmalar qayta ishlanadi, qaysi maydonlar mavjud, backend qanday tuzilgan.

## Buni qanday xavfsiz tasdiqlash mumkin

Avtorizatsiyalangan loyihada sinfni destruktivga oʻtmay tasdiqlaysiz: zararsiz kiritmalarda javob vaqtlari va xato turlarini solishtirasiz, endpoint “yaroqli, ammo avtorizatsiyasiz” ni “notoʻgʻri” dan ajratadimi tekshirasiz va xatolarda kiritmaning aks etishini qidirasiz. Maqsad — hisobot uchun kamchilik va uning taʼsirini tavsiflash, maʼlumotni yuklab olish emas.

## Tuzatish — bu tartibni tuzatish

- **Avval autentifikatsiya va avtorizatsiya.** Har bir marshrut, jumladan ichki maxsus marshrutlar ham, har qanday ishdan *oldin* shaxs va huquqlarni tekshiradi. Koʻpchilik freymvorklarda bu — ishlovchi boshida bitta guard (`current_user_can()`, middleware, dekorator).
- **Har bir soʻrovni parametrlang.** Soʻrov maʼlumotidan qatorlar bilan yigʻilgan SQL — hech qachon. ORM yoki bound-parametrlardan foydalaning.
- **Yopiq va jim yiqiling.** Umumiy xato qaytaring. Stek-treyslar, soʻrov boʻlaklari yoki ichki mantiqni aks ettiruvchi taymingni sizdirmang. Production muhitida debug rejimini oʻchiring.
- **Maxsus marshrutlaringizni inventarizatsiya qiling.** Freymvork standartlari odatda yaxshi; xavfli endpointlar — kimdir bir martalik funksiya uchun qoʻshgan va hech qachon tahdid modelidan oʻtkazmagan oʻzi yozgan marshrutlardir.

## Xulosa

“U shunchaki xato qaytaradi-ku” — bu simptomni tavsiflaydi, jiddiylikni emas. Bazangizga yetib borgan avtorizatsiyasiz soʻrov muhim boʻlgan chegaradan allaqachon oʻtib boʻlgan — xato esa shunchaki u bu safar toʻxtagan joy.
