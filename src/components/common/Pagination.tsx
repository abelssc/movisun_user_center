import { Link, useSearchParams } from 'react-router';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") || "all";
  const maxPages = 10;

  // Si hay solo una página, no mostrar la paginación
  if (totalPages === 1) {
    return null;
  }

  // Crear el arreglo de páginas visibles
  const pageLinks: number[] = [];

  // Calcular el rango de páginas a mostrar
  let startPage = Math.max(currentPage - 4, 1);
  let endPage = Math.min(currentPage + 4, totalPages);

  // Asegurar que siempre mostramos al menos 10 páginas (si es posible)
  if (endPage - startPage < maxPages - 1) {
    if (startPage === 1) {
      endPage = Math.min(startPage + maxPages - 1, totalPages);
    } else {
      startPage = Math.max(endPage - maxPages + 1, 1);
    }
  }

  // Agregar las páginas al arreglo
  for (let i = startPage; i <= endPage; i++) {
    pageLinks.push(i);
  }

  // Función para generar los enlaces correctamente
  const getPageLink = (page: number) => `?page=${page}&state=${state}`;

  return (
    <nav className="text-center mt-4">
      <ul className="flex gap-2 justify-center items-center">
        {/* Botón de "Anterior" */}
        <li className={currentPage > 1 ? "" : "invisible"}>
          <Link to={getPageLink(currentPage - 1)} className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700">
            Anterior
          </Link>
        </li>

        {/* Mostrar la primera página y "..." si es necesario */}
        {pageLinks[0] > 1 && (
          <>
            <li>
              <Link to={getPageLink(1)} className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700">
                1
              </Link>
            </li>
            <li>
              <span>...</span>
            </li>
          </>
        )}

        {/* Mostrar los botones de las páginas en el rango calculado */}
        {pageLinks.map((page) => (
          <li key={page}>
            <Link
              to={getPageLink(page)}
              className={`px-3 py-1 rounded-lg w-10 block ${page === currentPage ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-900'}`}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Mostrar "..." y la última página si es necesario */}
        {pageLinks[pageLinks.length - 1] < totalPages && (
          <>
            <li>
              <span>...</span>
            </li>
            <li>
              <Link to={getPageLink(totalPages)} className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700">
                {totalPages}
              </Link>
            </li>
          </>
        )}

        {/* Botón de "Siguiente" */}
        <li className={currentPage < totalPages ? "" : "invisible"}>
          <Link to={getPageLink(currentPage + 1)} className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700">
            Siguiente
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
