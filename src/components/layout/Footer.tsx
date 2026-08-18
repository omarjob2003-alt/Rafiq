import { Link } from 'react-router-dom'
import { useLocalized } from '../../hooks/useLocalized'
import { Logo } from '../ui/Logo'
import { InstagramIcon, FacebookIcon, TiktokIcon, YoutubeIcon } from '../ui/SocialIcons'

const socials = [
  { icon: InstagramIcon, href: 'https://instagram.com', name: 'Instagram' },
  { icon: FacebookIcon, href: 'https://facebook.com', name: 'Facebook' },
  { icon: TiktokIcon, href: 'https://tiktok.com', name: 'TikTok' },
  { icon: YoutubeIcon, href: 'https://youtube.com', name: 'YouTube' },
]

export function Footer() {
  const { t } = useLocalized()

  const groups = [
    {
      title: t('تسوق', 'Shop'),
      links: [
        { label: t('المتجر', 'Shop'), href: '/shop' },
        { label: t('المجموعات', 'Collections'), href: '/collections' },
        { label: t('المفضلة', 'Wishlist'), href: '/wishlist' },
      ],
    },
    {
      title: t('عن رفيق', 'About Rafiq'),
      links: [
        { label: t('قصتنا', 'Our story'), href: '/about' },
        { label: t('المجلة', 'Journal'), href: '/journal' },
        { label: t('تتبع الطلب', 'Track order'), href: '/track-order' },
      ],
    },
    {
      title: t('المساعدة', 'Support'),
      links: [
        { label: t('الأسئلة الشائعة', 'FAQ'), href: '/contact#faq' },
        { label: t('تواصل معنا', 'Contact us'), href: '/contact' },
        { label: t('حسابي', 'My account'), href: '/account' },
      ],
    },
  ]

  return <footer className="border-t border-burgundy-dark/20 bg-burgundy-dark text-cream">
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-4 md:px-10">
      <div>
        <Logo tone="light" />
        <p className="mt-4 max-w-[220px] text-sm leading-7 text-cream/70">{t('أشياء بسيطة، مصممة بعناية لتكون رفيقك في كل يوم.', 'Simple things, thoughtfully made for every day.')}</p>
        <div className="mt-6 flex gap-2.5">
          {socials.map(social => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} className="grid size-8 place-items-center rounded-full border border-cream/25 text-cream/85 transition hover:border-cream hover:text-cream"><social.icon className="size-4" /></a>)}
        </div>
      </div>
      {groups.map(group => <div key={group.title}>
        <h3 className="font-ar-heading text-sm font-semibold">{group.title}</h3>
        <ul className="mt-4 space-y-2.5 text-sm text-cream/65">
          {group.links.map(link => <li key={link.label}><Link to={link.href} className="transition hover:text-cream">{link.label}</Link></li>)}
        </ul>
      </div>)}
    </div>
    <div className="border-t border-cream/15 px-5 py-5 text-center text-xs text-cream/50">© 2026 RAFIQ · {t('جميع الحقوق محفوظة.', 'All rights reserved.')}</div>
  </footer>
}