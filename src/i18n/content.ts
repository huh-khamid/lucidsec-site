export const locales = ['en', 'ru', 'uz'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = { en: 'EN', ru: 'RU', uz: 'UZ' };

// Base path for a locale (en lives at the root).
export const basePath = (l: Locale) => (l === 'en' ? '' : `/${l}`);

type Case = {
  tag: string;
  stack: string;
  title: string;
  sum: string;
  findings: string[];
  stat: string;
};
type Focus = { k: string; t: string; d: string };
type Cert = { badge: string; title: string; issuer: string; year: string; verify: string | null };

export interface Content {
  htmlLang: string;
  metaTitle: string;
  metaDesc: string;
  nav: { about: string; focus: string; work: string; writeups: string; certs: string; contact: string };
  heroLead: string; // {name} replaced with the bold name span
  heroName: string;
  sec: {
    about: string;
    focus: string;
    selectedWork: string;
    writeups: string;
    certs: string;
    contact: string;
  };
  big: { work: string; writeups: string; certs: string };
  about: {
    slogan: string; // kept as brand line
    body: string;
    meta: { k: string; v: string }[];
  };
  focus: Focus[];
  dragHint: string;
  cases: Case[];
  caseNote: string;
  certsList: Cert[];
  verify: string;
  contact: { ctaLine1: string; ctaLine2: string };
  footerTagline: string;
}

// Technical finding tags, stacks and cert names stay in English (industry standard).
const findings = {
  pay: ['Broken auth', 'Payment IDOR', 'CORS', 'OTP brute force', 'Ticket hoarding'],
  infra: ['Exposed admin', 'Unauth API', 'Info disclosure', 'SSRF surface', 'Weak headers'],
  data: ['PII exposure', 'National-ID leak', 'IDOR', 'Reflected XSS', 'Unauth write'],
  estate: ['No-auth admin', 'Exposed control panel', 'Debug-mode leak', 'Plaintext login', 'Missing hardening'],
  virt: ['Exposed hypervisor', 'Broken access control', 'Public bucket', 'Arbitrary upload', 'Prior compromise'],
};
const certsBase = [
  { badge: 'C3SA', title: 'Certified Cyber Security Analyst', issuer: 'CyberWarfare Labs', year: '2026', verify: null as string | null },
  { badge: 'OCFA', title: 'Cybersecurity Fundamentals Associate', issuer: 'OPSWAT Academy', year: '2026', verify: 'https://learn.opswatacademy.com/certificate/4UZtvunXmw' },
  { badge: 'ICIP', title: 'Introduction to Critical Infrastructure Protection', issuer: 'OPSWAT Academy', year: '2026', verify: 'https://learn.opswatacademy.com/certificate/TKmHmEZOWw' },
];

export const content: Record<Locale, Content> = {
  en: {
    htmlLang: 'en',
    metaTitle: 'LucidSec — See beyond the surface',
    metaDesc:
      'Penetration testing & security research by Hamidulla Habibullayev. Black-box assessments of web platforms and infrastructure.',
    nav: { about: 'About', focus: 'Focus', work: 'Work', writeups: 'Write-ups', certs: 'Certs', contact: 'Contact' },
    heroLead:
      '{name} I look past the surface of a system, find what it didn’t mean to show, and write down exactly how.',
    heroName: 'Penetration testing & security research by Hamidulla Habibullayev.',
    sec: { about: 'About', focus: 'Focus', selectedWork: 'Selected work', writeups: 'Write-ups', certs: 'Certifications', contact: 'Contact' },
    big: { work: 'Case studies', writeups: 'Field notes', certs: 'Credentials' },
    about: {
      slogan: 'See beyond<br />the surface.',
      body: 'I run black-box security assessments of web platforms and infrastructure — web apps, APIs, payment flows, networks — and document every finding so it can actually be fixed. Student at HAAD, heading into penetration testing. At home in Python and Linux, and I build my own tooling when the task calls for it.',
      meta: [
        { k: 'BASED', v: 'Tashkent, UZ' },
        { k: 'WORK', v: 'Web · API · Network' },
        { k: 'TOOLS', v: 'Python · Linux' },
        { k: 'LANGUAGES', v: 'EN · RU · UZ' },
        { k: 'STATUS', v: 'Open to work' },
      ],
    },
    focus: [
      { k: 'A', t: 'Web Application Testing', d: 'Auth, access control, injection and logic flaws — the bugs that survive the scanner.' },
      { k: 'B', t: 'Network & Infrastructure', d: 'Recon, service enumeration and attack-surface mapping across hosts and subdomains.' },
      { k: 'C', t: 'CTF & Research', d: 'Competition write-ups and small tools built to understand a technique end to end.' },
      { k: 'D', t: 'Clear Reporting', d: 'Findings a developer can actually act on — reproduction, impact, fix.' },
    ],
    dragHint: '↔ drag or scroll to cycle',
    cases: [
      { tag: 'Black-box · Web + API', stack: 'Nuxt/Vue · Laravel', title: 'Payment & ticketing platform', sum: 'Assessment of a high-traffic booking platform. Unauthenticated payment and cart endpoints, sequential order-ID enumeration and a wildcard CORS policy chained into a payment-fraud path; a separate unauthenticated reservation flow let anyone lock up an entire event’s tickets.', findings: findings.pay, stat: '12 findings · 3 critical · chained end to end' },
      { tag: 'Black-box · Infrastructure', stack: 'Next.js · Django/DRF', title: 'Multi-service platform infra', sum: 'Full attack-surface mapping across a spread of subdomains and servers: an exposed admin panel, unauthenticated data APIs, internal addresses leaking through a CSP header and SSH reachable on every host — the findings that only show up when you enumerate properly.', findings: findings.infra, stat: 'Multi-server scope · recon-led' },
      { tag: 'Authorized · Web + API', stack: 'React · Django/DRF', title: 'Education platform — data exposure', sum: 'Data-protection-focused assessment of a university platform. Unauthenticated APIs exposed thousands of applicant and student records — including national ID numbers and signed PDF contracts — alongside an exposed config file, reflected XSS and an unauthenticated endpoint that wrote straight to the database.', findings: findings.data, stat: '14 findings · 3 critical · data-protection risk' },
      { tag: 'Authorized · Infrastructure', stack: 'WordPress · Laravel · PHP', title: 'Large university estate', sum: 'Attack-surface review of one of the largest estates I’ve mapped — hundreds of subdomains across multiple providers. Surfaced an admin panel with no authentication, a hosting control panel exposed to the internet with known CVEs, a framework left in debug mode leaking server paths, and a student portal served over plain HTTP.', findings: findings.estate, stat: 'Hundreds of hosts · critical findings confirmed' },
      { tag: 'Authorized · Web + Infra', stack: 'Spring Boot · Vue · MinIO', title: 'Virtualization & storage review', sum: 'Assessment spanning application, storage and virtualization. A public end-of-life hypervisor, broken access control that let a self-registered user reach admin content CRUD, and a public object-storage bucket — the last already holding a planted web shell, evidence the gap had been found before.', findings: findings.virt, stat: '9 findings · 2 critical · app + infra' },
    ],
    caseNote: 'Client names and identifying technical detail are withheld under confidentiality. These are sanitized case studies — full methodology available on request.',
    certsList: certsBase,
    verify: 'Verify →',
    contact: { ctaLine1: 'Let’s look', ctaLine2: 'closer.' },
    footerTagline: 'See beyond the surface.',
  },

  ru: {
    htmlLang: 'ru',
    metaTitle: 'LucidSec — See beyond the surface',
    metaDesc:
      'Пентест и исследования безопасности — Hamidulla Habibullayev. Black-box аудиты веб-платформ и инфраструктуры.',
    nav: { about: 'О себе', focus: 'Направления', work: 'Работы', writeups: 'Статьи', certs: 'Серты', contact: 'Контакты' },
    heroLead:
      '{name} Я смотрю глубже поверхности системы, нахожу то, что она не собиралась показывать, и подробно описываю как.',
    heroName: 'Пентест и исследования безопасности — Hamidulla Habibullayev.',
    sec: { about: 'О себе', focus: 'Направления', selectedWork: 'Избранные работы', writeups: 'Статьи', certs: 'Сертификаты', contact: 'Контакты' },
    big: { work: 'Кейсы', writeups: 'Заметки', certs: 'Квалификация' },
    about: {
      slogan: 'See beyond<br />the surface.',
      body: 'Провожу black-box аудиты безопасности веб-платформ и инфраструктуры — веб-приложения, API, платёжные потоки, сети — и описываю каждую находку так, чтобы её реально можно было закрыть. Студент HAAD, двигаюсь в пентест. Своя среда — Python и Linux; когда нужно, пишу собственный инструментарий.',
      meta: [
        { k: 'ГОРОД', v: 'Ташкент, UZ' },
        { k: 'РАБОТА', v: 'Web · API · Network' },
        { k: 'ИНСТРУМЕНТЫ', v: 'Python · Linux' },
        { k: 'ЯЗЫКИ', v: 'EN · RU · UZ' },
        { k: 'СТАТУС', v: 'Открыт к работе' },
      ],
    },
    focus: [
      { k: 'A', t: 'Тестирование веб-приложений', d: 'Аутентификация, контроль доступа, инъекции и логические баги — то, что переживает сканер.' },
      { k: 'B', t: 'Сети и инфраструктура', d: 'Разведка, перечисление сервисов и картирование поверхности атаки по хостам и поддоменам.' },
      { k: 'C', t: 'CTF и исследования', d: 'Разборы соревнований и небольшие инструменты, чтобы понять технику от и до.' },
      { k: 'D', t: 'Понятные отчёты', d: 'Находки, с которыми разработчик реально может работать — воспроизведение, impact, фикс.' },
    ],
    dragHint: '↔ тяни или листай',
    cases: [
      { tag: 'Black-box · Web + API', stack: 'Nuxt/Vue · Laravel', title: 'Платёжно-билетная платформа', sum: 'Аудит высоконагруженной платформы продажи билетов. Платёжные и корзинные эндпоинты без авторизации, перебор последовательных order-ID и wildcard CORS сложились в путь к платёжному фроду; отдельный неавторизованный поток бронирования позволял заблокировать все билеты события.', findings: findings.pay, stat: '12 находок · 3 критических · связаны в цепочку' },
      { tag: 'Black-box · Infrastructure', stack: 'Next.js · Django/DRF', title: 'Инфраструктура мультисервиса', sum: 'Полное картирование поверхности атаки по множеству поддоменов и серверов: открытая админка, API с данными без авторизации, внутренние адреса, утекающие через заголовок CSP, и SSH, доступный на каждом хосте — находки, которые всплывают только при аккуратной разведке.', findings: findings.infra, stat: 'Несколько серверов · разведка в основе' },
      { tag: 'Authorized · Web + API', stack: 'React · Django/DRF', title: 'Образовательная платформа — утечка данных', sum: 'Аудит университетской платформы с упором на защиту данных. API без авторизации раскрывали тысячи записей абитуриентов и студентов — включая номера паспортов и подписанные PDF-договоры — плюс открытый конфиг, reflected XSS и неавторизованный эндпоинт, писавший прямо в базу.', findings: findings.data, stat: '14 находок · 3 критических · риск для ПДн' },
      { tag: 'Authorized · Infrastructure', stack: 'WordPress · Laravel · PHP', title: 'Крупный вузовский эстейт', sum: 'Обзор поверхности атаки одного из крупнейших эстейтов, что я картировал — сотни поддоменов у разных провайдеров. Нашлись: админка без авторизации, панель управления хостингом наружу с известными CVE, фреймворк в debug-режиме с утечкой путей сервера и студенческий портал по обычному HTTP.', findings: findings.estate, stat: 'Сотни хостов · критические находки подтверждены' },
      { tag: 'Authorized · Web + Infra', stack: 'Spring Boot · Vue · MinIO', title: 'Виртуализация и хранилище', sum: 'Аудит на стыке приложения, хранилища и виртуализации. Публичный EOL-гипервизор, нарушение контроля доступа (самостоятельно зарегистрированный пользователь дотягивался до CRUD админ-контента) и публичный бакет объектного хранилища — в последнем уже лежал чужой веб-шелл, след того, что брешь находили до нас.', findings: findings.virt, stat: '9 находок · 2 критических · приложение + инфра' },
    ],
    caseNote: 'Названия клиентов и идентифицирующие детали скрыты по условиям конфиденциальности. Это обезличенные кейсы — полная методология по запросу.',
    certsList: certsBase,
    verify: 'Проверить →',
    contact: { ctaLine1: 'Посмотрим', ctaLine2: 'ближе.' },
    footerTagline: 'See beyond the surface.',
  },

  uz: {
    htmlLang: 'uz',
    metaTitle: 'LucidSec — See beyond the surface',
    metaDesc:
      'Penetratsion test va xavfsizlik tadqiqotlari — Hamidulla Habibullayev. Veb-platforma va infratuzilma uchun black-box auditlar.',
    nav: { about: 'Men haqimda', focus: 'Yoʻnalishlar', work: 'Ishlar', writeups: 'Maqolalar', certs: 'Sertlar', contact: 'Aloqa' },
    heroLead:
      '{name} Tizimning yuzasidan chuqurroq qarayman, u koʻrsatmoqchi boʻlmagan narsani topaman va buni qanday qilganimni batafsil yozib qoldiraman.',
    heroName: 'Penetratsion test va xavfsizlik tadqiqotlari — Hamidulla Habibullayev.',
    sec: { about: 'Men haqimda', focus: 'Yoʻnalishlar', selectedWork: 'Tanlangan ishlar', writeups: 'Maqolalar', certs: 'Sertifikatlar', contact: 'Aloqa' },
    big: { work: 'Keyslar', writeups: 'Eslatmalar', certs: 'Malaka' },
    about: {
      slogan: 'See beyond<br />the surface.',
      body: 'Veb-platforma va infratuzilma uchun black-box xavfsizlik auditlarini oʻtkazaman — veb-ilovalar, API, toʻlov oqimlari, tarmoqlar — va har bir kamchilikni haqiqatan tuzatish mumkin boʻladigan qilib hujjatlashtiraman. HAAD talabasi, penetratsion test yoʻnalishida. Python va Linux — mening muhitim; kerak boʻlganda oʻzimning vositalarimni yozaman.',
      meta: [
        { k: 'SHAHAR', v: 'Toshkent, UZ' },
        { k: 'ISH', v: 'Web · API · Network' },
        { k: 'VOSITALAR', v: 'Python · Linux' },
        { k: 'TILLAR', v: 'EN · RU · UZ' },
        { k: 'HOLAT', v: 'Ishga tayyor' },
      ],
    },
    focus: [
      { k: 'A', t: 'Veb-ilovalarni testlash', d: 'Autentifikatsiya, kirish nazorati, inyeksiya va mantiqiy xatolar — skaner oʻtkazib yuboradigan kamchiliklar.' },
      { k: 'B', t: 'Tarmoq va infratuzilma', d: 'Razvedka, xizmatlarni sanash va hostlar hamda subdomenlar boʻylab hujum yuzasini xaritalash.' },
      { k: 'C', t: 'CTF va tadqiqot', d: 'Musobaqa tahlillari va texnikani toʻliq tushunish uchun yoziladigan kichik vositalar.' },
      { k: 'D', t: 'Aniq hisobotlar', d: 'Dasturchi haqiqatan ishlata oladigan kamchiliklar — qayta ishlab chiqarish, taʼsir, tuzatish.' },
    ],
    dragHint: '↔ torting yoki aylantiring',
    cases: [
      { tag: 'Black-box · Web + API', stack: 'Nuxt/Vue · Laravel', title: 'Toʻlov va chipta platformasi', sum: 'Yuqori yuklamali chipta platformasi auditi. Autentifikatsiyasiz toʻlov va savat endpointlari, ketma-ket order-ID sanash va wildcard CORS birlashib toʻlov firibgarligi yoʻlini hosil qildi; alohida autentifikatsiyasiz bron oqimi esa butun tadbirning chiptalarini bloklash imkonini berdi.', findings: findings.pay, stat: '12 ta kamchilik · 3 ta kritik · zanjirga ulangan' },
      { tag: 'Black-box · Infrastructure', stack: 'Next.js · Django/DRF', title: 'Multiservis infratuzilmasi', sum: 'Koʻplab subdomen va serverlar boʻylab hujum yuzasini toʻliq xaritalash: ochiq admin panel, autentifikatsiyasiz maʼlumot API-lari, CSP sarlavhasi orqali sizib chiqayotgan ichki manzillar va har bir hostda ochiq SSH — faqat puxta razvedkada koʻrinadigan kamchiliklar.', findings: findings.infra, stat: 'Bir nechta server · razvedkaga asoslangan' },
      { tag: 'Authorized · Web + API', stack: 'React · Django/DRF', title: 'Taʼlim platformasi — maʼlumot sizishi', sum: 'Maʼlumotlarni himoya qilishga qaratilgan universitet platformasi auditi. Autentifikatsiyasiz API-lar minglab abituriyent va talaba yozuvlarini — jumladan JSHSHIR va imzolangan PDF shartnomalarni — hamda ochiq config faylini, reflected XSS va toʻgʻridan-toʻgʻri bazaga yozadigan autentifikatsiyasiz endpointni ochib berdi.', findings: findings.data, stat: '14 ta kamchilik · 3 ta kritik · maʼlumot xavfi' },
      { tag: 'Authorized · Infrastructure', stack: 'WordPress · Laravel · PHP', title: 'Yirik universitet infratuzilmasi', sum: 'Men xaritalagan eng yirik infratuzilmalardan birining hujum yuzasi tahlili — turli provayderlarda yuzlab subdomenlar. Topildi: autentifikatsiyasiz admin panel, maʼlum CVE-lar bilan internetga ochiq hosting boshqaruv paneli, server yoʻllarini sizdiradigan debug rejimidagi freymvork va oddiy HTTP orqali ishlaydigan talaba portali.', findings: findings.estate, stat: 'Yuzlab host · kritik kamchiliklar tasdiqlangan' },
      { tag: 'Authorized · Web + Infra', stack: 'Spring Boot · Vue · MinIO', title: 'Virtualizatsiya va saqlash tahlili', sum: 'Ilova, saqlash va virtualizatsiya kesishmasidagi audit. Ommaviy EOL gipervizor, kirish nazoratining buzilishi (oʻzini roʻyxatdan oʻtkazgan foydalanuvchi admin kontent CRUD-iga yetib bordi) va ommaviy obyekt-saqlash bucketi — oxirgisida allaqachon begona veb-shell bor edi, yaʼni kamchilik bizdan oldin ham topilgan.', findings: findings.virt, stat: '9 ta kamchilik · 2 ta kritik · ilova + infra' },
    ],
    caseNote: 'Mijoz nomlari va aniqlovchi texnik tafsilotlar maxfiylik shartlari boʻyicha yashirilgan. Bular anonimlashtirilgan keyslar — toʻliq metodologiya soʻrov asosida.',
    certsList: certsBase,
    verify: 'Tekshirish →',
    contact: { ctaLine1: 'Yaqinroq', ctaLine2: 'qaraymiz.' },
    footerTagline: 'See beyond the surface.',
  },
};
