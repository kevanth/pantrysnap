function ItemCard({ item, deleteItem, onClick }) {
	const lowStock = item.quantity <= 2;

	return (
		<div
			className={`bg-[#242424] border rounded-xl p-4 flex flex-col gap-3 cursor-pointer transition-all duration-200 hover:border-[#4a9b6f]/50 ${
				lowStock ? "border-[#4a9b6f]" : "border-[#383838]"
			}`}
			onClick={onClick}>
			<div className="flex items-start justify-between gap-2">
				<h3 className="text-white font-semibold text-base leading-tight">{item.name}</h3>
				{lowStock && (
					<span className="shrink-0 bg-[#4a9b6f] bg-opacity-20 text-[#4a9b6f] text-xs font-medium px-2 py-0.5 rounded-full">
						Low Stock
					</span>
				)}
			</div>

			<div className="flex flex-col gap-1">
				<div className="flex items-center justify-between">
					<span className="text-gray-500 text-sm">Category</span>
					<span className="text-gray-400 text-sm">{item.category}</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-gray-500 text-sm">Quantity</span>
					<span className="text-white text-sm font-medium">{item.quantity}</span>
				</div>
			</div>

			<button
				className="mt-1 w-full text-gray-500 hover:text-red-400 text-xs border border-[#383838] hover:border-red-400/40 rounded-lg py-1.5 transition-colors duration-150"
				onClick={(e) => {
					e.stopPropagation();
					deleteItem();
				}}>
				Remove
			</button>
		</div>
	);
}

export default ItemCard;
