import Header from './components/Header'
import Navigation from './components/Navigation'
import Article from './components/Article'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
 
function App() {
  // Dados do blog e do post armazenados no componente principal
  const blogTitle = 'Meu Blog de Viagens'
 
  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Sobre', href: '#' },
    { label: 'Contato', href: '#' },
  ]
 
  const post = {
    titulo: 'Descobrindo as Belezas de Florianópolis',
    autor: 'Felipe',
    data: '2026-01-02',
    dataFormatada: '02 de janeiro de 2026',
    conteudo: [
      'Florianópolis, conhecida como a "Ilha da Magia", é um dos destinos mais encantadores do Brasil. Com suas praias paradisíacas, trilhas naturais e cultura rica, a cidade atrai turistas de todas as partes do mundo.',
      'Entre as praias mais famosas estão a Praia da Joaquina, Campeche e Jurerê. Além das paisagens deslumbrantes, Florianópolis também oferece ótima gastronomia, com destaque para frutos do mar frescos.',
    ],
    imagem: {
      src: 'https://www.viagensecaminhos.com/wp-content/uploads/2011/02/florianopolis-praia-joaquina.jpg',
      alt: 'Praia da Joaquina Florianópolis',
      legenda: 'Vista da Praia da Joaquina em Florianópolis.',
    },
  }
 
  const postsRelacionados = [
    { label: 'Explorando o Sul do Brasil', href: '#' },
    { label: 'Aventuras na Serra Gaúcha', href: '#' },
    { label: 'Conhecendo Balneário Camboriú', href: '#' },
  ]
 
  return (
    <div className="app">
      <Header titulo={blogTitle} />
      <Navigation links={navLinks} />
      <main className="conteudo-principal">
        <Article
          titulo={post.titulo}
          autor={post.autor}
          data={post.data}
          dataFormatada={post.dataFormatada}
          conteudo={post.conteudo}
          imagem={post.imagem}
        />
        <Sidebar posts={postsRelacionados} />
      </main>
      <Footer />
    </div>
  )
}
 
export default App