import { useState } from "react";
import { LuCamera } from "react-icons/lu";

function AddReceiptPopup({ onClose, onSave }) {
	const [file, setFile] = useState(null);

	function toBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result.split(",")[1]);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	function handleUpload(e) {
		const file = e.target.files[0]; // the selected file
		setFile(file);
		console.log(file); // File object with name, size, type etc
	}

	return (
		<div
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
			onClick={onClose}>
			<div
				className="bg-[#242424] border border-[#383838] rounded-2xl p-6 w-full max-w-md"
				onClick={(e) => e.stopPropagation()}>
				<p className="text-white text-lg font-bold mb-5">Add Receipt</p>
				{file && (
					<div className="bg-[#2e2e2e] border border-[#383838] rounded-lg p-3 mb-4">
						<p className="text-gray-400 text-xs">Selected File</p>
						<p className="text-white text-sm">{file.name}</p>
					</div>
				)}
				<label className="w-full h-40 bg-[#2e2e2e] border-2 border-dashed border-[#4a9b6f] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#333] transition-colors">
					<input
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleUpload}
					/>

					<LuCamera
						size={28}
						className="text-[#4a9b6f]"
					/>
					<p className="text-gray-400 text-sm">Drop receipt here</p>
					<p className="text-gray-600 text-xs">or click to upload</p>
				</label>
				<button
					className={`mt-4 w-full bg-[#4a9b6f] ${file ? "hover:bg-[#3a7a57]" : ""} text-white font-semibold py-2 rounded-lg transition-colors ${file ? "" : "opacity-50 cursor-not-allowed"}`}
					onClick={() => {
						if (file) {
							const base64 = toBase64(file);
							onSave(base64);
							onClose();
						}
					}}>
					Save Receipt
				</button>
			</div>
		</div>
	);
}

export default AddReceiptPopup;
