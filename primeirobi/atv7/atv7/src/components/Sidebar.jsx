function Sidebar({ posts }) {
  return (
    <aside className="barra-lateral">
      <h3>Posts Relacionados</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.label}>
            <a href={post.href}>{post.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar