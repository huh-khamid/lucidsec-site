---
title: "Multiservis platformasining hujum yuzasini xaritalash"
summary: "Koʻpchilik real topilmalar hech kim ataylab tashqariga chiqarmoqchi boʻlmagan hostlarda yashaydi. Asosiy domendan tashqariga chiqadigan razvedka haqida eslatmalar."
date: 2026-09-18
cat: "Recon"
lang: uz
key: mapping-attack-surface
---

Har qanday oʻlchamdagi platformada asosiy domen — eʼtibor qaratiladigan, demak odatda himoyalangan qism. Qiziqarli topilmalar esa koʻpincha uning *atrofidagi* hamma narsada boʻladi: staging serverlar, admin panellar, jimgina internetdan ochiq boʻlib qolgan ichki vositalar. Bu — puxta razvedka fazasi maqsad kutganidan ancha kattaroq yuzani ochib bergani haqidagi anonimlashtirilgan hikoya.

## Nomlardan boshlang

Subdomenlarni sanash — yuqori qiymatli qadamlarning eng arzoni. Certificate transparency loglari, passiv DNS va keng tarqalgan prefikslarni tanlash birgalikda hech qachon ommaviy boʻlishi moʻljallanmagan hostlarni ochadi: `dev`, `test`, `staging`, `pos`, `scanner`, `tg`, `admin`. Ularning har biri — kim yetib bora olishi haqida oʻz taxminlariga ega alohida ilova, va bu taxminlar odatda flagmandan zaifroq.

Bu loyihada subdomenlarni koʻrib chiqish maʼlum yuzani taxminan ikki barobar oshirdi. Qoʻshimcha hostlarning bir nechtasi butunlay boshqa serverlar va provayderlarda yashardi, bu esa muhim: asosiy saytning himoyasi u bilan bazani boʻlishadigan staging mashinasi haqida hech narsa aytmaydi.

## Hamma narsadan iz oling, hech narsaga ishonmang

Har bir host bir xil tezkor oʻtishni oldi: ochiq portlar, server bannerlari, javob sarlavhalari, freymvork izlari. Bir nechta naqsh takrorlandi:

- Tarmoq cheklovisiz ommaviy internetga chiqarilgan administrativ interfeys. Kirish ortida boʻlsa ham, bu brutfors va credential stuffing yuzasi, qoʻshimcha ravishda admin dasturidagi istalgan CVE.
- Avtorizatsiyasiz maʼlumot qaytaradigan ommaviy API endpointlar — ichki tuzilmani sanash va keyingi testlashga zamin tayyorlash uchun yetarli.
- Ichki manzilga (`localhost:<port>`) ishora qiluvchi Content-Security-Policy sarlavhasi. Sahifani himoyalashi kerak boʻlgan siyosat oʻrniga backend arxitekturasi tafsilotini sizdirdi — server-side request forgery sari ishora.
- Sarlavhalarda stekni batafsil ochish: freymvork nomlari, versiyalar, powered-by qatorlar. Ularning hech biri alohida uyazvimlik emas; birga esa ular hujumchiga aniq maqsadlar roʻyxatini beradi.

## Nega bu faza loyiha natijasini hal qiladi

Asosiy domenni skanerlab, tugadi deb hisoblash — real muammolar shunday oʻtkazib yuboriladi. Bu yerdagi muhim topilmalar aqlli ekspluatatsiyalar emas, umuman ochiq boʻlmasligi kerak boʻlgan xizmatlar edi — puxta sanash va har bir hostga alohida maqsad sifatida qarash orqali topilgan.

## Amaliy roʻyxat

- Subdomenlarni bir nechta manbadan sanang (CT loglar, passiv DNS, lugʻatlar) va vaqti-vaqti bilan takrorlang — yuza oʻzgaradi.
- Har bir hostni resolve qiling va u qaysi server va provayderda yashashini belgilang. Nom boʻyicha emas, infratuzilma boʻyicha guruhlang.
- Xavfsizlik nuqtai nazaridan `dev`/`test`/`staging` ga production kabi qarang — ularda koʻpincha real maʼlumot boʻladi.
- Admin panellar va ichki vositalarni faqat kirish formasi ortida emas, VPN yoki IP-allowlist ortida saqlang.
- Versiya va powered-by sarlavhalarini olib tashlang. Bu sizga hech narsa turmaydi va hujumchining vaqtini tejaydi.

## Xulosa

Razvedka — “asl” testlashdan oldingi zerikarli qism emas; koʻpchilik loyihalarda u *aynan* testlashning oʻzidir. Ekspluatatsiya koʻpincha puxta sanash allaqachon koʻrsatgan narsani tasdiqlaydi, xolos.
