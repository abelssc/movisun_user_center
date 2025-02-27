import "../../styles/footer.css";

const Footer = () => {
  const politicas = [
    {
      title: "|    Políticas de privacidad",
      url: "/index.php?app=document&code=privacy_policy",
    },
    {
      title: "|    Políticas de garantía",
      url: "/index.php?app=document&code=guarantee_policy",
    },
    // { title: '|    Políticas de envío', url: '/index.php?app=document&code=' },
  ];

  const ayuda = [
    {
      title: "|    Términos y condiciones",
      url: "/index.php?app=document&code=agreement",
    },
    {
      title: "|    Libro de reclamaciones",
      url: "/index.php?app=index&mod=tousu",
    },
  ];

  return (
    <div className="wrapfoot">
      <footer id="footer" className="footer">
        <div className="footer-section">
          <p className="footer-title">Políticas</p>
          <ul className="footer-links">
            {politicas.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <p className="footer-title">Centro de Ayuda</p>
          <ul className="footer-links">
            {ayuda.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section items-center">
          <p className="footer-title">Síguenos en</p>
          <div className="footer-social-icons">
            {/* facebook */}
            <a href="https://www.facebook.com/movisun" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                <path
                  className="fill-white"
                  d="M13.62.79c1.55.19,3.03.63,4.41,1.37,1.42.76,2.63,1.76,3.64,3.01,1.01,1.25,1.73,2.64,2.17,4.18.44,1.55.56,3.12.36,4.72-.71,5.73-5.31,9.59-9.83,10.19v-8.22h2.74c.18-1.14.35-2.27.52-3.42h-3.27c0-.05-.01-.09-.01-.12,0-.72,0-1.44,0-2.16,0-.15.02-.31.05-.46.18-.79.77-1.27,1.59-1.3.52-.02,1.04-.01,1.55-.02.07,0,.13,0,.2,0v-2.93c-.6-.06-1.19-.14-1.79-.18-.89-.06-1.77-.06-2.63.25-1.04.38-1.79,1.06-2.24,2.07-.32.72-.43,1.48-.43,2.27,0,.79,0,1.59,0,2.38,0,.06,0,.12,0,.2h-2.98v3.42h2.97v8.23c-4.91-.71-9.37-4.83-9.89-10.58-.29-3.25.61-6.17,2.71-8.68C5.57,2.49,8.28,1.13,11.51.78c.84-.06,1.56-.03,1.86-.01.11,0,.21.02.24.02Z"
                />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/movisun.peru/?hl=es-la"
              target="_blank"
            >
              <svg
                id="Capa_1"
                data-name="Capa 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
              >
                <path
                  className="fill-white"
                  d="M18,9.2c-.15-1.01-.68-1.83-1.78-2.09-.35-.08-.71-.14-1.06-.14-1.63-.02-3.26-.01-4.88-.01-.37,0-.73,0-1.1.06-1.19.15-2.02,1.04-2.14,2.23-.09.93-.1,1.85-.09,2.78.02,1.27-.07,2.54.09,3.8.13,1.05.71,1.79,1.73,2.06.42.11.86.17,1.3.17,1.35,0,2.7,0,4.04.01.62,0,1.24,0,1.86-.11.85-.15,1.5-.56,1.83-1.39.16-.41.24-.84.25-1.28,0-.93,0-1.86,0-2.78h.01c0-.55,0-1.1,0-1.65,0-.55.02-1.1-.06-1.65ZM12.49,16.04c-1.94,0-3.54-1.62-3.53-3.57.01-1.94,1.64-3.55,3.56-3.54,1.94.01,3.56,1.64,3.54,3.56-.02,1.97-1.62,3.55-3.58,3.55ZM16.18,9.69c-.47,0-.85-.37-.86-.84,0-.48.38-.87.86-.87.46,0,.85.39.85.85,0,.47-.38.85-.85.85Z"
                />
                <path
                  className="fill-white"
                  d="M12.56,10.25c-1.26-.02-2.27.96-2.3,2.2-.02,1.22,1,2.28,2.23,2.29,1.24.02,2.25-.98,2.27-2.23.02-1.25-.96-2.25-2.2-2.26Z"
                />
                <path
                  className="fill-white"
                  d="M24.26,11.75c-.34-5.52-4.56-10.35-10.61-10.96C7.8.2,1.74,4.24.81,11.17c-.13,1.02-.13,1.62,0,2.7.53,3.58,2.25,6.43,5.25,8.44,2.37,1.59,5.02,2.2,7.86,1.87,6.03-.7,10.74-5.99,10.34-12.42ZM19.74,14.78c0,.75-.06,1.49-.31,2.21-.32.93-.9,1.63-1.77,2.1-.79.42-1.65.51-2.52.55-1.38.07-2.76.03-4.13.03-.81,0-1.63-.03-2.42-.19-1.48-.3-2.46-1.16-2.9-2.63-.11-.38-.22-.77-.25-1.17-.05-.44-.11-5.37,0-6.41.04-.28.09-.56.15-.83.33-1.41,1.14-2.38,2.54-2.83.65-.21,1.32-.28,2-.29,1.52-.02,3.05-.01,4.57,0,.82,0,1.64.06,2.43.34,1.12.39,1.89,1.14,2.28,2.27.23.67.32,1.37.33,2.07.02,1.6.02,3.2,0,4.79Z"
                />
              </svg>
            </a>
            {/* tiktok */}
            <a href="https://www.tiktok.com/@movisun.peru" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                <path
                  className="fill-white"
                  d="M24.26,11.75c-.34-5.52-4.56-10.35-10.61-10.96C7.8.2,1.74,4.24.81,11.17c-.13,1.02-.13,1.62,0,2.7.53,3.58,2.25,6.43,5.25,8.44,2.37,1.59,5.02,2.2,7.86,1.87,6.03-.7,10.74-5.99,10.34-12.42ZM19.12,11.32c-1.39.18-2.58-.18-3.67-1.18v.52c0,1.56,0,3.11,0,4.67,0,2.58-1.81,4.58-4.45,4.82-2.33.21-4.5-1.4-5.01-3.81-.64-3.01,1.81-5.88,4.9-5.71.12,0,.32.12.32.19.02.85.01,1.71.01,2.58-.21,0-.37,0-.53,0-1.12,0-2.02.87-2.03,1.97,0,1.1.89,2.01,1.99,2.03,1.14.01,2.1-.87,2.11-1.96.02-2.55.02-5.1.02-7.66,0-.85,0-1.69.01-2.54,0-.13.01-.26.02-.42h2.61c.05.27.09.53.16.78.39,1.49,1.65,2.56,3.19,2.72.18.02.36,0,.36.27,0,.9,0,1.8,0,2.72Z"
                />
              </svg>
            </a>
            {/* youtube */}
            <a href="https://www.youtube.com/c/movisun" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                <path
                  className="fill-white"
                  d="M.81,11.17C1.74,4.24,7.8.2,13.65.79c6.04.61,10.27,5.44,10.61,10.96.39,6.44-4.32,11.72-10.34,12.42-2.84.33-5.49-.28-7.86-1.87-2.99-2.01-4.72-4.86-5.25-8.44-.13-1.08-.13-1.68,0-2.7ZM12.85,17.58c.99.01,2.33-.02,3.65-.09.46-.03.93-.07,1.39-.13.95-.14,1.48-.65,1.68-1.59.1-.45.13-.9.17-1.35.1-1.27.1-2.55,0-3.82-.04-.49-.06-.97-.19-1.45-.21-.83-.73-1.32-1.58-1.47-.93-.16-1.88-.17-2.82-.21-2.56-.11-5.12-.08-7.68.14-1.29.11-1.93.74-2.06,2.04-.03.34-.05.68-.09,1.03-.14,1.62-.09,3.23.1,4.84.14,1.15.77,1.71,1.92,1.85,1.71.2,3.43.21,5.49.21Z"
                />
                <path
                  className="fill-white"
                  d="M11.05,12.49c0-.63,0-1.26,0-1.9,0-.23.02-.35.29-.19,1.12.65,2.24,1.3,3.37,1.94.2.12.21.19,0,.3-1.12.64-2.23,1.28-3.34,1.93-.25.14-.33.09-.32-.19.01-.63,0-1.26,0-1.9Z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-section footer-copy">
          <p>
            Copyright © 2025 Movisun E.I.R.L. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
