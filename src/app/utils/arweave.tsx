import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

export const uploadToArweave = async (file: File): Promise<string> => {
  try {
    const data = await file.arrayBuffer();
    console.log("File data (ArrayBuffer):", data);

    // Create transaction
    const transaction = await arweave.createTransaction({ data });
    console.log("Transaction created:", transaction);

    // Sign transaction
    await arweave.transactions.sign(transaction);
    console.log("Transaction signed:", transaction);

    // Post transaction
    const response = await arweave.transactions.post(transaction);
    console.log("Transaction post response:", response);

    if (response.status === 200) {
      return `https://arweave.net/${transaction.id}`;
    } else {
      throw new Error(
        `Failed to upload file to Arweave. HTTP Status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error("Error uploading file to Arweave:", error);
    throw new Error(`Error uploading file to Arweave: ${error || error}`);
  }
};
