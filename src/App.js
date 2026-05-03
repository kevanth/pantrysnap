import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";

function App() {
	const [items, setItems] = useState([
		{
			name: "Milk",
			quantity: 2,
			category: "Dairy",
			id: Date.now() + Math.random(),
		},
		{
			name: "Tissue",
			quantity: 5,
			category: "General",
			id: Date.now() + Math.random(),
		},
		{
			name: "Eggs",
			quantity: 12,
			category: "Dairy",
			id: Date.now() + Math.random(),
		},
		{
			name: "Bread",
			quantity: 1,
			category: "Bakery",
			id: Date.now() + Math.random(),
		},
	]);
	const [search, setSearch] = useState("");
	const filtered = items.filter((item) =>
		search !== "" ? item.name.toLowerCase().includes(search) : true,
	);
	const [showAddItemCard, setShowAddItemCard] = useState(false);
	const deleteItem = (itemToThrow) => {
		setItems(items.filter((item) => item.id !== itemToThrow.id));
	};

	const addItem = (newItem) => {
		setItems([...items, newItem]);
	};

	return (
		<div
			className="bg-[#1a1a1a] text-white min-h-screen"
			onClick={() => setShowAddItemCard(false)}>
			<header className="App-header">
				<h1>PantrySnap</h1>
				<input
					className="bg-[#2a2a2a] px-2 py-1 rounded-lg"
					type="text"
					placeholder="Search Items.."
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
				/>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setShowAddItemCard(true);
					}}>
					Add Item
				</button>
				{filtered.map((item, index) => (
					<ItemCard
						key={item.id}
						item={item}
						deleteItem={() => deleteItem(item)}
					/>
				))}
			</header>
			{showAddItemCard && (
				<div
					className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
					onClick={() => setShowAddItemCard(false)} // only backdrop closes it
				>
					<div
						className="bg-white rounded-xl p-6"
						onClick={(e) => e.stopPropagation()} // clicking card doesn't close it
					>
						Test
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
