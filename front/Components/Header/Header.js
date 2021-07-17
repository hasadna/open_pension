import Link from 'next/link'

export default function Header({isFrontPage = false}) {
  return <header className={isFrontPage ? 'front-page' : ''}>
    <div className="logo">
      <Link href="/" passHref>
        <a>
          <img src="/logo.png" alt={"לוגו"}/>
          <h1>פנסיה פתוחה</h1>
        </a>
      </Link>
    </div>
    <ul>
      <li>ההשקעות שלי</li>
      <li>הופעות תקשורת</li>
      <li>מי אנחנו</li>
    </ul>
  </header>
}
