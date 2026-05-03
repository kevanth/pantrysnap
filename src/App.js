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
	const [newItem, setNewItem] = useState({
		name: "New Item",
		quantity: 1,
		category: "General",
	});

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
					onClick={() => {
						setShowAddItemCard(false);
						setNewItem({
							name: "New Item",
							quantity: 1,
							category: "General",
						});
					}} // only backdrop closes it
				>
					<div
						className="w-full max-w-md h-full max-h-[30vh] bg-gray-800 rounded-xl p-6"
						onClick={(e) => e.stopPropagation()} // clicking card doesn't close it
						text-white
						inset-10>
						<p>Add Item</p>
						<input
							className="bg-gray-700 w-full rounded-s p-2"
							placeholder={newItem.name}
							onChange={(e) =>
								setNewItem({ ...newItem, name: e.target.value })
							}></input>
						<input
							className="bg-gray-700 w-full rounded-s p-2 mt-2"
							placeholder={newItem.quantity}
							onChange={(e) =>
								setNewItem({ ...newItem, quantity: e.target.value })
							}></input>
						<input
							className="bg-gray-700 w-full rounded-s p-2 mt-2"
							placeholder={newItem.category}
							onChange={(e) =>
								setNewItem({ ...newItem, category: e.target.value })
							}></input>
						<button
							className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
							onClick={() => {
								addItem({ ...newItem, id: Date.now() + Math.random() });
								setShowAddItemCard(false);
								setNewItem({
									name: "New Item",
									quantity: 1,
									category: "General",
								});
							}}>
							Add
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
