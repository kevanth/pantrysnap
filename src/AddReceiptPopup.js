import { useState } from "react";
import { LuCamera } from "react-icons/lu";

function AddReceiptPopup({ onClose, onSave }) {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	function handleFileChange(e) {
		const selected = e.target.files[0];
		if (!selected) return;
		setFile(selected);
		setPreview(URL.createObjectURL(selected)); // show preview of image
	}

	async function handleSubmit() {
		if (!file) return;

		setLoading(true);
		setError("");

		try {
			const base64 = await toBase64(file);

			const response = await fetch("https://api.anthropic.com/v1/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
					"anthropic-version": "2023-06-01",
					"anthropic-dangerous-direct-browser-access": "true",
				},
				body: JSON.stringify({
					model: "claude-haiku-4-5-20251001",
					max_tokens: 1000,
					messages: [
						{
							role: "user",
							content: [
								{
									type: "image",
									source: {
										type: "base64",
										media_type: file.type,
										data: base64,
									},
								},
								{
									type: "text",
									text: `Look at this receipt and extract all grocery/household items purchased.
                Return ONLY a JSON array, no other text. Example format:
                [{"name": "Milk", "quantity": 2, "category": "Dairy"}]
                Categories should be one of: Dairy, Produce, Bakery, Meat, Pantry, Frozen, Drinks, General`,
								},
							],
						},
					],
				}),
			});

			const data = await response.json();
			const text = data.content[0].text;

			// strip any accidental markdown backticks
			const clean = text.replace(/```json|```/g, "").trim();
			const newItems = JSON.parse(clean);

			onSave(newItems);
			console.log("Extracted items from receipt:", newItems);
			onClose();
		} catch (err) {
			setError("Couldn't read receipt. Try a clearer photo.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
			onClick={onClose}>
			<div
				className="bg-[#242424] border border-[#383838] rounded-2xl p-6 w-full max-w-md"
				onClick={(e) => e.stopPropagation()}>
				<p className="text-white text-lg font-bold mb-5">Add Receipt</p>

				{/* Upload zone */}
				<label className="w-full h-40 bg-[#2e2e2e] border-2 border-dashed border-[#4a9b6f] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#333] transition-colors overflow-hidden">
					<input
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleFileChange}
					/>
					{preview ? (
						<img
							src={preview}
							className="h-full w-full object-cover rounded-xl"
						/>
					) : (
						<>
							<LuCamera
								size={28}
								className="text-[#4a9b6f]"
							/>
							<p className="text-gray-400 text-sm">Drop receipt here</p>
							<p className="text-gray-600 text-xs">or click to upload</p>
						</>
					)}
				</label>

				{/* Error */}
				{error && <p className="text-red-400 text-sm mt-3">{error}</p>}

				{/* Submit button */}
				<button
					onClick={handleSubmit}
					disabled={!file || loading}
					className={`mt-4 w-full bg-[#4a9b6f] hover:bg-[#3a7a57] text-white font-semibold py-2 rounded-lg transition-colors
            ${!file || loading ? "opacity-50 cursor-not-allowed" : ""}`}>
					{loading ? "Reading receipt..." : "Add to pantry"}
				</button>
			</div>
		</div>
	);
}

function toBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result.split(",")[1]);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

export default AddReceiptPopup;
