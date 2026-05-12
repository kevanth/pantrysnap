import { useState } from "react";

const inputClass =
	"w-full bg-[#2e2e2e] border border-[#383838] rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#4a9b6f] transition-colors";

function ApiKeyPopup({ onClose, onSave, onDelete, existingKey }) {
	const [key, setKey] = useState("");
	const isEditing = !!existingKey;

	const handleSave = () => {
		const trimmed = key.trim();
		if (!trimmed) return;
		localStorage.setItem("anthropic_api_key", trimmed);
		onSave(trimmed);
		onClose();
	};

	const handleDelete = () => {
		localStorage.removeItem("anthropic_api_key");
		onDelete();
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
			onClick={onClose}>
			<div
				className="bg-[#242424] border border-[#383838] rounded-2xl p-6 w-full max-w-md"
				onClick={(e) => e.stopPropagation()}>
				<p className="text-white text-lg font-bold mb-1">
					{isEditing ? "Manage API Key" : "Anthropic API Key"}
				</p>
				<p className="text-gray-500 text-xs mb-5">
					Required to scan receipts. Stored locally on your device only.
				</p>

				{isEditing && (
					<div className="bg-[#2e2e2e] border border-[#383838] rounded-lg px-3 py-2 mb-4 flex items-center justify-between">
						<span className="text-gray-400 text-sm font-mono">
							{existingKey.slice(0, 10)}••••••••••••••••
						</span>
						<button
							className="text-red-400 hover:text-red-300 text-xs transition-colors"
							onClick={handleDelete}>
							Delete
						</button>
					</div>
				)}

				<div>
					<label className="text-gray-400 text-xs mb-1 block">
						{isEditing ? "New API Key" : "API Key"}
					</label>
					<input
						className={inputClass}
						type="password"
						placeholder="sk-ant-..."
						value={key}
						onChange={(e) => setKey(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSave()}
					/>
				</div>

				<div className="flex gap-3 mt-6">
					<button
						className="flex-1 py-2 rounded-lg border border-[#383838] text-gray-400 hover:text-white hover:border-[#4a4a4a] text-sm transition-colors"
						onClick={onClose}>
						Cancel
					</button>
					<button
						className="flex-1 py-2 rounded-lg bg-[#4a9b6f] hover:bg-[#3a7a57] text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={!key.trim()}
						onClick={handleSave}>
						{isEditing ? "Update Key" : "Save Key"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ApiKeyPopup;
