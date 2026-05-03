import { useState } from "react";

const CATEGORIES = ["General", "Dairy", "Bakery", "Grains", "Produce", "Proteins", "Snacks", "Beverages"];

const inputClass =
	"w-full bg-[#2e2e2e] border border-[#383838] rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#4a9b6f] transition-colors";

function ItemEditPopup({ item, onClose, onSave }) {
	const [editedItem, setEditedItem] = useState(item);

	return (
		<div
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
			onClick={onClose}>
			<div
				className="bg-[#242424] border border-[#383838] rounded-2xl p-6 w-full max-w-md"
				onClick={(e) => e.stopPropagation()}>
				<p className="text-white text-lg font-bold mb-5">
					{item.name ? "Edit Item" : "Add Item"}
				</p>

				<div className="flex flex-col gap-4">
					<div>
						<label className="text-gray-400 text-xs mb-1 block">Item Name</label>
						<input
							className={inputClass}
							placeholder="e.g. Brown Rice"
							value={editedItem.name}
							onChange={(e) =>
								setEditedItem((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
					</div>

					<div>
						<label className="text-gray-400 text-xs mb-1 block">Quantity</label>
						<input
							className={inputClass}
							type="number"
							placeholder="0"
							value={editedItem.quantity}
							onChange={(e) =>
								setEditedItem((prev) => ({
									...prev,
									quantity: Number(e.target.value),
								}))
							}
						/>
					</div>

					<div>
						<label className="text-gray-400 text-xs mb-1 block">Category</label>
						<select
							className={inputClass}
							value={editedItem.category}
							onChange={(e) =>
								setEditedItem((prev) => ({ ...prev, category: e.target.value }))
							}>
							{CATEGORIES.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="flex gap-3 mt-6">
					<button
						className="flex-1 py-2 rounded-lg border border-[#383838] text-gray-400 hover:text-white hover:border-[#4a4a4a] text-sm transition-colors"
						onClick={onClose}>
						Cancel
					</button>
					<button
						className="flex-1 py-2 rounded-lg bg-[#4a9b6f] hover:bg-[#3a7a57] text-white text-sm font-semibold transition-colors"
						onClick={() => {
							onSave(editedItem);
							onClose();
						}}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default ItemEditPopup;
