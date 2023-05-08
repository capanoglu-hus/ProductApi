import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Product_ABI } from "../constant/abi";
import { Product_Address } from "../constant/addresses";

export const useProductContract = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(Product_Address, Product_ABI, signer);
    setContract(_contract);
  }, []);

  return contract;

};