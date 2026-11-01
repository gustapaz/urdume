import ClientBoot from "./client-boot";
export default function Home() {
  return (
    <>
      <a className="skip" href="#controls">
        Ir para os comandos do tear
      </a>
      <header>
        <a className="brand" href="/">
          URDUME<span>TECER É ESCOLHER</span>
        </a>
        <span className="edition">OFICINA DIGITAL / 01</span>
        <a href="#material">O fio de verdade ↘</a>
      </header>
      <main>
        <section id="controls">
          <div id="app-root">
            <p>Abrindo o tear…</p>
          </div>
        </section>
        <section className="loom" aria-label="Tear digital">
          <div className="loom-copy">
            <span>ENTRE UM FIO E OUTRO</span>
            <h1>
              Um lado passa.
              <br />
              <em>O outro fica.</em>
            </h1>
            <p>
              Desenhe o encontro
              <br />
              entre trama e urdume.
            </p>
            <span className="coordinate">LEVANTE / CRUZE / REPITA</span>
          </div>
          <div className="frame" aria-hidden="true">
            <div className="rail top" />
            <div className="rail bottom" />
            <canvas id="cloth" />
            <div className="loom-numbers">
              <span>00</span>
              <span>16</span>
              <span>32</span>
              <span>48</span>
            </div>
          </div>
          <div className="loom-caption">
            <span>UM DESENHO FEITO DE DECISÕES</span>
            <p>
              O claro passa por cima.
              <br />A trama muda a superfície.
            </p>
          </div>
        </section>

        <section className="material" id="material">
          <div>
            <span>DE ONDE VEM O GESTO</span>
            <h2>
              Antes do pixel,
              <br />
              <em>o fio.</em>
            </h2>
            <p>
              O ligamento é a regra do encontro. Tela alterna. Sarja desloca.
              Cetim distribui os pontos e alonga os caminhos.
            </p>
            <p>
              Este tear é uma experiência visual. Não prevê a resistência nem as
              propriedades de um tecido real.
            </p>
            <a href="/api-docs.html">A regra por trás da trama ↗</a>
          </div>
          <figure>
            <img
              src="/media/subject.webp"
              width="1200"
              height="800"
              alt="Fios reais atravessando um tear tradicional"
              loading="lazy"
            />
            <figcaption>
              Fotografia: Magda Ehlers / Pexels. A tradição inspira; o desenho é
              seu.
            </figcaption>
          </figure>
        </section>
      </main>
      <footer>
        <strong>URDUME</strong>
        <span>Uma experiência de Gustavo Paz.</span>
        <a href="/credits.html">Créditos e limites ↗</a>
        <a href="https://github.com/gustapaz/urdume">Código ↗</a>
        <button id="motion-toggle" aria-pressed="false">
          Pausar movimento
        </button>
      </footer>
      <ClientBoot />
    </>
  );
}
