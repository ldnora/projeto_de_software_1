import Banner from "./Banner";
import BlocoDeTexto from "./BlocoDeTexto";
import Imagens from "./Imagens";

export function renderBloco(bloco: any, idx: number) {
  switch (bloco.__component) {
    case "imagens.banner":
      return <Banner key={idx} Banner={bloco.Banner} />;
    case "texto.bloco-de-texto":
      return <BlocoDeTexto key={idx} texto={bloco.editor_de_texto} />;
    case "imagens.imagens":
      return <Imagens key={idx} imagens={bloco.imagens} />;
    default:
      return null;
  }
}