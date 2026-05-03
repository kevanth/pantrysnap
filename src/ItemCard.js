function ItemCard({ item, deleteItem }) {
    return (
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4">
            <h3>{item.name}</h3>
            <button onClick={deleteItem}>x</button>
            <p>Quantity: {item.quantity}</p>
            <p>Category: {item.category}</p>
            <p>Expiration Date: 2024-12-31</p>
        </div>
    );
}
export default ItemCard;