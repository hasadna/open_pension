import Link from 'next/link'

export default function Header({isFrontPage = false}) {
  return <header className={isFrontPage ? 'front-page' : ''}>
    <div className="logo">
      <Link href="/"><img src="/logo.png" alt={"לוגו"}/></Link>
      <h1>פנסיה פתוחה</h1>
    </div>
    <ul>
      <li>ההשקעות שלי</li>
      <li>הופעות תקשורת</li>
      <li>מי אנחנו</li>
    </ul>
  </header>
}
