import Link from 'next/link'

const FourOhFour = () => {
  return (
    <>
      <h2>Beklager</h2>
      <p>404 - Denne siden eksisterer ikke</p>
      <Link href="/">
        <a>
          <button> Gå tilbake til hjem</button>
        </a>
      </Link>
    </>
  )
}

export default FourOhFour
