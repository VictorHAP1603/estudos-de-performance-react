import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults";
import { formatPrice } from "../utils/formatPrice";

export type ProductsProps = {
  id: number;
  title: string;
  price: number;
  priceFormated: string;
}

export type ResultProps = {
  data: ProductsProps[];
  totalPrice: number
}

export default function Home() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<ResultProps>({
    data: [],
    totalPrice: 0
  })

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data: ProductsProps[] = await response.json();

    const productsPriceFormated = data.map(product => {
      return {
        ...product,
        priceFormated: formatPrice(product.price)
      }
    })

    const totalPrice = data.reduce((acm, obj) => {
      return acm + obj.price
    }, 0)


    setResults({ totalPrice, data: productsPriceFormated })

  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults results={results} onAddToWishList={addToWishList} />

    </div>
  )
}

/* 
  
memo()

  1. Pure functional components
  2. Renders to often
  3. Re-renders with same props
  4. Components mediums to big size

=====================================================

useMemo()

  1.Cálculos pesados
  2.Igualdade referencial ( quando repassamos aquela informação para um componente filho  )

=====================================================

useCallback()



*/

