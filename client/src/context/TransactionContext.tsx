import { useEffect, useState, createContext, FC } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext<any>(null);

const { ethereum } = window as any;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider: FC = ({ children }) => {
  const [currenctAccount, setCurrentAccount] = useState<string>("");
  // @ts-ignore
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e: string, name: string) => {
    setFormData({
      ...formData,
      [name]: e,
    });
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please intall Metamast!");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // getAllTransactions
      } else {
        console.log("NO accounts found!");
      }
      console.log(accounts);
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please intall Metamast!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log("Connect wallet error:", err);
      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please intall Metamast!");
      const { addressTo, amount, keyword, message } = formData;
      console.log(addressTo, amount, keyword, message);
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log("parsedAmount;", parsedAmount);
      const transactionContract = await getEthereumContract();
      console.log("transactionContract:", transactionContract);
      const result = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currenctAccount,
            to: addressTo,
            gas: "0x5208", //2100 wei
            value: parsedAmount._hex,
          },
        ],
      });

      console.log("result", result);

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionHash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash}`);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object.");
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currenctAccount,
        handleChange,
        formData,
        setFormData,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
