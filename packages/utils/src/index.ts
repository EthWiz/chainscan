import { ethers } from "ethers";
import axios from "axios";

export function generateSignatureHash(eventName: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(eventName));
}

export function generateAlertId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
export async function getContractAbi(
  etherscanKey: string,
  address: string
): Promise<string[]> {
  try {
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${etherscanKey}`;
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching ABI: ${error.message}`);
      throw error;
    } else {
      console.error(`Unexpected error: ${error}`);
      throw new Error("Unexpected error occurred");
    }
  }
}

export async function getContractEventSignatures(
  etherscanKey: string,
  address: string
): Promise<string[]> {
  try {
    const abi = await getContractAbi(etherscanKey, address);
    const iface = new ethers.Interface(abi);
    const events = iface.fragments.filter((f) => f.type === "event");
    return events.map((event) => event.format());
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching ABI: ${error.message}`);
      throw error;
    } else {
      console.error(`Unexpected error: ${error}`);
      throw new Error("Unexpected error occurred");
    }
  }
}
