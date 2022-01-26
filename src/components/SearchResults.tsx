import { ResultProps } from "../pages"
import { ProductItem } from "./ProductItem"
import { List, ListRowRenderer, AutoSizer } from "react-virtualized"

type Props = {
    results: ResultProps,
    onAddToWishList: (id: number) => Promise<void>
}

export function SearchResults({ results, onAddToWishList }: Props) {

    const { data, totalPrice } = results

    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key} style={style} >
                <ProductItem
                    product={data[index]}
                    onAddToWishList={onAddToWishList}
                />
            </div>
        )
    }

    return (
        <div style={{ display: "flex", flexDirection: 'column', height: '80vh' }}>
            <h2>Valor total: {totalPrice}</h2>

            <div style={{ flex: 1, overflowY: 'hidden' }} >
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            rowHeight={30}
                            width={width}
                            overscanRowCount={5}
                            rowCount={data.length}
                            rowRenderer={rowRenderer}
                        />
                    )}
                </AutoSizer>
            </div>

        </div>
    )
}
