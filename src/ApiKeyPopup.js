import { useState } from "react";

const inputClass =
	"w-full bg-[#2e2e2e] border border-[#383838] rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#4a9b6f] transition-colors";

function ApiKeyPopup({ onClose, onSave }) {
	const [key, setKey] = useState("");

	const handleSave = () => {
		const trimmed = key.trim();
		if (!trimmed) return;
		localStorage.setItem("anthropic_api_key", trimmed);
		onSave(trimmed);
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
			onClick={onClose}>
			<div
				className="bg-[#242424] border border-[#383838] rounded-2xl p-6 w-full max-w-md"
				onClick={(e) => e.stopPropagation()}>
				<p className="text-white text-lg font-bold mb-1">Anthropic API Key</p>
				<p className="text-gray-500 text-xs mb-5">
					Required to scan receipts. Stored locally on your device only.
				</p>

				<div>
					<label className="text-gray-400 text-xs mb-1 block">API Key</label>
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
						Save Key
					</button>
				</div>
			</div>
		</div>
	);
}

export default ApiKeyPopup;
