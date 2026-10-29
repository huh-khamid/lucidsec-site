---
title: "CORS, IDOR va rate limit yoʻqligi qanday qilib toʻlov firibgarligiga ulanadi"
summary: "Alohida olganda zararsiz koʻrinadigan uchta kamchilik birlashib, begona kartadan pul yechish yoʻlini hosil qiladi. Past darajali xatolar qanday qoʻshilishi haqida."
date: 2026-09-30
cat: "Web"
lang: uz
key: payment-fraud-chain
---

Darajalar har bir kamchilikka alohida beriladi. Hujumchilar esa alohida kamchiliklarga emas — ular oradagi boʻshliqqa hujum qiladi. Bu — har biri alohida olganda “oʻrta” boʻlgan uchta muammo real toʻlov firibgarligi ssenariysiga ulangan haqiqiy black-box loyihaning anonimlashtirilgan tahlili.

## Uchta qism

**1. Ruxsat beruvchi CORS siyosati.** Toʻlov hosti yuborilgan har qanday `Origin` ni qaytarib aks ettirar va `Access-Control-Allow-Credentials: true` ni oʻrnatardi. Bu kombinatsiya shuni anglatadiki, jabrlanuvchi tashrif buyurgan istalgan sayt toʻlov API-siga *uning nomidan* autentifikatsiyalangan soʻrovlar yubora oladi va javoblarni oʻqiy oladi. `Origin: null` va ixtiyoriy subdomenlar ham qabul qilinardi — yaʼni “faqat https origin” degan odatiy taxminlar ishlamasdi.

**2. Ketma-ket order-ID (IDOR).** Buyurtmalar kichik boshlangʻich qiymatdan boshlab tartib bilan raqamlanardi. ID soʻrovi “mavjud” va “topilmadi” uchun turlicha xato qaytarardi — bu butun diapazonni (bu yerda — millionlab haqiqiy buyurtma havolalarini) hech qanday autentifikatsiyasiz sanab chiqish uchun yetarli.

**3. OTP bosqichida rate limit yoʻq.** Bir martalik parol bilan tasdiqlash endpointi cheksiz urinishlarni qabul qilardi. Parallel ravishda butun OTP fazosi yillar emas, soatlarda tanlab olinardi.

## Nega bu zanjirga ulanadi

Bu muammolarning hech biri alohida olganda dramatik emas. Maʼlumotsiz sahifada ruxsat beruvchi CORS — shunchaki shovqin. Faqat “bunday buyurtma bor” degan maʼlumotni ochadigan IDOR arzimasdek tuyuladi. OTP-dagi rate limit yoʻqligi faqat shu bosqichga yetib borish mumkin boʻlsagina muhim.

Birga esa ular toʻliq hujumni tasvirlaydi:

1. CORS zararli sahifaga jabrlanuvchi brauzeridan toʻlov API-siga credentialed soʻrovlar yuborish imkonini beradi.
2. IDOR haqiqiy buyurtma havolalarini taqdim etadi — taxmin qilishsiz.
3. Autentifikatsiyasiz toʻlov endpointlari bu havolalarni qabul qiladi.
4. Rate limit yoʻqligi tranzaksiyani “himoyalaydigan” OTP ni tanlab olishni amaliy qiladi.

Natija — hujumchida hech qachon boʻlmagan kartadan pul yechishni yakunlash yoʻli. Biznes-mantiq har bir bosqich oldingisi bilan himoyalangan deb hisoblardi. Aslida esa birontasi himoyalanmagan edi.

## Buni oʻzingizda qanday aniqlash mumkin

- `Access-Control-Allow-Origin` ga aks ettirish emas, allowlist sifatida qarang. Agar siz `Origin` ni qaytarib aks ettirsangiz — bu, ayniqsa credentials yoqilgan holda, aynan xatodir.
- Ishonch chegarasidan oʻtadigan hamma narsa uchun taxmin qilib boʻlmaydigan identifikatorlardan (UUID) foydalaning va baribir har bir soʻrovda avtorizatsiyani tekshiring. Taxmin qilib boʻlmaydigan ID-lar — bu defense in depth, nazoratning oʻzi emas.
- Rate limit va bloklashni *har bir* nozik amalga qoʻying — kirish, OTP, toʻlovni tasdiqlash — faqat “old eshik”ka emas. Urinishlarni server tomonda, akkaunt va IP boʻyicha sanang.
- Oqimlarni cheklist sifatida emas, zanjir sifatida koʻrib chiqing. Har bir bosqich uchun soʻrang: “bu nazorat ishdan chiqsa, hujumchi qayergacha yetadi?”

## Xulosa

Loyihadagi eng qiziqarli topilmalar kamdan-kam hollarda yagona kritik xato boʻladi. Ular — tahdid modeli birlasha olmaydi deb hisoblagan, ammo birlashgan jim “oʻrta”lar. Hisobotda qismlarni emas, zanjirni tasvirlang: bu dasturchi bitta tiketni yopishi bilan jamoa haqiqiy xavfni tuzatishi oʻrtasidagi farqdir.
