import { memo, useState } from "react";
import { ProductsProps } from "../pages";
import { AddProductToWishListProps } from './AddProductToWishList'
import dynamic from "next/dynamic";
import lodash from 'lodash'

// import { AddProductToWishList } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
    return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
    loading: () => <span>Carregando...</span>
});

type Props = {
    product: ProductsProps
    onAddToWishList: (id: number) => Promise<void>
}

function ProductItemComponent({ product, onAddToWishList }: Props) {
    const [isAddingToWishList, setIsAddingToWishList] = useState(false)

    return (
        <div>
            {product.title} | <strong>{product.priceFormated}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

            {isAddingToWishList && (
                <AddProductToWishList
                    onAddToWishList={() => onAddToWishList(product.id)}
                    onRequestClose={() => setIsAddingToWishList(false)}
                />
            )}
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product)
})