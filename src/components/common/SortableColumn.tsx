import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router";

interface QueryParams {
    
    sort_column: string;
    sort_direction: string;
}

const SortableColumn = ({label, column, queryParams, url}: {label: string, column: string, queryParams: QueryParams, url: string}) => {
    const navigate = useNavigate();

    const isSortedAsc = queryParams.sort_column===column && queryParams.sort_direction==='desc'
    const sortColumn = () => {
        const newSortDirection = isSortedAsc ? 'asc' : 'desc';
        
        // Clona y actualiza queryParams para evitar mutación directa
        const updatedParams: Record<string, string> = { 
            ...queryParams, 
            sort_column: column, 
            sort_direction: newSortDirection 
        };

       // Construir la nueva URL con los parámetros de consulta
       const newUrl = new URL(url, window.location.origin);
       Object.keys(updatedParams).forEach((key) => newUrl.searchParams.set(key, updatedParams[key]));

       // Realiza la solicitud de navegación con los nuevos parámetros
       navigate(newUrl.toString());

    };

    return (
        <div className='flex gap-1 cursor-pointer' onClick={sortColumn}>
            {label} 
            {
                isSortedAsc
                    ? <FaChevronUp width={14} />
                    : <FaChevronDown width={14} />
            }
        </div>
    )
}

export default SortableColumn