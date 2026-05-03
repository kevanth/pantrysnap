import { useState } from "react";
import ItemCard from "./ItemCard";
import ItemEditPopup from "./ItemEditPopup.js";

const TEST_ITEMS = [
	{ name: "Milk", quantity: 2, category: "Dairy", id: 1 },
	{ name: "Tissue", quantity: 5, category: "General", id: 2 },
	{ name: "Eggs", quantity: 12, category: "Dairy", id: 3 },
	{ name: "Bread", quantity: 1, category: "Bakery", id: 4 },
];

const EMPTY_ITEM = { name: "", quantity: 1, category: "General" };

const CATEGORIES = ["All", "General", "Dairy", "Bakery", "Grains", "Produce", "Proteins", "Snacks", "Beverages"];

function App() {
	const [items, setItems] = useState(TEST_ITEMS);
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState("All");
	const [showAddItemCard, setShowAddItemCard] = useState(false);
	const [editCard, setEditCard] = useState(null);

	const filtered = items.filter((item) => {
		const matchesSearch = search !== "" ? item.name.toLowerCase().includes(search) : true;
		const matchesCategory = activeCategory === "All" || item.category === activeCategory;
		return matchesSearch && matchesCategory;
	});

	const lowStockCount = items.filter((item) => item.quantity <= 2).length;

	const deleteItem = (itemToDelete) => {
		setItems(items.filter((item) => item.id !== itemToDelete.id));
	};

	const addItem = (newItem) => {
		setItems([...items, newItem]);
	};

	return (
		<div className="min-h-screen bg-[#1a1a1a] text-white">
			{/* Header */}
			<header className="border-b border-[#383838] px-6 py-4 flex items-center justify-between">
				<div>
					<h1 className="text-xl font-bold text-white tracking-tight">PantrySnap</h1>
					<p className="text-gray-500 text-xs mt-0.5">Your kitchen inventory</p>
				</div>
				<button
					className="bg-[#4a9b6f] hover:bg-[#3a7a57] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
					onClick={(e) => {
						e.stopPropagation();
						setShowAddItemCard(true);
					}}>
					+ Add Item
				</button>
			</header>

			<main className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-6">
				{/* Stats */}
				<div className="flex gap-4">
					<div className="bg-[#242424] border border-[#383838] rounded-xl px-5 py-3 flex flex-col gap-0.5">
						<span className="text-gray-400 text-xs">Total Items</span>
						<span className="text-white text-2xl font-bold">{items.length}</span>
					</div>
					<div className="bg-[#242424] border border-[#4a9b6f] rounded-xl px-5 py-3 flex flex-col gap-0.5">
						<span className="text-gray-400 text-xs">Low Stock</span>
						<span className="text-[#4a9b6f] text-2xl font-bold">{lowStockCount}</span>
					</div>
				</div>

				{/* Search */}
				<input
					className="w-full bg-[#2e2e2e] border border-[#383838] rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#4a9b6f] transition-colors"
					type="text"
					placeholder="Search items…"
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
				/>

				{/* Category filters */}
				<div className="flex gap-2 flex-wrap">
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
								activeCategory === cat
									? "bg-[#4a9b6f] text-white"
									: "bg-[#242424] border border-[#383838] text-gray-400 hover:text-white hover:border-[#4a4a4a]"
							}`}
							onClick={() => setActiveCategory(cat)}>
							{cat}
						</button>
					))}
				</div>

				{/* Grid */}
				{filtered.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{filtered.map((item) => (
							<ItemCard
								key={item.id}
								item={item}
								deleteItem={() => deleteItem(item)}
								onClick={() => setEditCard(item)}
							/>
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-20 text-center">
						<span className="text-4xl mb-3">🥫</span>
						<p className="text-gray-400 font-medium">No items found</p>
						<p className="text-gray-500 text-sm mt-1">Try a different category or search term</p>
					</div>
				)}
			</main>

			{showAddItemCard && (
				<ItemEditPopup
					item={EMPTY_ITEM}
					onClose={() => setShowAddItemCard(false)}
					onSave={(editedItem) => {
						addItem({ ...editedItem, id: items.length + 1 });
					}}
				/>
			)}

			{editCard != null && (
				<ItemEditPopup
					item={editCard}
					onClose={() => setEditCard(null)}
					onSave={(editedItem) => {
						setItems(
							items.map((item) =>
								item.id === editedItem.id ? editedItem : item,
							),
						);
					}}
				/>
			)}
		</div>
	);
}

export default App;
