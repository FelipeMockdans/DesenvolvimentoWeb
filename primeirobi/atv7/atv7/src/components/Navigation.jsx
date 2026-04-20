function Navigation({ links }) {
  return (
    <nav className="navegacao">
      <ul className="menu">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation