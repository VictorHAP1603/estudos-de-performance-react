

export type AddProductToWishListProps = {
    onAddToWishList: () => void;
    onRequestClose: () => void;
}

export function AddProductToWishList({ onAddToWishList, onRequestClose }: AddProductToWishListProps) {
    return (
        <div>
            <span>
                Deseja adicionar aos favoritos?
            </span>

            <button onClick={onAddToWishList}>Add</button>
            <button onClick={onRequestClose}>Close</button>
        </div>
    )
}

