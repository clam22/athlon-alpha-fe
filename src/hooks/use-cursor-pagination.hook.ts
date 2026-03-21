import { useState } from "react";

export function useCursorPagination<T>() {
    const [pages, setPages] = useState<T[]>();
    const [hasNextPage, setHasNextPage] = useState<Boolean>(false);

    
}