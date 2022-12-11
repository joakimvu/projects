const Rules = () => {
  return (
    <>
      <section className=" justify-center border-dashed border-2 border-green p-10 rounded align-middle bg-white">
        <h1 className="text-3xl font-semibold">Regler*</h1>

        <section className="mt-2 text-xl">
          <p>
            Regler skal det bestemmer hvilke dager i uken en ansatt kan jobbe.
          </p>
        </section>

        <section className="mt-2">
          <p>
            <span className="font-semibold">1</span> = mandag
          </p>
          <p>
            <span className="font-semibold">2</span> = tirsdag
          </p>
          <p>
            <span className="font-semibold">3</span> = onsdag
          </p>
          <p>
            <span className="font-semibold">4</span> = torsdag
          </p>
          <p>
            <span className="font-semibold">5</span> = fredag
          </p>
        </section>

        <section className="mt-2">
          <p>
            <span className="font-semibold">days:1</span> Betyr at den ansatte
            kan jobbe alle mandager
          </p>
          <p>
            <span className="font-semibold">days:2</span> Betyr at den ansatte
            kan jobbe alle tirsdager
          </p>
          <p>
            <span className="font-semibold">days:123</span> Betyr at den ansatte
            kan jobbe alle mandager, tirsdager og onsdager
          </p>
        </section>

        <section className="mt-2">
          <p>
            <span className="font-semibold">days:*</span> Betyr at den ansatte
            kan jobbe alle dager i uken(mandag-fredag)
          </p>
        </section>

        <section className="mt-2">
          <p>
            <span className="font-semibold">days:*|week:even</span> Betyr at den
            ansatte kan jobbe alle dager på partallukene (uke2 man-fre, uke4
            man-fre osv.)
          </p>
          <p>
            <span className="font-semibold">days:*|week:odd</span> Betyr at den
            ansatte kan jobbe alle dager på oddetallsukene (uke1 man-fre, uke3
            man-fre osv.)
          </p>
        </section>
      </section>
    </>
  )
}

export default Rules
